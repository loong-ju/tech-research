# Agentic Commerce 协议全景与发展趋势 — 演示文稿总结

- **文件名**：Agentic_Commerce_Overview_总结.md
- **主题**：Agentic Commerce（代理式商务）协议全景与发展趋势 —「从碎片化协议竞争到标准收敛与规模化部署」
- **总页数**：20 页（slide_01 — slide_20）
- **实质内容页数**：约 17 页为实质技术/数据内容；slide_01 为封面、slide_20 为收尾页、slide_18/19 偏行动建议与速查表（仍含信息）。

## 整体概要

这份 PPT 系统梳理了「Agentic Commerce」这一新兴商业形态：由 AI Agent 代替人类消费者完成商品发现、比较、谈判与交易。全篇从市场规模（2030 年预测 3–5 万亿美元）切入，定义了 Agent 交易的 8 个生命周期阶段，并给出一套四层协议栈架构（Agent 交互层 → 商业流程层 → 支付层 → 信任层）。重点对比了各层主流协议（MCP、A2A、ACP、UCP、x402、AP2 等）及其活跃度，盘点了三大卡组织（Visa/Mastercard/Amex）、稳定币轨道与各大 AI/互联网公司（OpenAI、Google、Anthropic、Amazon、Shopify、Meta、Stripe 等）的布局。核心结论是：2026 Q1 行业已从「协议竞争」进入「标准收敛 + 规模化部署」阶段，UCP 正成为事实上的商业流程标准，「信任 > 智能」成为卡组织共识，最终格局不是单一协议胜出，而是多层互补、按需组合的协议线。

---

## 第1页：封面 — Agentic Commerce 协议全景与发展趋势

- 封面页，副标题「从碎片化协议竞争到标准收敛与规模化部署」。
- 四个关键数据卡片：
  - **$3-5T**：2030 年市场规模（McKinsey 预测）
  - **9 亿**：ChatGPT 周活（2026 Q3）
  - **150+**：A2A 采纳组织（Linux Foundation）
  - **100 万+**：Shopify UCP 商户（默认启用）
- 日期标注约为 2026 年 4 月。

## 第2页：什么是 Agentic Commerce？

- 定义：AI Agent 代替消费者自主完成商品发现、比较、谈判和交易的新型商业模式。
- 用对照表区分「传统电商」与「Agentic Commerce」五个维度：
  - **决策主体**：人类消费者 → AI Agent 代理决策
  - **交互方式**：搜索→浏览→点击 → 自然语言→Agent 自动执行
  - **个性化**：基于历史数据推荐 → 实时理解需求，端到端完成
  - **支付**：人类手动完成 → Agent 令牌化自动支付
  - **商家优化**：SEO/广告投放 → 结构化数据 + API 可发现性

## 第3页：市场规模与关键数据

- 柱状图「Agentic Commerce Market Forecast」（单位：万亿美元）：
  - 2025：$0.05T；2026(est.) $0.3T；2027(est.) $0.8T；2028 $1.5T；2030 $4.0T
  - 标注 McKinsey 预测 $3-5T；Gartner 预测「15% 日常采购由 AI Agent 完成」。
- 底部四个指标卡：
  - **4.4x**：AI 推荐转化率 vs 传统搜索
  - **11x**：Shopify AI 订单同比增长
  - **805%**：Amazon 黑五 AI 流量增长
  - **75%**：零售商计划实施代理商务

## 第4页：一笔 Agent 交易的完整生命周期

- 「Agent Transaction: 8 Stages」八阶段流程图，每阶段标注所用协议与覆盖强度：
  1. **Intent Understanding（意图理解）** — LLM — [Strong]
  2. **Service Discovery（服务发现）** — A2A+UCP — [Strong]
  3. **Search & Compare（搜索比较）** — MCP+UCP — [Strong]
  4. **Negotiate & Order（谈判下单）** — UCP+ACP — [Strong]
  5. **Payment Execution（支付执行）** — AP2+x402 / Visa·MC — [Strong]
  6. **Fulfillment & Logistics（履约物流）** — UCP Ext — [Weak]
  7. **After-Sales Service（售后服务）** — A2A+UCP — [Weak]
  8. **Memory & Optimize（记忆优化）** — None — [Gap]
