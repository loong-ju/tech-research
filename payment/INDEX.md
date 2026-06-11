# 📑 支付研究目录索引 (INDEX)

> 本文件是 `payment/` 支付研究主目录的内容索引，覆盖学习路径与三大维度下的全部研究材料。
> **维护规则**：每次新增 / 删除 / 重命名文件后，同步更新本文件（见 `CLAUDE.md` 二·5 索引维护）。
> 最后更新：2026-06-11（**跨境收款商核查回填**:📌资金落点坐实(Airwallex香港用户协议明文:客户资金第一站进Airwallex自己名下底层银行账户、与他人资金混同合并commingled/pooled、beneficially ours not held on trust、Global Account是虚拟账户非客户名下、美国经Evolve Bank合作行)→证实"钱先进收款商归集账户非卖家名下";📌逐法域牌照(Payoneer爱尔兰EMI C189473经央行名册确认/PingPong英国EMI FRN974154经FCA+CompaniesHouse确认/Airwallex港MSO16-09-01929+美NMLS1928093/连连MSB31000268954299);❌驳回"PingPong持新加坡MPI+香港MSO"(未一手核实);⚠️到账周期/费率仍未核;回填02b §5.4+airwallex/pingpong画像。**02b 收尾核查回填**:BNPL 升级📌(下单即垫付全额给商户/BNPL自担消费者违约风险/银行合作放款买债权/0%APR商户费更高,Affirm·Klarna·Block招股书确证;⚠️MDR数字区间仍未披露)、钱包底座具体归类升级📌(PayPal/Cash App=储值余额账户、Shop Pay/Stripe Link=保存支付信息骑卡轨道不持余额,SEC/官方docs确证;否决"按重定向反推轨道");⚠️跨境收款商资金落点/逐法域牌照两轮均未取得一手断言、标待核。**目录重构**：`traditional-payment/` 按"卡/电子支付/跨境"拆为三个一级目录 `card-payment/`、`e-payment/`、`crossborder/`；`支付牌照术语速查.md` 移到根目录；同步更新 CLAUDE.md 维度表/索引、INDEX 结构总览、_mdserver.py 导航顺序、跨文件路径引用。**新增 `crossborder/03d-trade-settlement.md` 跨境贸易模式与结算方式**(经deep-research核查:国际结算方式风险光谱T/T/L-C/D-P/O-A+全球趋势O/A占融资70-90%+中国海关监管方式0110/9610/9710/9810/1039/1210逐码发文号+外综服+小微电商20万美元名录登记;海关代码经二次定向核查纠正发文号:9610=2014年第12号非57号);03b §6.0.1 合规人的一天(四道关映射+PPT遗漏SAFE);**新增 `02b-ecommerce-payment.md` 电商支付业务场景**:经deep-research核查的买家支付方式8大类/钱包两种底座/Amazon Pay×Stripe机制/Connect三种收款模型;同步在 01-cards-business §2.1.2 补推拉电商对号入座+§4.3.1 PayFac落地判定+§4.6.1/4.6.2 连连双重角色(平台店vs独立站经营对比已迁入02b §6.1.1);02 §4.2.2 做钱包两类合规(牌照vs PCI);02b §6.1.1 收纳平台店vs独立站经营对比(从01迁入);02c stripe.md 补FBO资金两段式+payout时机/换通道+中国卖家Shopify回国;lianlian.md §4.1/4.2 牌照对应资金链+收款通道vs收单区别;03 业务篇 §4.2.1 投资/融资资本项目、§4.3 报文演进ISO20022非SWIFT专有澄清；以上为前次:stripe.md 深化§6/§7/§9/§10.6；连连/PingPong/Airwallex深化;03技术篇§3.2/§4.1/§4.2.1;支付牌照术语速查§6/§7）

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
├── 支付牌照术语速查.md         跨模块通用：牌照术语速查（MTL/EMI/MSB…）
├── card-payment/              维度一·模块1：银行卡（四方模型/收单/HSM）
├── e-payment/                  维度一·模块2：电子支付（网关/钱包/电商场景/企业画像）
├── crossborder/               维度一·模块3：跨境支付（管道/收款/贸易结算/企业画像）
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
| `_topics/62-compliance.md` | 📝 6.2合规 | 合规体系：三目标(反匿名KYC/KYB/KYA+阻断非法资金AML/制裁/CFT+保护数据PCI/驻留/隐私)、制裁筛查模糊匹配、AML拆分监测、**KYT交易监测**(vs反欺诈风控边界:共用底层但KYT是反洗钱视角+SAR上报;实现=规则+行为基线偏离+ML+图+名单,实时离线双模)、Travel Rule、牌照地图。AWS:Textract+Bedrock(KYB)/OpenSearch(制裁)/SageMaker+Neptune(AML/KYT)/Region(驻留) |
| `_topics/63-ledger-reconciliation.md` | 📝 6.3账务对账 | 账务=支付心脏：复式记账(借贷恒等+append-only红冲)、多账户/清分/多币种(整数防浮点)、对账免疫系统(内部/外部/差错挂账红冲补单)、清算清分账务层统一。AWS:Aurora(强一致)+DynamoDB(幂等)+S3/Glue/Athena(批量对账)+Step Functions |
| `_topics/64-non-functional.md` | 📝 6.4非功能性 | 支付NFR(AWS主场)：CP信仰(正确性>可用性,分层)、六大NFR、幂等第一信条、分布式事务Saga(预扣-确认-补偿)+对账兜底、削峰扛峰、在线vs离线双架构。AWS:Aurora+DynamoDB+SQS+Step Functions+多AZ+CloudTrail |

