#!/usr/bin/env python3
"""轻量级浏览服务：目录浏览 + Markdown 渲染成 HTML + 图片/HTML 直接预览。"""
import html
import os
import urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler

import markdown

ROOT = os.path.dirname(os.path.abspath(__file__))

PAGE = """<!DOCTYPE html>
<html lang="zh"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<style>
  body {{ max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem;
    font-family: -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
    line-height: 1.7; color: #24292f; }}
  a {{ color: #0969da; text-decoration: none; }}
  a:hover {{ text-decoration: underline; }}
  pre {{ background: #f6f8fa; padding: 1rem; border-radius: 6px; overflow:auto; }}
  code {{ background: #f6f8fa; padding: .15em .35em; border-radius: 4px; font-size: 90%; }}
  pre code {{ background: none; padding: 0; }}
  table {{ border-collapse: collapse; }}
  th, td {{ border: 1px solid #d0d7de; padding: .4rem .7rem; }}
  blockquote {{ border-left: 3px solid #d0d7de; color:#57606a; margin:0; padding:0 1rem; }}
  img {{ max-width: 100%; }}
  .nav {{ font-size: .9rem; color:#57606a; margin-bottom: 1.5rem;
    border-bottom: 1px solid #eaecef; padding-bottom: .8rem; }}
  ul.dir {{ list-style: none; padding-left: 0; }}
  ul.dir li {{ padding: .2rem 0; }}
  .ico {{ display:inline-block; width:1.4em; }}
</style></head><body>
<div class="nav">📁 <a href="/">根目录</a>{crumbs}</div>
{body}
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  // python-markdown 把 ```mermaid 渲染成 <pre><code class="language-mermaid">，转成 mermaid 容器
  document.querySelectorAll('code.language-mermaid').forEach((c) => {{
    const d = document.createElement('div');
    d.className = 'mermaid';
    d.textContent = c.textContent;
    c.closest('pre').replaceWith(d);
  }});
  mermaid.initialize({{ startOnLoad: true, theme: 'default' }});
</script>
</body></html>"""


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
            title = os.path.basename(fs)
            self._send_html(PAGE.format(title=html.escape(title),
                                        crumbs=self._crumbs(path), body=rendered))
            return

        # 目录列表（自定义，带图标和返回链接）
        if os.path.isdir(fs):
            entries = sorted(os.listdir(fs),
                             key=lambda n: (not os.path.isdir(os.path.join(fs, n)), n.lower()))
            items = []
            for name in entries:
                if name.startswith("."):
                    continue
                full = os.path.join(fs, name)
                isdir = os.path.isdir(full)
                href = urllib.parse.quote(os.path.join(path, name))
                ico = "📁" if isdir else _ico(name)
                label = name + ("/" if isdir else "")
                items.append(f'<li><span class="ico">{ico}</span>'
                             f'<a href="{href}">{html.escape(label)}</a></li>')
            body = f"<h2>{html.escape(path)}</h2><ul class='dir'>" + "".join(items) + "</ul>"
            self._send_html(PAGE.format(title=html.escape(path),
                                        crumbs=self._crumbs(path), body=body))
            return

        # 其他文件（图片、html、pptx 等）交给默认处理（直接预览或下载）
        super().do_GET()


def _ico(name):
    n = name.lower()
    if n.endswith((".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp")):
        return "🖼️"
    if n.endswith((".html", ".htm")):
        return "🌐"
    if n.endswith(".pptx"):
        return "📊"
    if n.endswith((".md", ".markdown")):
        return "📝"
    return "📄"


if __name__ == "__main__":
    import sys
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8911
    HTTPServer(("127.0.0.1", port), Handler).serve_forever()
