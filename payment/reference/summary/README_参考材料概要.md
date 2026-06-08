# 📚 参考材料概要总结（reference/ PPTX）

> **用途**：`reference/` 目录下 4 份 PPTX 演示文稿的概要性总结，供后续研究使用。每份的逐页详细总结见同目录对应的 `*_总结.md`。
> **共同主题**：**支付 × Agentic AI / Agentic Commerce**——AI Agent 如何成为支付/商务的新主体，以及 AWS 在其中提供的能力。
> **生成方式**：文本型 PPT 由 python-pptx 提取文本后分析；图片型 PPT（整页 PNG）由视觉识别逐页读取。
> 最后更新：2026-06-08

---

## 一、四份材料速览

| 文件 | 页数 | 类型 | 一句话定位 | 详细总结 |
|---|---|---|---|---|
| **Payment_Agentic_AI.pptx** | 16 | 文本 | AWS FSI 售前**方法论框架/打法**：13大Workload→三分类→价值金字塔→进场决策树 | `Payment_Agentic_AI_总结.md` |
| **Agentic_AI_on_payment_PPT_v2_zh_new.pptx** | 93 | 文本+视频 | **单客户（iPaylinks）深度落地**：6大改造机会+20+真实案例+2个PoC+demo话术 | `Agentic_AI_on_payment_总结.md` |
| **Agentic_Commerce_Overview.pptx** | 20 | 整页图片 | **Agentic Commerce 协议全景与趋势**：四层协议栈、卡组织vs稳定币双轨、标准收敛 | `Agentic_Commerce_Overview_总结.md` |
| **AgenticPayment_介绍.pptx** | 31 | 整页图片 | **Agentic Payment 安全与协议**：付款人不在场问题、TAP/AP2/VCN/x402、AWS两条资金轨 | `AgenticPayment_介绍_总结.md` |

> 📊 **四份材料的关系**：
> - **Payment_Agentic_AI**（框架）+ **Agentic_AI_on_payment**（落地）= AWS 售前的"方法论 + 单客户实战"组合，偏 **AWS 服务与销售视角**。
> - **Agentic_Commerce_Overview**（协议全景）+ **AgenticPayment_介绍**（安全协议）= 行业协议与技术视角，偏 **协议生态与信任机制**。
> - 四份合起来，覆盖了 agentic payment 的"业务机会 + AWS 实现 + 协议生态 + 安全信任"四个面。

---

## 二、跨材料核心主题提炼

### 主题1：Agentic Commerce/Payment 的本质转变
- **交易主体从人转移到 AI Agent**：交互从"搜索→点击"变为"自然语言→Agent 自动执行+令牌化支付"。
- **付款人不在场问题**（AgenticPayment 介绍的核心论点）：传统支付安全靠"持牌机构+不暴露真实凭证+一个实时在场的人点确认"，Agentic Payment 只改了第三件——**付款人不在场了**，所有新协议都在重建"如何把人在场的授权变成机器可验证、可限额、可撤销的凭证"。
- **市场空间**：Agent 中介商务规模预计 2030 年达 $3-5 万亿（McKinsey），Gartner 预计 15% 日常采购由 AI Agent 完成。

### 主题2：协议生态（四层栈）
（来自 Agentic_Commerce_Overview）
1. **Agent 交互层**：MCP（Anthropic）、A2A（Google）
2. **商业流程层**：UCP（Google，Shopify 100万+商户默认）、ACP（OpenAI+Stripe，Apache-2 开源）
3. **支付层（双轨）**：
   - **卡网络轨道**：高价值、消费者保护、T+1~2（Visa Intelligent Commerce、Mastercard Agent Pay、Amex）
   - **稳定币轨道**：微支付、Agent 间、跨境、<2 秒（x402、USDC、Stripe Bridge）
4. **横向信任层**：KYA（Know Your Agent）、Agent 身份、生物识别、可验证凭证
> 关键判断：终局是"多层互补、按需组合的协议组合"，而非单一协议胜出；2026 Q1 已从"协议竞争"转入"标准收敛+规模化部署"。

### 主题3：主要玩家格局
- **Stripe**：唯一全赛道玩家——传统轨道（ACP/Agent Network Token）+ 链上轨道（x402/Privy/Tempo），用 Shared Payment Tokens(SPT) 统一法币+稳定币+BNPL。
- **Visa**：Intelligent Commerce 定位"Agent 经济的信任层"，上线 AWS Marketplace+AgentCore 蓝图。
- **Mastercard**：Agent Pay + Verifiable Intent + 收购 BVNK（$1.8B，稳定币）。
- **Coinbase**：x402（HTTP 402 原生微支付）+ CDP Wallet + x402 Bazaar MCP。
- **OpenAI**：Instant Checkout 遇挫后转向"产品研究+应用集成"，ChatGPT 定位超级应用入口。

