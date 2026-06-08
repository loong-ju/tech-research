# Payment_Agentic_AI.pptx 内容总结

> **源文件**：`reference/Payment_Agentic_AI.pptx`（78KB）
> **主题**：Payment × Agentic AI 场景方案与落地路径（2026 AWS FSI，来源 re:Invent 2025 + Stripe/Visa/Mastercard/PayPal + AWS Agentic Commerce 立场文件）
> **总页数**：16 页（页脚标注 /20，实际 16 页）
> **整体概要**：这是一份面向 AWS FSI 售前团队的**支付×Agentic AI 完整 playbook**。从支付公司的"13 大 Workload 全景"出发，把所有场景切成三类（Common 通用 / 支付提效 / 支付业务），给出"价值金字塔"出钱顺序（入场→签单→绑战略），逐类列出 AWS 服务+真实案例+场次，最后给"客户状态诊断→进场决策树"和"不同角色 engage 镜头"。与 93 页的 iPaylinks 沟通材料互补——这份是**方法论/打法框架**，那份是**单客户深度落地**。

---

## 第1页：封面
Payment × Agentic AI 场景方案与落地路径。三条主线：[1] Workload 全景 [2] 三分类映射 [3] 客户进场姿势。来源：re:Invent 2025 - Stripe/Visa/Mastercard/PayPal - AWS Agentic Commerce 立场文件。

## 第2页：支付核心业务链路（一笔交易的时间轴）
所有 workload 围绕的交易时间轴：
- **T0 授权 Authorization**：网关-实时反欺诈-HSM/PIN-3DS（持卡人/代理→收单方PSP→卡组织Network→发卡方Issuer：授权请求→路由→发卡决策→响应）
- **T+0~T+2 清算 Clearing**：清算引擎-8583/ISO 20022-批处理
- **T+1~T+30 结算 Settlement**：对账-轧差-银行代付
- **T+∞ 争议/退款**：VROL/MDES-证据收集-仲裁

## 第3页：支付公司 13 大 Workload 全景
无论发卡/收单/卡组织/处理商/钱包/跨境，工作都装在 13 个盒子里，分 5 层：
- **对外业务层 Revenue**：1)交易主链路 2)发卡&卡生命周期 3)商户生命周期 4)钱包&跨境 5)新业务&新轨道（ACP/UCP/x402/FedNow）
- **风险合规层 Trust&Safety**：6)实时反欺诈（评分/规则/GNN）7)合规AML/CFT（KYC/KYB/KYT/KYA/制裁/SAR）8)争议Chargeback（VROL/MDES/仲裁）
- **运营支持层**：9)信安&密码（HSM/PCI/Tokenization）10)客服联络中心 11)对账/差错/财务
- **数据平台层**：12)数据平台/BI/监管数仓（实时特征+数据湖 Iceberg/S3 Tables）
- **工程效能层**：13)研发/DevOps/安全/员工生产力（Kiro/QuickSuite/AWS Transform/Security Agent）

## 第4页：三分类——把 13 个 Workload 重新切片
判定边界：换一家非支付企业还成立吗？必须用支付域数据吗？是不是新收入？
- **一、Common 通用场景**：换非支付企业也复用（研发/DevOps/客服/知识BI/遗留重构/信安），AWS 有现成 SaaS
- **二、支付公司特有提效**：必须依赖支付域数据（KYB/KYT、反欺诈调查、AML/制裁、争议对账、APC-HSM-PCI），ROI 主力 22%-90% 可量化
- **三、支付业务场景**：Agent 成为新流量/新轨道/新收入（Agentic Commerce 3 形态、ACP/UCP/AP2/x402/TAP、稳定币-FedNow、代理就绪卡/B2B Agent），战略长线 3-5 万亿$（麦肯锡）

## 第5页：价值金字塔——三类场景的出钱顺序
入场：Common（建立信任，已有 SaaS）→ 签单：提效（22%-90% ROI，今年能签）→ 绑战略：支付业务（新收入/新轨道）。
打法：1-2 周 SaaS 体验 → 1-2 月 Strands+AgentCore PoC → 季度级绑 ACP/UCP/AP2/x402 进生产。

