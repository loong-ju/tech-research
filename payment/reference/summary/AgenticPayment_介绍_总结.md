# AgenticPayment 介绍 — 演示文稿内容总结

- **文件名**：AgenticPayment_介绍_总结.md
- **主题**：Agentic Payment（智能体支付）技术介绍——从一张银行卡讲到 Agent 自主付款，对比 AgentCore Payments 与 Agenzo 两个产品
- **总页数**：31 页
- **整体概要**：这份 PPT 以"付款的人不在场了，支付的安全闸怎么重建"为主线，自底向上讲解 Agentic Payment 的技术原理。先从一张银行卡的数据字段、PCI DSS / PIN / 3DS 三道保护讲起（第 0 段），引出支付的"四方模型"和"授权 ≠ 清算、安全挂三道闸"的基础认知（第 1 段）；接着回顾支付史就是一部"别让真卡号裸奔"的历史，逐一拆解 VCN（虚拟卡号）、Network Token、x402 三种"不暴露真凭证完成授权扣款"的方案（第 2 段）；然后落到 Agent 时代——当付款人不在场时，三道闸（数据安全 / 风控授权 / 反洗钱 AML）各自断在哪、用什么协议（TAP、AP2、VCN/x402）重建（第 3 段）；进而厘清"到底是谁在付款"的角色与场景（委托人 → Agent → 商户，C 端 / B 端，对应哪条资金轨）（第 4 段）；最后以 Strands Agent + AWS AgentCore 为例，给出两条资金轨（链上稳定币 / x402 与法币真卡）的落地代码与时序图，并对比 tool 与 hook/plugin 两种接法、AgentCore Payments 与 Agenzo 两个产品的取舍（第 5、6 段）。全文以"记住这四句话"收口，并附协议速查表。

---

## 第 1 页：当付款的人不在场了，支付的安全闸怎么重建（封面）

- 封面页。顶部标签：AGENTIC PAYMENT · AGENTCORE PAYMENTS · AGENZO。
- 副标题：一段话从底层讲清 Agentic Payment 的技术介绍——懂技术，不懂支付也能跟上；从一张卡讲到 Agent 自主付款，看清两个产品各补哪一端。
- 核心定位框：支付安全 = 持牌机构 + 不暴露真实凭证 + 一个实时在场的授权。
- 主张：Agent 只动了第三件——人不在场了。所有新东西，都在回答"人不在场时，怎么把授权做成机器可验证、可限额、可撤销的凭证"。
- 落款：CardInfoLink / EVONET。日期 2026-06-05。

## 第 2 页：从一张卡，讲到 Agent 自主付款（AGENDA / 全场脉络）

- 议程目录表，分为第 0–6 段：
  - 0 一张卡有哪些字段：PCI DSS / PIN / 3DS 各保护什么、CHD 可存 vs SAD 禁存
  - 1 支付地基：四方模型、授权 ≠ 清算、安全三道闸
  - 2 三个"不暴露真实凭证"的技术：VCN / Network Token / x402——每条轨交换什么字段
  - 3 Agent 来了：三道闸各断在哪、怎么重建、身份/限额/凭证三层
  - 4 谁在付款：角色与场景（Agent 自主付款 / C 端 / B 端 vs 资金轨）
  - 5 两条资金轨怎么落地：链上稳定币 / x402（AgentCore 为例，含代码与时序）、法币真卡轨
  - 6 两条轨的对照与选型：同一个 Strands Agent 两种接法、什么场景用哪条、各自边界

## 第 3 页：一张卡上，到底有哪些数据字段？（第 0 段·开场）

- 用招商银行 VISA 卡样展示卡面字段，并列表说明"是什么 / 读取靠"：
  - PAN 主账号：16 位卡号、前 6 位 BIN（机构发卡行），靠卡号本身
  - 有效期 / 姓名：MMYY、持卡人姓名
  - 磁条 Track1/2：含 PAN+敏感数据，靠刷卡/插卡
  - CVV / CVV2：卡背 3 位（验证卡片在手），靠肉眼/人工输入
  - PIN：交易密码，靠 PIN 输入
  - 芯片密文 CVV：EMV 芯片每笔算出的动态值，靠芯片内部
- 底注：VCN / 令牌 / x402 全都都是在回答这一个问题——这些字段哪些能丢/不能碰？怎么让它不裸奔？

## 第 4 页：PCI DSS / PIN / 3DS —— 三个东西，各保护什么？（第 0 段·开场）