### 主题4：AWS 的能力栈与立场
- **核心底座**：Amazon Bedrock（模型+Guardrails）+ **AgentCore**（Runtime/Identity/Gateway/Memory/Observability/**Payments**）。
- **AgentCore Payments 双轨**（Preview，与 Coinbase+Stripe 共建）：Coinbase 线（链上/USDC/x402）+ Stripe 线（链下/Privy/法币）。
- **支付专属合规**：Payment Cryptography（APC）+ Nitro Enclaves + KMS/CloudHSM + PrivateLink。
- **开发框架**：Strands Agents（开源 Python SDK）。
- **Self-build 标准栈**：Outgoing 边界（CloudFront+Lambda@Edge+WAF+x402 Facilitator+TAP/RFC9421 验签）。

### 主题5：落地方法论（AWS 售前打法）
- **13 大 Workload 框架**（5 层）：Revenue / Trust&Safety / Operation / Data / Productivity。
- **三分类切片**：Common 通用（入场）→ 支付提效（签单，22-90% ROI）→ 支付业务（绑战略，新轨道）。
- **关键架构原则**：**规则生产 ≠ 实时执行**——AI Agent 生成规则（分钟级、人审、PENDING），实时交易仍由传统引擎执行（<50ms、不调 LLM），因延迟/成本/合规三重约束。
- **Human-in-the-Loop 铁律**：AI 提效不替代风控判断，附推理说明+模拟结果，人工最终裁决。
- **落地节奏**：1-2 周 SaaS 体验 → 1-2 月 AgentCore PoC → 季度级绑协议进生产。

### 主题6：真实案例与 ROI（来自 93 页材料）
- Mastercard Brighterion：150B+ 笔/年评分、>99.999% 可用
- Visa Protect A2A：<250ms、99.99%、1000 TPS（A2A 2029 年达年 1 万亿笔、欺诈损失 $580 亿）
- Stripe：合规审查−26%、卡测试攻击侦测+64%、黑五 $400 亿六到七个九
- Ripple：排障 48h→40s（XRP Ledger 运维）
- KYB：处理−60-70%；Chargeback representment：30-60分→5分
- **XGBoost（单点行为）+ GNN（关系网络/团伙）互补反欺诈**——跨账号协同欺诈是规则引擎最大盲区。

---

## 三、对本支付研究项目的价值与衔接

| 这些材料覆盖的 | 对应本项目模块 |
|---|---|
| 支付业务链路（授权/清算/结算/争议时间轴）、13大Workload | 模块1（卡支付）、模块6（横向专题） |
| KYB/反欺诈/Chargeback 的 AI 改造 + AWS 架构 | 模块1技术篇（风控/商户管理）、模块6（风控合规） |
| Agentic Commerce 四层协议栈、UCP/ACP/AP2/x402/TAP | 模块5（Agentic Payment，agentic-payment/ 已有协议专题） |
| 卡网络 vs 稳定币双轨、Stripe Bridge、x402 | 模块4（稳定币）、模块5 |
| AWS AgentCore/Bedrock/Payment Cryptography | 各技术篇的 AWS 方案 |
| 付款人不在场/可验证凭证/Agent 身份 | 模块5 核心问题 |

> 💡 **后续研究用法**：
> 1. 写**模块5（Agentic Payment）**时，这 4 份是一手参考（协议格局、玩家、AWS 实现）。
> 2. 写**模块6（风控）**的 AI 部分时，93 页材料的 XGBoost+GNN、KYB Agent、Chargeback Agent 是现成案例。
> 3. 作为 **AWS 技术架构师**与支付公司交流时，Payment_Agentic_AI 的"13 Workload + 三分类 + 进场决策树"是直接可用的对话框架。
> 4. ⚠️ 这些是 AWS 售前材料，含销售视角和对 AWS 服务的倾向性，引用时注意区分"客观行业事实"与"AWS 立场/推荐"。

---

## 四、待补充/存疑

- 图片型 PPT（Overview/介绍）部分小字在 1920×1080 缩略下识别度有限，少数数据点（如具体金额、收购价）建议以原始 PPT 或公开新闻二次核实。
- 这些材料的数据时效集中在 2025 末-2026 初（re:Invent 2025），协议格局和玩家动态变化快，引用时注意时间戳。
- `reference/` 还有 `AgenticPayment_介绍.pptx`、`Agentic_Commerce_Overview.pptx` 等图片型材料，其原始 PPT 不纳入 git（见 `.gitignore`），但本 summary 已纳入版本控制。
