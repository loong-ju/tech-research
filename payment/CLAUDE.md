# CLAUDE.md — 支付研究主目录

> 这是我（用户）研究支付行业的主目录。本文件定义统一的研究规则、目录组织与浏览方式。
> Claude 在本目录下工作时，请遵循以下约定。

---

## 一、研究主题与三大维度

本目录按支付的三个研究维度组织，所有内容归入对应子目录：

| 子目录 | 维度 | 内容 |
|---|---|---|
| `traditional-payment/` | **传统支付** | 跨境支付、代理行电汇、卡组织(Visa/MC/银联)、SWIFT、各国清算系统(Fedwire/CHIPS/CHAPS/T2/CIPS)、外汇等 |
| `stable-coin/` | **稳定币** | USDC/USDT/PYUSD/RLUSD、链上跨境清算、稳定币合规、CBDC/mBridge 等 |
| `agentic-payment/` | **智能体支付** | AI Agent 支付协议(Google UCP/AP2、OpenAI×Stripe ACP、Amazon、Coinbase x402、Visa TAP、Mastercard Agent Pay)、agentic commerce、欺诈风控、相关素材与演示 |

**新建研究内容时**：先判断属于哪个维度，放入对应子目录；跨维度的综合内容可放主目录根。

---

## 二、研究方法论（重要 · 必须遵循）

### 1. 第一性原理讲解法
所有研究/讲解材料遵循第一性原理，对每个概念/技术/系统回答这条链：
1. **世界上本来存在什么问题**（痛点的根源，从最底层讲起）
2. **如果没有它会怎样**（反证它存在的必要性）
3. **它用什么机制解决**（核心原理，而非术语堆砌）
4. **解决得怎样、还剩什么问题**（边界与遗留痛点，引出下一个技术）

> 目标是**自我学习、建立心智模型**，不是单纯堆砌"是什么"。概念先行、由浅入深、配真实世界案例。讲清楚每个东西"具体解决什么问题、关键点是什么"。

### 2. 可信度标注约定
研究材料区分两类内容并显式标注：
- **📌 已核查·一手** — 经多源对抗式核查、引用权威一手来源（BIS/FSB/World Bank/央行/监管机构/公司官方/官网），句末标来源。
- **🔧 行业公知** — 成熟稳定的基础机制，教学性讲解，未逐条引用。
- **⚠️ 告诫** — 状态/风险提示（如"试点未上线""数据会随时间漂移""公司自述非独立核实"）。

**绝不编造数字或来源**。未核实的内容明确标注为"未独立核实"，不伪装成事实。

### 3. 深度研究流程
做深度研究时优先使用 deep-research 工作流（fan-out 检索 → 抓取 → 对抗式核查 → 带引用综合），区分"公司自述/新闻稿"与"独立核实"。

### 4. 知识库
回答问题时优先查阅个人知识库：`/Users/jxl/SynologyDrive/Workspace/8.wiki-llm/AI-Agent/index.md`

---

## 三、统一浏览方式（Web）

本目录配有轻量浏览服务 `_mdserver.py`：**目录浏览 + Markdown 渲染成 HTML + Mermaid 图渲染 + 图片/HTML/PPT 预览**。

**启动方式**（在 payment 目录下）：
```
python3 _mdserver.py          # 默认端口 8911
python3 _mdserver.py 8080     # 指定端口
```
然后浏览器打开 `http://127.0.0.1:8911`，即可统一浏览三个维度下的所有 `.md`（含 Mermaid 架构图）、`.html`、图片、PPT。

> 依赖：需安装 `markdown`（`pip3 install markdown`）。Mermaid 通过 CDN 加载，浏览时需联网。
> 新建 `.md` 研究材料若含架构图，直接用 ` ```mermaid ` 代码块书写，服务器会自动渲染成图形。

---

## 四、当前内容索引

### traditional-payment/ — 传统/跨境支付
- `跨境支付深度研究报告.md` — 带引用的完整研究报告（G20路线图、各清算系统、新兴技术、中国出海，附来源清单）
- `跨境支付学习笔记.md` — 第一性原理学习骨架（一条主线 + 四套管道对比 + 10道自测题）
- `跨境支付架构图.html` — 6张 Mermaid 可视化架构图（自包含网页）

### stable-coin/ — 稳定币
- `stablecoin_research.md` — 稳定币研究
- `stablecoin_cross_border_compliance.md` — 稳定币跨境合规
- `LEARNING_NOTES_小白到架构师.md` — 学习笔记

### agentic-payment/ — 智能体支付
- `agentic_commerce.md` — agentic commerce 主研究文档
- `agentcore-payment.md` — agentcore 支付
- `1.google_ucp/` ~ `10.fraud_risk_control/` — 各支付协议专题研究（Google UCP/AP2、OpenAI×Stripe ACP、Amazon PayForMe、Coinbase x402、Visa TAP、Mastercard Agent Pay、Cloudflare WebBot Auth、欺诈风控）
- `materials/` — PPT、PDF、DOCX 等素材
- `aws_ppt_presentation/` — AWS 演示(中文)
- `openclaw/` — openclaw 研究
- `_images/` — 散落截图归档

---

## 五、四套支付管道的统一心智模型（跨维度主线）

> 整个支付研究的第一性骨架——所有维度都在回答同一个原始难题：

```
地基公理：钱不会移动，移动的只是"账本上的数字"。支付 = 在共同信任的账本上改数字。
核心难题：跨境/跨主体，根本没有"同一个账本"。
四套管道 = 四种答案：
  ① 代理行电汇 — 靠中间银行接力打补丁（traditional-payment）
  ② 卡组织     — 自建封闭的全球网络当账本（traditional-payment）
  ③ 稳定币     — 造一个对所有人开放的全球账本（stable-coin）
  ④ CBDC/mBridge — 央行亲自造共享账本，用最硬的钱（stable-coin）
  ⑤ 智能体支付 — 在以上轨道之上，让 AI Agent 成为新的"付款主体"（agentic-payment）
```
差别只在两维度：① 账本由谁造（银行/私人/央行/Agent生态）② 记哪种等级的钱（借条/央行货币）。
决定谁胜出的往往不是技术，而是**信任与权力的分配**。
