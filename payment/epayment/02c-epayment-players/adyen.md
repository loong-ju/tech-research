# Adyen N.V.（Euronext Amsterdam: ADYEN）

> 📌 **一句话定位**：荷兰阿姆斯特丹的全栈支付平台与**持牌收单银行**，以单一技术平台为大型企业/平台提供线上+线下(POS)+跨境一体化收单、网关、风控与嵌入式金融，是 Stripe 在企业级市场的最强对标。
> 🏷️ **角色归类**：**全栈(full-stack)收单机构 + 网关 + 持牌收单银行**——自建网关→风控→本地收单→清结算端到端单一平台、不依赖第三方收单行，且自持荷兰央行银行牌照。把网关/收单/发卡/银行账户能力全部内化（区别于纯聚合/纯网关）。
> ⚠️ **数据时效**：截至 2026-Q1；财务为 Adyen 官方业绩稿(unaudited)。

## 1. 基本信息
- **成立**：2006 年｜**总部**：荷兰阿姆斯特丹
- **创始人**：Pieter van der Does(联席 CEO)、Arnout Schuijff(原 CTO，已退出日常)
- **当前状态**：**已上市，Euronext Amsterdam: ADYEN**(2018-06-13，AEX 成分，ISIN NL0012969182)

## 2. 背景与沿革
2006 年创立(荷兰语"重新开始")，从一开始就走"单一平台全球收单"路线，自建技术栈不靠并购拼接 → 2017 取得 ECB 全银行牌照 → 2018 上市 → 扩展线下 POS(Unified Commerce)、发卡(2019)、嵌入式金融、平台(Platforms)业务。

## 3. 股东与资本 ⚠️持股比例未充分核实
- 早期投资方：General Atlantic(领投 2014 约 $2.5 亿轮)、Temasek、Index Ventures、Felicis；2015 估值约 $23 亿；2011 起即盈利
- 上市后公众持股、free float 较高，创始人/管理层仍持可观内部股(具体比例未从年报/AFM 核实)

## 4. 牌照与资质 📌已核查
- 📌 **银行/信用机构牌照**：Adyen N.V. 由荷兰央行 **DNB 登记为 credit institution**(登记号 34259528, LEI 724500973ODKK3IFQ447, 类别 Bank-CI)；**2017 取得 ECB 全银行牌照**，ECB 监管
- 凭 DNB 牌照在 EEA **passporting** 跨境提供收单/支付/银行服务；截至 2023 在 EU/英国/美国均持银行牌照
- 🔧 应为 Visa/MC 等卡组织 principal member、PCI DSS Level 1(⚠️ 本轮未一手确认)

## 5. 定位与商业模式 📌业绩稿
核心收入=按交易处理量收 **处理费+结算费(settlement fees)**(笔费+占比费)。明确区分 **net revenue**(净收入，扣除付给卡组织/发卡行的 interchange 与 scheme fees 后)与处理量。FY2025 净收入约 €23.64 亿、TPV €1.3943 万亿，**综合 take rate 极低(净收入/处理量约 0.17% 量级)**——服务大商户、走规模薄费率。增值/金融：嵌入式金融(Capital 放贷/Accounts 账户/Issuing 发卡)、Platforms(为软件平台/marketplace 做嵌入式收单分账)

## 6. 核心产品与业务范围 📌
统一支付平台(线上+移动+线下 POS，**Unified Commerce** 单一平台打通全渠道) / 本地收单(直连多国卡组织+本地支付方式) / 网关+风控反欺诈(RevenueProtect) / Issuing 发卡(2019) / **嵌入式金融**(Capital/Accounts/Issuing) / **Platforms**(为 SaaS/marketplace 嵌入式收单分账)。三大报告分部：**Digital、Unified Commerce、Platforms**

## 7. 业务区域
全球化，阿姆斯特丹总部+旧金山/巴黎/伦敦/东京/孟买/迪拜等约 23 国设点；凭 DNB 牌照覆盖 EEA，英国/美国持银行牌照；本地收单覆盖欧洲/北美/亚太/拉美(2016 进入巴西)/中东