- 三者保护的不是同一件事，对应"谁是真正在付款的人"：
  - **PCI DSS**：保护"卡数据本身不裸奔"——卡组织共建的安全标准，规定哪些数据能存哪些不能存。核心一刀：PAN/CHD 可存但要脱敏，CVV/磁道/PIN（SAD）授权后绝对禁存。
  - **PIN**：保护"你知道密码的本人"——你知道的密码，本人在现场或经过 Token 化即被视为本人授权。Agent 时代无法直接输入。
  - **3DS（3-D Secure）**：保护"线上不可交易里的本人"——线上没有 PIN 输入，3DS 在发卡行、卡组织之间多跑一次跨网身份认证（Apple Pay/Agenzo 即用一次性 cryptogram 替换敏感字段发出）。
- 底注：三者保护的不同一件事，对应"谁是真正在付款的人"。

## 第 5 页：一张表抓住全场地基：CHD 可存 vs SAD 禁存（第 0 段·开场）

- 表格对比两类敏感数据：
  - **持卡人数据 CHD（Cardholder Data）**：含 PAN、持卡人姓名、有效期、服务码；授权后可存（可记账，必须加密脱敏，DSS 三级）。
  - **敏感认证数据 SAD（Sensitive Auth Data）**：完整磁条 Track、CVV/CVV2、PIN/PIN Block；授权后绝对禁止存储（用完即丢，留就违规）。
- 两个结论框：
  - **PAN = "可存但要 token 化"**：有令牌化（把 PAN 换成 token），真 PAN 不外泄。
  - **CVV / 磁道 / PIN = 只碰一下，碰都不能碰**：所以 Agent 场景里，让 agent 拿到 CVV 是合规 + 安全的双红线。
- 底注：这些字段在哪条管道里流动？下一节就是它的坐标系——四方模型。

## 第 6 页：四方模型：全场的坐标系（第 1 段·支付地基）

- 四方模型图，四个角色与一句话定位：
  - **持卡人 Cardholder**（小王）
  - **商户 Merchant**（座位网）
  - **发卡行 Issuer**（招商银行，决定授权不授权）—— 发卡（Issuing）= 站在持卡人这边收卡；VCN / Network Token 都是发卡侧（卡组织）的花样
  - **收单行 Acquirer**（英龙行公司，帮商户收钱）—— 收单（Acquiring）= 站在商户这边收钱；x402 把路过这条管道了；令牌化卡组织主导——因为它管着整条公路
  - 中间路由清算：四大卡组 Card Scheme（Visa / Mastercard 等），只管"高速公路"上一笔笔报文，定义货币/路由协议
- 主张：为什么后面要反复回到这张图？因为 Agent 时代的所有重写，都是在这张图上某个角色上加一刀。

## 第 7 页：两个关键认知：授权 ≠ 清算，安全挂在三道闸（第 1 段·支付地基）

- **授权（Authorization）**：几秒内，问发卡行"卡能不能用、占额度"，回答卡片可用与否（占额度等）。
- **清算结算（Clearing）**：T+1–T+2，晚上才真把钱划走，后面才创建凭证才扣款——也才真正扣钱。
- 安全挂在这三道闸：
  - **数据安全**：不让真卡号到处跑，靠 PCI DSS。
  - **风控 / 授权**：发卡行在授权时刻校验额度/风险 + 验证本人本人证（PIN / 签名 / 3DS）。
  - **反洗钱 AML**：发卡行/收单行是持牌机构，KYC/AML 由开户/入网时做。
- 底注：这三道闸都隐含一件事——有个本人站在线确认过。下半场的核心，就是这个人被抽走之后发生了什么。

## 第 8 页：支付史，就是一部"别让真卡号裸奔"的历史（第 2 段·不暴露真凭证）

- 时间线，每条都在不暴露真实资金凭证（真卡号 / 私钥）的前提下完成一次有价值的授权扣款：
  - **物理卡 1950s**：真卡号 PAN——一插确卡；POS=收单→商户/系统对接，靠卡片在场、拖刷即完成。
  - **VCN 1990s**：另造真卡号——一次性卡号；网购一刀切就授权扣款。
  - **Network Token 2014**：活脱卡号塞进去，与真 PAN 解绑——一次性 cryptogram；Apple Pay 即它。
  - **x402 2025**：四方模型整张被抽掉——HTTP 402 + 链上 USDC + 钱包代签。
- 主张：接下来三页，每条轨只看一件事——它交换的是什么字段（字段最能看清差异）。

## 第 9 页：VCN 虚拟卡号 —— 另造一张一次性的真卡（第 2 段·不暴露真凭证）