## 第6页：一、Common 通用场景——直接用 AWS 现成 SaaS
客户状态：刚接触 AI，想快速体验，零/少代码上手。
| 场景 | AWS 服务 | 案例/场次 |
|---|---|---|
| 研发/IDE 助手 | Kiro / Claude Code on AWS | 3.1 研发 |
| DevOps/SRE | Kiro / AWS DevOps Agent | SPS310 |
| 安全运营 | AWS Security Agent / GuardDuty+Bedrock | SEC224 Block |
| 知识问答/BI | Amazon QuickSuite | FSInvest |
| 客服/联络中心 | Connect+Lex+Bedrock / Nova Sonic 语音 | Remitly/Coinbase IND3312 |
| 大型机/遗留重构 | AWS Transform | BMW/Fiserv MAM205/Itaú |

## 第7页：二、支付提效（1/2）——风险-合规-欺诈
客户状态：已上过 GenAI PoC，要真金白银省人降风险。
- **商户风险评估 Agent**（Stripe IND3300）：LLM Research Agent 尽调，审查时间↓26%，Strands+AgentCore+Claude+Guardrails
- **Agentic KYC/KYB/KYT/KYA**（IND373）：尽调全家桶，AgentCore+Neptune（图关系）+Bedrock
- **欺诈调查助手**（IND324）：Strands+Nova Sonic 语音
- **实时特征工程**（JPMorgan Chase）：SageMaker 实时特征+欺诈模型

## 第8页：二、支付提效（2/2）——运营-客服-敏感数据-发卡
- **24x7 多代理运营**（Ripple IND3301）：AgentCore+EKS+Claude
- **争议/Chargeback**（PACE-Stripe）：Strands+Bedrock+Neptune，证据收集+VROL/MDES
（注：本页后半被截断，但主题为运营连续性、PCI 敏感数据、争议证据自动化）

## 第9-12页：三、支付业务场景（Agentic Commerce 与新轨道）
> 注：第 9-11 页文本提取有限，第 12 页为 AgentCore Payments 双轨策略。核心内容：
- **AgentCore Payments**（Preview）：与 Coinbase + Stripe 共建
  - **Coinbase 线**（链上/稳定币/x402，preview 唯一通路）：CDP Wallet + x402 Bazaar MCP（商家可发现目录）+ 结算介质 USDC（推测 Base 网络），HTTP 402 原生微支付
  - **Stripe 线**（链下/Privy 钱包/未来法币）：Privy Wallet（A Stripe company）+ 稳定币钱包 + ACP/AP2 roadmap
- 四要素：1)Authentication 2)Transaction Execution（x402 微支付 fractions of cent~<$1）3)Spending Governance（PaymentSession: maxSpendAmount+currency+过期，签名失败不扣预算）4)Observability
- Preview 区域：us-east-1/us-west-2/eu-central-1/ap-southeast-2；体验客户：Warner Bros/Heurist AI/Cox Automotive/Thomson Reuters/PGA TOUR

## 第13页：Self-build 标准架构栈
1P（Claude/Nova）+ 2P（Llama/DeepSeek/Qwen 等开源）全覆盖。
- **出口/UI**：Web/App/ChatGPT/Rufus/A2C/Agent SDK
- **商户侧边界（Outgoing）**：CloudFront+Lambda@Edge+WAF / x402 Facilitator / TAP/RFC9421 验签
- **护栏&身份&审计**：Bedrock Guardrails/AP2 Mandate/IAM/CloudTrail
- **Agent 运行时&支付**：AgentCore Runtime+Payments（x402/Privy Preview）/ EKS/ECS Fargate/Lambda
- **模型层**：1P（Bedrock Claude 4.7/Nova/Nova Sonic）+ 2P（Llama 4/DeepSeek/Qwen 3/Mistral/Cohere/Stability/Jamba）
- **算力**：NVIDIA P5/P6 + AWS Trainium2/Inferentia2
- **知识&记忆**：OpenSearch/S3 Vectors/Aurora pgvector/Kendra/Neptune
- **支付专属**：Payment Cryptography（APC）/Nitro Enclaves/KMS/CloudHSM/PrivateLink
- 口诀：AgentCore 首选 · 模型 1P+2P 并用 · Outgoing 叠 CloudFront+Lambda@Edge+WAF · 训练 Trainium2/P5e · 支付叠 APC+Nitro

