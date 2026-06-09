# Airwallex（空中云汇）

> 📌 **一句话定位**：面向企业(B2B)的全球支付与金融基础设施平台——多币种账户+跨境收付款+外汇为核心，**自建全球清算网络(自述处理约 93–95% 交易于自有网络、绕过 SWIFT)**，并在多国持牌提供本地账户、发卡、收单、费控、嵌入式金融与理财。
> 🏷️ **角色归类**：**两者都做，以"跨境收付款+全球账户"为主、"本地收单"为辅**（呼应 `03-crossborder-business §13.3`）。
> ⚠️ **数据时效**：截至 2026-06。📌 牌照实体经官方 Global Entities 页核对；未上市无审计财报，TPV/营收/估值多 Sacra/FXC 二手口径，且来源间冲突(尤其 TPV $130B vs $266B)。

---

## 1. 基本信息
- **成立**：2015 年(墨尔本)——起因 Jack Zhang 与 Max Li 投资的咖啡馆遭遇跨境收款贵；5 位创始人共投约 $1M
- **总部**：**双总部 旧金山 + 新加坡**(原墨尔本起家)
- **当前状态**：⚠️**未上市**(估值 $8B)，被广泛报道"2026 IPO-ready"但尚未提交招股书

## 2. 背景与沿革（里程碑时间线）📌Wikipedia+新闻
| 时间 | 里程碑 |
|---|---|
| 2015 | 墨尔本 5 人创立，closed beta |
| 2017 | ANZ 提供交易服务；TPV 仅约 $5M |
| 2018 | HQ 迁香港；**拒绝 Stripe 约 $10 亿收购要约**；融资 $80M |
| 2019 | 澳洲第三只科技独角兽($1B) |
| 2020 | TPV 约 $10B |
| 2021 | 进入美国/新加坡；发 Visa 借记卡；获荷兰 EMI(5月)、马来西亚(9月)；Series E1 **$5.5B**(11月) |
| 2023 | 收购墨西哥 MexPago；**获中国第三方支付牌照**；上线 **Airwallex Yield**(澳洲) |
| 2024 | 扩张法国；McLaren F1 合作；7月获 ASIC AFSL；8月宣布 $500M 收入 run-rate |
| 2025 | 进入新西兰/日本(11月)/印尼；Arsenal 合作；Series F **$6.2B**(5月)；Series G **$8B**(12月)；Q4 达 EBITDA 盈利 |
| 2026 | 收购韩国 Paynuri；扩张德国；**1月 AUSTRAC 下令外部审计** |

> 战略主线：从"跨境收款/外汇"单点 → 自建全球清算网络 → 叠加账户/发卡/费控/Yield → API 化做嵌入式金融平台，从"**FX 玩家**"转型为"**全球银行/金融基础设施平台**"。

## 3. 股东与资本 📌
- **估值曲线**：2019 $1B → 2021-11 **$5.5B**(Series E1) → 2022 $5.6B → 2025-05 **$6.2B**(Series F, $300M) → 2025-12 **$8B**(Series G, $330M，较 F 轮 +约30%)；累计融资约 $1.5–1.57B
- **投资人**：Addition(2025-12 领投)、Visa Ventures、Blackbird、Airtree、T. Rowe Price、Activant、Robinhood Ventures、TIAA Ventures；早期股东含腾讯、李嘉诚系、红杉中国(媒体)

