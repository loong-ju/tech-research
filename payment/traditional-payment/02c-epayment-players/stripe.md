# Stripe, Inc.

> 📌 **一句话定位**：面向开发者的支付基础设施公司("互联网的经济基础设施")，以 API 为企业提供线上线下收款、订阅计费、平台分账、发卡、资金账户、税务等全栈金融服务，骑在 Visa/MC 等卡网络之上。
> 🏷️ **角色归类**：**全栈型(收单 PayFac + 网关 + 聚合 + 增值金融)**（呼应 `02-epayment-business §3.2` 开放路线、`§3.2 延伸` 为何不做钱包）。
> ⚠️ **数据时效**：截至 2026-06。📌 财务/估值/产品经 Sacra + Wikipedia + stripe.com 官方页深度核对；私有公司不披露细分财报，收入按产品线占比无官方拆分。

---

## 1. 基本信息
- **成立**：2010 年(Palo Alto)，**Patrick Collison(CEO)+ John Collison(President)** 兄弟创立(此前已把 Auctomatic 卖给 Live Current Media)
- **总部**：**双总部**——美国 South San Francisco + 爱尔兰都柏林(2025-10 开第二个都柏林 HQ)
- **当前状态**：⚠️**未上市**(私有)，无股票代码；靠 tender offer(要约收购)给员工/股东流动性，不急于 IPO；Collison 兄弟持控制权

## 2. 背景与沿革（里程碑时间线）📌
| 时间 | 里程碑 |
|---|---|
| 2010 | Collison 兄弟创立 |
| 2011-09 | 公开上线，获 Thiel/Musk/Sequoia/a16z 等 $2M |
| 2012 | 推 **Connect**(平台分账) |
| 2016/18 | Atlas(公司注册)/Stripe Press；推 **Issuing 发卡、Radar 风控** |
| 2019 | 推 Terminal(线下)、Capital(融资) |
| 2020 | 收购 **Paystack**(~$200M，进入非洲) |
| 2021 | 收购 TaxJar/Recko；推 **Link、Tax、Treasury**；估值高点 **$95B**(3月) |
| 2024-04 | 重启加密 pay-in(USDC) |
| 2025-02 | **完成收购 Bridge($1.1B，迄今最大收购)**——稳定币战略核心 |
| 2025-05 | 发布**支付 AI 基础模型** + **稳定币金融账户(101 国)** |
| 2025-06 | 收购 **Privy**(嵌入式加密钱包)；与 Shopify 推全商户稳定币支付 |
| 2025-09 | Link 破 2亿用户；与 **OpenAI 共建 Agentic Commerce Protocol(ACP)** 驱动 ChatGPT Instant Checkout |
| 2025-12 | 发布 Agentic Commerce Suite；宣布收购 Metronome；BFCM 四天处理超 $40B |
| 2026-02 | tender offer 估值 **$159B**(较 2025-02 的 $91.5B 增约 70%) |
| 2026-04 | Sessions 2026 发布 **288 项**新产品/功能 |

> 战略主线：单点"开发者友好收单 API" → 平台化"全栈金融基础设施"(收单+计费+发卡+银行+税务+注册) → 当前向"**AI 时代经济基础设施 + 稳定币 + Agentic Commerce**"延伸。

## 3. 股东与资本 📌
- **早期投资人**：Peter Thiel、Elon Musk、Sequoia、a16z、SV Angel(2011 种子 $2M)
- **估值曲线(剧烈波动)**：2021-03 **$95B** → 2022-07 内部降 **$74B** → 2023-03 Series I($6.5B+)按 **$50B** → 2024-07 409A **$70B** → 2025-02 约 **$91.5B** → **2026-02 tender offer $159B**
- 累计融资约数十亿美元；Collison 兄弟持控制权

