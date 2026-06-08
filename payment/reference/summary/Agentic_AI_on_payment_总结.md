# Agentic_AI_on_payment_PPT_v2_zh_new.pptx 内容总结

> **源文件**：`reference/Agentic_AI_on_payment_PPT_v2_zh_new.pptx`（217MB，含 6 段嵌入视频）
> **主题**：iPaylinks × AWS 跨境支付智能化首次技术沟通（AWS GCR Solutions Architect Team，2026-05）
> **总页数**：93 页
> **整体概要**：这是 AWS 解决方案架构师团队为跨境支付公司 **iPaylinks** 准备的售前技术沟通材料。核心逻辑是：先剖析 iPaylinks 的 6 大业务模块与 AI Agent 改造机会（KYB/反欺诈/客服/Chargeback/对账/FX），再用 Top 5 AWS 真实支付客户案例建立信任，然后深入 20+ 个支付场景的 Agentic AI 解决方案（含真实案例、架构、demo 讲解话术、客户答疑），最后给出两个推荐 PoC（跨境商户 KYB Agent + Chargeback Representment Agent）和落地路径。**对学习者价值极高**：它把"支付业务场景 × AI Agent 改造 × AWS 服务映射"三者完整打通，且每个 demo 都附了"现场讲解话术 + 客户答疑"，是支付+AI+AWS 交叉领域的实战手册。

---

## 第一部分：iPaylinks 业务画像与改造机会（第1-4页）

### 第1页：封面
iPaylinks × AWS Agentic AI 跨境支付智能化首次技术沟通。

### 第2页：议程
0. iPaylinks 业务画像与 6 大 Agentic 改造机会
1. AWS 上 Agentic AI 支付真实案例（Top 5）
2. 推荐 PoC #1：跨境商户 KYB Agent
3. 推荐 PoC #2：Chargeback Representment Agent
4. 下一步行动 / 数据需求 / 时间线

### 第3页：iPaylinks 6 大业务模块 × AI Agent 改造机会
按 ROI × 落地难度，KYB / Chargeback / 对账 是首批 PoC 候选。
| 模块 | 现状痛点 | AI 改造方向 |
|---|---|---|
| 商户入驻/KYB | 人审 3-5 天、UBO 穿透难 | 文档抽取+风险打分、三层隔离 Agent |
| 反欺诈/AML | 规则引擎、误杀率高 | Multi-Agent 调查台 + MCP 工具 |
| 客服与商户支持 | 多语种、专业问题 | RAG + Function Calling、开发者 API 助手 |
| Chargeback 争议 | 人工证据采集、人写 representment | Step Functions 编排、多语自动撰写 |
| 多币种对账 | 三方对账、FX 损益归因 | Sub-Agent 拆账单、Opus 聚合差异 |
| FX 风控/Hedging | 交易员手工决策 | 行情监控+价差建议 Agent |

### 第4页：AWS 上 Agentic AI 支付的 5 个标杆案例
1. **Mastercard Brighterion**：实时反欺诈 AI 平台，EKS/ECS/CloudFront/MSK/Redshift，150B+ 笔/年评分，74/100 头部美国银行，>99.999% 可用性
2. **Visa Protect A2A**：A2A 实时欺诈评分，Bedrock AgentCore，<250ms 延迟，99.99% 可用性
3. **Brex**：企业差旅费用 GenAI 平台，Bedrock，自动化 75%、合规率 94%、$56.5M/年工资节省
4. **Remita（尼日利亚）**：4 个 GenAI 助手含收据真伪验证，Bedrock+Claude Haiku，工单−22%/−19%、收据 4分→30秒
5. **FIS × Anthropic**：4 类金融犯罪 Agent，Claude，AML 调查数日→分钟
> 💡 关键洞察：跨境支付细分赛道（Wise/Remitly/WU/连连/PingPong）在 AWS 案例库**尚无具名 Agentic 案例**——iPaylinks 与 AWS 共建首批参考的窗口期。