**统一浏览**：`python3 _mdserver.py` → http://127.0.0.1:8911（左侧目录树导航，md 自动渲染含 Mermaid 图）

---

## 📚 参考材料总结（reference/summary/）

> 5 份 PPTX 演示文稿的内容总结（原始 PPTX 大文件不入 git，文字总结入 git）。前 4 份主题：支付 × Agentic AI / Agentic Commerce；第 5 份(Quick合规)主题独立=跨境合规×Amazon Quick。**对模块4(稳定币)、模块5(Agentic Payment)、模块6(风控/合规)、模块3(跨境)的研究是一手参考。**

| 文件 | 类型 | 内容摘要 |
|---|---|---|
| `reference/summary/README_参考材料概要.md` | 📝 概要 | **先读这份**：5份材料速览+前4份跨材料6大主题（Agentic本质转变/四层协议栈/玩家格局/AWS能力栈/落地方法论/真实ROI）+第5份独立主题(跨境合规×Quick)+对本项目各模块的衔接 |
| `reference/summary/Payment_Agentic_AI_总结.md` | 📝 逐页 | AWS FSI售前方法论(16页)：支付13大Workload全景、三分类切片(Common/提效/业务)、价值金字塔、AgentCore Payments双轨(Coinbase链上+Stripe链下)、Self-build标准栈、进场决策树、7类角色镜头 |
| `reference/summary/Agentic_AI_on_payment_总结.md` | 📝 逐页 | iPaylinks×AWS单客户落地(93页)：6大改造机会、Top5 AWS支付案例、20+场景方案(KYB/反欺诈XGBoost+GNN/支付路由/Chargeback/B2B虚拟卡/Visa A2A/Stripe ACP)、demo话术答疑、2个PoC、安全合规 |
| `reference/summary/Agentic_Commerce_Overview_总结.md` | 📝 逐页 | Agentic Commerce协议全景(20页)：四层协议栈(MCP/A2A→UCP/ACP→卡网络+稳定币双轨→信任层)、市场$3-5T、玩家格局(Stripe全赛道/Visa信任层/MC收购BVNK)、标准收敛趋势 |
| `reference/summary/AgenticPayment_介绍_总结.md` | 📝 逐页 | Agentic Payment安全与协议(31页)：核心论点"付款人不在场问题"、TAP/AP2/VCN/Network Token/x402协议、AWS两条资金轨(AgentCore Payments+Agenzo)、可验证可限额可撤销凭证 |
| `reference/summary/TechSummit_Quick合规_总结.md` | 📝 逐页 | ⚠️**主题独立·AWS演示脚本+虚构脱敏数据**：跨境支付合规×Amazon Quick(26页)。合规三战线痛点(多辖区监管变动/KYB准入/AML筛查)+双重监管(境内SAFE×境外MAS/FinCEN)+"人力线性vs监管指数"；Amazon Quick(QuickSight+Q Business合并)三兑现=可溯源问答/Agent算差距评风险/Dashboard预警，四件套(Chat/Agents/Spaces/Integrations)；全链路demo(知识库可溯源问答→SOP差距比对Agent→KYB评分Agent 72分/World-Check/UBO→AML告警调查+跨辖区SAFE+MAS/STRO的SAR/STR起草→合规驾驶舱)全程human-in-the-loop；四步方法论。**喂模块6.2合规+模块3跨境** |
| `reference/Stripe on AWS 分析.md` | 📝 汇总 | 🔧**AWS Highspot 售前资料库 10 份 PPTX 汇总**(Sales Play/Tech Talk,2026-05~06)：Stripe on AWS 逐 deck 摘要+关键数字($1.9T/99.9995%/Minions 1300PR周)+5大AI编码原则+AWS技术栈映射。**已喂入 02c stripe.md §10.6"按 workload 看 Stripe on AWS"**(7~9类workload+PPT下载链)。⚠️ 多数 deck 的 AWS 服务映射为售前推断、非 Stripe 点名 |
| `reference/PPT修改建议_TechSummit_Quick合规.md` | 📝 建议 | **对 TechSummit_Quick合规 PPT 的修改建议**(与 03 技术篇 §4.1 制裁筛查交叉核对得出)：3 处实质遗漏(🔴名单更新回溯重筛/🟠AI只治标缺降误报率/🟡只提World-Check缺四大一手名单)+1 处虚构数字角标建议+可保留优点。§4.1 已据此补 UBO 穿透+EDD 处置档 |

