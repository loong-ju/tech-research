# Checkout.com（运营主体 Checkout Ltd.）

> 📌 **一句话定位**：总部伦敦的全球性端到端支付服务商(PSP)/收单机构，为大型企业商户提供线上收单、网关、本地化支付方式接入、风控反欺诈、发卡与付款全栈服务；未上市。
> 🏷️ **角色归类**：**全栈型 PSP + 直连收单机构(Acquirer) + 网关**——自身是 Visa/MC/银联/Amex/JCB 等卡组织 principal member/direct acquirer，可直接收单而非仅做聚合。偏 enterprise(大商户)市场。
> ⚠️ **数据时效**：截至 2026-06；未上市不公开年报，营收绝对值未查到，处理量/增长率多公司自述。

## 1. 基本信息
- **成立**：2009 年(Guillaume Pousaz 创立，初名 Opus Payments，早期新加坡持牌起步)；2012 更名 Checkout.com
- **总部**：英国伦敦｜**创始人/CEO**：Guillaume Pousaz(瑞士籍，大股东)
- **当前状态**：⚠️**未上市**(私有)，无股票代码

## 2. 背景与沿革
2009 年 Pousaz 创立，从直连收单切入企业级市场 → 2013 起逐个拿下卡组织成员资格 → 2021-22 融资估值冲至 $400 亿(欧洲最高估值金融科技独角兽) → 2022-23 估值大幅回调 → 2024 恢复盈利、2025-26 加码中东/美国/稳定币。

## 3. 股东与资本 ⚠️估值剧烈波动
- **融资**：2019 Series A 约 $2.3 亿 → 2020-06 Series B(约 $1.5 亿)估值 $55 亿 → 2021-01 Series C($4.5 亿)估值 $150 亿 → **2022-01 Series D($10 亿)估值 $400 亿**(欧洲最高)
- 📌 **估值回调**(内部 409A)：2022 末降至约 $110 亿 → 2023-06 约 $93.5 亿(较峰值 -77%) → **2025-09 员工回购新估值约 $120 亿**
- **主要机构股东**：Qatar Investment Authority、Tiger Global、Altimeter、Dragoneer、Franklin Templeton、GIC、Oxford Endowment、Insight Partners、DST Global ⚠️ 比例未公开

## 4. 牌照与资质 📌已核查·一手(官网历程)
- **卡组织成员/收单牌照**：2013 Visa/MC 成员；2014 银联/Diners/Discover principal member；2015 Amex 全球收单；2017 JCB 成员
- **英国**：2017 取得 EMI 牌照(FCA 监管)⚠️ FCA Register 本轮未现场核实，建议 register.fca.org.uk 核 "Checkout Ltd"
- **阿联酋**：2023-05 获 UAE 央行收单牌照(自称"首个获 UAE 央行收单牌照的全球支付平台")；2024 日本直接收单；2025 加拿大直接收单
- **美国**：2025-10/2026-01 推进佐治亚州银行牌照(⚠️ 最终落地状态需再核)
- PCI DSS：作收单/处理机构必持(具体等级未明示)

## 5. 定位与商业模式 🔧+📌
B2B 支付服务商，向企业商户按交易收费：① **收单/处理手续费(take rate)**(interchange++ 或 blended，具体商户协议定制未公开) ② 增值服务费(反欺诈/IDV 身份核验/Intelligent Acceptance AI 提升通过率/网络令牌/发卡/付款/Treasury&FX) ③ 外汇多币种处理(150+ 币种，FX 价差)。核心卖点 **"performance"**——直连收单+AI 优化每个 basis point 的授权通过率，帮大商户提升转化。⚠️ 具体费率未公开

## 6. 核心产品与业务范围 📌官网五大模块
- **Connect**(收单接入/网关)：Unified Payments API、Flow(可嵌入组件)、Hosted Payment Page、Mobile SDK、Payment Links
- **Move**(资金进出)：Acquiring(直连收单)、Payment Methods(卡+直接借记+数字钱包+银行转账+voucher)、Issuing(发卡)、Payouts
- **Boost**(AI 提升通过率)：Intelligent Acceptance、Network Tokens、Real-Time Account Updater
- **Protect**(风控/合规)：ML 反欺诈、3DS 认证、IDV 身份核验(含 AI 视频/人脸，源自 2022 收购 ubble)、Disputes、Vault
- **Manage**：Dashboard、Treasury&FX、多币种 Business Account
- 其他：Standalone Vault、Forward API、ProcessOut(2020 收购，支付路由)