## 4. 牌照与资质 📌官方 Global Entities 页（⚠️ 除澳洲 AFSL 外多未列证号）
自述约 **80 项牌照/许可**(公司口径，非穷举)。已确认实体：
| 法域 | 实体 | 牌照 | 监管 |
|---|---|---|---|
| **澳大利亚** | Airwallex Pty Ltd / SVF / Capital | **AFSL 549026**(📌证号已核查) + AUSTRAC 注册 | ASIC/AUSTRAC |
| **荷兰/EEA** | Airwallex (Netherlands) BV | **EMI**(2021-05，EEA passporting) | 荷兰 DNB |
| **英国** | Airwallex (UK) Ltd | EMI/支付机构 | FCA |
| **新加坡** | Airwallex (Singapore) | 主要支付机构 MPI | MAS |
| **香港** | Airwallex (HK) Ltd | 货币服务经营者 MSO | 香港海关 |
| **美国** | Airwallex US, LLC | FinCEN MSB + 各州 MTL | 各州/FinCEN |
| **加拿大** | Airwallex (Canada) | MSB | FINTRAC |
| **马来西亚** | Airwallex (Malaysia) | 2021-09 获牌 | BNM |
| 新西兰/以色列 | 各本地实体 | — | — |
| **中国大陆** | 经收购获第三方支付牌照(2023) | — | 央行(实体名/证号未核) |
| 日本 | 2025-11 完成注册 | 资金移动业相关 | — |
| 墨西哥/韩国 | MexPago(2023收购)/Paynuri(2026收购) | 本地资质 | — |
- ⚠️ "约 80 项"逐项归属未穷举，需查 ASIC/DNB/FCA/MAS/NMLS/FINTRAC 等名录

## 5. 定位与商业模式（收入结构）📌Sacra/FXC 二手
- **收入结构**(Sacra)：跨境支付 ≈ **60%**(服务初创/marketplace 如京东)、全球账户产品 ≈ **40%**；另口径"约 60% 收入来自 API/嵌入式产品"(与前者有重叠归类)
- 📌 **结构性转型(关键)**：截至 2025 年中，"**超 50% 毛利来自境内支付(domestic payments)+发卡(card issuing)**"——从历史依赖跨境 FX 价差，转向收单+发卡+账户多元结构；**FX 仅占约 20% 交易**(FXC 2025-07)，印证已从"换汇商"转型为"全球银行平台"
- **费率**：交易按百分比收费(低于银行)+SaaS 分层定价；FX 在中间价加约 **0.2% margin**(比传统外汇便宜 50–80%)
- ⚠️ 未上市无审计财报，以上百分比均 Sacra/二手口径，绝对收入额未公开

## 6. 核心产品与业务范围 📌官方+二手
1. **Global Accounts(入口产品)**：在 150+ 国/地区开本地收款账户(收本地 ACH/SEPA/Faster Payments)，持 60+ 币种余额，无需各国开本地银行账户
2. **FX/Financial Markets**：实时换汇/锁汇/远期，中间价加约 0.2% margin
3. **Payments/Payouts**：向 150+ 国本地付款，自有网络处理约 93–95% 交易绕过 SWIFT
4. **Acquiring(收单)**：为电商/平台收单，支持多本地支付方式，Merchant of Record(MoR)模式可由 Airwallex 承担合规
5. **Cards/Issuing(发卡)**：Visa 借记卡/虚拟卡/费用卡，已成毛利主力之一
6. **Spend Management(费用管理)**：企业支出/报销/预算管控+卡，对标 Brex/Ramp
7. **Embedded Finance/Payments for Platforms**：API 让平台嵌入账户/收付/发卡/外汇，约 60% 收入来自 API/嵌入式；正探索"嵌入式信贷"
8. **Airwallex Yield**(2023 澳洲上线，扩至港/新/荷)：企业闲置资金投货币市场基金赚收益
- **旗舰深入**：Global Accounts + 自有付款网络是护城河核心，再交叉销售卡/费控/Yield/嵌入式

## 7. 业务区域 📌按大区+国家+现状
- **亚太(发源地/核心)**：澳洲(2015 起家，ASIC AFSL)、香港(2018 迁 HQ，工程重镇)、新加坡(双总部之一，MAS MPI)、中国大陆(2023 收购获牌，工程团队；2025 底因数据争议据报将部分员工迁出)、马来西亚(2021)、新西兰(2025)、日本(2025-11)、印尼(Skye Sab)、韩国(2026 Paynuri)
- **欧洲/EMEA**：荷兰(2021 EMI，欧盟枢纽)、英国(FCA)、法国(2024)、德国(2026)；**EMEA 收入 2025 同比 +116%**(Sacra)
- **北美**：美国(双总部旧金山，MSB+州 MTL)、加拿大(FINTRAC)；**Americas 收入 2025 同比 +171%**(增速最快)
- **拉美**：墨西哥(2023 MexPago)｜**中东**：UAE 为新扩张(牌照状态未核)｜**非洲**：未查到实质自营
- 自述可向 150+ 国转账

