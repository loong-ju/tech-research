# Airwallex（空中云汇）

> 📌 **一句话定位**：面向企业(B2B)的全球支付与金融基础设施平台——多币种账户+跨境收付款+外汇为核心，**自建全球支付网络（约93%交易走自有清算网络、仅约7%走SWIFT）**，并在多国持牌提供本地账户、发卡、收单与嵌入式金融。
> 🏷️ **角色归类**：**两者都做，以"跨境收付款+全球账户"为主、"本地收单"为辅**（呼应 `03-crossborder-business §7.1`）。跨境支付约占60%营收、全球账户产品约40%（Sacra，2025-2026）；收单(Payments)是补全闭环的能力，非招牌业务。
> ⚠️ **数据时效**：本文事实截至 2026-02；未上市公司无审计财报，TPV/营收/估值多为公司或第三方(Sacra)口径，随轮次漂移。

## 1. 基本信息
- **成立**：2015 年，澳大利亚墨尔本 📌（Wikipedia/公司多源一致）
- **总部**：现为**双总部**——新加坡 + 美国旧金山（美国总部 2025-12 设立）📌；运营重心分布香港/新加坡/墨尔本/上海，带香港·澳洲背景
- **创始人**：Jack Zhang（张磊, CEO）、Lucy Liu（刘佳宁, President）、Max Li、Xijing Dai（CTO）、Ki-Lok Wong，共 5 位联合创始人 📌
- **当前状态**：**未上市**；公司以"2026 年具备 IPO 条件"为目标，无确定时间表/代码 ⚠️（公司自述+媒体）

## 2. 背景与沿革
起家于墨尔本，2019-03 成为澳大利亚第三家科技独角兽。从"跨境收付+FX"切入，逐步扩展为多币种账户+发卡+收单+嵌入式金融+理财的一体化平台，并自建全球支付网络降低对代理行/SWIFT 依赖。2025 年密集获日本/印尼/韩国/德国牌照、设美国总部，向 IPO 推进。

## 3. 股东与资本 ⚠️公司/媒体口径
- **估值轨迹** 📌（Wikipedia/Sacra，标年份）：2019-03 约 US$1B（独角兽）→ 2021-11 Series E1（US$100M）估值 US$5.5B → 2025-05 Series F（US$300M）估值 US$6.2B → **2025-12 Series G（US$330M）估值 US$8B**；累计融资约 US$1.5–1.57B
- **主要投资人**：Addition（2025-12 领投）、Visa Ventures、Blackbird、Airtree、T. Rowe Price、Activant、Robinhood Ventures、TIAA Ventures；早期股东含**腾讯、李嘉诚系、红杉中国**（媒体口径）
- ⚠️ 估值/融资非经审计，随轮次漂移

## 4. 牌照与资质 📌已核查·一手（airwallex.com licensing 页，2025-2026）
按"法域→持牌实体→牌照类型→监管机构"：
- **澳大利亚**：Airwallex Pty Ltd / Capital / SVF——AFSL(487221/549026)+CAR，监管 ASIC
- **新西兰**：Airwallex (NZ) Ltd——FSP 注册
- **香港**：Airwallex (HK) Ltd——MSO 货币服务经营者，监管 香港海关
- **新加坡**：Airwallex (Singapore)——主要支付机构 MPI，监管 MAS
- **马来西亚**：MSB Class B，监管 Bank Negara
- **美国**：Airwallex US, LLC——**40 州 MTL**，NMLS #1928093；合作银行 Evolve Bank（账户）、Community Federal Savings Bank（发卡，凭 Visa USA 许可）
- **加拿大**：MSB(FINTRAC)+MSB(魁北克)+RPAA 注册 PSP(加央行)
- **英国**：EMI，监管 FCA｜**荷兰**：EMI，监管 DNB（可 EEA passporting）｜**立陶宛**：EMI
- **以色列**：支付牌照，监管 ISA
- ⚠️二手：**中国大陆央行支付牌照**（约 2023-03，经收购广州商物通取得，未在人行/SAFE 名录逐条核验）；日本(2025-11)、印尼(2025-12)、韩国(2026-01)、德国(2026-02)
- 公司自述截至 2025 年底约 **80 项牌照/许可、覆盖约 200 国** ⚠️（公司口径，未逐项核实）

