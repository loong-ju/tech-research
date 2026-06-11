# CLAUDE.md — 支付研究主目录

> 这是我（用户）研究支付行业的主目录。本文件定义统一的研究规则、目录组织与浏览方式。
> Claude 在本目录下工作时，请遵循以下约定。

---

## 一、研究主题与三大维度

本目录按支付的研究维度组织，所有内容归入对应子目录。**传统支付维度已按"卡 / 电子支付 / 跨境"拆为三个一级目录**：

| 子目录 | 维度 | 内容 |
|---|---|---|
| `card-payment/` | **传统支付·银行卡** | 卡组织(Visa/MC/银联)四方模型、收单产业链(收单行/Processor/ISO/PayFac)、授权清算结算、拒付、发卡、HSM/支付密码学 |
| `epayment/` | **传统支付·电子支付** | 支付网关、第三方支付、钱包/二维码/聚合支付、电商支付业务场景(买家付/卖家收)、电子支付/收单企业画像(02c) |
| `crossborder/` | **传统支付·跨境** | 跨境支付四套管道、代理行电汇、SWIFT、各国清算系统(Fedwire/CHIPS/CHAPS/T2/CIPS)、外汇、跨境收款全链路、跨境贸易结算方式、跨境收款企业画像(03c) |
| `stable-coin/` | **稳定币** | USDC/USDT/PYUSD/RLUSD、链上跨境清算、稳定币合规、CBDC/mBridge 等 |
| `agentic-payment/` | **智能体支付** | AI Agent 支付协议(Google UCP/AP2、OpenAI×Stripe ACP、Amazon、Coinbase x402、Visa TAP、Mastercard Agent Pay)、agentic commerce、欺诈风控、相关素材与演示 |

> 🗂️ **跨模块通用文件放根目录**：如 `支付牌照术语速查.md`（牌照术语，被 epayment/crossborder 多处引用）、`支付范式资金流对比.md`、`支付概念全景地图.md`、`学习路径总纲.md`。模块0 地基在 `_foundation/`，横向专题(风控/合规/账务/NFR)在 `_topics/`。

**新建研究内容时**：先判断属于哪个维度，放入对应子目录；跨维度/跨模块的综合内容放主目录根。

---

## 二、研究方法论（重要 · 必须遵循）

### 1. 第一性原理讲解法
所有研究/讲解材料遵循第一性原理，对每个概念/技术/系统回答这条链：
1. **世界上本来存在什么问题**（痛点的根源，从最底层讲起）
2. **如果没有它会怎样**（反证它存在的必要性）
3. **它用什么机制解决**（核心原理，而非术语堆砌）
4. **解决得怎样、还剩什么问题**（边界与遗留痛点，引出下一个技术）

> 目标是**自我学习、建立心智模型**，不是单纯堆砌"是什么"。概念先行、由浅入深、配真实世界案例。讲清楚每个东西"具体解决什么问题、关键点是什么"。

### 1.5 文档组织范式：Top-Down 主线叙述（模块文档统一遵循）
学习模块文档（业务篇/技术篇）采用 **top-down 自顶向下、按"业务/概念逐层展开"的主线叙述结构**，而非"一问一答"罗列：
- **主体 = 主线**：从"全景/是什么/解决什么问题"开始，逐层下钻到参与方→流程→机制→细节。章节标题用**概念名词**（如"四方模型与参与方""收单产业链""清结算分层"），不用"第一性追问 X：……？"这类问答式标题。
- **第一性内核仍在**：每个概念内部仍回答"解决什么问题/本质/各方关注/价值"，只是组织方式从"问答"改为"陈述+下钻"。
- **零散点收尾用问答**：确实难以编入主线的零碎追问/澄清，统一收到文档末尾的 **"## 附：常见追问（FAQ）"** 一节，用问答形式承载。
- **业务/技术分轨**：业务篇讲问题/参与方/角色/收益/护城河（技术只概要提及）；技术篇讲通用实现+AWS（`*-business.md` / `*-tech-aws.md`）。
- **图表用 Mermaid**（见第三节规范）。

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

### 5. 索引维护（重要）
本目录有内容索引 `INDEX.md`。**每次新增、删除、重命名、移动研究文件后，必须同步更新 `INDEX.md`**：
- 新增文件 → 在对应维度表格中加一行（文件名 + 类型 + 内容摘要），摘要应概括文件主题，不照抄标题
- 删除文件 → 删除对应行
- 跨维度移动 → 在新维度加行、旧维度删行
- 更新 `INDEX.md` 顶部的"最后更新"日期
- 若新增了顶层目录或维度，同步更新"目录结构总览"和 `CLAUDE.md` 第一节的维度表

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

