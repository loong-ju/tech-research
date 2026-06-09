# Thunes（法律实体 Thunes Asia Pte Ltd / 母实体 TTMFS Singapore Pte Ltd）

> 📌 **一句话定位**：总部新加坡的跨境支付**基础设施**公司，自称"移动资金的智能高速公路"，通过自建的 **Direct Global Network(直连全球网络)** 让会员(银行/钱包/MTO/PSP/平台)用一个 API 向 140 国、90 币种、120 亿+钱包/银行账户及 150 亿张卡发起实时跨境收付款。
> 🏷️ **角色归类**：**跨境清算/支付网络(infrastructure)**——面向机构(B2B)的"网络/管道"，跨境收(Collections)+跨境付(Pay)两端皆有，但都是作为网络基础设施提供给会员，而非自己直接收单零售商户（呼应 `03-crossborder-business §7.1`，是连接各国本地支付系统/钱包的"另类清算网络"，非卡清算）。
> ⚠️ **数据时效**：截至 2026-06；TPV 官方未披露，规模多公司自述。

## 1. 基本信息
- **成立**：2016 年(由前身 TransferTo 拆分而来——2016 TransferTo 拆为 DT One+Thunes)
- **总部**：新加坡(One Raffles Place)，14 个全球办公室
- **CEO/创始人**：Peter De Caluwe(联合创始人，2025-08 回任 CEO，接替离任的 Floris de Kort)
- **当前状态**：**未上市**(私有，PE/VC 支持)

## 2. 背景与沿革
2016 年从 TransferTo 拆分专做跨境支付，以"直连本地支付品牌"替代代理行接力 → 2020-2025 多轮融资、自有美国 50 州 MTL → 2025 密集布局稳定币(Circle/Mastercard/Ripple)、进军美国实时支付。

## 3. 股东与资本 📌已核查
- **投资人**：Apis Partners、Vitruvian(2025 Series D 领投)、Marshall Wace(2023 Series C 领投)、Helios(2020 Series B 领投)、Insight Partners、Bessemer、Checkout.com、GGV、**Visa**、EDBI(新加坡)、01Fintech
- **融资**：Series B(2020) $60M → Series C(2023) 约 $72M @ 估值 $900M+(⚠️估值未一手核实) → **Series D(2025-04-28) $150M(史上最大轮，Apis+Vitruvian 领投)**，估值显著提升但未披露具体数字

## 4. 牌照与资质 📌已核查·一手(官网合规页)
- **美国**：FinCEN MSB + **全部 50 州 MTL**(2026-06 强调自有牌照、非借道第三方)
- **新加坡**：MAS **MPI**；**2025-12-02 获 MAS 原则性批准(IPA)**拟扩展 MPI(新增账户发行/境内转账/**商户收单**/电子货币发行，⚠️尚未正式签发)
- **英国**：FCA Authorised PI｜**法国**：ACPR 支付机构(护照延伸 EU)｜**加拿大**：FINTRAC MSB｜**香港**：海关 MSO
- 合规认证：PCI DSS、ISO 27001；自有资金与会员资金隔离托管；自述 50 市场持牌

## 5. 定位与商业模式 📌+🔧
机构客户(会员)接入网络后，Thunes 提供跨境收/付款清结算：① 交易/笔费 + **FX 价差**(经内部 SmartX Treasury 做货币优化，赚汇差点差) ② 网络接入与平台服务费。核心价值=用"直连本地支付品牌"替代多层代理行接力，降延迟/成本/拒付率。⚠️ 费率结构未公开

