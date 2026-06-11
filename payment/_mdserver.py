#!/usr/bin/env python3
"""支付研究文档浏览服务：Markdown + Mermaid 渲染 + 左侧两级导航（文档 + 章节锚点）。

用法：python3 _mdserver.py [port]   默认 8911，根目录为脚本所在目录（payment/）。
- .md：marked.js 渲染 + mermaid 画图 + 代码高亮；左侧目录树（文档级）+ 当前文档章节（二级导航）
- 其他文件：直接预览/下载
"""
import sys, os, re, html, mimetypes, urllib.parse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8911
IGNORE = {".git", ".claude", ".playwright-mcp", "__pycache__", ".DS_Store", "node_modules"}
# 左侧导航里默认不显示的文件(不区分大小写;文件本身仍可直接访问)
NAV_HIDE = {"index.md", "claude.md"}

PAGE_TMPL = """<!DOCTYPE html>
<html lang="zh"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/styles/github.min.css">
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js"></script>
<style>
:root{{--accent:#D97757;--navy:#1A1A2E;--slate:#64748B;--bg:#F8FAFC;--border:#E2E8F0;}}
*{{box-sizing:border-box}}
body{{margin:0;font-family:-apple-system,"Microsoft YaHei UI",Arial,sans-serif;color:var(--navy);background:var(--bg);line-height:1.7}}
#wrap{{display:flex;min-height:100vh}}
#side{{width:320px;flex:none;background:#fff;border-right:1px solid var(--border);overflow-y:auto;height:100vh;position:sticky;top:0;font-size:13.5px}}
#side .brand{{padding:16px 16px 10px;font-weight:700;font-size:15px;border-bottom:1px solid var(--border);position:sticky;top:0;background:#fff;z-index:2}}
#side .brand a{{color:var(--navy);text-decoration:none}}
#side .sec{{padding:8px 10px 4px;font-size:11px;text-transform:uppercase;color:var(--accent);letter-spacing:.05em;font-weight:700}}
#side .tree{{padding:4px 8px 24px}}
#side a{{display:block;padding:4px 8px;border-radius:6px;color:var(--navy);text-decoration:none}}
#side a:hover{{background:var(--bg)}}
#side a.dir{{color:var(--slate);font-weight:600;margin-top:6px}}
#side a.doc.active{{background:#FFF7ED;color:var(--accent);font-weight:600}}
/* 可折叠目录:一级展示,点击展开二三级 */
#side details{{margin:0}}
#side details>summary{{list-style:none;cursor:pointer;display:block;padding:4px 8px;border-radius:6px;color:var(--slate);font-weight:600;margin-top:6px;user-select:none}}
#side details>summary::-webkit-details-marker{{display:none}}
#side details>summary:hover{{background:var(--bg)}}
#side details>summary::before{{content:"▸";display:inline-block;width:1em;color:var(--slate);transition:transform .15s}}
#side details[open]>summary::before{{transform:rotate(90deg)}}
#side details .kids{{margin-left:10px;border-left:1px solid var(--border);padding-left:4px}}
/* 二级:章节导航 */
.toc{{margin:2px 0 8px 14px;border-left:2px solid var(--border);padding-left:6px}}
.toc a{{font-size:12.5px;color:var(--slate);padding:3px 8px}}
.toc a:hover{{color:var(--accent)}}
.toc a.h1{{font-weight:600;color:var(--ink,#1e293b)}}
.toc a.h2{{padding-left:22px;font-size:12px;color:#94a3b8}}
.toc a.active{{color:var(--accent);font-weight:600;background:#FFF7ED;border-radius:4px}}
#main{{flex:1;min-width:0;padding:36px 56px;max-width:1000px;margin:0 auto}}
#main h1{{border-bottom:2px solid var(--accent);padding-bottom:.3em;line-height:1.3}}
#main h2,#main h3,#main h4{{line-height:1.3;scroll-margin-top:20px}}
#main h2{{margin-top:1.8em;border-bottom:1px solid var(--border);padding-bottom:.2em}}
#main code{{background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:.9em}}
#main pre code{{display:block;padding:14px;border-radius:8px;overflow:auto}}
#main blockquote{{border-left:4px solid var(--accent);margin:1em 0;padding:.4em 1em;background:#FFF7ED;color:#7c4a36;border-radius:0 8px 8px 0}}
#main table{{border-collapse:collapse;width:100%;margin:1em 0;font-size:14px}}
#main th,#main td{{border:1px solid var(--border);padding:8px 12px;text-align:left;vertical-align:top}}
#main th{{background:var(--navy);color:#fff}}
#main tr:nth-child(even){{background:#fcfcfd}}
#main img{{max-width:100%}}
.mermaid{{background:#fff;border:1px solid var(--border);border-radius:8px;padding:16px;margin:1em 0;text-align:center}}
.crumb{{font-size:13px;color:var(--slate);margin-bottom:18px}}
.crumb a{{color:var(--accent);text-decoration:none}}
.flist a{{display:flex;justify-content:space-between;padding:10px 14px;border:1px solid var(--border);border-radius:8px;margin-bottom:6px;background:#fff;text-decoration:none;color:var(--navy)}}
.flist a:hover{{border-color:var(--accent)}}
.flist .sz{{color:var(--slate);font-size:12px}}
</style></head><body>
<div id="wrap">
<div id="side">
  <div class="brand">💳 <a href="/">支付研究主目录</a></div>
  <div class="tree">{tree}</div>
</div>
<div id="main">{crumb}<div id="content">{content}</div></div>
</div>
<script>
mermaid.initialize({{startOnLoad:false,theme:'neutral'}});
// 侧栏手风琴:同级目录互斥——展开一个,自动收起同级其他(及其所有子级)
(function(){{
  const side=document.getElementById('side');
  if(!side) return;
  side.querySelectorAll('details>summary').forEach(sm=>{{
    sm.addEventListener('click',function(){{
      const d=sm.parentElement;
      // 即将展开时(当前是关闭态),收起同级其他 details
      if(!d.open){{
        const parent=d.parentElement;
        parent.querySelectorAll(':scope>details[open]').forEach(o=>{{
          if(o!==d){{ o.open=false; o.querySelectorAll('details[open]').forEach(x=>x.open=false); }}
        }});
      }}
    }});
  }});
}})();
const raw = document.getElementById('rawmd');
if(raw){{
  marked.setOptions({{breaks:false,gfm:true}});
  const tokens = marked.lexer(raw.textContent);
  document.getElementById('content').innerHTML = marked.parser(tokens);
  // 给 h1/h2 加 id（与左侧 TOC 锚点对应，只到二级标题）
  let idx=0;
  document.querySelectorAll('#content h1,#content h2').forEach(el=>{{el.id='sec-'+(idx++);}});
  // mermaid 渲染
  document.querySelectorAll('code.language-mermaid').forEach(el=>{{
    const d=document.createElement('div');d.className='mermaid';d.textContent=el.textContent;
    el.closest('pre').replaceWith(d);
  }});
  mermaid.run();
  document.querySelectorAll('pre code:not(.language-mermaid)').forEach(el=>{{try{{hljs.highlightElement(el)}}catch(e){{}}}});
  // 滚动高亮当前章节
  const tocLinks=[...document.querySelectorAll('.toc a')];
  const heads=[...document.querySelectorAll('#content h1,#content h2')];
  if(tocLinks.length&&heads.length){{
    const obs=new IntersectionObserver(es=>{{
      es.forEach(e=>{{if(e.isIntersecting){{
        const id=e.target.id;
        tocLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));
      }}}});
    }},{{rootMargin:'0px 0px -80% 0px'}});
    heads.forEach(h=>obs.observe(h));
  }}
}}
</script>
</body></html>"""