### ⭐ 图表强制规范（重要）
**所有架构图、流程图、时序图、资金流图，一律使用 Mermaid 代码块书写**（` ```mermaid `），确保浏览时能渲染成图形。
- ❌ **禁止**用 ASCII 字符画（`┌──┐`、`│`、箭头拼接）画架构/流程——浏览器不渲染，只是纯文本。
- ✅ 流程/资金流用 `flowchart`，时序交互用 `sequenceDiagram`，分层/状态用对应 Mermaid 图类型。
- ✅ 简单的"列表式层级"或"对比表"仍可用 Markdown 表格/列表（这类不是"图"，无需 Mermaid）。
- 判断标准：**只要是"带框、带箭头、表达组件关系或流程"的图，就必须用 Mermaid**。
- 新建/修改任何 `.md` 时遵守此规范；遇到旧文件里的 ASCII 框图，顺手转成 Mermaid。
- ⚠️ **语法避坑（亲测会报 Syntax error）**：
  - **分号 `;` 是 Mermaid 语句分隔符**——Note/节点 label 文本里**禁用分号**（会被当作语句结束，截断后半截）。用顿号/逗号代替。
  - **flowchart 边标签 `-->|文字|` 里若含特殊字符（冒号 `:`、括号 `()（）`、分号）必须加引号**：写成 `-->|"文字(说明)"|`，否则报 Syntax error。（亲测踩坑：`-->|③ 结算:成员行净额|`、`-->|授权请求(每笔刷卡)|` 都报错，加引号即可）
  - 节点 label、Note 文本若含特殊字符（`;`、`:`、`#`、`"`、`()`嵌套），用 `"..."` 包裹 label；换行用 `<br/>`。
  - 写完含图的 md 后，最好在浏览器实际渲染一遍确认无 Syntax error（服务端 grep 检测不到 Mermaid 语法错，只有浏览器端能发现）。

### ⭐ Markdown 表格规范
- **表格前必须有空行**：表格上方的引导句（尤其 `📌 **加粗**（括号）：` 这类）与表格之间要空一行，否则表格会被当成段落文字、渲染不成表格。
- 可用 `curl 服务端URL | grep -c "<table>"` 验证表格是否正确渲染成 `<table>`。

---

## 四、当前内容索引

### card-payment/ — 传统支付·银行卡（模块1）
> `01-cards-business.md`（业务·四方模型/收单产业链/PayFac/推拉/电商收款）、`01-cards-tech-aws.md`（技术·ISO8583/收单系统/安全四件套+AWS）、`01c-hsm-payment-cryptography.md`（HSM/支付密码学）。

### epayment/ — 传统支付·电子支付（模块2）
> `02-epayment-business.md`（业务·网关/第三方支付/钱包/二维码/聚合，§4.2.2 做钱包牌照vsPCI）、`02-epayment-tech-aws.md`（技术+AWS）、`02b-ecommerce-payment.md`（**电商支付业务场景**：买家付方式/卖家收方式/即时支付/Amazon Pay×Stripe，经 deep-research 核查）、`02c-epayment-players/`（电子支付/收单企业画像，含 stripe.md）。

### crossborder/ — 传统支付·跨境（模块3）
> 以 `03-crossborder-business.md`（业务·总入口·四套管道骨架）为核心。配套：`03-crossborder-tech-aws.md`（技术·SWIFT/ISO20022/制裁筛查+AWS）、`03b-crossborder-collection-deepdive.md`（跨境收款七环节全链路+合规）、`03d-trade-settlement.md`（**跨境贸易模式与结算方式**：T/T/L-C/D-P/O-A+中国海关监管方式，经 deep-research 核查）、`03c-crossborder-players/`（企业画像，含 lianlian.md）。

### 根目录跨模块文件
> `支付牌照术语速查.md`（MTL/EMI/MSB 等牌照速查，被 epayment/crossborder 引用）、`支付范式资金流对比.md`、`支付概念全景地图.md`、`学习路径总纲.md`。

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
  ① 代理行电汇 — 靠中间银行接力打补丁（crossborder）
  ② 卡组织     — 自建封闭的全球网络当账本（card-payment）
  ③ 稳定币     — 造一个对所有人开放的全球账本（stable-coin）
  ④ CBDC/mBridge — 央行亲自造共享账本，用最硬的钱（stable-coin）
  ⑤ 智能体支付 — 在以上轨道之上，让 AI Agent 成为新的"付款主体"（agentic-payment）
```
差别只在两维度：① 账本由谁造（银行/私人/央行/Agent生态）② 记哪种等级的钱（借条/央行货币）。
决定谁胜出的往往不是技术，而是**信任与权力的分配**。