## 8. 规模与数据 ⚠️Sacra/二手（口径冲突已标注）
- **TPV(年化)**：2017 约 $5M → 2020 $10B → 2025 约 **$130B**(较早口径) → Sacra 最新 **$266B**(⚠️ 两口径差异大)
- **收入/ARR**：2024-08 约 $500M run-rate → 2025-07 接近 $900M、目标 Q4 破 $1B → 2025 底 ARR **$1.1B** → 2026-04 **$1.3B**(2025 同比 +约70%)
- **盈利**：Sacra 称 2025 Q4 达 **EBITDA 盈利**；H1 2025 毛利同比 +78%
- **客户**：FXC(2025-07)15 万家已开户、月活不到 10万；Sacra 最新 **20万+ 企业**；目标 2030 月活破百万
- 员工 ~2,000(2026)；Yield AUA 超 $1B

## 9. 组织架构 + 管理层 📌5 创始人
- **Jack Zhang(张乐)**：联合创始人兼 CEO，曾为 NAB/ANZ 设计数字外汇平台，墨尔本大学背景，对外回应数据争议的主要发声人
- **Lucy Liu(刘洁微)**：联合创始人兼总裁(President)，墨尔本大学金融
- **Max Li(李锦桐)**：联合创始人，设计负责人(与 Zhang 共同投咖啡馆触发创业)
- **Xijing "Jacob" Dai(戴希菁)**：联合创始人兼 CTO
- **Ki-Lok Wong(黄基乐)**：联合创始人，首席架构师
- 多为墨尔本大学校友。⚠️ CFO/COO 等非创始高管姓名、董事会、内部事业群未查到
- **集团结构**：多法律实体按法域划分(见 §4)，双总部旧金山+新加坡，业务按产品线划分

## 10. 技术架构特点 📌（⚠️ 用 Google Cloud，非 AWS）
- **自有全球清算网络**：自述处理约 **93–95% 交易于自有网络**(绕过 SWIFT)，是核心技术护城河
- **云**：📌 **有 Google Cloud 客户案例**(cloud.google.com/customers/airwallex-ai)，指向用 GCP+AI；⚠️ **未见证据主用 AWS**
- **API 网关**：用开源 **Apache APISIX**，部署在自有私有网络边缘强化数据主权，是 APISIX 知名用户/贡献者
- **API 能力**：money movement API(多币种账户/FX/付款/connected accounts/嵌入式金融)
- **AI**：ML+生成式 AI 用于客户 onboarding、运营。⚠️ 架构细节(数据库/清算网络拓扑/资金路由)未公开

## 11. 护城河与差异化
① **自有全球清算网络**(处理约 93–95% 交易，降本提速，难复制) ② **约 80 项牌照矩阵** ③ **B 端全栈**(账户→FX→收付→发卡→费控→嵌入式→Yield)交叉销售 ④ 约 60% 营收来自 API/嵌入式绑定平台型客户、切换成本高 ⑤ **毛利已从依赖 FX 价差转向境内支付+发卡(>50% 毛利)，抗周期性增强**