- 交换的字段：cardNumber、cvv、expiry（一个新的真卡号，是动的卡号）：
  - 在另一个 BIN 段内生成，是绑定到你的真卡的子卡号
  - 对真卡号填真卡（受限场景填一次性），但 100% 标准走卡流程
  - 商户和收单看到的是真卡号，是真卡，但不是真卡——卡号被绑在受限制场景规则上
- 套进四方模型：小王在 App 里申请 VCN → 商户/收单看到 Visa 真卡号 → VCN 发卡方（招行）按规则映射真卡扣款。
- 本质：用"另造一个新卡号"保护真卡——卡号生命周期短、绑定真卡的映射关系；万能兼容、商户无改造。
- 现实化：银行 App"虚拟卡号"、携程商旅子卡（限 XX 航司、≤3000、48h）。

## 第 10 页：Network Token —— Apple Pay 就是它（第 2 段·不暴露真凭证）

- 交换的字段：token、cryptogram、eci：
  - **token（DPAN）**：代替真卡号的令牌
  - **cryptogram**：一次性加密密文，每笔一个——安全核心
  - **eci**：标记此笔交易的认证等级
- 绑卡（一次）：卡组织给设备里生成一个绑定身份号 + 这里触发 3DS / Face ID 生成 DPAN（绑进设备里，真卡号根本没进 iPhone）。
- 付款（每笔）：Face ID 安全芯片生成一次性 cryptogram，用户拿到的不是真卡号。
- 表格对比为什么比 VCN 更安全：DPAN 真 PAN 难倒出、每笔 cryptogram 难重放、商户改造无须改造、有无认证收单方支持设备绑定。
- 注：Agenzo 的 -type network-token 和 Apple Pay 原理一样——只是用"Face ID"换成了"Agent + 商户授权"。

## 第 11 页：x402 —— 把四方模型扔掉，用链上 USDC 直接付（第 2 段·不暴露真凭证）

- 交换的字段（示意代码）：EIP-712 签名、X-PAYMENT header、收款地址、amount = 200 USDC。
- 一次 HTTP 往返完成：
  1. Agent → 商户：请求 API
  2. 商户 → 402 Payment Required（报价 + 收款地址 + 链）
  3. Agent 拿 EIP-712（金额 + 收款地址 + 链）签名
  4. 携带 X-PAYMENT header
  5. 商户验签，转给 Facilitator（结算/上链/确认）
  6. 钱从链发起上链
- EIP-712 签名是一份可读授权：从我的链包，转 1 USDC，给地址 0xMerchant，结清这一笔。
- amount：单位是链上最小金 USDC 6 位的，1000000 = 1 USDC（轻量级 100 万美元）。
- 没收款柜台，但有 Facilitator（收单行的功能等价物）做验签 + 结算——合规拆到链上金 + USDC 发行方两端，中间是真发出。

## 第 12 页：四条轨道总对照（含 APM）（第 2 段·收口）

- 大表对比四条轨：VCN / Network Token / x402 / APM 支付宝/微信：
  - 现实化身：银行 App 虚拟卡号 / Apple Pay·Google Pay / Coinbase x402 付费 API / 扫码付 + PayPal
  - 本质：另造真卡 / 真卡号塞进去、真 PAN 不外泄 / 链上 USDC 一次性签名 / 第三方账户体系
  - 资金来源：真卡 / 真卡 / 链 USDC / 余额或绑定
  - 是谁的授权：Visa/MC / Visa/MC / 无收单方、有 Facilitator / 自建体系
  - 返回字段：cardNumber/cvv/expiry / token/cryptogram/eci / signature / (各家 API)
  - 真卡号有否：外泄虚拟卡 / 真 PAN 难外泄 / 无 / 否
  - 适合 Agent 化：可虚拟卡号 / 设备绑定难 / EIP-712 私钥签名 / 受协议绑定能力门槛
  - Agenzo 支持：Production / Ready / Lightweight / Coming Soon
- 底注：到此为止，每条轨都假设"有个人在按确认"。把那个人删掉之后，三道闸各断在哪？

## 第 13 页：三道闸：各断在哪、谁来重建（第 3 段·Agent 来了，技术核心）

