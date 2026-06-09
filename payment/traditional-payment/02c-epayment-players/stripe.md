# Stripe, Inc.

> 📌 **一句话定位**：面向开发者的支付基础设施公司("互联网的经济基础设施")，以 API 为企业提供线上线下收款、订阅计费、平台分账、发卡、资金账户等全栈金融服务，骑在 Visa/MC 等卡网络之上。
> 🏷️ **角色归类**：**全栈型(收单 PayFac + 网关 + 聚合 + 增值金融)**（呼应 `02-epayment-business §3.2` 开放路线、`§3.2 延伸` 为何不做钱包）。本身不是卡组织/清算系统，而是骑在卡网络之上的中间层。
> ⚠️ **数据时效**：截至 2026-02；私有公司不发审计财报，营收/估值多媒体口径或要约定价。

## 1. 基本信息
- **成立**：2010 年(Palo Alto)｜**创始人**：爱尔兰兄弟 Patrick Collison(CEO)、John Collison(President)
- **总部**：**双总部**——South San Francisco(美) + Dublin(爱尔兰，2025-10 设第二总部)
- **当前状态**：⚠️**未上市**(私有)，无股票代码；长期靠员工/股东要约收购提供流动性，非 IPO

## 2. 背景与沿革
2010 年 Collison 兄弟创立，以"几行代码接入支付"的开发者体验颠覆传统收单 → 扩展计费/分账/发卡/风控/税务/BaaS 全栈 → 2024-25 重押稳定币(收购 Bridge/Privy)与 Agent 支付。

## 3. 股东与资本 ⚠️估值随要约漂移
- **早期投资人**(2011 种子轮约 200 万美元)：Peter Thiel、Elon Musk、Sequoia、a16z、SV Angel
- **估值轨迹**：2021-03 峰值 $950 亿 → 2022 下调约 $740 亿 → 2023(Series I, 融资逾 $65 亿)约 $500 亿 → 2024-07 约 $700 亿 → 2025-02 要约估值 $915 亿 → 📌 **2026-02-24 最新要约估值 $1,590 亿**(较上年约 +74%，CNBC/Reuters/TechCrunch/Bloomberg 多源)
- ⚠️ 私募估值为 secondary/要约定价非公开市值

## 4. 牌照与资质 📌部分一手
- 📌 **爱尔兰**：Stripe Technology Europe, Limited 持爱尔兰央行 **EMI 牌照(Ref C187865)**(直接查自爱尔兰央行注册名录)——欧洲展业核心
- 🔧 **美国**：Stripe Payments Company 多数州持 MTL、FinCEN 注册 MSB；收单遵循 PCI-DSS Level 1(⚠️ 各州 MTL 清单/PCI 未逐条核到，NMLS 返 403)
- 嵌入式银行(Treasury)/发卡(Issuing)依赖持牌银行合作方(2020 宣布与 Goldman Sachs/Citi 合作)

## 5. 定位与商业模式 🔧
对每笔成功交易收 **take rate**(美国标准在线卡价历史 **2.9% + $0.30/笔**)。收入构成：① 核心支付处理费(大头) ② 增值 SaaS(Billing/Radar 风控按笔/Tax/Identity/Atlas) ③ Connect 平台分账抽成 ④ 金融增值(Capital 商户贷/Issuing 发卡交换费/Treasury/Bridge 稳定币)。本质=卡网络费率之上加一层撮合+增值利差。⚠️ 各产品费率/收入占比私有不披露

## 6. 核心产品与业务范围 📌
Payments(收单)/Checkout/Payment Links / Billing(订阅计费) / **Connect(2012, 平台分账)** / **Radar(欺诈风控)** / Issuing(发卡) / Terminal(线下POS) / Capital(商户融资) / Treasury(嵌入式银行 BaaS) / Tax / Identity(KYC) / Sigma / Atlas(公司注册) / Link(一键结账钱包)。**加密/稳定币**：2024-04 重启 USDC pay-in、**2025-02 收购稳定币平台 Bridge(约 $11 亿)**、2025-06 收购加密钱包 Privy、2025 推稳定币账户与 AI 支付

## 7. 业务区域
双总部美+爱尔兰；覆盖北美、欧洲、亚太(日/新/印度等)、非洲(2020 收购 Paystack 进入)。Tax 服务覆盖 102 国(2025)。支持数十国商户收款、上百国/币种付款方

## 8. 规模与数据 📌官方年度更新
- **TPV**：**2025 年 1.9 万亿美元**(Stripe 官方，约占全球 GDP 1.6%)；2024 年 1.4 万亿(同比约 +34%)
- **营收**：2024 约 51 亿美元(Wikipedia 引报道，⚠️ 私有未核审计口径)
- **客户**：2025 约 500 万家企业｜**员工**约 8,500(2025)
- 旺季佐证：2025 黑五-网一 4 天处理逾 400 亿美元

## 9. 组织架构
母公司 Stripe, Inc.(特拉华，运营总部 South SF)；美国收单/资金转移主体 Stripe Payments Company；欧洲 EMI 主体 Stripe Technology Europe, Limited(爱尔兰, C187865)；各地本地子公司对接当地清算合规。完整子公司清单未核实

## 10. 技术架构特点
**开发者 API 与文档体验**是其技术招牌(几行代码接入支付成为行业范式)；全栈产品矩阵；Radar 欺诈模型靠海量数据。⚠️ Stripe 是 AWS 的知名大客户(行业公知)——AWS 视角的标杆案例

## 11. 护城河与差异化
① **开发者体验/API 标准**(开发者心智+高切换成本) ② 全栈产品矩阵一站式锁定+交叉销售 ③ 数据与风控规模效应(Radar) ④ 多区域牌照(爱尔兰 EMI+美国 MTL) ⑤ Link 一键结账网络效应 ⑥ 稳定币/Agent 支付前瞻布局(Bridge/Privy)

## 12. 主要竞争对手
**Adyen**(企业级全栈收单，直接对标)、PayPal/Braintree、Block(Square)、Checkout.com、Worldpay、Global Payments、Fiserv、Klarna(BNPL)、Marqeta(发卡)；中国出海场景面对 PingPong/Airwallex/连连；Agent/稳定币领域与 Coinbase(x402) 交叉

## 13. 最新动态与风险 ⚠️时效 2026
📌 **2026-03 FTC 警告**：涉对合法公民因政治/宗教等"去银行化(debanking)"问题(对 Stripe 及另 3 家)｜📌 稳定币扩张(Bridge/Privy/稳定币账户)带来新合规不确定性｜⚠️ 私有不披露审计财报、透明度低；估值依赖要约定价；高度依赖 Visa/MC 卡网络与合作银行

## 14. 与本研究 / AWS 对话的衔接
- **可聊**：**开放路线全栈收单的极致**(§3.2)；为何刻意不做 C 端钱包(§3.2 延伸：B 端基础设施无 C 端账户封不了环)；稳定币基础设施(Bridge/Privy，与模块4/模块5 衔接)；Agent 支付
- **AWS 角度**：**Stripe 是 AWS 标杆大客户**——开发者 API 平台、Radar 风控(SageMaker)、全球多 Region、稳定币基础设施都是云对话的强场景

## 15. 来源清单
- 一手：stripe.com/annual-updates/2025(TPV 1.9万亿)、stripe.com/newsroom(2024 TPV/黑五)、爱尔兰央行注册名录(EMI C187865)
- 二手：en.wikipedia.org/wiki/Stripe,_Inc.(创始/估值/营收/Bridge/Privy/FTC)、2026-02 估值 $1590 亿多源(CNBC/Reuters/TechCrunch/Bloomberg)