## 12. 主要竞争对手 📌+🔧具体对比
- **vs Wise**：Wise 强 C 端+中小企业廉价透明汇款、本地账户网络更广、合规历史更长(已上市)；Airwallex 更偏 B 端全栈、产品广度更宽
- **vs Stripe**：Stripe 强线上收单/开发者生态(美国核心)，Airwallex 强多币种账户+跨境付款+自有清算(亚太起家、150+国收付款)；两者在"嵌入式金融/Payments for Platforms"正面竞争；2018 Airwallex 曾拒 Stripe 约 $10 亿收购
- **vs Nium**：同为 B2B 跨境基础设施，Nium 更纯做 payout rails+发卡 API；Airwallex 产品线更全(含 SMB 前台账户/费控/Yield)、自有账户体系更重
- **vs Payoneer**：Payoneer(已上市)强 marketplace 卖家收款+新兴市场、客群偏中小卖家；Airwallex 客群上探成长型企业/平台
- **差异化**：自建全球清算网络(自有处理约 93–95%)+B 端全栈+亚太基因+约 80 项牌照

## 13. 监管与最新动态 ⚠️时效 2025-2026（两大悬而未决风险）
- 📌 **2026-01-22 AUSTRAC 外部审计**：依《AML/CTF Act 2006》第 162 条对 Airwallex Designated Business Group 指定**独立外部审计师**，审查 AML/CTF 程序、客户尽调与可疑事项报告；AUSTRAC CEO 称公司"未能展示对客户身份的可接受理解"；审计费用 Airwallex 承担，须任命后 **180 天内报告**，结果决定是否进一步监管行动。公司称将配合、认为控制适当——⚠️ **结论 180 天内出，若指向系统性 AML 缺陷可能引发处罚/影响 IPO**
- 📌 **2025-12 中美数据争议**：Khosla Ventures、早期 Stripe 投资人 Keith Rabois 公开指 Airwallex 公司结构/工程团队/中国投资人可能使美国金融数据暴露给中国政府(Forbes 称"China backdoor allegations")；参议员 Tom Cotton 援引 **EO 14117** 致函 DOJ 要求调查；CEO Jack Zhang 断然否认(称美国数据仅存美/荷/新加坡、中港员工无访问权)，据报将员工迁出中国——⚠️ **中美地缘风险是结构性悬而未决**
- 历史：2019-2021 香港约 US$18.2M 资金因洗钱嫌疑被冻结，后经法院驳回获释
- **最新**：2025-05 Series F $6.2B、2025-11 进日本、2025-12 Series G $8B+Q4 EBITDA 盈利、2026 收购韩国 Paynuri+扩德国

## 14. 标杆客户 📌
- 企业客户/平台：**Brex(Airwallex 为其提供全球资金移动)**、Rippling、Deel、Navan、SHEIN、Zip、Bird、Circles、PartnerStack；**京东(JD.com)**(跨境支付客户)
- 体育营销：**McLaren Racing(F1, 2024起)**、**Arsenal FC(2025)**
- ⚠️ 多为客户名单/合作公告，缺深度量化案例；"$235B AI 支付"口径与其他 TPV 不一致，谨慎

## 15. 与本研究 / AWS 对话的衔接
- **可聊**：**自建全球清算网络**(vs 依赖 SWIFT，处理约 93–95%)；从"FX 玩家"转型"全球银行平台"(毛利 >50% 来自境内+发卡)；约 80 项牌照矩阵；B 端全栈打法；两大悬而未决风险(AUSTRAC 审计/中美数据争议)
- **⚠️ AWS 角度(诚实)**：**公开证据指向 Airwallex 用 Google Cloud + 自建网络 + APISIX，非 AWS**。AWS 切入点更多在**"数据主权/数据驻留"**(正是其面对中美争议的核心痛点——按地域隔离美/荷/新数据)、多区域合规清算、AI onboarding/反洗钱 KYT、IPO 前可审计性/可观测性建设——但需正视它已是 GCP 客户

## 16. 来源清单
- 一手：airwallex.com/terms/airwallex-global-entities(牌照实体)、/platform-api-and-embedded-finance、AUSTRAC 官方新闻稿、cotton.senate.gov、businesswire(Series F)
- 权威二手：en.wikipedia.org/wiki/Airwallex、sacra.com/c/airwallex(收入/TPV/估值/毛利)、fxcintel.com(2025 增长)、Forbes/AFR(数据争议)、cloud.google.com/customers/airwallex-ai(GCP)、api7.ai/apisix.apache.org(APISIX)
