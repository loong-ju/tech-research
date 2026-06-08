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
├── reference/                  参考素材（PPTX大文件不入git；summary/ 文字总结入git）
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

### 模块6 横向专题（_topics/，贯穿所有模块）
| 文件 | 类型 | 内容摘要 |
|---|---|---|
| `_topics/61-risk-fraud.md` | 📝 6.1风控 | 风控反欺诈：防三类损失(欺诈/拒付/合规)、三层贯穿(准入/实时/离线)、**技术三代叠加**(规则引擎→ML XGBoost单点→GNN团伙)、XGBoost+GNN互补、Agent时代新威胁。AWS:Fraud Detector+ElastiCache+OpenSearch+SageMaker+Neptune+Guardrails |
| `_topics/62-compliance.md` | 📝 6.2合规 | 合规体系：三目标(反匿名KYC/KYB/KYA+阻断非法资金AML/制裁/CFT+保护数据PCI/驻留/隐私)、制裁筛查模糊匹配、AML拆分监测、Travel Rule、牌照地图。AWS:Textract+Bedrock(KYB)/OpenSearch(制裁)/SageMaker+Neptune(AML)/Region(驻留) |
| `_topics/63-ledger-reconciliation.md` | 📝 6.3账务对账 | 账务=支付心脏：复式记账(借贷恒等+append-only红冲)、多账户/清分/多币种(整数防浮点)、对账免疫系统(内部/外部/差错挂账红冲补单)、清算清分账务层统一。AWS:Aurora(强一致)+DynamoDB(幂等)+S3/Glue/Athena(批量对账)+Step Functions |
| `_topics/64-non-functional.md` | 📝 6.4非功能性 | 支付NFR(AWS主场)：CP信仰(正确性>可用性,分层)、六大NFR、幂等第一信条、分布式事务Saga(预扣-确认-补偿)+对账兜底、削峰扛峰、在线vs离线双架构。AWS:Aurora+DynamoDB+SQS+Step Functions+多AZ+CloudTrail |

**统一浏览**：`python3 _mdserver.py` → http://127.0.0.1:8911（左侧目录树导航，md 自动渲染含 Mermaid 图）

---

## 📚 参考材料总结（reference/summary/）

> 4 份 PPTX 演示文稿的内容总结（原始 PPTX 大文件不入 git，文字总结入 git）。主题：支付 × Agentic AI / Agentic Commerce。**对模块4(稳定币)、模块5(Agentic Payment)、模块6(风控)的研究是一手参考。**

| 文件 | 类型 | 内容摘要 |
|---|---|---|
| `reference/summary/README_参考材料概要.md` | 📝 概要 | **先读这份**：4份材料速览+跨材料6大主题（Agentic本质转变/四层协议栈/玩家格局/AWS能力栈/落地方法论/真实ROI）+对本项目各模块的衔接 |
| `reference/summary/Payment_Agentic_AI_总结.md` | 📝 逐页 | AWS FSI售前方法论(16页)：支付13大Workload全景、三分类切片(Common/提效/业务)、价值金字塔、AgentCore Payments双轨(Coinbase链上+Stripe链下)、Self-build标准栈、进场决策树、7类角色镜头 |
| `reference/summary/Agentic_AI_on_payment_总结.md` | 📝 逐页 | iPaylinks×AWS单客户落地(93页)：6大改造机会、Top5 AWS支付案例、20+场景方案(KYB/反欺诈XGBoost+GNN/支付路由/Chargeback/B2B虚拟卡/Visa A2A/Stripe ACP)、demo话术答疑、2个PoC、安全合规 |
| `reference/summary/Agentic_Commerce_Overview_总结.md` | 📝 逐页 | Agentic Commerce协议全景(20页)：四层协议栈(MCP/A2A→UCP/ACP→卡网络+稳定币双轨→信任层)、市场$3-5T、玩家格局(Stripe全赛道/Visa信任层/MC收购BVNK)、标准收敛趋势 |
| `reference/summary/AgenticPayment_介绍_总结.md` | 📝 逐页 | Agentic Payment安全与协议(31页)：核心论点"付款人不在场问题"、TAP/AP2/VCN/Network Token/x402协议、AWS两条资金轨(AgentCore Payments+Agenzo)、可验证可限额可撤销凭证 |

---

## 🌍 维度一：traditional-payment（传统 / 跨境支付）