---

## 第二部分：支付行业 Agentic AI 总览（第5-10页）

### 第5页：章节页 — 面向支付行业的 Agentic 与生成式 AI

### 第6页：金融机构正用 Agentic AI 转型
列举客户：Clearwater（投资管理）、Experian（AI助手）、Ripple（运营）、Prudential（寿险）、Stripe（合规）、Jefferies（交易助理）、Danske Bank（主机迁移）、LSEG（负面舆情）、Moody's（信用备忘录）、Robinhood（客户体验/合规）、Principal（研究）——多数基于 Amazon Bedrock AgentCore。

### 第7页：支付机构的广泛应用场景（场景全景图）
三大类：生成式AI与AI/ML、智能体、智能体商务。覆盖跨境支付支持、支付路由优化、POS客服、汇款表单、A2A反欺诈、客服、财务运营、商户入网、反欺诈、挂失/争议、站内购物顾问、B2B支付等。

### 第8页：AI 能力演进三阶段
传统 AI/ML（分类预测）→ 生成式 AI 辅助流程（NLP理解+总结）→ 自治智能体（目标驱动、自主行动、人在环复核）。以客户体验、商户核保、反欺诈三场景为例展示演进。

### 第9-10页：章节页 + 场景全景图重复
核心理念：与传统AI不同，agentic AI"acts with intent"（带意图行动），能推理、行动、协作、完成多步任务——支付 Agent 可决定走哪个网络清算、是否需人工复核、何时执行跨境结算以获最优汇率。

---

## 第三部分：支付提效真实案例（第11-24页）

### 第11-12页：Remita 以 GenAI 变革客户体验
尼日利亚领先 fintech。Agentic RAG 方案（Bedrock API+S3+Titan 嵌入），4 个 AI 助手（支付/产品知识/API集成/收据核验）。成果：集成工单−22%、产品咨询−19%、收据核对 4分→30秒。

### 第13-14页：Stripe 以智能体基础设施革新合规
合规团队 EDD 尽调繁重。基于 Bedrock + 自研 Agent Service + React Agent 框架的 LLM 研究 Agent，含提示词缓存、降级 LLM 代理、人工校验审计链路。成果：合规审查平均处理时长−26%，复核人员 96% 帮助性评分。

### 第15-16页：Ripple 智能多 Agent 系统支撑 7×24 运维
监控 900+ 节点 XRP Ledger，日均 2.5TB 日志，人工排障需 2-3 天。基于 Bedrock AgentCore+Lambda+Neptune+CloudWatch+DynamoDB 的多智能体（orchestrator+代码分析GraphRAG+日志分析+查询生成，Claude Sonnet 3.5+Strands SDK）。成果：排障 48小时→40秒。AWS PACE 团队 6 周做出原型。

### 第17-18页：支付路由优化 Agentic AI ★重要★
**架构**：编排 Agent + 4 领域 Agent（数据分析/费用分析/条款条件/规则），用 Bedrock+Athena+DynamoDB+Knowledge Bases。回答"支付路由成本、结算时效、批准率"等查询，规则 Agent 生成路由规则+模拟结果。
**第18页 demo 答疑（极有价值）**：
- **规则编写层 vs 运行时路由层必须分开**：Demo 演的是"规则生产"（Agent+人审，分钟级，写 DynamoDB 状态 PENDING），不是"交易时路由执行"（路由引擎读已上线规则做条件匹配，<50ms，不调 LLM）。
- **为什么不让 LLM 实时决策**：①延迟（授权 SLA<500ms，Bedrock 推理 1-3s）②成本（百万级 TPV 不可承受）③合规（实时决策须可解释可回放，LLM 非确定性不适合最终裁决）。
- **规则维护三层时间尺度**：事件驱动（新 PSP/合同，几周-几月）+ 周期复盘（漂移监测，日/周/月）+ 实时熔断（PSP 故障秒级降级，不调 Agent）。
- **Human-in-the-Loop**：Agent 生成规则状态 PENDING，必须人审才上线，附 AI 推理说明+模拟结果。