## 6. 核心产品与业务范围 📌官网
**Direct Global Network**(核心) / **Pay**(Pay-to-Mobile-Wallets/Bank-Accounts/Cards/**Stablecoin-Wallets**) / **Accept/Collections**(Mobile Wallets/Bank Payments/Digital Vouchers/BNPL) / Global Accounts / Business Payments / **SmartX Treasury**(FX/资金管理，90 币种) / **Fortress Compliance**(合规风控) / Tilia(2025-06 收购的游戏/虚拟经济支付)。**稳定币**：2025-10 上线 130 国稳定币即时付款(Circle USDC 结算/Mastercard Move/Ripple)，银行可用现有 SWIFT 基础设施做稳定币付款

## 7. 业务区域
网络覆盖 140 国/90 币种(早期 2025-04 为 130 国/80 币种/550+直连)；14 办公室(新加坡/Atlanta/Barcelona/北京/迪拜/香港/约翰内斯堡/伦敦/马尼拉/内罗毕/巴黎/利雅得/旧金山/上海)；重点扩张美国+中东(FAB/Mashreq)+非洲(Ecobank)+北欧

## 8. 规模与数据 ⚠️公司自述、无 TPV
- **营收**：CEO 任内"营收翻倍至 run-rate 超 **$150M** 并实现持续盈利/正 EBITDA"(2025，双源一致)
- **网络规模**：140 国/90 币种/220+支付方式/**720 网络会员**/145 钱包品牌/85% 即时结算(2026 官网)；可触达 120 亿+钱包及银行账户、150 亿张卡
- 会员含 Uber/Deliveroo/Grab/WeChat；连续 8 年 FXC Intelligence 跨境支付全球领导者(2026-05)
- ⚠️ **TPV/年交易量官方未披露**("no TPV figure disclosed")；"720 会员/145 钱包"为官网自述

## 9. 组织架构
集团母实体 TTMFS Singapore Pte Ltd；新加坡运营 Thunes Asia Pte Ltd；美国 Thunes Financial Services LLC(NMLS 2450368)；前身 TransferTo 仍在董事会有席位。执行团队：De Caluwe(CEO)、Chloé Mayenobe(Deputy CEO)、新 CFO/CPTO(2026)；董事长 Allan Green

## 10. 技术架构特点
**Direct Global Network**(自建 550+直连本地支付品牌/钱包/清算系统，去代理行) + SmartX Treasury(FX/资金) + Fortress Compliance(合规)；稳定币基础设施(SWIFT 兼容)。⚠️ 技术栈细节未公开

## 11. 护城河与差异化
① **直连资产护城河**(自建 550+直连本地支付品牌，"最后一公里"本地连接耗时耗牌照难复制) ② **牌照护城河**(美国 50 州 MTL 自有+新 MPI+英 FCA+法/EU+港 MSO，50 市场) ③ 网络效应(会员既是付款方也是收款端点，双边) ④ 顶级会员锁定(Uber/Grab/WeChat)+连续 8 年 FXC 行业领导者 ⑤ SmartX+Fortress 技术栈

## 12. 主要竞争对手
**Nium**(同为新加坡跨境基础设施，最直接对标)、Wise(Platform)、Currencycloud(Visa)、Rapyd、dLocal、Airwallex、Ebury、**TerraPay**(钱包互联，直接对标)、PPRO、Onafriq(非洲钱包互联)；卡组织同类：Visa Direct、Mastercard Move(既竞又合)；稳定币路线 Circle/Ripple(亦合作方)；传统：SWIFT 代理行、Western Union/MoneyGram

## 13. 最新动态与风险 ⚠️时效 2025-2026
📌 2025-04 史上最大 $150M Series D；2025-06 收购 Tilia；2025-10/11 密集稳定币布局(Circle/Mastercard/Ripple，130 国稳定币付款)；2025-12 新加坡 MAS IPA(MPI 扩展含收单/电子货币，未正式签发)；**2026-06-03 上线对美国实时收款(ACH/Same-Day ACH/RTP)**｜⚠️ 风险：CEO 一年内多次更替(治理连续性)、大举进美国与稳定币面临监管(GENIUS Act 等)与 AML 压力、估值/TPV 不透明

## 14. 与本研究 / AWS 对话的衔接
- **可聊**：**跨境清算网络的范本**(与 SWIFT/卡组织对照，§7.1 之外的第三类角色)——直连本地支付品牌替代代理行接力；稳定币用 SWIFT 基础设施(模块4)；与 Nium/TerraPay 的网络竞争
- **AWS 角度**：直连网络的全球多 Region 低延迟、SmartX Treasury 的 FX 优化、Fortress 合规/KYT、稳定币结算基础设施

## 15. 来源清单
- 一手：thunes.com(官网/about-us/合规页)、2026-06-03 美国实时支付新闻稿
- 二手：fintechnews.sg(2025-04 Series D/2025-08 CEO 变更/2025-12 MAS IPA)、Wikipedia(成立/TransferTo 拆分)