- 表格按三道闸分析"各断在哪 / 人抽走后断的是啥逻辑 / 怎么重建"：
  - **数据安全**：不让真卡号外泄（PCI DSS）→ 令牌化 VCN，从源头不到真卡号。
  - **风控/授权**：发卡行授权 + 持卡人本人确认——断了，因为没有真人本人点确认 → 把授权抽象成机器可验的协议（TAP / AP2），授权被拆成"身份 + 重新授权"，凭证用 RFC 9421 / AP2 三层 mandate / 凭证轨绑 VCN + x402 签名。
  - **反洗钱 AML**：发卡/收单行是持牌机构，KYC/AML 在开户/入网做——让 agent 无法绕过，不到环节即可"完成" → AML 不变路由仍由持牌机构，链上轨 x402 中段真发，凭证轨绑 VCN + USDC 发行方两端。
- 重点：真正被 Agent 打断的那道，没有协议能让人重新点确认；用一次授权被拆成"身份 + 重建 + 单笔授权"三个可验证集来代替。

## 第 14 页：把"一次指纹"拆成三张票据（第 3 段·Agent 来了）

- 三张票据：
  - **身份证明 → TAP（Visa Trusted Agent Protocol）**：用 RFC 9421 HTTP 消息签名，给商户请求签名，证"是 agent 在请求，代表谁"。
  - **意图层 → AP2（Intent / Cart / Payment 三层 mandate）**：授权你买 AJ1，预算 ≤$200，在 Nike 官网，今天内有效（v0.2 起支持 Human-Not-Present）。
  - **凭证轨 → VCN / x402 签名**：真正动钱那一张，单笔硬限额、限商户、用完即弃。
- AML 没断：常见疑问"agent 自动花钱是不是绕过监管？"——绝论相反，正因为 agent 不持牌、碰不到钱，持牌机构反而能拿到全程可观。
- 一个反置重点：用户的"配置阶段"（明示授权后）= 不再每笔点头；每笔 agent 自动花。运行时每环节再验证。prompt 注入风险全在运行时护栏挡。

## 第 15 页：于是一堆缩写：协议栈被迫分层（第 3 段·Agent 来了）

- 人在场时是一瞬间点确认的事；Agent 时代被拆成四段，每段各管一摊：
  - **发现/能力**：MCP、A2A —— 怎么找到能调谁；A2A card → /.well-known/agent-card.json
  - **购物/结账**：ACP、UCP —— 六类 checkout：incomplete →…→ completed；ACP = Stripe + OpenAI
  - **意图/授权**：AP2、TAP —— 决定能不能买（这层 agent 在场，本场短暂在场一层）
  - **支付凭证**：VCN、Network Token、x402 自动钞，本场聚焦这一层
- 主张：复杂的来源是四层被同时拆开；前 Agent 时代这四段曾经被缩成一个动作。在有具体场景落地前，先回答一个被忽略的问题——到底是"谁"在付款？

## 第 16 页：到底是"谁"在付款？委托人 → Agent → 商户（第 4 段·角色与场景）

- 三角链路：委托人 Principal —授权→ Agent —付款→ 商户 / API。
- **Agent 是什么角色**：而非持卡人代替它行使付款的主体的代理，本身是不掌权的代理、被授权花钱。这个 agent 是谁、代表谁、被授权花什么。
- **谁授权 谁付钱**：钱在/线包 / 私钥保存着 → agent 自己不持有资金金，不持有；在授权范围内动钱。
- **"同意"在哪一刻**：委托人在配置阶段授权一次（根本/授权范围）；运行时每环不再逐笔点头。
- 主张：所以付款主体从一个人"裂变成委托人 + agent"两层——这正是身份层（TAP）、意图层（AP2）、限额凭证层分别重建的根因。

## 第 17 页：C 端 / B 端 在哪，场景对应哪条资金轨（第 4 段·角色与场景）

- 两类场景与典型例对应资金轨：
  - **C 端：个人消费助理 agent**——委托人个人消费者，用哪自己的卡/钱包，agent 替你订酒店、买机票、续付费内容，授权来自个人，金额几元–几百。
  - **B 端：企业采购/差旅 agent**——委托人企业，agent 按差旅/采购政策自动下单、调用 API 数据源，授权来自企业账，限额按企业、可观。
- 典型场景表（研究/内容订阅 / 旅差报销 / SaaS 续费）对应资金轨：链上稳定币 x402（微交易）、法币真卡 VCN（差旅报销）、卡轨或 x402（订阅续费）。
- 底注：归结成两条资金轨：链上稳定币 / x402（机器原生微交易）vs 法币真卡（实物/服务消费），这两条分别最易落地。

## 第 18 页：落地前提：Strands Agent Loop（第 5 段·两条资金轨怎么落地）

- 用户输入 → Agent Loop：
  1. **推理 Reasoning**——模型拿全部上下文 → 输出本场 tool-use 请求
  2. **工具选择**——按 schema 校验参数
  3. **执行 Execution**——找到工具 + 执行 → 结果追加进历史
  - stop_reason=tool_use → 循环；end_turn → 完成；输出 AgentResult(message, metrics, traces, ...)
