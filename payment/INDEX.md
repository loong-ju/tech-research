# 📑 支付研究目录索引 (INDEX)

> 本文件是 `payment/` 支付研究主目录的内容索引，覆盖学习路径与三大维度下的全部研究材料。
> **维护规则**：每次新增 / 删除 / 重命名文件后，同步更新本文件（见 `CLAUDE.md` 二·5 索引维护）。
> 最后更新：2026-06-04

---

## 🗂️ 目录结构总览

```
payment/
├── CLAUDE.md                  研究主目录的统一规则与方法论
├── INDEX.md                   本索引文件
├── 学习路径总纲.md             面向 AWS 架构师的七大模块学习路径
├── 支付概念全景地图.md          全部术语速查（所属模块+一句话第一性定义）
├── 支付范式资金流对比.md         6种支付范式的参与方/三流/清结算/信任并排对比（Mermaid图）
├── _mdserver.py               Web 浏览服务（左侧全局导航 + Markdown/Mermaid 渲染）
├── _foundation/               模块0：地基（钱/账本/清结算）— 业务轨×技术轨
├── _topics/                   模块6：横向专题（风控/合规/账务/非功能性）
├── traditional-payment/       维度一：传统/跨境支付（模块1-3）
├── stable-coin/               维度二：稳定币（模块4）
└── agentic-payment/           维度三：智能体支付（模块5）
```

---

## 🎓 学习总纲与地基（面向 AWS 技术架构师）

| 文件 | 类型 | 内容摘要 |
|---|---|---|
| `学习路径总纲.md` | 📝 总纲 | 七大模块学习路径：业务轨×技术轨分离、时代演进主线（地基→传统→电子→跨境→稳定币→Agentic）、推荐顺序、进度追踪。每模块业务篇讲问题/参与方/收益/护城河，技术篇讲通用实现+AWS支持 |
| `支付概念全景地图.md` | 📝 速查 | 支付领域全部术语速查手册：按7大模块分组，每个术语配"所属模块+一句话第一性定义"。涵盖发卡/收单/POS/SoftPOS/网关/虚拟卡/EMV/Tokenization/3DS/拒付/分账/代收代付/钱包/二维码/代理行/结售汇/稳定币/Agent/风控合规等。含概念归位全景图 |
| `支付范式资金流对比.md` | 📝 对比 | 6种支付范式（POS卡/SoftPOS/电商网关/钱包余额/稳定币/Agentic）并排对比：参与方、三流路径、清算vs结算、身份授权、信任机制。每范式配 Mermaid 资金流图 + 演进逻辑。随模块推进逐步填充 |
| `_foundation/00-foundation-business.md` | 📝 地基·业务 | 模块0 业务篇：钱的本质（账本数字+信用）、货币三大功能、货币等级（央行/银行/私人货币）、复式记账、账户体系、清算vs结算（finality）、三流分离（商流/信息流/资金流）、信任中介演进。含综合案例与"与支付公司交流要点" |
| `_foundation/00-foundation-tech.md` | 📝 地基·技术 | 模块0 技术篇：账本工程模型（append-only流水+派生余额）、CP取舍（金融为何偏执一致性）、幂等（第一信条）、对账（免疫系统）、HSM密钥安全、金融级NFR。每项映射AWS服务（Aurora/QLDB/DynamoDB/CloudHSM/Payment Cryptography/Nitro Enclaves/Glue等） |

**统一浏览**：`python3 _mdserver.py` → http://127.0.0.1:8911（左侧目录树导航，md 自动渲染含 Mermaid 图）

---

## 🌍 维度一：traditional-payment（传统 / 跨境支付）

| 文件 | 类型 | 内容摘要 |
|---|---|---|
| `01-cards-business.md` | 📝 模块1·业务 | (top-down主线)银行卡四方模型与收单产业链业务篇：①卡支付本质(推vs拉/信任) ②四方模型五角色+N×N+四方vs三方 ③**收单产业链**(收单行/Processor/ISO/PayFac/PSP定位、ISO vs PayFac分水岭、中国二清红线、案例、**跨境收款公司=跨境PayFac+换汇**) ④授权-清算-结算三段 ⑤MDR/交换费/分润(residual/markup/IC++) ⑥发卡(虚拟卡)与收单(KYB/拒付) ⑦双边网络效应护城河。FAQ:MID/内部清算/多通道来源 |
| `01-cards-tech-aws.md` | 📝 模块1·技术 | (top-down主线)银行卡技术篇+AWS：①ISO 8583(MTI/位图/数据域)+卡BIN路由 ②刷卡时序(授权在线vs清算离线) ③**收单系统逻辑架构**(整体架构全景图串起持卡人/商户/网关/网关路由/处理器/风控/商户清分/清算结算交互;四大场景流程图:指令流授权/清算流含清分/结算流finality/拒付逆向流;组件=网关+处理器+清结算+商户管理+风控、网关vs处理器、Processor牌照/三种商业模式/AWS多租户、交互方式API/文件/DB、网关路由硬性匹配+择优least-cost、清结算分层、**风控组件**:六维度检查(卡/频率velocity/行为/设备IP/商户/合规)+三档动作(放行/加验/拒绝)+AWS实时风控架构) ④安全四件套(EMV/3DS/Tokenization/HSM各防一类攻击) ⑤PCI-DSS缩scope+密钥AWS(Payment Cryptography/Nitro Enclaves/CloudHSM/KMS/继承PCI-L1) ⑥**PayFac平台AWS架构**(多商户账本/分账/KYB/Payout,直通跨境收款技术底座)。FAQ:Processor牌照/中国玩家/交互方式 |
| `跨境支付深度研究报告.md` | 📝 模块3·报告 | 带引用的完整研究报告：G20 跨境支付路线图（四摩擦四目标、11 量化目标）、各国清算系统（Fedwire/CHIPS/CHAPS/T2/CIPS）、代理行机制、SWIFT 报文与 ISO 20022、新兴技术（Nexus/mBridge/稳定币卡）、中国出海专题，附核查来源清单。📌已核查/🔧公知分级标注 |
| `跨境支付学习笔记.md` | 📝 笔记 | 第一性原理学习骨架：一条主线（账本公理→无共同账本→四套管道）+ 四套管道对比表 + 三大关键概念（清算vs结算、信息流vs资金流、钱的等级）+ 10 道自测题 |
| `跨境支付架构图.html` | 🌐 网页 | 6 张 Mermaid 可视化架构图（主线 / 四管道对比 / 代理行电汇资金流 / 卡组织四方模型与三段 / 稳定币接缝 / mBridge），自包含暗色主题网页 |