- 核心结论：现有协议集中覆盖「意图→支付」（阶段1-5 充分），而「履约→售后→记忆」（阶段6-8）几乎是协议空白区。

## 第5页：协议全景 — 四层架构（Agentic Commerce Protocol Stack）

- 自上而下四层：
  - **Agent Interaction Layer（Agent 交互层）**：MCP（Anthropic）— 10,000+ Servers；A2A（Google）— 150+ Orgs, v1.0
  - **Commerce Flow Layer（商业流程层）**：UCP（Shopify+Google）— 1M+ 商户，v2026-04-08；ACP（OpenAI+Stripe）— Meta/Affirm/PayPal
  - **Payment: Card Networks（支付-卡网络）**：Visa IC Connect / MC Verifiable Intent；Amex ACE / EMVCo SRC 1.5
  - **Payment: Stablecoin（支付-稳定币）**：x402 Foundation — 7,500M txns/mo；Stripe MPP + Tempo Blockchain
  - **Trust Layer（信任层，横跨底部）**：MC Verifiable Intent | Visa TAP→IC Connect | Amex ACE | World AgentKit | Trulioo DAP

## 第6页：协议发展时间线（2024.11 — 2026.04）

- 时间线按四类协议着色：Agent 交互层 / 商业流程层 / 支付网络 / 新兴标准。关键节点：
  - 2024.11 MCP（Anthropic）
  - 2025.04 A2A（Google）；Visa TAP / MC Agent Pay
  - 2025.09 ACP（OpenAI+Stripe）；AP2（Google）
  - 2026.01 UCP（Shopify+Google）
  - 2026.03 A2A v1.0（150+ orgs）；Stripe MPP / Tempo；MC Verifiable Intent
  - 2026.04 x402 Foundation；Visa IC Connect；Amex ACE
- 关键转折：2026 Q1 从「协议竞争」进入「标准收敛 + 规模化部署」。

## 第7页：Agent 交互层 — MCP + A2A

- **MCP — Model Context Protocol（Anthropic）**：定位「AI 的 USB-C」，Agent 与工具的标准化接口。
  - 10,000+ 活跃 Server；三大原语 Tools / Resources / Prompts；已被 OpenAI、Google、Microsoft 采纳。
  - SEP-2243：HTTP 标准化（CDN 可直接路由）；Skills Over MCP IG 成立（Anthropic/Google/AWS）；治理由 Linux Foundation (AAIF)。
- **A2A — Agent-to-Agent Protocol（Google）**：不同平台 Agent 之间的发现与协作协议。
  - 150+ 组织采用 | 23,221 GitHub Stars；v1.0.0 正式版（2026.03.12）；Agent Card 发现 + 8 态任务状态机；6 个官方 SDK（Python/JS/Java/Go/C#/Rust）；Custom Protocol Bindings（WebSocket/MQTT 扩展）；治理 Linux Foundation。
- 关系定位：MCP = Agent↔Tool 连接；A2A = Agent↔Agent 协作；**互补而非竞争**。

## 第8页：商业流程层 — ACP vs UCP

- **ACP（Agentic Commerce Protocol，Stripe + OpenAI）**：
  - ChatGPT Instant Checkout（用户采纳待验证）；CLA 签署方 Meta、Affirm、PayPal/Braintree、nekuda.ai；TSC 治理正式化（周四例会）；Delegate Payment API + Allowance 约束；Stripe 强绑定→Braintree 参与中；Shoptalk 2026 上 Meta 演示 Facebook 结账。
- **UCP（Universal Commerce Protocol，Shopify + Google）**：
  - 100 万+ Shopify 商户默认启用；v2026-04-08 大版本（20+ 新功能）；ECaP 嵌入式购物车协议（iframe）；Cart + Catalog + Get Order 能力；支付中立（不绑定任何 PSP）；合作方 Walmart、Target、Etsy、Wayfair。