| 文件 | 类型 | 内容摘要 |
|---|---|---|
| `01-cards-business.md` | 📝 模块1·业务 | (top-down主线)银行卡四方模型与收单产业链业务篇：①卡支付本质(推vs拉/信任) ②四方模型五角色+N×N+四方vs三方 ③**收单产业链**(收单行/Processor/ISO/PayFac/PSP定位、ISO vs PayFac分水岭、中国二清红线、案例、**跨境收款公司=跨境PayFac+换汇**) ④授权-清算-结算三段 ⑤**交易动作全集**(撤销Void/退款Refund/拒付Chargeback区别、增量授权、部分捕获)+**拒付完整生命周期**(Chargeback→Representment抗辩→仲裁、理由码、VROL、跨境胜率30-40%) ⑥MDR/交换费/分润(residual/markup/IC++) ⑦**发卡业务面**(虚拟卡+卡生命周期+账单Billing+卡测试攻击Card Testing)与收单(KYB/拒付) ⑧双边网络效应护城河。FAQ:MID/内部清算/多通道来源 |
| `01-cards-tech-aws.md` | 📝 模块1·技术 | (top-down主线)银行卡技术篇+AWS：①ISO 8583(MTI/位图/数据域)+卡BIN路由 ②刷卡时序(授权在线vs清算离线) ③**收单系统逻辑架构**(整体架构全景图串起持卡人/商户/网关/网关路由/处理器/风控/商户清分/清算结算交互;四大场景流程图:指令流授权/清算流含清分/结算流finality/拒付逆向流;组件=网关+处理器+清结算+商户管理+风控、网关vs处理器、Processor牌照/三种商业模式/AWS多租户、交互方式API/文件/DB、网关路由硬性匹配+择优least-cost、清结算分层、**风控组件**:六维度检查(卡/频率velocity/行为/设备IP/商户/合规)+三档动作(放行/加验/拒绝)+AWS实时风控架构) ④安全四件套(EMV/3DS/Tokenization/HSM各防一类攻击) ⑤PCI-DSS缩scope+密钥AWS(Payment Cryptography/Nitro Enclaves/CloudHSM/KMS/继承PCI-L1) **结算/Payout与商户银行交互**(不走卡组织,走银行转账体系ACH/实时支付RTP/电汇,四种方式,从备付金账户出,退票重试对账闭环,AWS:Step Functions/Transfer Family/Aurora) **发卡侧/虚拟卡**(与收单对称:发卡服务商IaaS挂靠BIN赞助行≈PayFac;核心=实时授权Webhook主动决策实现可编程控制;预付/信用/借记资金模式;场景费控/代付/跨境;AWS Lambda Webhook) ⑥**PayFac平台AWS架构**(多商户账本/分账/KYB/Payout,直通跨境收款技术底座)。FAQ:Processor牌照/中国玩家/交互方式 |
| `02-epayment-business.md` | 📝 模块2·业务 | (top-down)互联网电子支付业务篇：①互联网两大新问题(线上无POS/陌生人不信任) ②支付网关=互联网时代的POS+担保交易(解信任死结/支付宝起家) ③第三方支付(中美两路:中国账户闭环二维码绕开卡组织 vs 欧美卡网络融合) ④钱包余额支付=内部账本绕开卡组织+绑卡快捷支付 ⑤二维码(受理成本趋零)+聚合支付(不碰钱二清红线) ⑥商业模式(支付是入口不是利润,靠金融增值/浮存/流量) ⑦场景+流量护城河。FAQ:网关vs收银台/余额vs绑卡/备付金/断直连网联 |
| `02-epayment-tech-aws.md` | 📝 模块2·技术 | (top-down)电子支付技术篇+AWS：①网关架构(受理/令牌化/路由/异步通知) ②**线上支付为何必须异步**(先返回支付中→异步回调→重试+主动查询兜底)+支付状态机(支付中→待确认绝不默认失败) ③钱包内部复式记账+聚合路由(不持有资金) ④幂等(支付幂等键+回调去重)/多渠道对账/高并发削峰。AWS:API Gateway+Step Functions+SQS(FIFO)+Aurora+Payment Cryptography+Glue |
| `01c-hsm-payment-cryptography.md` | 📝 模块1·深化 | CloudHSM与Payment Cryptography实战(经AWS官方文档核实)：HSM=带密钥的运算器、支付密钥层级(LMK→KEK→PEK/PVK/BDK/CVK/EMV-MK,每种含业务场景解释)、**密钥交换业务场景全景**(谁和谁换:终端↔收单BDK/收单↔卡组织ZPK/卡组织↔发卡行ZPK/发卡↔芯片卡EMV,+银行间/制卡/第三方/商户/云迁移;第一性=交换需求源于机构安全域边界)、**密钥交换标准深入**(TR-31对称密钥块/用途绑定防混淆攻击、TR-34非对称首次建信、DUKPT一次一密KSN派生,各解决什么攻击+怎么做)、**密钥怎么进终端**(注入的是BDK派生的IPEK非BDK本身;传统KIF物理注入/RKL远程加载=TR-34用在终端;SoftPOS无安全芯片靠MPoC标准:密钥搬云端+TEE+软件保护+后端持续监控补偿)、**ZPK实务交换**(ZMK区域主密钥三级分发链:人工密钥仪式双重控制+分量XOR 或 TR-34→ZMK加密ZPK走TR-31→日常加密PIN)、**TR-34深度解读**(第一性:传统分量仪式三安全目标→TR-34非对称造安全信道→知识分割被消解/双重控制转移到IAM+审计→安全等价性)。TR-31/TR-34流程经AWS官方sample代码核对、三服务选型(Payment Cryptography支付专用/CloudHSM通用/KMS数据)、两API平面(Control Plane密钥管理+Data Plane运算)、**收单PIN翻译(TranslatePinData)**、**发卡PIN验证/CVV/EMV(VerifyPinData/CardValidationData/VerifyAuthRequestCryptogram)**真实调用链、密钥全生命周期 |
| `03-crossborder-business.md` | 📝 模块3·业务 | (top-down教学整合)跨境支付业务篇：①唯一总根源=没有共同账本(货币/系统/监管/时区/标准五重不同)+钱往往没真飞过国境 ②五大场景(电商收款/外贸B2B/汇款/旅游/订阅) ③代理行接力(nostro/vostro)+SWIFT只传报文 ④两套管道(电汇+卡组织)+第三方收款商=跨境PayFac+换汇 ⑤收益三板斧(手续费+汇差最隐蔽+浮存) ⑥四痛点(贵6.36%/慢/不透明/可达性差)+G20目标 ⑦中国出海(CIPS/银联国际/支付宝跨境/收款商)。多指针指向深度报告 |
| `03-crossborder-tech-aws.md` | 📝 模块3·技术 | (top-down)跨境技术篇+AWS：①SWIFT MT(MT103/MT202)→ISO20022(pacs.008/009)迁移2025.11共存期结束+各清算系统技术差异 ②多币种账务(每币种独立复式记账+换汇两笔分录+金额整数防浮点资损)+汇率引擎(Kinesis多源报价+外汇头寸对冲) ③**制裁筛查**(最硬合规,模糊匹配难点别名/音译,OpenSearch)+AML+外汇申报 ④跨境对账(多方多币种多时区+FX损益归因)。AWS:ECS协议网关+Aurora多币种+Kinesis汇率+OpenSearch制裁+Glue对账+Region数据驻留 |
| `03b-crossborder-collection-deepdive.md` | 📝 模块3·深化 | 跨境收款全链路逐环节剖开(连连/PingPong/Airwallex)：①买家付②平台代收③**境外本地收款账户**(核心产品,让平台打款变本地转账)④多币种账务⑤换汇(汇差核心利润+头寸对冲)⑥**合规申报**(外管局/真实性核验对应真实贸易,最硬一环)⑦境内Payout。**两个资金池**(境外USD+境内CNY,钱从未真跨境)、反向拒付垫付风险(rolling reserve)、全链路AWS(多Region数据驻留+Aurora多币种+Kinesis汇率+OpenSearch制裁+平台数据核验) |
| `跨境支付深度研究报告.md` | 📝 模块3·报告 | 带引用的完整研究报告：G20 跨境支付路线图（四摩擦四目标、11 量化目标）、各国清算系统（Fedwire/CHIPS/CHAPS/T2/CIPS）、代理行机制、SWIFT 报文与 ISO 20022、新兴技术（Nexus/mBridge/稳定币卡）、中国出海专题，附核查来源清单。📌已核查/🔧公知分级标注 |
| `跨境支付学习笔记.md` | 📝 笔记 | 第一性原理学习骨架：一条主线（账本公理→无共同账本→四套管道）+ 四套管道对比表 + 三大关键概念（清算vs结算、信息流vs资金流、钱的等级）+ 10 道自测题 |
| `跨境支付架构图.html` | 🌐 网页 | 6 张 Mermaid 可视化架构图（主线 / 四管道对比 / 代理行电汇资金流 / 卡组织四方模型与三段 / 稳定币接缝 / mBridge），自包含暗色主题网页 |