def human(n):
    for u in ["B", "K", "M", "G"]:
        if n < 1024:
            return f"{n:.0f}{u}" if u == "B" else f"{n:.1f}{u}"
        n /= 1024
    return f"{n:.1f}T"


def extract_toc(path):
    """从 md 提取 H1/H2 标题（只到二级），生成左侧导航。锚点 sec-0,sec-1... 与前端编号一致。"""
    try:
        with open(path, encoding="utf-8") as f:
            src = f.read()
    except OSError:
        return ""
    items = []
    idx = 0
    in_code = False
    for ln in src.splitlines():
        if ln.lstrip().startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            continue
        m = re.match(r'^(#{1,2})\s+(.*)$', ln)
        if m:
            level = len(m.group(1))
            text = re.sub(r'[#*`]', '', m.group(2)).strip()
            cls = "h2" if level == 2 else "h1"
            items.append(f'<a class="{cls}" href="#sec-{idx}">{html.escape(text)}</a>')
            idx += 1
    if not items:
        return ""
    return '<div class="toc">' + "\n".join(items) + "</div>"


# 按学习模块顺序排列目录（而非字母序）：根级总纲 → 模块0 → 1-3 → 4 → 5 → 6 → 参考
DIR_ORDER = {
    "_foundation": 0,          # 模块0 地基
    "card-payment": 1,         # 模块1 银行卡
    "epayment": 2,             # 模块2 电子支付
    "crossborder": 3,          # 模块3 跨境支付
    "stable-coin": 4,          # 模块4 稳定币
    "agentic-payment": 5,      # 模块5 Agentic
    "_topics": 6,              # 模块6 横向专题
    "reference": 9,            # 参考素材
}
# 根级文档的优先顺序（总纲类排最前）
ROOT_FILE_ORDER = {
    "INDEX.md": 0, "学习路径总纲.md": 1, "支付概念全景地图.md": 2,
    "支付范式资金流对比.md": 3, "支付牌照术语速查.md": 4, "CLAUDE.md": 5,
}