### 第19-20页：支付反欺诈 Agentic AI ★重要：XGBoost vs GNN★
**架构**：编排 Agent + 3 领域 Agent（欺诈侦测/模型评估/欺诈规则），用 Bedrock+Athena+Neptune+SageMaker（XGBoost+GNN）+DynamoDB。
**第20页 demo 答疑（核心知识）**：
- **XGBoost（梯度提升决策树）**：看"单点行为"，输入二维表格 55 个特征（频率/金额/失败率/设备多样性/凭证变更），擅长速率异常/金额异常/撞库，盲点是看不到账号间关系、抓不到团伙。快、便宜、可解释（SHAP），95% 传统反欺诈引擎用它。
- **GNN（图神经网络，具体是 RGCN）**：看"关系网络"，输入关系图（存 Neptune），擅长欺诈团伙识别/协同攻击/新型欺诈传染，盲点是单打独斗抓不到、推理慢贵不适合实时高 QPS。
- **互补**：两个分数都给 Orchestrator 综合判断（如"XGB=0.3 但 GNN=0.9 → 团伙成员个人正常但周围全坏人，照样拦截"）。
- **对 iPaylinks 价值**：现有规则引擎+单点风控（类XGBoost）最大盲区是跨账号协同欺诈（多商户号刷单、共享账户绕限额、跨境洗钱分散小额、套利团伙），GNN 是为此天生。
- **实时性**：XGBoost<50ms 走实时；GNN 几百ms 走"准实时"（交易后 1-5 秒评分，用于事后标记/下次拦截）。

### 第21-22页：商户入网 KYB Agent ★PoC候选★
传统人工审材料慢、漏检高。方案：Textract OCR + 置信度评分 + 风险画像 + 合规检查（OFAC/KYC/AML）+ GenAI 建议，人工只做最终裁决。Step Functions 编排 7 阶段。成果：处理时间/成本−60-70%。
demo 讲解：Dashboard 总览→新建商户→文件上传（营业执照/EIN/Government ID/void check）→OCR Processing→Human Approval+Compliance→GenAI Recommendations→账户激活。
对 iPaylinks：换东南亚/中东/拉美商户材料+多语言 OCR；叠加自有黑名单+MCC 风险分级+OFAC 实时比对；KPI：OCR 准确率≥95%、入网时长压缩、人工介入率≤20%。

### 第23-24页：挂失/扣款争议 全渠道
Amazon Connect Next Gen Contact Center。三大能力：①争议升级人工坐席（自动创 Case+AI 摘要）②单一呼叫流混合确定性+AI ③聊天语音渠道融合。
对 iPaylinks 关键扩展：**Representment 证据链自动组装**——Dispute Case 创建时 Lambda 自动拉原始授权记录/3DS 结果/IP 设备指纹/物流签收，打包成 Visa/MC Rebuttal Package，人工取证 30分钟→2分钟。KPI：Chargeback Win Rate 跨境 30-40%→>55%。

---

## 第四部分：Agentic Commerce 应用（第25-33页）

### 第25-26页：章节页 + 场景图
Agentic commerce 正改变消费者和企业发起、授权、完成交易的方式。

### 第27页：Visa 与 AWS 共同实现下一代智能体商务
Visa 将 Intelligent Commerce 平台上线 AWS Marketplace + Bedrock AgentCore 开放蓝图。Visa Intelligent Commerce 被设计为 Agent 经济的"信任层"。蓝图含差旅预订/零售购物/B2B 支付 Agent，行业伙伴 Expedia/Intuit/lastminute.com/Eurostars。技术：AgentCore（Identity/Runtime/Gateway/Memory/Observability）+ Visa MCP Server。