## 7. 业务区域
本地收单覆盖 **50+ 国**(欧洲/北美/中东/亚太)，支持 150+ 处理币种；19-21 个办公室。重点扩张：中东(UAE/沙特/GCC)、日本、加拿大、美国。⚠️ 部分新兴市场为新近进入

## 8. 规模与数据 📌官网/Newsroom(均公司自述)
- **处理量**：2025 全年企业商户电商支付处理额约 **$3000 亿**(官网"surpassed $300B in volume"，2026-02)；日均处理 $10 亿+
- **增长**：2025 黑五/网一处理 $52 亿+(同比+62%)；APAC TPV +71%(2026-03)；核心业务营收+45%(2024 自述)；2024 末称恢复盈利
- **员工**：2000+(2025)
- ⚠️ **营收绝对值/商户总数：未公开/未查到**(未上市，不公开年报)；增长率多公司自述

## 9. 组织架构
母/运营主体 Checkout Ltd.(英国)，CEO 兼大股东 Pousaz；收购整合实体：ProcessOut(法国，支付路由，2020)、Pin Payments(澳，2020)、Icefire(爱沙尼亚研发，2021)、ubble(法国身份核验，2022)、**Blue EMI(欧元稳定币发行，2026)**；2026 设立陶宛技术中心。完整集团法律实体图未公开

## 10. 技术架构特点
**"performance" 技术栈**——Intelligent Acceptance/网络令牌/账户更新等 AI 能力主打提升授权通过率(官网举例 Vinted +4.15%)；直连收单掌控授权链路。⚠️ 技术栈细节未公开

## 11. 护城河与差异化
① **直连收单网络**(Visa/MC/银联/Amex/JCB principal member+多国 direct acquirer，绕中间方、压成本、掌控授权链路) ② **"performance" AI 技术栈**(提升授权通过率，对大商户=直接增收) ③ 多市场牌照矩阵(中东/日本/加拿大/美国推进) ④ 聚焦大型企业商户(eBay/Spotify/Uber/Klarna/Temu/Adidas)的标杆+切换成本。⚠️ 提升通过率量化效果多自述

## 12. 主要竞争对手
**Stripe、Adyen**(最直接的全栈/直连收单对手)、PayPal/Braintree、Worldpay、Fiserv、Global Payments、Nuvei、dLocal(新兴市场)、Rapyd、PPRO。官网引 Forrester 2026 Q1 评其为 Merchant Payment Providers "Leader"(第三方报告/自述)

## 13. 最新动态与风险 ⚠️时效 2026-06
📌 **加码稳定币/链上**：2026-06 与 Fireblocks(美国稳定币结算)、Coinbase(稳定币受理)合作；2026-01 收购 **Blue EMI(欧元稳定币发行方)**+设立陶宛技术中心｜📌 大客户：Spotify(2026-02)、Uber/Microsoft(2025-10)、eBay(2025-04)｜📌 **Agent 支付**：参与 Mastercard Agent Pay、计划接入 Visa Intelligent Commerce API｜📌 美国佐治亚州银行牌照推进｜⚠️ 风险：**估值剧烈波动**($400 亿峰值→2023 内部 $93.5 亿→2025 约 $120 亿)反映私募估值与商业现实落差；历史涉成人娱乐行业商户关系诉讼(未独立核实)；多国牌照扩张的跨境合规负担；稳定币/银行牌照新业务落地不确定

## 14. 与本研究 / AWS 对话的衔接
- **可聊**：**直连收单+"performance" AI 路线**(与 Stripe/Adyen 的差异化：主打授权通过率)；估值过山车($400亿→$120亿)的私募估值教训；**稳定币/Agent 支付前瞻**(Blue EMI/Fireblocks/Coinbase/Mastercard Agent Pay，与模块4/模块5 强衔接)
- **AWS 角度**：Intelligent Acceptance 的 AI 授权优化(SageMaker)、反欺诈/IDV、多 Region 本地收单、稳定币结算基础设施

## 15. 来源清单
- 一手：checkout.com 官网(产品/规模/牌照历程)、Newsroom(牌照/估值回购/合作/收购，带日期)
- 二手：en.wikipedia.org/wiki/Checkout.com、Sacra/Sifted/Forbes/This Week in Fintech(估值时间线)
- ⚠️ FCA Register 未现场核实(页面 JS 加载失败)，EMI 持牌项建议人工复核