def build_tree(active_rel=""):
    """左侧目录树：默认只展示一级；目录用 <details> 折叠，点击展开二/三级。
    当前打开文件所在的目录链路自动展开(open)；当前文档内联展开其章节(二级导航)。"""
    # 当前 active 文件所在的各级目录前缀(用于 auto-open)
    active_dirs = set()
    if active_rel:
        parts = active_rel.split("/")[:-1]
        acc = ""
        for p in parts:
            acc = os.path.join(acc, p) if acc else p
            active_dirs.add(acc)

    def walk(d, depth, rel):
        try:
            entries = os.listdir(d)
        except OSError:
            return ""
        dirs = [e for e in entries if os.path.isdir(os.path.join(d, e)) and e not in IGNORE and not e.startswith(".")]
        files = [e for e in entries if os.path.isfile(os.path.join(d, e)) and e not in IGNORE and not e.startswith(".") and e.lower() not in NAV_HIDE]
        dirs.sort(key=lambda e: (DIR_ORDER.get(e, 8), e))
        if depth == 0:
            files.sort(key=lambda e: (ROOT_FILE_ORDER.get(e, 5), e))
        else:
            files.sort()
        out = []
        # 同级先列文件，再列子目录(可折叠)
        for e in files:
            if not (e.endswith(".md") or e.endswith(".html")):
                continue
            r = os.path.join(rel, e) if rel else e
            active = (r == active_rel)
            cls = "doc active" if active else "doc"
            ico = "📄" if e.endswith(".md") else "🌐"
            out.append(f'<a class="{cls}" href="/{urllib.parse.quote(r)}">{ico} {html.escape(e)}</a>')
            if active and e.endswith(".md"):
                toc = extract_toc(os.path.join(d, e))
                if toc:
                    out.append(toc)
        for e in dirs:
            r = os.path.join(rel, e) if rel else e
            opened = " open" if r in active_dirs else ""
            kids = walk(os.path.join(d, e), depth + 1, r)
            out.append(
                f'<details{opened}><summary>📁 {html.escape(e)}/</summary>'
                f'<div class="kids">{kids}</div></details>'
            )
        return "\n".join(out)
    return walk(ROOT, 0, "")


def crumb(rel):
    parts = [p for p in rel.split("/") if p]
    out = ['<div class="crumb"><a href="/">🏠 root</a>']
    acc = ""
    for p in parts:
        acc = f"{acc}/{p}" if acc else p
        out.append(f' / <a href="/{urllib.parse.quote(acc)}">{html.escape(p)}</a>')
    out.append("</div>")
    return "".join(out)


class H(BaseHTTPRequestHandler):
    def log_message(self, *a):
        pass

    def do_GET(self):
        rel = urllib.parse.unquote(self.path.lstrip("/").split("?")[0])
        path = os.path.abspath(os.path.join(ROOT, rel))
        if not path.startswith(ROOT):
            self.send_error(403); return
        if os.path.isdir(path):
            self._dir(path, rel); return
        if os.path.isfile(path):
            if path.endswith(".md"):
                self._md(path, rel)
            else:
                self._raw(path)
            return
        self.send_error(404)

    def _send_html(self, body):
        b = body.encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(b)))
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.end_headers()
        self.wfile.write(b)

    def _md(self, path, rel):
        with open(path, encoding="utf-8") as f:
            src = f.read()
        content = f'<pre id="rawmd" style="display:none">{html.escape(src)}</pre>'
        self._send_html(PAGE_TMPL.format(title=os.path.basename(path), tree=build_tree(rel),
                                         crumb=crumb(rel), content=content))

    def _dir(self, path, rel):
        entries = sorted(os.listdir(path))
        items = []
        for e in entries:
            if e in IGNORE or e.startswith("."):
                continue
            full = os.path.join(path, e)
            r = os.path.join(rel, e) if rel else e
            if os.path.isdir(full):
                items.append(f'<a href="/{urllib.parse.quote(r)}/"><span>📁 {html.escape(e)}/</span><span class="sz">dir</span></a>')
            else:
                sz = human(os.path.getsize(full))
                items.append(f'<a href="/{urllib.parse.quote(r)}"><span>📄 {html.escape(e)}</span><span class="sz">{sz}</span></a>')
        disp = html.escape(rel) if rel else "payment（支付研究主目录）"
        content = f'<h1>📂 {disp}</h1><div class="flist">' + "\n".join(items) + "</div>"
        self._send_html(PAGE_TMPL.format(title=rel or "payment", tree=build_tree(),
                                         crumb=crumb(rel), content=content))

    def _raw(self, path):
        ctype = mimetypes.guess_type(path)[0] or "application/octet-stream"
        with open(path, "rb") as f:
            data = f.read()
        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.end_headers()
        self.wfile.write(data)


if __name__ == "__main__":
    print(f"支付研究浏览服务: http://127.0.0.1:{PORT}/  (Ctrl+C 停止)")
    ThreadingHTTPServer(("127.0.0.1", PORT), H).serve_forever()