---

## 🪙 维度二：stable-coin（稳定币）

| 文件 | 类型 | 内容摘要 |
|---|---|---|
| `stablecoin_research.md` | 📝 研究 | 稳定币综合研究 |
| `stablecoin_cross_border_compliance.md` | 📝 研究 | 稳定币跨境支付的合规问题 |
| `LEARNING_NOTES_小白到架构师.md` | 📝 笔记 | 稳定币学习笔记（小白到架构师路径） |

---

## 🤖 维度三：agentic-payment（智能体支付）

### 综述与专题
| 文件 | 类型 | 内容摘要 |
|---|---|---|
| `agentic_commerce.md` | 📝 综述 | **Agentic Commerce 总览**（篇幅最大）：问题定义、发展历程、核心术语、七大方案深度解读、协议对比分析 |
| `agentcore-payment.md` | 📝 简报 | 会前 Brief — 与连连支付首席架构师的沟通要点（AWS AgentCore / Kiro / AgentCore Payments 的生产级难点） |

### 各支付协议研究（编号子目录）
| 目录 | 协议 | 内容摘要 |
|---|---|---|
| `1.google_ucp/` | **Google UCP** | Universal Commerce Protocol 研究：概念、历程、用例、架构、实现逻辑 |
| `2.openai_strip_acp/` | **OpenAI × Stripe ACP** | Agentic Commerce Protocol 深度研究：解决什么问题、术语、架构、技术规范详解（篇幅大） |
| `3.amazon_payforme/` | **Amazon Buy for Me** | Amazon 代客购买研究：架构 + 争议与反弹深度分析 |
| `4.google_ap2/` | **Google AP2** | Agent Payments Protocol 深度研究：架构、技术规范详解 |
| `5.conibase_x402/` | **Coinbase x402** | x402 协议深度研究：问题定义、术语、解决方案（链上支付 402 状态码复活） |
| `6.visa_tap/` | **Visa TAP** | Trusted Agent Protocol 与 Intelligent Commerce 深度研究：架构、技术规范 |
| `7.mastercard_agent_pay/` | **Mastercard Agent Pay** | Mastercard 智能体支付研究：问题定义、术语、技术架构 |
| `8.cloudflare_webbot_auth/` | **Cloudflare WebBot Auth** | （目录占位，暂无研究文档） |
| `10.fraud_risk_control/` | **欺诈与风控** | Agentic Commerce 欺诈风控深度研究：为何传统风控在 Agent 时代失效、威胁分类学、攻击向量、各协议风控方案、Agent 原生风控模型 |

### 其他
| 文件/目录 | 类型 | 内容摘要 |
|---|---|---|
| `openclaw/openclaw_research.md` | 📝 研究 | OpenClaw (Claw) 深度技术研究：架构、消息流水线、Channel 适配器、Agent Runtime、Skills 系统 |
| `aws_ppt_presentation/` | 📊 演示 | Agentic Payment 中文演示（`Agentic_Payment_ZH.pptx` + `index.html`/`index_zh.html` 网页版 + slides_zh 图） |
| `materials/` | 📊 素材 | 外部素材：Agentic Commerce/Payment 相关 PPT、PDF、DOCX（AWS IND386、Agentic Commerce Opportunity 等） |
| `_images/` | 🖼️ 图片 | 散落截图归档（s01~s17、fullpage、cover 等） |

---

## 📊 维度对照：四套支付管道心智模型

> 三个维度统一在同一条第一性主线下（详见 `CLAUDE.md` 第五节·四套支付管道心智模型）：

| 维度 | 对应管道 | 核心问题 |
|---|---|---|
| traditional-payment | ① 代理行电汇 + ② 卡组织 | 跨境没有共同账本，靠接力/封闭网络解决 |
| stable-coin | ③ 稳定币 + ④ CBDC/mBridge | 重造一个开放/央行的全球共同账本 |
| agentic-payment | ⑤ 智能体支付 | 让 AI Agent 成为新的"付款主体"，在以上轨道之上 |