---

## 🪙 维度二：stable-coin（稳定币）

| 文件 | 类型 | 内容摘要 |
|---|---|---|
| `04-stablecoin-business.md` | 📝 模块4·业务 | (top-down教学整合)稳定币业务篇：①对账本公理的挑战(造全球开放账本)=链上账本+法币1:1锚定 ②三种锚定(法币储备型主流/超额抵押DAI/算法型UST已暴雷) ③核心价值=转账即结算(消灭代理行接力+清结算时滞) ④**on/off-ramp才是真瓶颈**(没消灭外汇/KYC,只是推到两端) ⑤落地=嵌入非替代(Stripe Bridge×Visa/Ripple×MC/x402,卡网络vs稳定币双轨) ⑥商业模式=储备利息(浮存极致)。中国:人民币换汇合规不可行 |
| `04-stablecoin-tech-aws.md` | 📝 模块4·技术 | (top-down)稳定币技术篇+AWS：①链上账本vs传统(记账本质同,信任从中心机构→密码学共识) ②**钱包/私钥=命根子**(私钥即所有权,丢=永久丢)+AWS私钥保护(**Nitro Enclaves隔离签名,私钥不出enclave**+KMS/CloudHSM+MPC) ③智能合约mint/burn=on-off ramp链上动作+链上转账流程(签名→共识→写区块即结算) ④Travel Rule+链上分析。AWS:Nitro(私钥)+Managed Blockchain(节点)+Glue/Neptune(链上分析)+网关(ramp)+Aurora(储备对账) |
| `stablecoin_research.md` | 📝 深度参考 | 稳定币综合研究(机制/储备/监管/对比/x402衔接,带核实来源) |
| `stablecoin_cross_border_compliance.md` | 📝 深度参考 | 稳定币跨境换汇合规(人民币/东南亚:每跳谁持牌、香港/新加坡通道) |
| `LEARNING_NOTES_小白到架构师.md` | 📝 笔记 | 稳定币六站学习链(区块链→私钥→稳定币→结算→跨境→x402)+自检清单 |