---

## 🌍 维度一：传统支付（card-payment 银行卡 / e-payment 电子支付 / crossborder 跨境）

| 文件 | 类型 | 内容摘要 |
|---|---|---|
| `01-cards-business.md` | 📝 模块1·业务 | (top-down主线)银行卡四方模型与收单产业链业务篇：①卡支付本质(推vs拉/信任) ②四方模型五角色+N×N+四方vs三方 ③**收单产业链**(收单行/Processor/ISO/PayFac/PSP定位、ISO vs PayFac分水岭、中国二清红线、案例、**跨境收款公司=跨境PayFac+换汇**) ④授权-清算-结算三段 ⑤**交易动作全集**(撤销Void/退款Refund/拒付Chargeback区别、增量授权、部分捕获)+**拒付完整生命周期**(Chargeback→Representment抗辩→仲裁、理由码、VROL、跨境胜率30-40%) ⑥MDR/交换费/分润(residual/markup/IC++) ⑦**发卡业务面**(虚拟卡+卡生命周期+账单Billing+卡测试攻击Card Testing)与收单(KYB/拒付) ⑧双边网络效应护城河。FAQ:MID/内部清算/多通道来源 |
| `01-cards-tech-aws.md` | 📝 模块1·技术 | (top-down主线)银行卡技术篇+AWS：①ISO 8583(MTI/位图/数据域)+卡BIN路由 ②刷卡时序(授权在线vs清算离线) ③**收单系统逻辑架构**(整体架构全景图串起持卡人/商户/网关/网关路由/处理器/风控/商户清分/清算结算交互;四大场景流程图:指令流授权/清算流含清分/结算流finality/拒付逆向流;组件=网关+处理器+清结算+商户管理+风控、网关vs处理器、Processor牌照/三种商业模式/AWS多租户、交互方式API/文件/DB、网关路由硬性匹配+择优least-cost、清结算分层、**风控组件**:六维度检查(卡/频率velocity/行为/设备IP/商户/合规)+三档动作(放行/加验/拒绝)+AWS实时风控架构) ④安全四件套(EMV/3DS/Tokenization/HSM各防一类攻击) ⑤PCI-DSS缩scope+密钥AWS(Payment Cryptography/Nitro Enclaves/CloudHSM/KMS/继承PCI-L1) **结算/Payout与商户银行交互**(不走卡组织,走银行转账体系ACH/实时支付RTP/电汇,四种方式,从备付金账户出,退票重试对账闭环,AWS:Step Functions/Transfer Family/Aurora) **发卡侧/虚拟卡**(与收单对称:发卡服务商IaaS挂靠BIN赞助行≈PayFac;核心=实时授权Webhook主动决策实现可编程控制;预付/信用/借记资金模式;场景费控/代付/跨境;AWS Lambda Webhook) ⑥**PayFac平台AWS架构**(多商户账本/分账/KYB/Payout,直通跨境收款技术底座)。FAQ:Processor牌照/中国玩家/交互方式 |
| `02-epayment-business.md` | 📝 模块2·业务 | (top-down)互联网电子支付业务篇：①互联网两大新问题(线上无POS/陌生人不信任) ②支付网关=互联网时代的POS+担保交易(解信任死结/支付宝起家) ③第三方支付(中美两路:中国账户闭环二维码绕开卡组织 vs 欧美卡网络融合) ④钱包余额支付=内部账本绕开卡组织+绑卡快捷支付(**§4.2.1深挖**:中国绑卡=快捷支付/代扣协议非存裸卡号、支付宝微信机制一致、四要素=姓名+身份证+卡号+预留手机号+短信、绑卡存"协议标识"≠"卡号token"两者别混、卡号PAN须加密token化进vault+CVV2禁存+PIN不碰、持牌主体担PCI-L1、余额支付分两层=付款瞬间内部账本不经网联但充值/提现/卡扣涉银行必经网联(断直连)、直接卡扣vs先充余额产品策略;**§4.2.2做钱包两类合规**:牌照(持有用户余额=必须持储值/MTL/EMI硬牌照,中国《支付业务许可证》+备付金100%集中存管/美MTL+MSB/欧盟EMI;账户型钱包持牌vs Apple Pay token型不持储值牌照,Stripe不做C端钱包即为免储值牌照)vs PCI-DSS(碰卡数据=过PCI通常L1,缩scope策略;两者不同维度=能不能持钱vs怎么安全碰卡)) ⑤二维码(受理成本趋零)+聚合支付(不碰钱二清红线;**§5.2.1收银台/网关/收单三角色**:收银台=平台自有前端路由不碰钱、网关=聚合编排、收单随支付方式变(京东收银台三链路:刷卡=京东自收单/微信=财付通/支付宝=蚂蚁,因分属三账本无法互相清算);**§5.2.2三种聚合模式**:无牌聚合服务商纯技术不碰钱vs持牌机构兼做vs平台自建,二清红线) ⑥商业模式(支付是入口不是利润,靠金融增值/浮存/流量;**§6.1收入构成比例·已核查一手**:蚂蚁2020招股书H1 2020=微贷39.4%/支付35.9%/理财15.6%/保险8.4%,金融科技合计63.4%>支付,坐实"支付是入口"⚠️H1 2020快照非现状·IPO叫停后未再披露·信贷已被整改约束;腾讯只披露合并"金融科技及企业服务"分部2023=33%/2024=32%不拆支付;备付金2019.1.14起100%集中存管掐断浮存;费率区间扫码0.38-0.6%/提现0.1%等=🔧行业公知未核实) ⑦场景+流量护城河(**§7.1聚合支付服务商护城河天然浅**:技术聚合可复制+被上游通道夹击+不碰钱无金融红利;真壁垒只在B端=地推铁军/商户网络密度+经营SaaS黏性+数据增值,守商户非守用户)。**§3.2澄清**:二维码vs Stripe核心区别不是扫码vs刷卡,而是走自家闭环账本vs走卡网络账本,二维码只是闭环零硬件受理入口;**延伸**:Stripe刻意不做钱包(B端基础设施无C端账户封不了环+骑卡网络+不扛储值牌照)、PayPal其实有钱包但美国卡轨太强没长成超级账户,根因=钱包闭环只在卡轨弱市场才赢(市场禀赋非战略)。FAQ:网关vs收银台/余额vs绑卡/备付金/断直连网联 |
| `02-epayment-tech-aws.md` | 📝 模块2·技术 | (top-down)电子支付技术篇+AWS：①网关架构(受理/令牌化/路由/异步通知) ②**线上支付为何必须异步**(先返回支付中→异步回调→重试+主动查询兜底)+支付状态机(支付中→待确认绝不默认失败) ③钱包内部复式记账+聚合路由(不持有资金) ④幂等(支付幂等键+回调去重)/多渠道对账/高并发削峰。AWS:API Gateway+Step Functions+SQS(FIFO)+Aurora+Payment Cryptography+Glue |
| `02b-ecommerce-payment.md` | 📝 模块1·2深化 | (top-down,横跨卡+电子支付)**电商支付业务场景**：买家怎么付×撮合层×卖家怎么收。**经deep-research对抗式核查(24/25条3-0,引Stripe官方docs等一手)**：①买家侧支付方式8大类官方骨架(卡/银行借记/银行重定向/银行转账/BNPL/实时支付/代金券/钱包)→归三条轨道(卡=拉实时授权商户担拒付、银行借记=拉基于mandate确认慢T+4争议判客户赢、实时支付=从银行推) ②**钱包不是单一机制**(📌Stripe官方:两种资金底座=token化卡/银行凭证如Apple Pay走卡轨道同卡费率 vs 独立钱包余额账户型如PayPal/Amazon Pay) ③Apple Pay=卡的壳(MPAN/MIT)、Amazon Pay=账户型钱包重定向(`amazon_pay`作wallet被Stripe接入Dashboard一键开) ④**两种易混合作**:Shopify×Stripe=垂直白标(Stripe在底) vs Amazon Pay×Stripe=钱包上架为支付方式(Amazon Pay在上方向相反) ⑤卖家侧钱第一站=**Stripe Connect三模型**(Direct直接进卖家/Destination先进平台即时分/Separate先进平台解耦转账)+到账T+2~3或Instant+Shopify日周月批量资金先沉淀靠处理伙伴+Adyen资金留balance account+合规靠Stripe自有MTL/EMI ⑥场景矩阵(平台店vs独立站×境内vs跨境)+平台店vs独立站经营对比+BNPL(第三方垫付全额消费者分期⚠️待核)+完整链路信息流/资金流分离。**§2.3.1即时支付深挖(经deep-research一手核查)**:📌BIS/CPMI权威定义"收款人即时到账≠银行间结算"被显式解耦;两结算模型=实时全额RTGS(FedNow美联储/TIPS欧央行/RTP-TCH,央行货币逐笔终局,收款后才解锁无PSP信用风险)vs延迟净额DNS(印度UPI架在IMPS之上,即时到账但银行间按周期轧差OC122的10周期经RTGS轧MNSB,收款行隐性垫资故难撤回);报文标准FedNow/RTP=ISO20022、UPI=NPCI自有API(非ISO20022)、⚠️PIX本轮无一手确证待核BCB、⚠️别名寻址VPA/PIXKey待核;借记卡vs即时支付=卡轨道ISO8583拉T+1~2 vs 银行轨道(多)ISO20022推央行货币秒结。**§2.3.2为何印度走UPI中国走支付宝**:钱在银行账户vs充进平台余额、央行系公共网互通vs私企闭环重牌照、Aadhaar激活已有账户vs钱包填空白。⚠️"钱包token化使处理器不接触卡号"被核查否决(1-2)不下定论;BNPL数字/跨境收款商资金落点本轮未覆盖标待核。附A引用清单17条一手来源 |
| `支付牌照术语速查.md` | 📝 跨模块·速查 | **支付牌照术语通用科普**(02c/03c各画像引用):MTL(美国逐州货币转移牌照)/MSB(FinCEN联邦反洗钱注册)/NMLS(牌照登记查询系统)/EMI(欧盟电子货币机构,passporting覆盖EEA)/PI/MSO/MPI/BitLicense/MiCA/GENIUS等总表。核心心智模型=**持牌支付机构=账本+指令+合规层,碰钱靠合作银行FBO账户**。讲透:美国联邦MSB+逐州MTL双层(vs欧盟一张EMI护照全EEA)、"接收谁指令/如何转移/FBO账户怎么合作"、需银行牌照的功能(存款/发卡/放贷)如何挂靠合作行(BIN赞助)、各家牌照布局差异 |
| `01c-hsm-payment-cryptography.md` | 📝 模块1·深化 | CloudHSM与Payment Cryptography实战(经AWS官方文档核实)：HSM=带密钥的运算器、支付密钥层级(LMK→KEK→PEK/PVK/BDK/CVK/EMV-MK,每种含业务场景解释)、**密钥粒度**(非一POS一key/一卡一key,而是按隔离边界建少量母密钥+派生覆盖海量实体:1 BDK覆盖一批终端/1 PVK覆盖一批卡/EMV主密钥派生每卡;Payment Cryptography只建母密钥故成本可控)、**密钥交换业务场景全景**(谁和谁换:终端↔收单BDK/收单↔卡组织ZPK/卡组织↔发卡行ZPK/发卡↔芯片卡EMV,+银行间/制卡/第三方/商户/云迁移;第一性=交换需求源于机构安全域边界)、**密钥交换标准深入**(TR-31对称密钥块/用途绑定防混淆攻击、TR-34非对称首次建信、DUKPT一次一密KSN派生,各解决什么攻击+怎么做)、**密钥怎么进终端**(注入的是BDK派生的IPEK非BDK本身;传统KIF物理注入/RKL远程加载=TR-34用在终端;SoftPOS无安全芯片靠MPoC标准:密钥搬云端+TEE+软件保护+后端持续监控补偿;**SoftPOS深入**:Apple Pay付款端vs SoftPOS受理端相反场景、软件保护五件套(白盒密码/混淆/完整性/RASP/短时效)、TEE-SE利用、安卓vs iOS差异)、**ZPK实务交换**(ZMK区域主密钥三级分发链:人工密钥仪式双重控制+分量XOR 或 TR-34→ZMK加密ZPK走TR-31→日常加密PIN)、**TR-34深度解读**(第一性:传统分量仪式三安全目标→TR-34非对称造安全信道→知识分割被消解/双重控制转移到IAM+审计→安全等价性;**现实落差**:为何线下分量仪式长期并存(存量HSM/对手方/合规惯性/PKI/物理隔离);**产业利益格局**:加密机厂商守存量vs卡组织标准话语权vs AWS搅局推云化)。TR-31/TR-34流程经AWS官方sample代码核对、三服务选型(Payment Cryptography支付专用/CloudHSM通用/KMS数据)、**§3.1为何不能用CloudHSM拼支付**(支付语义=带密钥的支付业务机vs通用计算器;三类影响:①合规致命—PIN翻译/DUKPT/EMV的中间明文必须锁边界内,PKCS#11逐原语必泄明文PIN块违反PCI PIN,无原子TranslatePin;②正确性—需自重写ISO 9564/X9.24/EMV/TR-31/34;③互操作—生态只说TR-31/PIN-Block方言;**CloudHSM为通用HSM不开放支付固件加载故此路堵死**,这是AWS单独做Payment Cryptography的根本原因;附CloudHSM拼PIN翻译vs原子翻译时序对比图)、两API平面(Control Plane密钥管理+Data Plane运算)、**收单PIN翻译(TranslatePinData)**(含Incoming/Outgoing KeyIdentifier+TranslationAttributes字段拆解:入向解/出向封、DUKPT时入向=BDK+KSN派生、为何带PAN+换ISO格式;APC只是把应用编排+HSM运算原子化进托管边界,做的事不变)、**发卡PIN验证/CVV/EMV(VerifyPinData/CardValidationData/VerifyAuthRequestCryptogram)**真实调用链、密钥全生命周期、**§2.8.1 ZPK怎么存**(机构不存明文ZPK,外部存Enc(LMK,ZPK)密钥令牌+KCV、明文只在HSM内运算瞬间;APC只存KeyArn引用;驱动外部存储的是HSM内存极小+备份DR+集群共享LMK,与密钥数量无关;ZMK/ZPK数量在星型中心switch才上万、单银行几十把)、**LMK/ZMK澄清**(LMK=HSM内部信任根永不出设备故不入密钥类型表只在层级图顶端;ZMK=KEK用在机构对场景的名字=KBPK,已并入KEK)、**§3.0.1 APC成本模型**(按active key/月+按调用;发卡收单靠母密钥+派生key数可控成本省、星型中心万级zone+高TPS需做TCO对比;控成本=派生/删旧版本/清僵尸key)、**明文PIN两个合法硬件边界**(PED加密键盘SCD+HSM,永不进应用内存;前提是用原子翻译命令、拆开Decrypt+Encrypt会泄明文)、**§4.5.1 Nitro Enclaves隔离PAN**(PIN只运算vs PAN要业务读写故HSM不适合;飞地无网络/无SSH/运维不可读+KMS attestation;Tokenization取真卡号缩PCI scope;三者分工=PIN给HSM/PAN给Enclave/密钥给KMS) |
| `03-crossborder-business.md` | 📝 模块3·业务(总入口) | **(2026-06-09 大整合:并入原学习笔记+架构图+深度研究报告全部内容)** 跨境支付业务总入口,18节:①**第一性骨架**(账本公理→无共同账本→两个总根问题接力/换汇→**四套管道**) ②**四管道对比总图**+钱的等级(央行货币>商业银行借条>私人代币) ③**三个贯穿概念**(清算vs结算/信息流vs资金流-SWIFT只传报文/钱的等级) ④管道①代理行电汇(nostro/vostro+Fedwire/CHIPS/CHAPS/T2/CIPS终极账本+RTGS vs净额+de-risking走廊13000→12600) ⑤管道②卡组织(推vs拉+授权清算结算三段+四方模型+交换费引擎+DCC坑) ⑥管道③稳定币(转账即结算+**接缝问题**on/off-ramp+Stripe Bridge×Visa/Ripple×MC落地) ⑦管道④CBDC/mBridge(批发vs零售+四创始央行+绕开美元+**治理>技术地缘洞察**BIS 2024.10退出) ⑧五大场景 ⑨参与方 ⑩收益三板斧(手续费+汇差最隐蔽+浮存) ⑪**G20路线图**(四痛点+6.36%汇款成本+11量化目标:零售≤1%/汇款≤3%/75%≤1h 2027/2030) ⑫**新兴技术三主线**(Nexus系统互联60秒五国/mBridge批发CBDC/稳定币嵌入卡网络) ⑬中国出海(CIPS/银联国际/SAFE13号;**跨境收款vs海外本地收单**两角色+三维差异) ⑭真实案例(电汇vs稳定币/七步收款/卡组织三段) ⑮趋势判断 ⑯**10+道自测题** ⑰小结 ⑱**附A:13条带[n]一手引用来源清单**(BIS/FSB/World Bank/SAFE/Stripe/Ripple官方)+已知核查空白声明。📌已核查/🔧公知/⚠️告诫分级 |
| `03-crossborder-tech-aws.md` | 📝 模块3·技术 | (top-down)跨境技术篇+AWS：①SWIFT MT(MT103/MT202)→ISO20022(pacs.008/009)迁移2025.11共存期结束+各清算系统技术差异 ②多币种账务(每币种独立复式记账+换汇两笔分录+金额整数防浮点资损)+汇率引擎(Kinesis多源报价+外汇头寸对冲) ③**制裁筛查**(最硬合规,模糊匹配难点别名/音译,OpenSearch)+AML+外汇申报 ④跨境对账(多方多币种多时区+FX损益归因)。AWS:ECS协议网关+Aurora多币种+Kinesis汇率+OpenSearch制裁+Glue对账+Region数据驻留 |
| `03b-crossborder-collection-deepdive.md` | 📝 模块3·深化 | 跨境收款全链路逐环节剖开(连连/PingPong/Airwallex)：①买家付②平台代收③**境外本地收款账户**(核心产品,让平台打款变本地转账)④多币种账务⑤换汇(汇差核心利润+头寸对冲)⑥**合规申报**(外管局/真实性核验对应真实贸易,最硬一环)⑦境内Payout。**两个资金池**(境外USD+境内CNY,钱从未真跨境)、反向拒付垫付风险(rolling reserve)、全链路AWS(多Region数据驻留+Aurora多币种+Kinesis汇率+OpenSearch制裁+平台数据核验) |
| `03c-crossborder-players/` | 📂 模块3·企业画像 | **跨境头部企业画像子模块**(按15维模板:定位/背景/股东/牌照/商业模式/产品/区域/规模/组织/技术/护城河/竞品/风险/AWS衔接)。首批8家经deep-research核查带引用:**Airwallex**(企业全球支付+自建网络93%走自有,估值US$8B,2025-12;AUSTRAC审计+中美数据争议)、**PingPong**(中国跨境电商收款,收购信航100%控股,累计TPV~$300B自述)、**连连数字2598.HK**(已上市,**境内首张中外合资清算牌照连通**,数字支付TPV 3.30万亿2024)、**PayerMax**(新兴市场海外本地收单,SHAREit系,新/印尼/沙特牌照)、**Payoneer NASDAQ:PAYO**(跨境收款龙头,收入$1052.8M/TPV$87.5B 2025,**收购中国易联支付**,利息占22%)、**XTransfer**(外贸版支付宝B2B,冲刺港股2026-04递表,TPV$60.5B/收入$248.5M 2025,X-Net+TradePilot AI风控)、**dLocal NASDAQ:DLO**(新兴市场一点接入收单,不含中国,TPV$40.8B/收入$1093.6M 2025)、**万里汇**(蚂蚁国际旗下,累计TPV~$500B自述,中国无自有牌照靠合作)。**第二批扩展5家**:**Thunes**(跨境清算/支付网络,美50州MTL自有,run-rate营收~$150M)、**Nium**(payout派付网络,估值$1.4B down round,日本第一类资金移动)、**Rapyd**(FaaS海外本地收单,收购Valitor+PayU GPO,估值$4.5B down round)、**Ebury**(B2B跨境支付+FX,桑坦德控股55%,FY2023营收£204m)、**EBANX**(新兴市场本地收单,dLocal孪生对手,2025 TPV+48%)。含横向对比大表(13家)+index;角色分三类=跨境收款/海外本地收单/跨境清算派付网络(呼应§7.1)。📌连连/Payoneer/dLocal已做HKEX/SEC一手财报加固(纠正连连牌照65/66非67、2024营收口径13.15亿总营收vs11.51亿数字支付分部、2024仍亏2025才扭亏且主要靠LianTong一次性投资收益)。⚠️未上市公司数字多自述需带年份 |
| `02c-epayment-players/` | 📂 模块2·企业画像 | **电子支付/收单头部企业画像子模块**(15维`_template.md`模板+对比index)。12家经deep-research核查:国内—**支付宝/蚂蚁**(闭环超级钱包+金融全栈,收入构成见§6.1)、**微信支付/财付通**(腾讯,双寡头,注册资本223亿)、**收钱吧**(无牌聚合·地推铁军)、**拉卡拉**(A股300773,收单转跨境,跨境8890亿+80% 2025)、**银联商务**(银联系收单龙头,尼尔森亚太第一,交易额18.7万亿2023)、**通联支付**(万向系)、**汇付天下**(港股退市,斗拱/Adapay支付PaaS);海外—**Stripe**(开发者全栈,估值$1590亿2026-02,TPV$1.9万亿2025)、**PayPal**(双边两端通吃,TPV$1.794万亿/营收332亿2025)、**Adyen**(全栈收单银行,净收入€23.6亿2025,take rate~0.17%)、**Block**(Square+Cash App双栈,营收241亿2024,CFPB罚)、**Checkout.com**(全栈直连,估值$120亿,主打授权通过率+稳定币)。含横向对比大表;角色谱系=闭环钱包/持牌收单/无牌聚合/海外全栈收单/双边双栈。⚠️未上市公司数字多自述 |
| *（原 `跨境支付深度研究报告.md`/`跨境支付学习笔记.md`/`跨境支付架构图.html` 已于 2026-06-09 整合进 `03-crossborder-business.md` 并删除）* | — | 第一性四套管道骨架、6张可视化图、G20 量化目标、新兴技术三主线、10道自测题、引用来源清单（附A）均并入业务篇 |

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
| 传统支付(card/e-payment/crossborder) | ① 代理行电汇 + ② 卡组织 | 跨境没有共同账本，靠接力/封闭网络解决 |
| stable-coin | ③ 稳定币 + ④ CBDC/mBridge | 重造一个开放/央行的全球共同账本 |
| agentic-payment | ⑤ 智能体支付 | 让 AI Agent 成为新的"付款主体"，在以上轨道之上 |
