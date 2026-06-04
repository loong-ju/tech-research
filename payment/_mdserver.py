#!/usr/bin/env python3
"""轻量级浏览服务：左侧全局目录树导航 + Markdown 渲染(含Mermaid) + 图片/HTML/PPT 预览。"""
import html
import os
import urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler

import markdown

ROOT = os.path.dirname(os.path.abspath(__file__))
IGNORE = {".git", ".claude", ".playwright-mcp", "__pycache__", ".DS_Store", "node_modules"}

PAGE = """<!DOCTYPE html>
<html lang="zh"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<style>
  * {{ box-sizing: border-box; }}
  body {{ margin: 0; font-family: -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
    color: #24292f; display: flex; min-height: 100vh; }}
  a {{ color: #0969da; text-decoration: none; }}
  a:hover {{ text-decoration: underline; }}

  /* 左侧导航 */
  aside {{ width: 300px; min-width: 300px; background: #f6f8fa; border-right: 1px solid #d8dee4;
    height: 100vh; overflow-y: auto; position: sticky; top: 0; padding: 1rem .6rem 2rem; }}
  aside .brand {{ font-weight: 700; font-size: 1rem; padding: .3rem .6rem .7rem;
    color: #1f2328; border-bottom: 1px solid #e1e4e8; margin-bottom: .5rem; }}
  aside .brand a {{ color: #1f2328; }}
  .tree, .tree ul {{ list-style: none; margin: 0; padding: 0; }}
  .tree ul {{ padding-left: .85rem; border-left: 1px dashed #d0d7de; margin-left: .5rem; }}
  .tree li {{ padding: 1px 0; }}
  .tree .row {{ display: flex; align-items: center; padding: 2px 6px; border-radius: 5px;
    font-size: .86rem; white-space: nowrap; }}
  .tree .row:hover {{ background: #eaeef2; }}
  .tree .row.active {{ background: #ddf4ff; font-weight: 600; }}
  .tree .ico {{ display: inline-block; width: 1.3em; flex: none; }}
  .tree a {{ color: #24292f; overflow: hidden; text-overflow: ellipsis; }}
  .tree summary {{ cursor: pointer; list-style: none; }}
  .tree summary::-webkit-details-marker {{ display: none; }}
  .tree details > summary .tw {{ display:inline-block; width:1em; color:#57606a; transition: transform .1s; }}
  .tree details[open] > summary .tw {{ transform: rotate(90deg); }}

  /* 右侧内容 */
  main {{ flex: 1; min-width: 0; padding: 1.6rem 2.4rem 5rem; max-width: 920px; }}
  .crumbs {{ font-size: .9rem; color:#57606a; margin-bottom: 1.4rem;
    border-bottom: 1px solid #eaecef; padding-bottom: .7rem; }}
  pre {{ background: #f6f8fa; padding: 1rem; border-radius: 6px; overflow:auto; }}
  code {{ background: #f6f8fa; padding: .15em .35em; border-radius: 4px; font-size: 90%; }}
  pre code {{ background: none; padding: 0; }}
  table {{ border-collapse: collapse; }}
  th, td {{ border: 1px solid #d0d7de; padding: .4rem .7rem; }}
  blockquote {{ border-left: 3px solid #d0d7de; color:#57606a; margin:0; padding:0 1rem; }}
  img {{ max-width: 100%; }}
  ul.dir {{ list-style: none; padding-left: 0; }}
  ul.dir li {{ padding: .2rem 0; }}
  ul.dir .ico {{ display:inline-block; width:1.4em; }}
  .mermaid {{ background:#fff; }}
</style></head><body>
<aside>
  <div class="brand">💳 <a href="/">支付研究主目录</a></div>
  {tree}
</aside>
<main>
  <div class="crumbs">📁 <a href="/">根目录</a>{crumbs}</div>
  {body}
</main>
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  document.querySelectorAll('code.language-mermaid').forEach((c) => {{
    const d = document.createElement('div');
    d.className = 'mermaid';
    d.textContent = c.textContent;
    c.closest('pre').replaceWith(d);
  }});
  mermaid.initialize({{ startOnLoad: true, theme: 'default' }});
</script>
</body></html>"""