- 趋势判断：UCP 正在成为事实上的商业流程标准 — 覆盖面（100万+商户）和技术完整度（ECaP/Cart/Catalog）均超过 ACP。

## 第9页：三大卡网络全部入场（Three Major Card Networks）

- **Visa**：IC Connect（network-agnostic）；175B+ tokens globally；Tempo validator node；MCP Server（production）；100+ partners。
- **Mastercard**：Verifiable Intent（开源）；收购 BVNK（$1.8B）；Agentic Tokens (MDES)；L1-L4 KYA framework；Agent Suite Q2 2026。
- **American Express**：ACE Developer Toolkit；Agent Purchase Protection；Intent Intelligence；Dual authentication；2026 年 4 月 14 日发布。
- 核心共识：「**信任 > 智能**」— 三大卡网络高管不约而同将信任（而非速度或智能）定位为代理商务的决定性因素。

## 第10页：双轨支付 — 卡网络 + 稳定币加速融合（Dual-Rail Payment Architecture）

- 架构：顶部 **AI Agent**，分流到两条轨道，下游汇入 **Merchants / Service Providers**。
  - **Card Network Rail（卡网络轨道）**：Visa IC Connect / MC Agent Pay / Amex ACE；ACP / UCP / AP2；适用高价值交易 / 消费者保护。
  - **Stablecoin Rail（稳定币轨道）**：x402 / Stripe MPP / Tempo；USDC / KlarnaUSD；适用微支付 / Agent 间支付 / 跨境。
  - 两条轨道之间由 **Stripe Bridge** 互通。
- 清算速度对比：卡网络 T+1~2；稳定币 <2 秒。

## 第11页：协议活跃度排名（2026 年 4 月）

- 双指标横向条形图：深色 = Commits (45 天)，浅色 = GitHub Stars。
  - **x402**：48 commits / 5,950 stars（最活跃）
  - **UCP**：20 / 2,625
  - **MCP**：28 / 7,824
  - **A2A**：17 / 23,221（Stars 最高）
  - **ACP**：13 / 1,339
  - **NLWeb**：6 / 6,178
  - **AP2**：1 / —
  - **TAP**：— / 145
- 注解：x402 最活跃（多链 + upto scheme）；UCP 密集破坏性变更（版本切割中）；AP2 / TAP 停滞（被边缘化）。

## 第12页：Stripe — 唯一的全赛道玩家

- **传统轨道**：ACP（与 OpenAI 联合）；Agentic Commerce Suite；Agent Network Token（Visa + MC + Affirm + Klarna）；Microsoft Copilot Checkout。
- **链上轨道**：Tempo 区块链（与 Paradigm 孵化）；MPP（Machine Payments Protocol）；x402 Foundation 创始成员；KlarnaUSD 在 Tempo 发行。
- **入驻品牌**：URBN / Coach / Kate Spade；Etsy / Ashley Furniture；Revolve / Nectar / Halara；Abt Electronics；Meta ACP 演示；Sephora ChatGPT 集成。
- 定位：首个同时支持「法币 + 稳定币 + BNPL」的支付平台 — 用 Shared Payment Tokens (SPT) 统一所有轨道。

## 第13页：AI 公司格局

- **OpenAI / ChatGPT**：周活 9 亿 | 付费 5000 万；Instant Checkout 遇挫 → 转向产品研究；第三方应用集成爆发（DoorDash/Uber/Target…）；ACP 生态（Meta/Affirm/PayPal 加入）。
- **Google**：最完整协议栈（A2A + AP2 + UCP）；AI Mode Shopping（虚拟试穿/Agent 结账）；Mastercard Verifiable Intent 合作方；UCP 合作方（Walmart/Target/Etsy/Wayfair）。
- **Anthropic**：MCP 创始方（10,000+ Server）；投资 Sapiom（AI Agent 金融基础设施）；未推出面向消费者的商务功能；定位基础设施层参与。
- **Perplexity AI**：Comet 浏览器 + Buy with Pro；与 Amazon 法律纠纷仍在进行；2026 年商务功能无重大更新；面临 NYT 等版权诉讼。