- 扩展点有两类：
  - **tool**（只供模型主动调的动作）
  - **hook**（循环节点被动触发）；plugin = 一组 hook 打包成的成品包
- 备注：推理/选择/执行比喻 事件点 = 插座（框架固定）；hook = 插头；plugin = 接好线的整套设备。同一个插座能接 payment，也能接护栏 / 限流 / 审计 / 人工审。

## 第 19 页：代码：tool 是能力，hook 是拦截点（第 5 段·两条资金轨怎么落地）

- 左侧 **① @tool —— 模型主动调用**：示例 `@tool def search_hotel(city, str) -> list:` 模型在推理阶段决定要不要调用、传什么参数，工具对模型暴露于 schema 或参数 prompt 上。
- 右侧 **② hook —— 循环节点被动触发**：示例 `from strands.hooks import HookRegistry / class MyPaymentHook(HookProvider): registry.add_callback(BeforeToolCallEvent, self.before)` payment plugin 的本质——是一个植在工具调用前后、专门拦截处理 402→报名→重试 的 HookProvider。

## 第 20 页：先看场景 + 两张时序图（第 5 段·轨道一·链上稳定币 / x402，AgentCore 为例）

- **图 A·控制面（6 步配置，人在场授权一次）**：
  1. create_payment_credential_provider（CoinbaseCDP/StripePrivy）
  2. create_payment_instrument（接入式签名）
  3. create_payment_instrument + connector
  - 用户在 redirectUrl 中授权链上 USDC + 授权代理 → ACTIVE
  4. plugins=[AgentCorePaymentsPlugin]
- **图 B·数据面（运行时人不在场，自动）**：
  - http_request 命中收费端点 → **402 Payment Required**
  - plugin 自身签名 → AfterToolCall 拦截 → 自动接签名
  - ProcessPayment：携签名重发（被绑不出钞算）
  - 附 proof 凭证再发 → 链上 USDC 结算
  - 200 OK（模型只看到付款成功）
  - 全部链上完成 / 会话级预算池 拦截
- 注：用户在 redirectUrl 配置一次；运行时 402→签名→重试由 plugin 重托管，模型与业务代码无介入。

## 第 21 页：看清两步：链下代签 → Facilitator 提交上链扣款（第 5 段·轨道一·x402，AgentCore 为例）

- x402 的关键心点：只要把"签一份链下授权"和"真正把它广播上链、把 USDC 扣走的那步分两步"看清，签名 ≠ 扣款——一个本场签名 + 链下"授权 / 清算"是同一一不被。
- **AgentCore 托管签**：EIP-712 只签 链下转账（金额 1 USDC 给 0xMerchant，针对此一笔）。链发签验从 agent 本场起 delegated signing。产生一个签下整名（off-chain proof），随 X-PAYMENT header 上链。链发签验 agent 本场签下整名。
- **收款方收**：Facilitator 提交上链 → 真正扣 USDC。
  - x402 API：商户拿 402 报价
  - verify 验签 → settle 上链扣款；Facilitator 拿、付 gas / 从你链发签收 USDC 扣给商户。
  - 链上（链发）：链上扣 + 付 gas → settle 上链扣款 USDC 真发 → "扣"发生在这一步 → 200 OK
- 为什么是两步：把 verify/settle 外包给 Facilitator，省掉自己跑链 + 管 gas；用"验证后再付出收单收单方"是一种商业逻辑。
- 合规落在哪：链验设定为 KYT；商用 Facilitator（Coinbase CDP / Stripe）在 verify/settle 端做 KYT/AML/制裁筛查；USDC 由 Circle 发行可可冻结。中段真发，合规接到两端。

## 第 22 页：真实代码：Step 6 把 plugin 挂上（第 5 段·轨道一·x402，AgentCore 为例 / AWS 官方 getting-started）

- 展示 Python 真实代码片段（精简）：
  - 从 strands import Agent；从 strands_tools import http_request
  - 从 bedrock_agentcore.payments.integrations.config import AgentCorePaymentsPluginConfig
  - 从 bedrock_agentcore.payments.integrations.strands.plugin import AgentCorePaymentsPlugin
  - config = AgentCorePaymentsPluginConfig(payment_manager_arn=PAYMENT_MANAGER_ARN, user_id="test-user-123", payment_instrument_id=INSTRUMENT_ID, payment_session_id=SESSION_ID, region="us-west-2")
  - plugin = AgentCorePaymentsPlugin(config=config)
  - agent = Agent(system_prompt="You are a helpful assistant that can access paid APIs.", tools=[http_request], plugins=[plugin])
  - 注：业务代码零侵入；唯一一个改造点就是 plugins=[…]，业务代码自身不动。