def _ico(name):
    n = name.lower()
    if n.endswith((".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp")):
        return "🖼️"
    if n.endswith((".html", ".htm")):
        return "🌐"
    if n.endswith((".pptx", ".ppt")):
        return "📊"
    if n.endswith((".pdf",)):
        return "📕"
    if n.endswith((".docx", ".doc")):
        return "📘"
    if n.endswith((".md", ".markdown")):
        return "📝"
    if n.endswith((".py", ".js")):
        return "📜"
    return "📄"


def build_tree(cur_rel):
    """构建左侧全局目录树。cur_rel: 当前页面相对路径(用于高亮+自动展开)。"""
    cur_norm = "/" + cur_rel.strip("/")

    def walk(abs_dir, rel_dir):
        try:
            names = sorted(os.listdir(abs_dir),
                           key=lambda n: (not os.path.isdir(os.path.join(abs_dir, n)), n.lower()))
        except OSError:
            return ""
        out = []
        for name in names:
            if name.startswith(".") or name in IGNORE:
                continue
            abs_p = os.path.join(abs_dir, name)
            rel_p = (rel_dir.rstrip("/") + "/" + name) if rel_dir != "/" else "/" + name
            href = urllib.parse.quote(rel_p)
            isdir = os.path.isdir(abs_p)
            if isdir:
                # 当前路径在此目录下 → 自动展开
                on_path = (cur_norm == rel_p) or cur_norm.startswith(rel_p + "/")
                opn = " open" if on_path else ""
                active = " active" if cur_norm == rel_p else ""
                children = walk(abs_p, rel_p)
                out.append(
                    f'<li><details{opn}><summary><span class="row{active}">'
                    f'<span class="tw">▶</span><span class="ico">📁</span>'
                    f'<a href="{href}">{html.escape(name)}</a></span></summary>'
                    f'<ul>{children}</ul></details></li>')
            else:
                active = " active" if cur_norm == rel_p else ""
                out.append(
                    f'<li><span class="row{active}"><span class="tw"></span>'
                    f'<span class="ico">{_ico(name)}</span>'
                    f'<a href="{href}">{html.escape(name)}</a></span></li>')
        return "".join(out)

    return f'<ul class="tree">{walk(ROOT, "/")}</ul>'


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def _send_html(self, text):
        data = text.encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _crumbs(self, relpath):
        parts, acc, out = [p for p in relpath.split("/") if p], "", ""
        for p in parts:
            acc += "/" + p
            out += f' / <a href="{urllib.parse.quote(acc)}">{html.escape(p)}</a>'
        return out

    def _render(self, path, title, body):
        self._send_html(PAGE.format(
            title=html.escape(title),
            tree=build_tree(path),
            crumbs=self._crumbs(path),
            body=body,
        ))

    def do_GET(self):
        path = urllib.parse.unquote(self.path.split("?", 1)[0])
        fs = os.path.normpath(os.path.join(ROOT, path.lstrip("/")))
        if not fs.startswith(ROOT):
            self.send_error(403)
            return

        # Markdown 渲染
        if os.path.isfile(fs) and fs.lower().endswith((".md", ".markdown")):
            with open(fs, encoding="utf-8") as f:
                rendered = markdown.markdown(
                    f.read(),
                    extensions=["fenced_code", "tables", "toc", "sane_lists"],
                )
            self._render(path, os.path.basename(fs), rendered)
            return

        # 目录列表
        if os.path.isdir(fs):
            entries = sorted(os.listdir(fs),
                             key=lambda n: (not os.path.isdir(os.path.join(fs, n)), n.lower()))
            items = []
            for name in entries:
                if name.startswith(".") or name in IGNORE:
                    continue
                isdir = os.path.isdir(os.path.join(fs, name))
                href = urllib.parse.quote(os.path.join(path, name))
                ico = "📁" if isdir else _ico(name)
                label = name + ("/" if isdir else "")
                items.append(f'<li><span class="ico">{ico}</span>'
                             f'<a href="{href}">{html.escape(label)}</a></li>')
            disp = path if path != "/" else "/ (根目录)"
            body = f"<h2>{html.escape(disp)}</h2><ul class='dir'>" + "".join(items) + "</ul>"
            self._render(path, disp, body)
            return

        # 其他文件（图片、html、pptx 等）交给默认处理（直接预览或下载）
        super().do_GET()


if __name__ == "__main__":
    import sys
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8911
    print(f"支付研究浏览服务: http://127.0.0.1:{port}  (Ctrl+C 停止)")
    HTTPServer(("127.0.0.1", port), Handler).serve_forever()