## 第14页：头部互联网公司

- **Amazon**：Buy for Me（AI 在第三方网站结账）；Alexa+ 覆盖 6 亿+ 设备；Rufus 黑五转化率 +100%；"Transformer" 智能手机在研；AWS AI Agent Marketplace。
- **Shopify**：Agentic Storefronts 默认启用；AI 订单增长 11 倍；UCP 联合发起方；Tinker App（AI 建站）；总裁称「一生一遇的变革」。
- **Meta**：收购 Moltbook → "Agent Graph"；ACP Facebook 结账演示；签署 ACP 企业 CLA；CapEx $1,150–1,350 亿；商业代理↔消费者代理谈判。

## 第15页：新兴参与者与基础设施

- **x402 Foundation**（Coinbase / Cloudflare / Stripe）：HTTP 原生链上支付标准；20+ 成员（含三大卡网络/三大云/Shopify）；7,500 万笔/月 | $2,424 万/月；多链 Base/Polygon/Arbitrum/Solana…。
- **Agent 身份信任层**：MC Verifiable Intent（加密审计追踪）；World AgentKit（虹膜验证 + x402）；Trulioo DAP（5 步 KYA 框架）；Amex ACE（Agent 购买保护）；EMVCo SRC 1.5（Passkeys 支持）。
- **Startup 生态**：Sapiom（$15M Seed，Anthropic 投资，AI Agent 金融基础设施）；Lava（$5.8M，Agent 原生数字钱包）；Alchemy AgentPay（跨协议互操作翻译层）；Lucid Agents SDK（同时支持 AP2/A2A/x402）。

## 第16页：OpenAI 购物策略重大转型

- **Before (2025.09) — Instant Checkout（"ChatGPT 直接卖货"）**：ChatGPT 内嵌结账；用户不离开对话界面；Stripe 独占支付。
  - 结果：用户实际上并未使用 ChatGPT 购物；电商引流流量极少。
- **After (2026.04) — 产品研究 + 应用集成（"ChatGPT 作为超级应用入口"）**：产品发现和推荐工具；商户在 ChatGPT 内建应用；DoorDash/Uber/Target/Sephora…。
  - 验证：Agentic Commerce 的落地路径是「AI 辅助发现 → 引导至商户完成交易」。

## 第17页：五大核心趋势

1. **信任 > 智能**：三大卡网络高管不约而同将信任定位为重要关口（决定性因素）。
2. **双轨支付融合**：Visa Tempo 节点 + MC BVNK 收购 + Stripe MPP + x402 Foundation。
3. **UCP 正在胜出**：100万+商户 + ECaP + Walmart/Target/Etsy/Wayfair，覆盖面 > ACP。
4. **开放标准化竞赛**：Linux Foundation 托管 MCP + A2A + x402；GitHub 开源 MC Verifiable Intent。
5. **消费者采纳是下一个战场**：OpenAI Instant Checkout 遇挫表明技术已准备好，但用户行为改变需要时间。

## 第18页：构建者行动指南

- 三步走建议：
  - **Step 1：务实起步** — MCP Server（暴露商业工具）+ Agent 框架（AgentCore / LangChain）+ Stripe（横跨三条赛道）。
  - **Step 2：接入协议栈** — UCP（商户发现 + ECaP）+ A2A（Agent 间协作）+ Visa IC / MC Agent Pay（卡网络令牌）。
  - **Step 3：扩展覆盖** — x402（微支付 + 链上场景）+ Trust Layer（KYA 框架）+ Multi-Agent（跨平台协作）。
- 总原则：分层选型，而非选边站队 — 基础设施中立性是最大的对冲策略。

## 第19页：协议对比总览（速查表）