- 红框底注：代码同样本来源是 sample/sample-agentcore-cloudfront-x402-payments / 那份是 5 月前刚解时代 DIY 写法（@tool def sign_payment + import coinbase_agentkit），现在官方收掉了再用 plugin 即可。

## 第 23 页：法币轨怎么做：发受限凭证，付款阶段不碰钱（第 5 段·轨道二·法币真卡）

- 法币 / 真卡这条轨，核心模式是：为每笔现造一张带硬限额的受限凭证。三种凭证证后从同图谱列的三条技术轨：
  - **VCN·万能凭证**：create -–type vcn --amount 30；返回 cardNumber/cvv/expiry；走标准卡轨，商户无须改造；现实化身：银行 App 虚拟卡号、携程商旅子卡。
  - **Network Token·需收单支持**：create --type network-token；联一次性 cryptogram（含 PAN/真卡号）；token+cryptogram 下发；收单方必须支持；适合 Scheme 直连。
  - **x402·自带真发**：连 API → 命中 402 challenge；强制现造 EIP-712 链发；签返 X-PAYMENT header；动钱链上 USDC；最像 agent 原生。
- 底注：这层只做发凭证 + 策略一刀；决定金额、花多少、花几花、按 limit + 审计。钱真正流动还在卡轨/链上的管道里管清算；发凭证不碰钱、不绕牌。（备注同一文案 CardInfoLink / EVONET 由 Agenzo）

## 第 24 页：代码：没有 plugin，用 @tool 包一个发凭证调用（第 5 段·轨道二·法币真卡）

- 展示 Python @tool 代码片段（精简）：
  - `@tool def create_payment_token(amount: float, rail: str ="vcn", pay_to: str = "", order_id: str = "") -> dict:`
  - 一笔商交易触一次发凭证证、付款时调用
  - r = https.post("https://agent.evronet.com/api/v3/agent-pay/payment-token", json={"type": rail, "amount": amount, "pay_to": pay_to, "order_id": order_id}, headers={"Authorization": f"Bearer {os.environ['AGENZO_API_KEY']}"}, ...) # 代换合规上下文
  - timeout=10；r.raise_for_status()；return r.json() # VCN: card{number,cvv,expiry} / x402: signature
  - agent = Agent(tools=[create_payment_token, merchant_checkout], ...) # 402-发凭证-还款，代换合法逻辑
- 底注：那条 hook/plugin 那条轨——轨道一是用 hook/plugin 对 402 拦截自动；这条轨是一个"模型主动调的 tool"——付款时调用现造一张受限凭证，再交给商户结账。API key 由代码或上下文给，不进模型上下文。

## 第 25 页：同一个 Strands Agent，两条轨两种接法（第 6 段·对照与选型）

- 表格对比同一 Strands Agent 下两条轨：
  - 接入轨道：链上 / x402（官方 plugin）vs @tool / REST
  - 发凭证时机：hook 自动 vs tool 付款现造
  - 402 中段处理：plugin 托管 vs tool 代码处理
  - 限额绑定：会话级预算池 vs 凭证级硬限额
  - 链上凭证：链上 USDC vs 真卡轨（x402）
  - 集成工程：6 步控制面 vs 一个 tool
- 右侧"凭证托管：密钥进不进 agent 进程？"两轨：
  - **轨道一·托管侧授权（架构隔离）**：密钥托管侧（AgentCore Identity），agent 只拿 ARN，凭单在托管侧；钥匙根本不在 agent 手里——防泄露本身。
  - **轨道二·进程内传授（现场作半径）**：API key 注入进程（建议 Secrets Manager），代换码绕审注；劝说可能泄露；让进展也只供一张授权凭证。

## 第 26 页：两条轨：相同的设计前提，不同的实现取舍（第 6 段·对照与选型）

- **相同的设计前提**（左侧）：
  - 一次性前置授权（配置时授权），之后自动行为
  - 都有限额护栏
  - 都不让 agent 碰钱（真卡/私钥）
  - 都让 agent 链真为成（真卡/链）
  - 都是让 agent 能付钱的基础设施