## 8. 规模与数据 📌FY2025 官方(unaudited)
- **净收入**：FY2025 **€23.642 亿**(同比+18%/固定汇率+21%)
- **TPV**：FY2025 **€1.3943 万亿**(剔除单一大客户口径+21%/含该客户+8%)，其中 POS €3110 亿(+34%)
- **EBITDA**：€12.457 亿(+26%)，**margin 53%**(2024 为 50%)；自由现金流转化率 87%；CapEx 占净收入 5%
- **Q1 2026 更新**：净收入 €6.208 亿(+16%/固定汇率+20%)、处理量 €3820 亿(+21%)；2026 全年净收入增长指引 **20-22%**(固定汇率)
- FY2024：营收 €19.96 亿、净利 €9.25 亿、员工 4,345(Wikipedia)｜⚠️ 商户/活跃客户总数未在业绩稿披露(只列 Starbucks/Uber/Meta/eBay 等大客户)

## 9. 组织架构
上市主体 Adyen N.V.(荷兰)，即持 DNB 银行牌照的核心运营/合并报表实体；各地经子公司/分支落地(美国 Adyen Inc.、澳洲等，凭当地牌照或母公司护照)；2025 新设 Adyen Capital Canada 等。完整子公司牌照映射未逐条核实

## 10. 技术架构特点
**单一技术平台(single platform)**——全球一套代码栈打通线上+线下+全球本地收单，无并购拼接的技术债，是其相对 Worldpay/FIS 等并购型对手的核心差异；自有端到端栈+银行牌照直连卡组织提升授权成功率(基于约 4 亿购物者数据实时识别)

## 11. 护城河与差异化
① **单一技术平台**(无并购技术债) ② 自有端到端栈+银行牌照(直连卡组织、自做收单清结算，提升授权率) ③ 规模化薄费率服务超大企业/平台的网络与数据飞轮 ④ **高盈利能力**(EBITDA margin 53%、FCF 转化 87%)显示运营杠杆与护城河

## 12. 主要竞争对手
**Stripe**(企业级/平台支付，最直接对标)、PayPal/Braintree、Worldpay(原 FIS)、Fiserv(Clover)、Checkout.com、Block(Square)、Global Payments、JPMorgan Payments、Nuvei、Worldline。在大型企业全渠道(unified commerce)与平台嵌入式支付(对标 Stripe Connect)竞争最激烈

## 13. 最新动态与风险 ⚠️时效 FY2025/Q1 2026
📌 维持高增长高盈利，2026 全年净收入增长指引 20-22%(固定汇率)｜⚠️ **口径风险**：TPV 增速"含/不含单一大客户"差异巨大(FY2025 +21% vs +8%)，对个别超大客户(曾依赖 eBay 后迁移)有集中度敏感性，引用增速务必注明口径｜⚠️ 作 DNB/ECB 监管的银行，受资本充足/AML/PSD2-SCA/卡组织合规约束；2023 曾因增长放缓+成本投入致股价大幅波动

## 14. 与本研究 / AWS 对话的衔接
- **可聊**：**全栈收单银行的范本**(自持银行牌照、单一平台 vs 并购拼接)；与 Stripe 的"企业级 vs 开发者"路线对比；薄费率服务大商户的商业模式(0.17% take rate)；嵌入式金融/Platforms
- **AWS 角度**：单一平台的全球多 Region 架构、风控反欺诈(RevenueProtect/SageMaker)、银行级合规(AML/资本充足)、高可用清结算——全栈自建天然是云对话对象

## 15. 来源清单
- 一手：investors.adyen.com、Adyen H2/FY2025 业绩稿(净收入/TPV/EBITDA)、Q1 2026 业务更新、DNB 公开登记(credit institution 34259528)、美联储备案(2017 ECB 银行牌照)
- 二手：en.wikipedia.org/wiki/Adyen(成立/上市/FY2024 营收/历史融资)
