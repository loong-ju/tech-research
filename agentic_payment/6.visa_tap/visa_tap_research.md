# Visa TAP (Trusted Agent Protocol) 与 Intelligent Commerce 深度研究报告

> 本报告是 Agentic Payment 系列研究的子报告之一，聚焦 Visa 的 Trusted Agent Protocol (TAP) 及其上层产品 Intelligent Commerce。
> 总览报告见 [agentic_payment_research.md](../agentic_payment_research.md)。
> 信息来源：[Visa Developer Center](https://developer.visa.com/capabilities/trusted-agent-protocol/trusted-agent-protocol-specifications)、[Visa Investor Relations](https://investor.visa.com/news/news-details/2025/Visa-Introduces-Trusted-Agent-Protocol-An-Ecosystem-Led-Framework-for-AI-Commerce/default.aspx)、[Visa Perspectives](https://global-corporate.review.visa.com/sites/visa-perspectives/innovation/visa-protocol-scale-agentic-commerce-globally.html)、[PYMNTS](https://www.pymnts.com/artificial-intelligence-2/2025/visa-turns-tokens-into-the-trust-layer-for-agentic-ai/) 等。内容经过改写以符合版权要求。

## 1. 概述 (Overview)

Visa 在 Agentic Payment 领域推出了两个层次的产品：

- **Visa Intelligent Commerce**（2025 年 4 月 30 日发布）— 面向 AI Agent 的完整商务平台，包含令牌化 Agent 商务、个性化优惠、Agent 结账、Agent 风控四大能力
- **Trusted Agent Protocol (TAP)**（2025 年 10 月 14 日发布）— 面向商户的 Agent 身份验证协议，解决"商户如何区分合法 Agent 和恶意 Bot"的核心信任问题

两者的关系：Intelligent Commerce 是 Visa 的 Agent 商务产品套件（侧重支付授权与凭证管理），TAP 是面向商户端的信任验证协议（侧重 Agent 身份识别与交易安全）。TAP 是 Intelligent Commerce 的协议基础层。

与 Google AP2 从零构建新的信任框架不同，Visa 选择了一条更务实的路径：**在现有卡网络基础设施上叠加 Agent 能力层**。TAP 不是要替代 Visa 的令牌化体系，而是在其之上增加了 Agent 身份验证、加密签名和消费者识别等 Agent 专属能力。

关键差异化特征：

- **卡网络原生**：直接构建在 Visa 全球卡网络之上，无需新的支付基础设施
- **HTTP 原生信任**：基于 RFC 9421 (HTTP Message Signatures) 标准，商户无需大规模改造系统
- **三层签名信任模型**：Agent 识别签名 + 消费者识别签名 + 支付容器签名，三层通过 nonce 关联
- **低代码/零代码集成**：商户可通过现有 Web 基础设施采用，无需自定义 API
- **FIDO2/Passkey 确认**：用户通过生物识别确认 Agent 支付授权
- **全球覆盖**：Visa 网络覆盖 200+ 国家/地区、1.75 亿+ 商户接受点
- **与 Cloudflare 联合开发**：与 Web Bot Auth 标准对齐，CDN/站点保护层可直接采用

### Visa TAP 在 Agentic Commerce 技术栈中的位置

```
┌─────────────────────────────────────────────────────────────┐
│                    商务编排层                                  │
│  ACP (OpenAI+Stripe)        UCP (Google)                     │
│  结账流程编排                全旅程商务标准                      │
├─────────────────────────────────────────────────────────────┤
│                    信任与授权层                                │
│  AP2 (Google)               TAP (Visa)                       │
│  支付信任与授权              卡网络原生 Agent 信任               │
│  Mandate + VC               三层签名 + Passkey                │
├─────────────────────────────────────────────────────────────┤
│                    结算层                                     │
│  Visa 卡网络    Stripe PSP    x402 链上结算    Mastercard      │
└─────────────────────────────────────────────────────────────┘
```

TAP 的独特定位：**它不重新发明支付流程，而是为现有 Web 商务注入 Agent 信任层**。商户网站几乎不需要改造，只需验证 HTTP 头中的加密签名即可识别合法 Agent。