- **限额粒度不同**（右侧表）：
  - 轨道一·链上 USDC：用户授权链上钱包 → 会话预算池
  - 轨道二·法币真卡：委托 agent 代换 → 凭证级硬限额
  - 维度：付款形态 / 资金来源 / 谁动钱 / 限额绑定 / 限额粒度 / 适用场景
  - 轨道一：链上一笔池自的总应度（会话授权范围），轨道二：每一笔的硬限额（凭证绑硬卡号），可叠加，不冲突。
- 底注：两条轨各有侧重的金额级别和场景，不是二选一——一一份 agent 同时可以两条都接。

## 第 27 页：什么场景走哪条轨（第 6 段·对照与选型）

- 场景—资金轨—原因对照表：
  - agent 付费访问 API / MCP / 数据源（微交易，几分钱级）→ **轨道一·链上 x402**：机器原生、秒级结算；AgentCore 内置 x402 Bazaar 链上发现 + 可观测
  - 报真信用卡消费 / 订酒店机票（几十–几百）→ **轨道二·法币真卡**：AgentCore preview·不需直系卡/单四区，法币轨有真实落地场景
  - 需要中段 / 监测限额（东京区、东京 APM）→ **轨道一（AgentCore）**：与 Identity/Gateway/Observability 深度耦合
  - 已落在 AWS / Bedrock / Strands 域 → 两条都可：x402 内置生态 + 真卡实物消费，互不冲突
  - 跨网时覆盖卡 + 链 → 两条都可
- 关键一句：两条轨都能挂进同一个 Strands Agent，不是二选一——按资金额级别和商户支持方式选，或两条都接；各管一类交易。

## 第 28 页：两条轨各自的边界（坦白边界反而加信任）（第 6 段·对照与选型）

- **轨道一·链上 / x402（以 AgentCore 为例）**：
  - Preview（APIs may change AgentCore）
  - 纯链支付——agent 自己判断
  - 4 区可用：us-east-1 / us-west-2 / eu-central-1 / ap-southeast-2
  - 不含东京/新加坡 / 中国
- **轨道二·法币真卡（发凭证模式）**：
  - 无智能路由——选哪条卡还是由 agent 自己判断
  - Network Token 无能力发现——收单方真实会接受验签
  - 商户响应硬限——发凭证不替代风控
  - 需绑定 agent 身份，依赖代码红绑 + 限额凭证
- 底注：两条轨的强项与缺口正好互补：轨道一强在 x402 微交易生态、端点发现、可观测；轨道二强在真卡买实物消费、亚洲落地地。可叠。

## 第 29 页：一个常见疑问：x402"是不是没有合规"？（第 6 段·对照与选型）

- 不是"没有合规"，而是合规被拆到了两端——协议中段确实真发真发，这正是它换来即时/微支付/全球可用的设计取舍。
- 三端：
  - **出入金端（法币↔稳定币）**：Coinbase MSB / VASP 牌照、KYC / AML 在边端做 → 有支撑
  - **协议中段（链上转账）**：协议不做 KYC / 无审行 → 真空地带
  - **资产端（USDC）**：Circle 发行、受监管、可冻结地址簿 → 有支撑
- 发凭证证（轨道二）能补的，是协议中段不管的"执行侧治理"：
  - 无 chargeback / 不可逆 → 凭证级硬限额 + 标商额，出事一锁限额
  - 无 KYC / 无审行 → 绑定 agent 3DS / Passkey + 凭证现造 + 不可叠现签下半径
  - 无意图绑定 → 绑定意图 + 短有效期，压每笔操作半径

## 第 30 页：记住这四句话（TAKEAWAYS / 全场收口）

1. 三道闸都隐含一个**站在终端前的人**；Agent 只是少了这个人——所有新东西都在重建这个人的角色。
2. 用户的同意在**配置阶段**，不在每笔点头。每笔自动是设计前的；安全压力压在运行时护栏上。
3. 付款主体从一个人"裂变成**委托人 + agent**"两层——身份(TAP)、意图(AP2)、限额凭证层因此被拆开重建。
4. 两条资金轨：**链上稳定币 / x402**（机器原生微交易）与**法币真卡**（实物/服务消费）——按场景选，可叠加。

## 第 31 页：缩写速查 & 协议地图（APPENDIX / 附录速查）

- **缩写速查**表：
  - 发卡 / 收单：Issuer 发卡（持卡人这边）/ Acquirer 收单（商户这边）
  - 授权 vs 清算：占额度（确认卡能用，本场几秒）/ 真正划钱（T+1）
  - VCN vs Network Token：另造真卡号 / Apple Pay·Network Token 上链
  - Apple Pay 是什么：NetToK·绑卡 + 每笔 cryptogram，真 PAN 不外泄
  - APM 中国场景：海外 UPI/巴西 Pix 微信/Klarna/支付宝 PayPal，本场轻提