## 第14页：客户能亲手跑的 Demo/Workshop/Sample
- **AWS Samples**：AgentCore+CloudFront+x402、x402 商户侧 Edge 收款、Nitro Enclave Blockchain Wallet、MPC 多方签名 Nitro 钱包
- **AWS Blog**：AgentCore Payments 发布（Coinbase+Stripe）、AWS×x402 参考架构、AgentCore Payments Docs
- **开发框架**：Strands Agents、Claude Code/Agent SDK、AI-DLC Workshop、协议 run.sh（ACP/MCP/A2A/AP2/UCP/TAP）

## 第15页：客户状态诊断→进场决策树
1. 客户属于六类支付主体哪一类？
2. 首要诉求：降本（人手不够）还是增长（AI 原生新业务）？
   - 降本 → 二、支付提效（欺诈/KYC-KYB-KYT-KYA-CFT/争议/24x7）
   - 增长 → 三、支付业务（ACP/UCP/AP2/x402/A2C/代理就绪卡）
3. 统一底座：Bedrock+AgentCore Runtime+Guardrails+APC/Nitro

## 第16页：同一套方案→不同角色 engage 的点不一样
对面坐谁决定开场/话术/Demo：
- 业务/GTM/产品：GMV/新渠道/新轨道占位
- IT 中台/平台工程：共性底座/多租户治理/工具链统一
- 运维/SRE：MTTR/告警降噪/on-call/大型机值班
- 安全/CISO：PCI/Prompt Injection/Agent 权限/密钥与卡数据
- 合规/法务：KYC-KYB-AML/制裁名单/监管报送/可验证凭证
- AI 科学家：模型边界/评测/实时特征/GPU-Token 成本
- 数据/数仓：数据血缘/实时特征/360 视图/口径治理

---

## 全文要点提炼

1. **支付公司 13 大 Workload 框架**：5 层（Revenue/Trust&Safety/Operation/Data/Productivity），是看任何支付公司 AI 机会的统一坐标系。
2. **三分类切片法**：用三个判定问题（换非支付企业是否成立/是否必须支付域数据/是否新收入）把 workload 切成 Common（通用）/ 提效（支付特有）/ 业务（新轨道）。
3. **价值金字塔打法**：Common 入场建信 → 提效签单（22-90% ROI）→ 支付业务绑战略（3-5 万亿$）。
4. **交易时间轴是一切的锚**：T0 授权 / T+0~2 清算 / T+1~30 结算 / T+∞ 争议，所有 workload 挂在这条轴上。
5. **AWS Self-build 标准栈**：AgentCore（Runtime+Payments）+ 模型 1P+2P + Outgoing 边界（CloudFront+Lambda@Edge+WAF）+ 支付专属（APC+Nitro）。
6. **AgentCore Payments 双轨**：Coinbase 线（链上/USDC/x402）+ Stripe 线（链下/Privy/法币），对冲而非中立。
7. **x402 是 Agent 微支付的关键**：HTTP 402 原生，fractions of cent~<$1，PaymentSession 做支出治理（限额+过期+签名）。
8. **进场决策树**：先判断客户是哪类支付主体、首要诉求是降本还是增长，再决定推提效还是支付业务。
9. **角色镜头切换**：同一套方案对业务/IT/运维/安全/合规/数据科学/数仓 7 类角色要换不同话术和 Demo。
10. **与 93 页 iPaylinks 材料的关系**：这份是"方法论框架+打法"，那份是"单客户深度落地"，配合使用。