### 第28页：差旅预订 Agent 工作流
三个专业 Agent：主管（编排）+ 差旅助手（规划/预订）+ 购物车管家（支付/结算）。借助 Visa Intelligent Commerce，用户只需批准意图即可授权预订并执行支付。

### 第29页：零售购物 Agent 工作流
三个 Agent：主管 + 购物（搜索推荐）+ 购物车管家。集成 Visa IC 后可核验身份、检索 token 化凭证、完成购买，**用户无需经过任何结账页**。

### 第30-31页：B2B 应付账款 Agent + 虚拟卡 ★PoC相关★
自动化 Procure-to-Pay：Bedrock 抽取发票 + 匹配 PO/收货单 + 生成 ISO 20022 付款文件。多智能体（Supervisor+IDP用Textract+Match用Bedrock+Exception+Payment用Visa B2B API）。
demo：石油天然气企业采购，BOL AI 匹配验证 + 实时生成 Visa 虚拟卡付款。
对 iPaylinks：对应"虚拟卡发卡 + B2B 跨境 T/T 结算"。虚拟卡走 Visa B2B 网络（T+0）、T/T 走 ISO 20022，同系统统一管控；增加第四方匹配（外汇申报单，针对中国 ODI 合规）。

### 第32-33页：Stripe 在 AWS 发布 ACP（Agentic Commerce Protocol）
痛点：发现环节转向 GenAI 助理，传统结账页机器不可读（同任务 5秒-10分钟不等）。ACP 五个九可用性，与 OpenAI 共同撰写、Apache-2 开源（agenticcommerce.dev）。创新：**Shared Payment Tokens**（带预算金额和欺诈信号的"俄罗斯套娃"逻辑层）。Payments Foundation Model 训练于数百亿信号、92% 卡已见过。两模式：B2A（ChatGPT 购物）+ A2C（站内 AI 造型师）。成果：黑五处理 $400 亿达六到七个九、营收+11.8%、95% 卡测试攻击实时侦测。Etsy 已上线 ChatGPT，Walmart/Shopify 进行中。

---

## 第五部分：生成式 AI 与 AI/ML 应用（第34-50页）

### 第34-36页：章节页 + 场景图 + 客户体验工作流嵌入

### 第37页：Remitly 扩展全球客服
18 种语言客服。Bedrock 意图分类+回复生成。上线 2 月内 25% 聊天由 AI 处理，仅 3% 转人工。

### 第38页：PagBank（巴西）服务时长−85%
WhatsApp 集成聊天机器人，上传 POS 屏幕照排障。Rekognition 图像分析+错误码 + Bedrock FAQ（>90% 准确率）。

### 第39页：全渠道服务架构
Lex（聊天）+Polly（语音）+Connect（联络中心）+RDS/DynamoDB+Lambda+Voice ID+Contact Lens（情感分析）+SageMaker+Bedrock。

### 第40-41页：信贷客户/商户 360 架构
LLM Orchestrator（ECS+Bedrock Claude）+ Neptune 知识图谱 + Textract+Titan 嵌入+FAISS VectorDB + Kendra。结合结构化+非结构化数据做贷款决策。

### 第42页：反欺诈/反洗钱流程嵌入 GenAI
KYC（IDP+LLM/OCR）→交易（ML 生物识别）→可疑侦测（规则+ML+图+LLM）→告警生成（LLM 分诊摘要）→调查（ML+图+LLM 减少 70% 时间）→告警处置（LLM 生成监管报告）。

### 第43页：Approbe（哥伦比亚）13ms/95% 准确率反欺诈
SageMaker+API Gateway+Lambda，月处理 5万+信贷操作，准确率 70%→95%，侦测 13ms。

### 第44页：Visa A2A 反欺诈防线 ★重要架构★
A2A 支付预计 2029 年达年 1 万亿笔、2030 年 $195 万亿，欺诈损失 $580 亿。Visa Protect A2A：Nitro Enclaves+EKS+MemoryDB(Valkey)，零信任架构、多区域、<250ms 延迟、99.99% 可用性、1000 TPS、P99.5 优于目标 40%。英国已上线，扩展巴西。