- **协议地图**（只在被追问时展开）：
  - 发现/能力：MCP / A2A
  - 购物/结账：ACP / UCP（六类）
  - 意图/授权：AP2（3 mandate）/ TAP（RFC 9421）
  - 支付凭证：VCN / Network Token / x402（本场聚焦这一层）
  - 口径校验：A2A card = /.well-known/agent-card.json；UCP = 六类 checkout；ACP = Stripe + OpenAI；TAP 靠签 RFC 9421 签名；AP2 = 6 类合 3 mandate、v0.2 起支持 Human-Not-Present；发凭证轨不绕牌、不碰钱。
  - 联系人：tommy.shang@cardinfolink.com（CardInfoLink / EVONET / Summit 讲者 Jacky Zhang）

---

## 全文要点提炼

1. **核心命题**：传统支付安全 = 持牌机构 + 不暴露真实凭证 + 一个实时在场的授权；Agentic Payment 只改动了第三件——"付款的人不在场了"，所有新协议都在回答如何把"人在场点确认"重建成机器可验证、可限额、可撤销的凭证。

2. **支付三道安全闸**：数据安全（PCI DSS，CHD 可存 / SAD 禁存）、风控授权（发卡行授权 + 本人确认 PIN/3DS）、反洗钱 AML（持牌机构在开户入网做 KYC）。Agent 真正打断的是"本人在场点确认"那一道，没有协议能让人重新点，只能用"身份 + 重建 + 单笔授权"三个可验证凭证替代。

3. **不暴露真卡号的演进史**：物理卡（真 PAN）→ VCN 虚拟卡号（另造一次性真卡）→ Network Token / Apple Pay（token + 每笔一次性 cryptogram，真 PAN 不进设备）→ x402（抽掉四方模型，HTTP 402 + 链上 USDC + EIP-712 钱包代签）。每条轨的差异最清楚地体现在"它交换什么字段"。

4. **协议栈被迫四层分拆**：发现/能力（MCP、A2A）、购物结账（ACP=Stripe+OpenAI、UCP）、意图授权（AP2 三层 mandate、TAP=Visa Trusted Agent Protocol/RFC 9421）、支付凭证（VCN、Network Token、x402）；前 Agent 时代这四段曾被压缩成一个"点确认"动作。

5. **付款主体裂变**：委托人 Principal → Agent（被授权、不持有资金的代理）→ 商户。Agent 自己碰不到钱，正因为它不持牌、不碰钱，持牌机构反而能拿到全程可观测——这不是绕过监管，而是相反。

6. **同意发生在配置阶段**：委托人一次性前置授权（限额、范围、有效期），运行时每笔自动执行不再逐笔点头；安全压力因此转移到运行时护栏（防 prompt 注入、限流、审计、人工审）。

7. **两条落地资金轨**（均以 Strands Agent + AWS AgentCore 为例）：
   - **轨道一·链上稳定币 / x402**：用官方 AgentCorePaymentsPlugin，hook 自动拦截 402 → 签名 → 重试，密钥托管在 AgentCore Identity 侧（agent 只拿 ARN），会话级预算池限额；机器原生微交易、秒级结算，强在 x402 生态、端点发现、可观测。
   - **轨道二·法币真卡**：用 @tool 主动调用发受限凭证（VCN / Network Token / x402），凭证级硬限额、限商户、用完即弃，密钥进程内（建议 Secrets Manager）；强在真卡买实物消费、亚洲落地。

8. **两条轨不是二选一**：同一个 Agent 可同时挂两条轨，按金额级别和商户支持方式分流，限额可叠加、不冲突；两者强项与缺口正好互补。

9. **x402 的合规真相**：不是没有合规，而是合规被拆到两端——出入金端（Coinbase MSB/VASP 牌照做 KYC/AML）和资产端（Circle 发行 USDC、可冻结），协议中段（链上转账）是真空地带；发凭证轨（凭证级硬限额、绑 3DS/Passkey、绑意图 + 短有效期）正好补上中段不管的"执行侧治理"。

10. **产品落点**：CardInfoLink / EVONET 的 Agenzo 与 AWS AgentCore Payments 各补一端——Agenzo 对四条轨的支持状态为 VCN（Production）、Network Token（Ready）、x402（Lightweight）、APM（Coming Soon），Agenzo 的 network-token 模式与 Apple Pay 同原理，只是把"Face ID"换成"Agent + 商户授权"。