## 5. 定位与商业模式
- **产业链位置**：跨境 B2B 支付基础设施/PSP+账户机构，处"商户/平台 ↔ 银行清算/卡组织"之间；自建全球网络（约93%走自有网络/7%走SWIFT）
- **怎么赚钱**：① **外汇汇差(FX margin)**——核心利润，号称比传统便宜50–80%、底价加约0.2%毛利 ② 跨境收付款手续费 ③ 全球账户/发卡/收单/付款服务费 ④ 嵌入式金融/API 分成（约60%营收来自API与嵌入式）⑤ Airwallex Yield 理财（AUA>US$1B）

## 6. 核心产品与业务范围
多币种全球账户(Global Accounts) / 跨境付款(Payouts) / 外汇(FX) / 收款收单(Payments) / 公司卡+费用管理(Visa借记卡) / 嵌入式金融与API / Payroll / Airwallex Yield(理财, 2023-11澳洲首发) / 生成式AI驱动KYC

## 7. 业务区域
自述约 150–200 国可收付款。三大支柱：**亚太 + 英国/欧洲 + 北美**；近年美洲(+171%)、EMEA(+116%)增速最快（Sacra, H1 2025）

## 8. 规模与数据 ⚠️公司/Sacra口径
- **TPV**：约 US$130B+(2025-03) → US$235B(2025-10) → 年化约 US$266B(2026 初)
- **营收/ARR**：约 US$500M run-rate(2024-08) → 年化约 US$1B(2025-10) → ARR 约 US$1.1B(2025 底) → 约 US$1.3B(2026-04)；2025 同比约 +70%
- **盈利**：自述 2025 Q4 达 EBITDA 盈利｜**客户**：约 200,000 家企业｜**员工**：约 2,000(2026)

## 9. 组织架构
**各法域独立持牌运营主体**的多实体架构，统一品牌 Airwallex 运营（见 §4 各国实体）；澳洲通过 AUSTRAC 所称的 "Airwallex Designated Business Group (DBG)" 归集；中国业务经收购广州商物通运营 ⚠️。顶层控股注册地（新加坡控股）未逐条核验工商登记。

## 10. 技术架构特点
**自建全球支付网络**是其技术招牌——约93%交易走自有清算网络、绕开代理行/SWIFT，控成本+提速；约60%营收来自 API/嵌入式产品（强工程/平台属性）。⚠️ 具体云/技术栈未公开核实。

## 11. 护城河与差异化
① 自有全球网络+多法域牌照矩阵（约80项，难复制）② 93%自有网络降本提速 ③ 多产品一体化(账户+FX+收付+发卡+收单+嵌入式+理财)交叉销售 ④ 约60%营收来自API绑定平台型客户、切换成本高 ⑤ FX定价优势

## 12. 主要竞争对手
Wise、Stripe、Adyen、PayPal/Payoneer、Nium、Rapyd、dLocal、Revolut、Brex/Ramp；"跨境电商收款"细分与 Payoneer/PingPong/连连重叠，"嵌入式支付/收单"与 Stripe/Adyen 正面竞争

## 13. 最新动态与风险 ⚠️时效 2025-12~2026-02
- 📌 **2026-01-22 AUSTRAC 审计令**：澳洲反洗钱监管机构对 Airwallex DBG 委任外部审计师，审查 AML/CTF 合规，称存"潜在不合规/疑似失误"（AUSTRAC/AFR/SMH/Reuters）——**重大监管风险，调查进行中**
- 📌 **2025-12 美中数据安全争议**：VC Keith Rabois 指"中国后门"、参议员 Tom Cotton 致函司法部要求调查；CEO 断然否认（称美国数据仅存美/荷/新加坡、中港员工无访问权），公司据报将员工迁出中国
- IPO 预期：以 2026 年具备上市条件为目标

## 14. 与本研究 / AWS 对话的衔接
- **可聊**：自建全球支付网络的工程化（vs 依赖 SWIFT）、多法域牌照合规架构、嵌入式金融 API、多币种账务与 FX 头寸——都是 AWS 多 Region/数据驻留/账务一致性的切入点（呼应 `03-crossborder-tech-aws.md`）
- **AWS 角度**：AUSTRAC 审计 + 中美数据争议 → **数据驻留/隔离、合规审计可追溯、KYT/AML** 是其当下痛点，正是 AWS 合规能力栈的对话入口

## 15. 来源清单
- 牌照(一手)：airwallex.com/us/terms、/us/state-licenses、help.airwallex.com licensing 页
- 公司/规模：en.wikipedia.org/wiki/Airwallex、sacra.com/c/airwallex
- 监管风险：austrac.gov.au 新闻稿、afr.com、smh.com.au、cotton.senate.gov、forbes.com、cxtoday.com