### 第45页：利用 GenAI 的反欺诈架构
Bedrock 从非结构化文本抽特征→XGBoost（SageMaker）+ 图（Neptune+DGL）→实时评分（API Gateway+Lambda+SageMaker endpoint）。

### 第46-47页：Convera 客服转型 + 邮件自动化架构
130 个共享邮箱→3 个（−95%）。SES+Lambda+Step Functions+SageMaker（PII脱敏）+Bedrock（分类摘要）。自动建单准确率 82%。

### 第48-49页：Amazon 用 GenAI 管理财务 + 自动化发票架构
欺诈侦测/合同审阅/财务预测/税务。架构：Transfer SFTP+Textract+Bedrock Claude 3 Sonnet+Titan嵌入+Aurora pgvector+QuickSight。

### 第50页：国际汇款表单助手 demo
交互式 GenAI 助手协助填表，校验 IBAN/BIC/汇款用途，跟踪对话复用信息。

---

## 第六部分：为什么选 AWS 做 Agentic AI（第51-66页）

### 第52页：AWS Agentic AI 全栈
模型层（Bedrock：Nova+第三方模型）+ AgentCore（Runtime/Gateway/Identity/Memory/Observability）+ 工具（Kiro/Quick Suite/Transform/Connect）+ Strands Agents + 协议（MCP/A2A）+ AI 计算（Trainium/Inferentia）+ SageMaker。

### 第53-57页：三条路径
- **DIY**：专业开发者用开源框架
- **全托管**：Bedrock AgentCore 提供基础构件
- **专业型**：Quick Suite 整合研究/BI/自动化 Agent 队友
AgentCore 三大价值：更快价值交付、灵活互操作、大规模安全可信。

### 第58页：Strands Agents SDK
最少代码构建 Agent，灵活模型支持，20+ 内置工具+数千 MCP 服务器+A2A，随处部署（ECS/Lambda/EC2），内置 OpenTelemetry 可观测性。

### 第59-62页：合作伙伴 + Marketplace
GSI/ISV/咨询伙伴，200+ 预构建 ML 模型包。

### 第63-66页：AWS 全生命周期支持
设计→开发→部署→运营，含 GenAI 创新中心（GAIIC）、ProServe、PACE 原型团队、沉浸日/工作坊/EBA。

---

## 第七部分：附录（第67-91页）

### 第69-73页：补充客户案例
- **Stripe Radar**：卡测试攻击−64%，Payments Foundation Model（全球首个支付 AI 基础模型，数百亿笔训练），累计拦截欺诈 $36 亿
- **Featurespace**：自适应行为分析 ARIC 平台，年处理 1000 亿+事件，实时阻断 75% 欺诈，误报比 5:1
- **TigerGraph**：图数据库降欺诈 20%，年省 $5000 万
- **NAB（澳洲）**：现金流预测周→月，自动化 80% 月末流程

### 第74-81页：为什么选 AWS（GenAI 技术栈、Bedrock 模型清单、Amazon Nova 家族、GAIIC 服务与合作旅程）

### 第82-89页：安全与合规 ★对支付公司极重要★
- **法律隐私**：Bedrock 输入输出属"客户内容"，AWS 不用于训练模型；无上限版权 IP 赔偿（Amazon 自有模型）
- **安全监管**：AWS/第三方模型商不存储 prompt/输出历史，兼容 GDPR/HIPAA，已获 ISO 42001 认证
- **数据保护**：客户选区域、数据隔离驻留、TLS 1.2+AES-256、KMS（支持 BYOK）、PrivateLink、IAM、CloudTrail、Audit Manager
- **数据驻留**：数据留在 API 调用处理的区域
- **监管态势**：800+ AI 政策倡议（69 国+EU），欧盟 AI 法案、隐私法规 LGPD/PIPEDA/GDPR