## 4. 牌照与资质 📌部分核查（⚠️ stripe.com/legal/licenses 抓取 404，证号级未穷举）
- **美国**：**Stripe Payments Company** 在绝大多数州持 MTL + FinCEN 注册 MSB(Connect 文档明确"leverages money transmitter license")；逐州证号需查 NMLS
- **欧盟/EEA**：**Stripe Payments Europe, Limited(SPEL)**，都柏林注册，受**爱尔兰央行 CBI** 监管持 **EMI** 牌照，EU passporting 覆盖 EEA
- **英国**：Stripe Payments UK, Ltd，受 FCA 监管(脱欧后独立持牌，FRN/EMI-vs-API 未核)
- **稳定币(Bridge 实体)**：美国稳定币货币转移由 **Bridge Building Inc(NMLS #2450917)** 持有；EEA 由 Bridge Building Sp. z o.o.(波兰)；运营 Bridge Ventures LLC
- 非洲经 Paystack 持牌；30+ 国直接运营。⚠️ "几十项牌照"逐项归属未穷举，需查 NMLS/FCA/CBI/MAS/ASIC/日本财务局

## 5. 定位与商业模式（收入结构）📌Sacra + 结构判断
📌 **关键：net take rate ≈ 0.40%**——Stripe 毛费率约 3%(美国标准价 2.9%+$0.30、日本 3.6%)，但绝大部分付给发卡行(interchange)、卡组织(network fee)与合作方，**扣除后净 take rate 约 0.40%**(Sacra)。Stripe 公布的"收入"通常指**净收入**而非毛流水。
- **按来源(无官方百分比拆分)**：① **核心支付处理(Payments/Connect 抽佣)= 收入主体** ② **软件/SaaS 增值**("Revenue & Finance Automation"套件：Billing/Tax/Invoicing/Sigma — 2026 年有望达 **$1B 年化运行率**，较 2025-02 的 ~$500M 翻倍，高毛利，战略上主动提占比改善 margin) ③ 金融服务(Issuing 分 interchange/Capital 借贷固定费/Treasury 浮存) ④ 稳定币浮存(Bridge 储备投美债"3-4%"，占比尚小)
- 📌 EBITDA：2025 年约 **$1.2B**(Sacra)

## 6. 核心产品与业务范围 📌stripe.com 官方页逐个核实
- **Payments(旗舰)**：在线/移动收单核心，支持 Visa/MC/Amex/JCB/Discover + 数字钱包(Apple/Google Pay/PayPal/Alipay/微信/Cash App)+ 本地方式(Boleto/OXXO/PromptPay/PayNow)；**135+ 货币、30+ 国直接**；组件 Checkout/Elements/Payment Links/Invoicing；收入优化 Adaptive Acceptance/智能路由/自动卡更新/3DS2
- **Connect**：多方支付/平台基础设施，**16,000+ 平台、1,100万+ 注册账户**；嵌入式 KYC 入驻(46+国/14语言，含 AML/MATCH list)；用户 Shopify/DoorDash/Instacart/Lyft/GitHub/Salesforce
- **Billing**：订阅与计费全生命周期，**35万企业、~2亿活跃订阅**；Smart Retries 平均挽回 55% 失败支付；收入确认(ASC606/IFRS15)；企业级用量计费经 **Metronome**(2026-01 收购)
- **Radar**：ML 反欺诈，基于全网 **$1.9T/年、197 国**数据训练(92% 卡此前见过)，平均降欺诈 32%；含 Verifi/Ethoca 争议预防
- **Issuing**：发卡平台(虚拟+实体)，可由信用/已赚收入/**稳定币余额**支撑，赚 interchange 分成，已与 Bridge 集成发"稳定币支撑卡"
- **Terminal**：线下收单(Reader S700/Tap to Pay)；**Capital**：商户现金垫款(基于流水授信，美国由 YouLend 提供)
- **Treasury**：BaaS 银行即服务，美国资金存合作行 **Fifth Third Bank**(FDIC pass-through)，⚠️ Stripe 本身非 FDIC 机构
- **Tax**：自动税务(100+ 国+全美各州，600+ 类目，0.5%/笔)；**Atlas**：创业公司注册(Delaware+EIN+83(b)，与 Cooley 合作)
- **Link**：加速结账网络，**2亿+ 用户**(2025-09 破)，回头客完成率 +14%，OpenAI 案例结账 +40%

## 7. 业务区域 📌
- **北美(核心基本盘)**：美国(最大市场，Stripe Payments Company 持各州 MTL，Treasury 由 Fifth Third 托管)；加拿大直接运营
- **欧洲(第二据点)**：爱尔兰都柏林(双总部之一，SPEL 持 CBI EMI passport EEA)；英国(FCA)；2026-06 与 Lloyds 合作服务英国小微；"在法国十年"(2026-05)
- **亚太(扩张中)**：日本(2025-09 推 Terminal Japan 支持 PayPay)、新加坡、澳大利亚、印度直接运营，支持 PayNow/PromptPay/GrabPay/KakaoPay
- **拉美**：墨西哥(OXXO)、巴西(Boleto)｜**非洲**：经 Paystack(尼日利亚/加纳/南非，独立品牌)
- 跨境 payout 自助限 US/UK/EEA/CA/CH 五区互转(0.25%/笔)，其余需联系销售；整体支持 135+ 货币

## 8. 规模与数据 📌Sacra+Wikipedia+年报（多年趋势）
- **净收入**：2023 **$3.82B** → 2024 **$5.1B(+34%)** → 2025 **~$6.9B**(口径 28%~36% 有差异)
- **TPV**：2024 **$1.4T** → 2025 **超 $1.9T(+34%)**，为 500 万家企业处理
- **盈利曲线(显著改善)**：2023 税前亏 $1.2B → 2024 税前利润 $101.9M(**扭亏**) → 2025 EBITDA 约 $1.2B
- 员工 ~8,500(2025)；BFCM 2025 四天处理超 $40B

## 9. 组织架构 + 管理层 📌Stripe leadership 页
- **Patrick Collison**(CEO/董事，1988 生于爱尔兰 Limerick，MIT 辍学)、**John Collison**(President/董事，弟)
- **CFO Steffan Tomlinson**(前 Google Cloud CFO)；**CTO Rahul Patil**(新晋，接替 David Singleton，负责 ledger/billing/监管税务平台)；**CBO William Alvarado**
- 董事会：Mark Carney 2021 入、2025 离任(竞选加拿大自由党领袖)
- **法律实体**：Stripe, Inc.(美母公司)→ Stripe Payments Company(美持牌)/SPEL(爱尔兰 EMI)/Stripe Payments UK(FCA)/Bridge Building Inc(美)·Sp. z o.o.(波兰)·Bridge Ventures LLC(稳定币)。⚠️ 内部事业群按产品线(Payments/Revenue&Finance Automation/BaaS/Stablecoin-Bridge/Atlas)

## 10. 技术架构特点 📌
- **API-first**：开发者友好 REST API+幂等键+完善文档+多语言 SDK，是"开发者最爱"定位的技术根基；Billing 报 99.999% 可用性(自述)
- **AI 布局**：2025-05 发布**支付基础模型**(用全网 $1.9T/197国交易数据训练，用于欺诈识别/授权优化)；2026-04 Sessions 发 288 项 AI 功能
- **Agentic**：与 OpenAI 共建 **ACP 协议**(AI agent 对话内下单结算)；2026-05 接入 **AWS AgentCore + Privy** 做 agent 支付
- **稳定币栈**：Bridge(Orchestration/Issuance API+自有稳定币 **USDB** 1:1 USD+BlackRock 基金支撑)；Privy(TEE 硬件隔离+分布式密钥分片嵌入式钱包，支持 EVM/Solana/Bitcoin)
- ⚠️ 是否自建/用某公有云无权威一手披露(历史有用 AWS 报道，未核)

## 11. 护城河与差异化
① **开发者体验/API 标准**(开发者心智+高切换成本) ② **全栈产品锁定**(收单→发卡/银行/税务/注册，交叉销售) ③ **Radar 全网数据网络效应**(92% 卡见过) ④ 多区域牌照(爱尔兰 EMI+美国 MTL) ⑤ **Link 一键结账网络效应**(2亿用户) ⑥ **稳定币卡位最激进**(Bridge $1.1B+Privy 双收购+自有 USDB，把"全球美元账本"卡进自家栈)

## 12. 主要竞争对手 📌+🔧具体对比
- **vs Adyen(最直接企业级对手)**：2024 TPV Stripe $1.4T vs Adyen €1.29T，量级相当。Stripe="开发者最爱"API/可定制强、中小+数字原生+长尾平台广；Adyen=单一平台 unified commerce、线上线下一体、**大企业/全渠道零售更强**且长期盈利(Stripe 2024 才扭亏)。牌照：Adyen 自持银行牌照度高，Stripe 美国靠 MTL/欧洲靠 EMI、银行能力靠合作行
- **vs PayPal/Braintree**：Stripe 在开发者/企业集成胜，PayPal 强 C 端钱包网络
- **vs Block(Square)**：Square 强线下中小商户/POS，Stripe 主战线上+平台
- **差异化护城河**：产品广度 + Radar 全网数据 + 开发者生态 + 稳定币卡位(竞品中最激进)

## 13. 监管与最新动态 ⚠️时效 2025-2026
- 📌 **2026-03-26 FTC 警告信**：FTC 主席致信 Stripe/PayPal/Visa/MC，警告"**debanking**"(因政治/宗教观点拒服务)可能违反 FTC Act 第5条——属警告非处罚
- 📌 裁员：2022-11 约 14%；2025-01 约 300 人(因"卡通鸭子"通知图争议道歉)
- ⚠️ 未查到 Stripe 受重大监管罚款/牌照吊销公开记录(未上市无 10-K，非穷举)
- **最新动态**(详见 §2 时间线)：2025-05 稳定币账户/支付AI模型、2025-06 Privy、2025-09 ACP/Link 2亿、2025-12 Agentic Commerce Suite/Metronome、2026-02 估值 $159B、2026-04 Sessions 288 项、2026-05 AWS AgentCore 合作

## 14. 标杆客户 📌
- **数字原生巨头**：Amazon、Airbnb、Uber、**OpenAI**、Atlassian、**Shopify**、DoorDash、Instacart、Lyft、GitHub、Salesforce、Substack
- **传统大企业**：BMW、Ford、Maersk、Le Monde
- **代表案例**：Shopify(Stripe 是 Shopify Payments 底层处理方，2025-06 推全商户稳定币)；OpenAI(Link 提速 40%+ACP 驱动 ChatGPT Instant Checkout)；Deel(2026-06 承包商稳定币钱包)；Bridge 稳定币 API 客户含 Klarna/MetaMask/Bitso 等
- ⚠️ Amazon 在名单确认，但具体使用范围(全量 vs 特定业务线)未独立核实

## 15. 与本研究 / AWS 对话的衔接
- **可聊**：**开放路线全栈收单的极致**(§3.2)；为何刻意不做 C 端钱包(§3.2 延伸)；**净 take rate 仅 0.4%、靠规模+软件化升级利润**的盈利结构；**稳定币卡位最激进**(Bridge/USDB/Privy，与模块4/模块5 强衔接)；ACP/Agentic Commerce(模块5)
- **AWS 角度**：① **2026-05 已与 AWS AgentCore 合作做 agent 支付**——直接对话入口；② 支付基础模型/Agentic Commerce 是大规模 AI 推理+实时风控负载(Bedrock 协同)；③ 稳定币账户多法域合规+低延迟清结算(多 Region/HSM/KYT)；④ Atlas 客户群是 AWS 创业生态天然交集
- **风险信号**：估值剧烈波动(宏观敏感)、长期未上市靠 tender offer、2026-03 FTC debanking 警告(政治监管风险上升)、净 take rate 仅 0.4%

## 16. 来源清单 📌
- 一手：stripe.com(payments/connect/issuing/treasury/capital/billing/radar/tax/atlas/link 产品页+newsroom)、docs.stripe.com/connect、bridge.xyz、privy.io、Stripe leadership 页、UK Services Agreement
- 权威二手：en.wikipedia.org/wiki/Stripe,_Inc.、/Patrick_Collison、sacra.com/c/stripe(估值/收入/TPV/EBITDA/里程碑)
- ⚠️ 完整逐项牌照(证号/逐州/逐国)需查 NMLS/FCA Register/CBI/MAS/ASIC；收入按产品线百分比 Stripe 不披露