---

## 🤖 维度三：agentic-payment（智能体支付）

### 模块5 教学篇 + 综述与专题
| 文件 | 类型 | 内容摘要 |
|---|---|---|
| `05-agentic-payment-business.md` | 📝 模块5·业务 | (top-down整合骨架)Agentic Payment业务篇：①核心=只改了"人在场确认"这一件事(付款人不在场→重建授权可验证性) ②新问题(授权传递/Agent身份KYA/可验证凭证/争议归责/幻觉) ③**四层协议栈**(交互MCP-A2A/商业流程UCP-ACP/支付层卡网络-稳定币双轨/信任层KYA-VC) ④玩家格局(Google UCP-AP2/OpenAI-Stripe ACP/Visa TAP/MC Agent Pay/Coinbase x402/Amazon) ⑤双轨(卡vs稳定币) ⑥新护城河=标准话语权+信任层+Agent入口。多指向各协议专题 |
| `05-agentic-payment-tech-aws.md` | 📝 模块5·技术 | (top-down)Agentic Payment技术篇+AWS：①**授权可验证**(把人在场确认变机器凭证:Mandate/VC/Shared Payment Token,人签名→Agent持→验证方验签查限额) ②MCP/A2A通信 ③**x402微支付**(HTTP402原生,稳定币结算,机器对机器) ④**AgentCore Payments**(Preview,Coinbase链上+Stripe链下双轨,支出治理四要素) ⑤Self-build栈(AgentCore+Outgoing边界CloudFront/Lambda@Edge/x402 Facilitator+Guardrails+AP2 Mandate+Nitro私钥) ⑥Agent风控新威胁(幻觉/Prompt注入/身份伪造) |
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