### 第90-91页：大规模安全 Amazon Bedrock AgentCore

---

## 第八部分：推荐 PoC（第92-93页）★落地核心★

### 第92页：PoC #1 — 跨境商户 KYB Agent
①商户上传（S3 kyb-incoming/，境内外证照+UBO）→②OCR 抽取（Textract 异步 Form/Table）→③Agent 推理（AgentCore Runtime：doc-reader Haiku→rules-engine Sonnet→escalator Opus 三层模型）→④名单筛查（Screening MCP：OpenSanctions/OFAC/UN/EU）→⑤安全护栏（Bedrock Guardrails：PII Filter+Prompt Injection 防护）→⑥输出（S3 kyb-out/+SES 推合规官，escalation.xlsx+引用页码）→⑦审计观测（AgentCore Observability+CloudWatch+CloudTrail）

### 第93页：PoC #2 — Chargeback Representment Agent
①事件源（EventBridge Partner Source：Visa VRA webhook/Mastercard MCM webhook/收单方拒付通知/商户工单，类比 Stripe 模式）→②编排+推理（Step Functions+Bedrock Agents：Textract 抽交易凭证/物流单/沟通记录 + Bedrock Agent Sonnet 多语种 representment 信件自动撰写 + 工单系统推 dispute team 复核）→③输出+看板（S3+QuickSight：representment 信件归档、败诉率看板按卡组织/国家/商户拆分、AgentCore Observability 全链审计）
> representment 撰写：人工 30-60 分钟→Agent 5 分钟，败诉率改善 −1%~−3%

---

## 全文要点提炼

1. **支付业务 × AI Agent 改造的完整映射**：KYB/反欺诈/客服/Chargeback/对账/FX 六大模块都有对应的 Agentic AI 改造方案和 ROI。
2. **规则生产 ≠ 实时执行**（最重要的架构原则）：AI Agent 负责"生成规则"（分钟级、人审、PENDING），实时交易仍由传统路由/风控引擎执行（<50ms、不调 LLM）——因为延迟、成本、合规三重约束。
3. **XGBoost + GNN 互补反欺诈**：XGBoost 看单点行为（快、可解释、实时），GNN 看关系网络（抓团伙、准实时）——跨账号协同欺诈是规则引擎的最大盲区，GNN 是解药。
4. **Human-in-the-Loop 是支付 AI 的铁律**：AI 提效不替代风控判断，所有 AI 决策附推理说明+模拟结果，人工最终裁决。
5. **AWS 支付 AI 全栈**：Bedrock（模型+Guardrails）+ AgentCore（Runtime/Identity/Memory/Observability）+ Textract（文档）+ Neptune（图）+ SageMaker（ML）+ Step Functions（编排）+ Payment Cryptography/Nitro（合规）。
6. **Agentic Commerce 三大玩家在 AWS 上**：Visa Intelligent Commerce（信任层，Marketplace+AgentCore 蓝图）、Stripe ACP（Shared Payment Tokens，与 OpenAI 共建开源）、B2B 虚拟卡（Visa B2B+ISO 20022）。
7. **跨境支付 Agentic 案例的窗口期**：Wise/Remitly/连连/PingPong 等跨境赛道在 AWS 尚无具名 Agentic 案例，是先发共建参考的机会。
8. **真实 ROI 数据丰富**：合规审查−26%、排障 48h→40s、收据 4分→30秒、KYB 处理−60-70%、Chargeback representment 30-60分→5分、卡测试攻击侦测+64%。
9. **数据安全合规是支付公司核心关切**：Bedrock 数据不训练模型、留在客户 VPC、可境外 Region+PrivateLink、满足 PCI-DSS+数据本地化、ISO 42001 认证。
10. **落地方法论**：1-2 周 SaaS 体验 → 1-2 月 Strands+AgentCore PoC → 季度级绑协议进生产；推荐 KYB 和 Chargeback 两个 PoC 并行。