- 以 8 个协议（MCP / A2A / ACP / UCP / x402 / Visa IC / MC Agent Pay / Amex ACE）× 7 个维度对照：
  - **层次**：Agent-Tool / Agent-Agent / 商业流程 / 商业流程 / 链上支付 / 支付网络 ×3。
  - **发起方**：Anthropic / Google / OpenAI+Stripe / Shopify+Google / Coinbase / Visa / Mastercard / Amex。
  - **状态**：成熟 / v1.0 生产 / 上线中 / 默认启用 / Foundation / 试点中 / Q2推出 / 刚发布。
  - **规模**：10K+ Server / 150+ Org / +Meta·Affirm / 1M+ 商户 / 7500万·月 / 6 试点 / 9+ 伙伴 / 新。
  - **开放**：LF / LF / Apache / Apache / LF / 部分 / 开源规范 / 待定。
  - **Agent 身份**：无 / Agent Card / 无 / 无 / 钱包签名 / IC Connect / L1-L4 验证 / ACE 认证。
  - **人类确认**：无 / 条件式 / escalation / 强制 / 无 / 依赖商户 / L3 生物识别 / 意图智能。

## 第20页：收尾页 — Agentic Commerce 的终局

- 收尾观点页：「Agentic Commerce 的终局，不是某一个协议胜出，而是一套多层互补、按需组合的协议线。」
- 从「协议竞争 + 概念验证」到「标准收敛 + 规模化部署」；基础设施已就位 — 下一个结场是「消费者采纳」（真正落地）。
- 底部列出涉及的协议名称（MCP/A2A/UCP/ACP/x402/Visa/Mastercard/Stripe 等）。

---

## 全文要点提炼

1. **范式转变**：Agentic Commerce 把交易决策主体从人类转移到 AI Agent，交互由「搜索→点击」变为「自然语言→Agent 自动执行+令牌化支付」，商家优化重点从 SEO/广告转向结构化数据与 API 可发现性。

2. **巨大市场空间**：Agent 中介的商务规模预计从 2025 年 $0.05T 增长到 2030 年 $4T（McKinsey $3-5T），Gartner 预计届时 15% 日常采购由 AI Agent 完成；早期信号强劲（Shopify AI 订单 11x、Amazon 黑五 AI 流量 +805%）。

3. **四层协议栈成型**：Agent 交互层（MCP/A2A）→ 商业流程层（UCP/ACP）→ 支付层（卡网络 + 稳定币双轨）→ 横向信任层，是理解整个生态的主框架。

4. **协议覆盖不均**：协议在「意图理解→支付执行」（阶段1-5）覆盖充分，但「履约→售后→记忆」（阶段6-8）薄弱甚至空白，是下一阶段的机会与缺口。

5. **UCP 正成为商业流程事实标准**：凭借 100 万+ Shopify 商户默认启用、支付中立、ECaP/Cart/Catalog 技术完整度，UCP 在覆盖面与功能上已超过 OpenAI+Stripe 的 ACP。

6. **「信任 > 智能」成为卡组织共识**：Visa（IC Connect）、Mastercard（Verifiable Intent + 收购 BVNK $1.8B）、Amex（ACE）三大卡网络全部入场，并一致把信任/身份验证（KYA、生物识别、Agent 身份）而非速度或智能作为决定性因素。

7. **双轨支付加速融合**：卡网络轨道（高价值、消费者保护、T+1~2）与稳定币轨道（微支付、Agent 间、跨境、<2 秒），通过 Stripe Bridge 等互通；x402 是最活跃的链上支付标准（48 commits/月，多链）。

8. **Stripe 是唯一全赛道玩家**：同时覆盖传统轨道（ACP/Agent Network Token/Copilot Checkout）与链上轨道（Tempo/MPP/x402/KlarnaUSD），用 Shared Payment Tokens (SPT) 统一法币+稳定币+BNPL。

9. **OpenAI 战略转向**：Instant Checkout（直接卖货）遇挫后转向「产品研究 + 应用集成」，把 ChatGPT 定位为超级应用入口，验证了「AI 辅助发现→引导商户成交」才是务实落地路径。

10. **行业进入新阶段，终局是协议线而非单一赢家**：2026 Q1 已从「协议竞争」转入「标准收敛 + 规模化部署」；最终格局是多层互补、按需组合的协议组合，对构建者的建议是分层选型、保持基础设施中立，下一个决胜战场是消费者采纳。
