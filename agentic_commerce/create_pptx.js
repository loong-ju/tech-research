const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// Icon rendering
function renderIconSvg(IconComponent, color = "#000000", size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}
async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// ── Color Palette ──
const C = {
  darkBg: "0A1628",
  darkBg2: "0F1D32",
  accent: "0891B2",
  accent2: "06B6D4",
  accentLight: "CFFAFE",
  white: "FFFFFF",
  offWhite: "F0F9FF",
  lightGray: "F1F5F9",
  gray: "94A3B8",
  darkText: "1E293B",
  midText: "475569",
  gold: "F59E0B",
  red: "EF4444",
  green: "10B981",
  purple: "8B5CF6",
  orange: "F97316",
};

const FONT_TITLE = "Georgia";
const FONT_BODY = "Calibri";

// Helper: fresh shadow
const mkShadow = () => ({ type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.12 });

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "Agentic Commerce Research Team";
  pres.title = "Agentic Commerce 全景研究报告";

  // Load icons
  const { FaRobot, FaShieldAlt, FaCreditCard, FaGlobe, FaChartLine, FaExclamationTriangle,
    FaLock, FaStore, FaUsers, FaCode, FaBolt, FaLayerGroup } = require("react-icons/fa");

  const icons = {};
  icons.robot = await iconToBase64Png(FaRobot, "#" + C.accent, 256);
  icons.shield = await iconToBase64Png(FaShieldAlt, "#" + C.accent, 256);
  icons.card = await iconToBase64Png(FaCreditCard, "#" + C.accent, 256);
  icons.globe = await iconToBase64Png(FaGlobe, "#" + C.accent, 256);
  icons.chart = await iconToBase64Png(FaChartLine, "#" + C.accent, 256);
  icons.warn = await iconToBase64Png(FaExclamationTriangle, "#" + C.gold, 256);
  icons.lock = await iconToBase64Png(FaLock, "#" + C.accent, 256);
  icons.store = await iconToBase64Png(FaStore, "#" + C.accent, 256);
  icons.users = await iconToBase64Png(FaUsers, "#" + C.accent, 256);
  icons.code = await iconToBase64Png(FaCode, "#" + C.accent, 256);
  icons.bolt = await iconToBase64Png(FaBolt, "#" + C.gold, 256);
  icons.layer = await iconToBase64Png(FaLayerGroup, "#" + C.accent, 256);
  // White icons for dark backgrounds
  icons.robotW = await iconToBase64Png(FaRobot, "#FFFFFF", 256);
  icons.chartW = await iconToBase64Png(FaChartLine, "#FFFFFF", 256);
  icons.shieldW = await iconToBase64Png(FaShieldAlt, "#FFFFFF", 256);
  icons.globeW = await iconToBase64Png(FaGlobe, "#FFFFFF", 256);

  // ════════════════════════════════════════════════════════════
  // SLIDE 1: Title Slide (Dark)
  // ════════════════════════════════════════════════════════════
  let s1 = pres.addSlide();
  s1.background = { color: C.darkBg };
  // Accent bar top
  s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });
  // Icon
  s1.addImage({ data: icons.robotW, x: 0.8, y: 1.2, w: 0.7, h: 0.7 });
  // Title
  s1.addText("Agentic Commerce", {
    x: 0.8, y: 2.0, w: 8.4, h: 1.0,
    fontSize: 44, fontFace: FONT_TITLE, color: C.white, bold: true, margin: 0
  });
  s1.addText("AI Agent 驱动的商务支付生态全景研究", {
    x: 0.8, y: 2.9, w: 8.4, h: 0.6,
    fontSize: 20, fontFace: FONT_BODY, color: C.accent2, margin: 0
  });
  // Divider line
  s1.addShape(pres.shapes.LINE, { x: 0.8, y: 3.7, w: 2.5, h: 0, line: { color: C.accent, width: 2 } });
  // Subtitle info
  s1.addText("2025-2026  |  综合 8 份子报告  |  覆盖 7 大协议方案", {
    x: 0.8, y: 4.0, w: 8.4, h: 0.5,
    fontSize: 13, fontFace: FONT_BODY, color: C.gray, margin: 0
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 2: Agenda / TOC
  // ════════════════════════════════════════════════════════════
  let s2 = pres.addSlide();
  s2.background = { color: C.offWhite };
  s2.addText("议程", {
    x: 0.8, y: 0.4, w: 8.4, h: 0.7,
    fontSize: 32, fontFace: FONT_TITLE, color: C.darkText, bold: true, margin: 0
  });

  const agenda = [
    { num: "01", title: "概述与核心挑战", sub: "电商现状、五大断裂点" },
    { num: "02", title: "七大协议方案全景", sub: "三条技术路径、七种解决方案" },
    { num: "03", title: "协议深度对比", sub: "信任模型、安全机制、商业化路径" },
    { num: "04", title: "安全与风控", sub: "WBA 基础设施、欺诈分类、风控范式转移" },
    { num: "05", title: "市场规模与行业趋势", sub: "$3-5 万亿市场、三派博弈" },
    { num: "06", title: "AWS 定位与建议", sub: "基础设施层机会、商户接入指南" },
  ];
  agenda.forEach((item, i) => {
    const yBase = 1.4 + i * 0.65;
    s2.addText(item.num, {
      x: 0.8, y: yBase, w: 0.7, h: 0.5,
      fontSize: 20, fontFace: FONT_TITLE, color: C.accent, bold: true, margin: 0
    });
    s2.addText(item.title, {
      x: 1.6, y: yBase, w: 4, h: 0.3,
      fontSize: 16, fontFace: FONT_BODY, color: C.darkText, bold: true, margin: 0
    });
    s2.addText(item.sub, {
      x: 1.6, y: yBase + 0.28, w: 6, h: 0.25,
      fontSize: 11, fontFace: FONT_BODY, color: C.midText, margin: 0
    });
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 3: Section Divider — 概述
  // ════════════════════════════════════════════════════════════
  let s3 = pres.addSlide();
  s3.background = { color: C.darkBg };
  s3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });
  s3.addText("01", {
    x: 0.8, y: 1.5, w: 2, h: 0.8,
    fontSize: 48, fontFace: FONT_TITLE, color: C.accent, bold: true, margin: 0
  });
  s3.addText("概述与核心挑战", {
    x: 0.8, y: 2.3, w: 8, h: 0.8,
    fontSize: 36, fontFace: FONT_TITLE, color: C.white, bold: true, margin: 0
  });
  s3.addText("当 AI Agent 开始代替人类购物，整个电商技术栈面临重构", {
    x: 0.8, y: 3.2, w: 8, h: 0.5,
    fontSize: 14, fontFace: FONT_BODY, color: C.gray, margin: 0
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 4: What is Agentic Commerce — Key Stats
  // ════════════════════════════════════════════════════════════
  let s4 = pres.addSlide();
  s4.background = { color: C.offWhite };
  s4.addText("Agentic Commerce 正在发生", {
    x: 0.8, y: 0.4, w: 8.4, h: 0.7,
    fontSize: 28, fontFace: FONT_TITLE, color: C.darkText, bold: true, margin: 0
  });
  s4.addText("AI Agent 代替人类自主发现商品、比较选项、发起授权和完成支付交易的新兴商务范式", {
    x: 0.8, y: 1.0, w: 8.4, h: 0.4,
    fontSize: 12, fontFace: FONT_BODY, color: C.midText, margin: 0
  });

  // Stat cards — 2x3 grid
  const stats = [
    { value: "$120亿", label: "Amazon Rufus\n增量销售 (2025)", icon: icons.chart },
    { value: "4,700%", label: "零售网站\nAI 流量增幅", icon: icons.bolt },
    { value: "$3-5万亿", label: "2030 全球\nAgent 商务规模", icon: icons.globe },
    { value: "25-30%", label: "2030 电商\nAgent 渗透率", icon: icons.store },
    { value: "340%", label: "AI 平台产品\n查询年增长", icon: icons.robot },
    { value: "$5,000亿", label: "2030 AI Agent\n年销售额", icon: icons.card },
  ];
  stats.forEach((st, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const cx = 0.8 + col * 2.95;
    const cy = 1.7 + row * 1.85;
    // Card bg
    s4.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: 2.7, h: 1.6,
      fill: { color: C.white }, shadow: mkShadow()
    });
    // Icon
    s4.addImage({ data: st.icon, x: cx + 0.2, y: cy + 0.2, w: 0.35, h: 0.35 });
    // Value
    s4.addText(st.value, {
      x: cx + 0.15, y: cy + 0.6, w: 2.4, h: 0.5,
      fontSize: 24, fontFace: FONT_TITLE, color: C.accent, bold: true, margin: 0
    });
    // Label
    s4.addText(st.label, {
      x: cx + 0.15, y: cy + 1.1, w: 2.4, h: 0.4,
      fontSize: 10, fontFace: FONT_BODY, color: C.midText, margin: 0
    });
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 5: Five Breakpoints
  // ════════════════════════════════════════════════════════════
  let s5 = pres.addSlide();
  s5.background = { color: C.offWhite };
  s5.addText("五大断裂点：为什么现有电商无法支持 Agent", {
    x: 0.8, y: 0.4, w: 8.4, h: 0.7,
    fontSize: 24, fontFace: FONT_TITLE, color: C.darkText, bold: true, margin: 0
  });

  const breaks = [
    { title: "发现", desc: "Agent 如何发现商品？\n没有标准化的机器可读目录", color: C.accent },
    { title: "意图", desc: "Agent 如何证明决策\n符合用户意图？", color: C.purple },
    { title: "授权", desc: "Agent 没有\u201C点击\u201D，\n如何证明用户授权？", color: C.gold },
    { title: "支付", desc: "Agent 没有信用卡，\n如何安全支付？", color: C.green },
    { title: "信任", desc: "商户如何区分\n合法 Agent 和恶意 Bot？", color: C.red },
  ];
  breaks.forEach((b, i) => {
    const cx = 0.5 + i * 1.85;
    // Circle
    s5.addShape(pres.shapes.OVAL, {
      x: cx + 0.55, y: 1.4, w: 0.7, h: 0.7,
      fill: { color: b.color }
    });
    s5.addText(String(i + 1), {
      x: cx + 0.55, y: 1.4, w: 0.7, h: 0.7,
      fontSize: 22, fontFace: FONT_TITLE, color: C.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    // Title
    s5.addText(b.title, {
      x: cx, y: 2.3, w: 1.8, h: 0.4,
      fontSize: 16, fontFace: FONT_BODY, color: C.darkText, bold: true,
      align: "center", margin: 0
    });
    // Desc
    s5.addText(b.desc, {
      x: cx, y: 2.7, w: 1.8, h: 0.8,
      fontSize: 10, fontFace: FONT_BODY, color: C.midText,
      align: "center", margin: 0
    });
    // Connector arrow (except last)
    if (i < 4) {
      s5.addShape(pres.shapes.LINE, {
        x: cx + 1.65, y: 1.75, w: 0.35, h: 0,
        line: { color: C.gray, width: 1.5, dashType: "dash" }
      });
    }
  });
  // Bottom summary
  s5.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 3.9, w: 8.4, h: 1.2,
    fill: { color: C.white }, shadow: mkShadow()
  });
  s5.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 3.9, w: 0.08, h: 1.2,
    fill: { color: C.accent }
  });
  s5.addText("核心矛盾", {
    x: 1.1, y: 4.0, w: 7.8, h: 0.3,
    fontSize: 14, fontFace: FONT_BODY, color: C.accent, bold: true, margin: 0
  });
  s5.addText("整个电商技术栈都是为人类设计的，Agent 无法直接使用。2025 年 AI 流量涌入零售网站增幅超过 4,700%，商户的传统风控系统将 Agent 行为大量误判为 Bot 攻击。", {
    x: 1.1, y: 4.35, w: 7.8, h: 0.6,
    fontSize: 11, fontFace: FONT_BODY, color: C.midText, margin: 0
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 6: Section Divider — 七大方案
  // ════════════════════════════════════════════════════════════
  let s6 = pres.addSlide();
  s6.background = { color: C.darkBg };
  s6.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });
  s6.addText("02", {
    x: 0.8, y: 1.5, w: 2, h: 0.8,
    fontSize: 48, fontFace: FONT_TITLE, color: C.accent, bold: true, margin: 0
  });
  s6.addText("七大协议方案全景", {
    x: 0.8, y: 2.3, w: 8, h: 0.8,
    fontSize: 36, fontFace: FONT_TITLE, color: C.white, bold: true, margin: 0
  });
  s6.addText("三条技术路径，七种解决方案，一场标准之战", {
    x: 0.8, y: 3.2, w: 8, h: 0.5,
    fontSize: 14, fontFace: FONT_BODY, color: C.gray, margin: 0
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 7: Three Paths
  // ════════════════════════════════════════════════════════════
  let s7 = pres.addSlide();
  s7.background = { color: C.offWhite };
  s7.addText("三条技术路径", {
    x: 0.8, y: 0.4, w: 8.4, h: 0.6,
    fontSize: 28, fontFace: FONT_TITLE, color: C.darkText, bold: true, margin: 0
  });

  const paths = [
    {
      title: "开放协议派", color: C.accent,
      players: "Google (UCP/AP2)\nOpenAI+Stripe (ACP)\nCoinbase (x402)",
      desc: "像 HTTP/TCP 一样，为 Agent 商务定义开放标准",
      rating: "⭐⭐⭐⭐"
    },
    {
      title: "卡网络扩展派", color: C.gold,
      players: "Visa (TAP)\nMastercard (Agent Pay)",
      desc: "在现有卡网络基础设施上叠加 Agent 能力层",
      rating: "⭐⭐⭐⭐"
    },
    {
      title: "平台封闭派", color: C.red,
      players: "Amazon (Buy for Me)",
      desc: "在自有生态内闭环解决，不依赖外部协议",
      rating: "⭐⭐"
    },
  ];
  paths.forEach((p, i) => {
    const cx = 0.6 + i * 3.1;
    // Card
    s7.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: 1.2, w: 2.85, h: 3.8,
      fill: { color: C.white }, shadow: mkShadow()
    });
    // Top accent
    s7.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: 1.2, w: 2.85, h: 0.08,
      fill: { color: p.color }
    });
    // Title
    s7.addText(p.title, {
      x: cx + 0.2, y: 1.5, w: 2.45, h: 0.4,
      fontSize: 18, fontFace: FONT_BODY, color: p.color, bold: true, margin: 0
    });
    // Players
    s7.addText(p.players, {
      x: cx + 0.2, y: 2.0, w: 2.45, h: 0.8,
      fontSize: 12, fontFace: FONT_BODY, color: C.darkText, margin: 0
    });
    // Divider
    s7.addShape(pres.shapes.LINE, {
      x: cx + 0.2, y: 2.9, w: 2.0, h: 0,
      line: { color: C.lightGray, width: 1 }
    });
    // Desc
    s7.addText(p.desc, {
      x: cx + 0.2, y: 3.1, w: 2.45, h: 0.7,
      fontSize: 11, fontFace: FONT_BODY, color: C.midText, margin: 0
    });
    // Rating
    s7.addText(p.rating, {
      x: cx + 0.2, y: 4.2, w: 2.45, h: 0.4,
      fontSize: 16, fontFace: FONT_BODY, color: C.gold, margin: 0
    });
    s7.addText("前景评级", {
      x: cx + 1.2, y: 4.25, w: 1.5, h: 0.3,
      fontSize: 10, fontFace: FONT_BODY, color: C.gray, margin: 0
    });
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 8: Seven Protocols Overview Table
  // ════════════════════════════════════════════════════════════
  let s8 = pres.addSlide();
  s8.background = { color: C.offWhite };
  s8.addText("七大方案一览", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.6,
    fontSize: 24, fontFace: FONT_TITLE, color: C.darkText, bold: true, margin: 0
  });

  const headerOpts = { fill: { color: C.darkBg }, color: C.white, bold: true, fontSize: 9, fontFace: FONT_BODY, align: "center", valign: "middle" };
  const cellOpts = { fontSize: 8.5, fontFace: FONT_BODY, color: C.darkText, valign: "middle", align: "center" };
  const altRow = { fontSize: 8.5, fontFace: FONT_BODY, color: C.darkText, valign: "middle", align: "center", fill: { color: "F8FAFC" } };

  const tableRows = [
    [
      { text: "方案", options: headerOpts },
      { text: "主导方", options: headerOpts },
      { text: "定位", options: headerOpts },
      { text: "信任模型", options: headerOpts },
      { text: "结算方式", options: headerOpts },
      { text: "成熟度", options: headerOpts },
    ],
    [
      { text: "UCP", options: cellOpts }, { text: "Google", options: cellOpts },
      { text: "全旅程编排", options: cellOpts }, { text: "联邦式", options: cellOpts },
      { text: "不涉及", options: cellOpts }, { text: "🔶 早期", options: cellOpts },
    ],
    [
      { text: "ACP", options: altRow }, { text: "OpenAI+Stripe", options: altRow },
      { text: "结账流程", options: altRow }, { text: "平台信任", options: altRow },
      { text: "Stripe", options: altRow }, { text: "✅ 生产", options: altRow },
    ],
    [
      { text: "AP2", options: cellOpts }, { text: "Google", options: cellOpts },
      { text: "支付授权", options: cellOpts }, { text: "密码学", options: cellOpts },
      { text: "卡网络", options: cellOpts }, { text: "🔶 草案", options: cellOpts },
    ],
    [
      { text: "Visa TAP", options: altRow }, { text: "Visa+Cloudflare", options: altRow },
      { text: "Agent 信任", options: altRow }, { text: "三层签名", options: altRow },
      { text: "Visa 网络", options: altRow }, { text: "✅ 生产", options: altRow },
    ],
    [
      { text: "MC Agent Pay", options: cellOpts }, { text: "Mastercard", options: cellOpts },
      { text: "Agent 支付", options: cellOpts }, { text: "注册制+Token", options: cellOpts },
      { text: "MC 网络", options: cellOpts }, { text: "✅ 试点", options: cellOpts },
    ],
    [
      { text: "x402", options: altRow }, { text: "Coinbase", options: altRow },
      { text: "链上结算", options: altRow }, { text: "链上验证", options: altRow },
      { text: "Base L2", options: altRow }, { text: "✅ 生产", options: altRow },
    ],
    [
      { text: "Buy for Me", options: cellOpts }, { text: "Amazon", options: cellOpts },
      { text: "封闭代购", options: cellOpts }, { text: "平台托管", options: cellOpts },
      { text: "Amazon Pay", options: cellOpts }, { text: "✅ 生产", options: cellOpts },
    ],
  ];
  s8.addTable(tableRows, {
    x: 0.5, y: 1.0, w: 9.0,
    colW: [1.2, 1.5, 1.3, 1.5, 1.3, 1.0],
    border: { pt: 0.5, color: "E2E8F0" },
    rowH: [0.4, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45],
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 9: Protocol Stack
  // ════════════════════════════════════════════════════════════
  let s9 = pres.addSlide();
  s9.background = { color: C.offWhite };
  s9.addText("Agentic Commerce 协议栈", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.6,
    fontSize: 24, fontFace: FONT_TITLE, color: C.darkText, bold: true, margin: 0
  });

  const layers = [
    { label: "商务编排层", items: "UCP (全旅程)  |  ACP (结账)  |  Buy for Me (封闭)", color: C.accent },
    { label: "支付信任层", items: "AP2 (Mandate VC)  |  Visa TAP (三层签名)  |  MC Agent Pay (Token)", color: C.purple },
    { label: "Agent 身份层", items: "Web Bot Auth (IETF) — Ed25519 HTTP 消息签名", color: C.gold },
    { label: "传输层", items: "HTTPS  |  A2A  |  MCP  |  HTTP 402", color: C.green },
    { label: "结算层", items: "卡网络 (Visa/MC)  |  Stripe  |  区块链 (Base L2)", color: C.orange },
  ];
  layers.forEach((l, i) => {
    const cy = 1.1 + i * 0.85;
    // Layer bar
    s9.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: cy, w: 8.4, h: 0.7,
      fill: { color: C.white }, shadow: mkShadow()
    });
    // Left accent
    s9.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: cy, w: 0.08, h: 0.7,
      fill: { color: l.color }
    });
    // Label
    s9.addText(l.label, {
      x: 1.1, y: cy + 0.05, w: 2.0, h: 0.3,
      fontSize: 12, fontFace: FONT_BODY, color: l.color, bold: true, margin: 0
    });
    // Items
    s9.addText(l.items, {
      x: 1.1, y: cy + 0.35, w: 7.8, h: 0.25,
      fontSize: 10, fontFace: FONT_BODY, color: C.midText, margin: 0
    });
  });
  // Arrow annotation
  s9.addText("▲ 上层编排  ·  ▼ 底层结算", {
    x: 0.8, y: 5.15, w: 8.4, h: 0.3,
    fontSize: 10, fontFace: FONT_BODY, color: C.gray, align: "center", margin: 0
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 10: Section Divider — 协议对比
  // ════════════════════════════════════════════════════════════
  let s10 = pres.addSlide();
  s10.background = { color: C.darkBg };
  s10.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });
  s10.addText("03", {
    x: 0.8, y: 1.5, w: 2, h: 0.8,
    fontSize: 48, fontFace: FONT_TITLE, color: C.accent, bold: true, margin: 0
  });
  s10.addText("协议深度对比", {
    x: 0.8, y: 2.3, w: 8, h: 0.8,
    fontSize: 36, fontFace: FONT_TITLE, color: C.white, bold: true, margin: 0
  });
  s10.addText("信任模型、Visa TAP vs MC Agent Pay、商业化路径", {
    x: 0.8, y: 3.2, w: 8, h: 0.5,
    fontSize: 14, fontFace: FONT_BODY, color: C.gray, margin: 0
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 11: Trust Model Comparison
  // ════════════════════════════════════════════════════════════
  let s11 = pres.addSlide();
  s11.background = { color: C.offWhite };
  s11.addText("五种信任哲学", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.6,
    fontSize: 24, fontFace: FONT_TITLE, color: C.darkText, bold: true, margin: 0
  });

  const trusts = [
    { name: "AP2", model: "密码学信任", desc: "用 VC + DID 密码学证明，无需信任第三方", color: C.accent },
    { name: "Visa TAP", model: "网络信任", desc: "Visa 网络背书 + RFC 9421 三层签名", color: "1A1F71" },
    { name: "MC Agent Pay", model: "注册信任", desc: "Agent 预注册审核 + Agentic Token", color: C.orange },
    { name: "ACP", model: "平台信任", desc: "Stripe 作为可信中介签发 SPT", color: C.purple },
    { name: "x402", model: "链上信任", desc: "区块链共识验证，代码即法律", color: C.green },
  ];
  trusts.forEach((t, i) => {
    const cx = 0.3 + i * 1.9;
    s11.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: 1.1, w: 1.75, h: 2.8,
      fill: { color: C.white }, shadow: mkShadow()
    });
    s11.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: 1.1, w: 1.75, h: 0.06,
      fill: { color: t.color }
    });
    s11.addText(t.name, {
      x: cx + 0.1, y: 1.3, w: 1.55, h: 0.35,
      fontSize: 14, fontFace: FONT_BODY, color: t.color, bold: true, margin: 0, align: "center"
    });
    s11.addText(t.model, {
      x: cx + 0.1, y: 1.7, w: 1.55, h: 0.3,
      fontSize: 11, fontFace: FONT_BODY, color: C.darkText, bold: true, margin: 0, align: "center"
    });
    s11.addShape(pres.shapes.LINE, {
      x: cx + 0.3, y: 2.1, w: 1.15, h: 0,
      line: { color: "E2E8F0", width: 0.5 }
    });
    s11.addText(t.desc, {
      x: cx + 0.1, y: 2.2, w: 1.55, h: 1.0,
      fontSize: 9.5, fontFace: FONT_BODY, color: C.midText, margin: 0, align: "center"
    });
  });

  // Bottom insight
  s11.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 4.2, w: 8.4, h: 1.0,
    fill: { color: C.white }, shadow: mkShadow()
  });
  s11.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 4.2, w: 0.08, h: 1.0,
    fill: { color: C.gold }
  });
  s11.addText([
    { text: "核心洞察：", options: { bold: true, color: C.gold, fontSize: 12 } },
    { text: "密码学信任（AP2）最去中心化但生态不成熟；网络信任（Visa/MC）最务实但依赖卡网络；平台信任（ACP）最易接入但存在单点故障。三种模型不是替代关系，而是互补关系——不同场景需要不同信任级别。", options: { color: C.midText, fontSize: 11 } },
  ], { x: 1.1, y: 4.3, w: 7.8, h: 0.8, fontFace: FONT_BODY, margin: 0 });

  // ════════════════════════════════════════════════════════════
  // SLIDE 12: Visa TAP vs MC Agent Pay
  // ════════════════════════════════════════════════════════════
  let s12 = pres.addSlide();
  s12.background = { color: C.offWhite };
  s12.addText("Visa TAP vs Mastercard Agent Pay", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.6,
    fontSize: 22, fontFace: FONT_TITLE, color: C.darkText, bold: true, margin: 0
  });

  const cmpHeader = { fill: { color: C.darkBg }, color: C.white, bold: true, fontSize: 9, fontFace: FONT_BODY, align: "center", valign: "middle" };
  const cmpCell = { fontSize: 9, fontFace: FONT_BODY, color: C.darkText, valign: "middle" };
  const cmpAlt = { fontSize: 9, fontFace: FONT_BODY, color: C.darkText, valign: "middle", fill: { color: "F8FAFC" } };

  const cmpRows = [
    [{ text: "维度", options: cmpHeader }, { text: "Visa TAP", options: cmpHeader }, { text: "MC Agent Pay", options: cmpHeader }],
    [{ text: "核心哲学", options: cmpCell }, { text: "协议标准（Android 模式）", options: cmpCell }, { text: "平台框架（iOS 模式）", options: cmpCell }],
    [{ text: "Agent 准入", options: cmpAlt }, { text: "开放注册 + 密码学验证", options: cmpAlt }, { text: "预审核注册制", options: cmpAlt }],
    [{ text: "身份验证", options: cmpCell }, { text: "RFC 9421 三层签名", options: cmpCell }, { text: "Agent ID + Agentic Token", options: cmpCell }],
    [{ text: "用户控制", options: cmpAlt }, { text: "FIDO2/Passkey", options: cmpAlt }, { text: "精细规则（限额/类别/围栏）", options: cmpAlt }],
    [{ text: "风控引擎", options: cmpCell }, { text: "Visa Protect for AI Agents", options: cmpCell }, { text: "Decision Intelligence", options: cmpCell }],
    [{ text: "WBA 集成", options: cmpAlt }, { text: "联合开发（Cloudflare）", options: cmpAlt }, { text: "采纳 WBA 标准", options: cmpAlt }],
    [{ text: "商业化路径", options: cmpCell }, { text: "基础设施渗透 → 增值服务", options: cmpCell }, { text: "快速落地 → 深度集成", options: cmpCell }],
    [{ text: "类比", options: cmpAlt }, { text: "Android：开放生态", options: cmpAlt }, { text: "iOS：可控体验", options: cmpAlt }],
  ];
  s12.addTable(cmpRows, {
    x: 0.5, y: 1.0, w: 9.0,
    colW: [1.5, 3.5, 3.5],
    border: { pt: 0.5, color: "E2E8F0" },
    rowH: [0.35, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 13: Section Divider — 安全与风控
  // ════════════════════════════════════════════════════════════
  let s13 = pres.addSlide();
  s13.background = { color: C.darkBg };
  s13.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });
  s13.addText("04", {
    x: 0.8, y: 1.5, w: 2, h: 0.8,
    fontSize: 48, fontFace: FONT_TITLE, color: C.accent, bold: true, margin: 0
  });
  s13.addText("安全与风控", {
    x: 0.8, y: 2.3, w: 8, h: 0.8,
    fontSize: 36, fontFace: FONT_TITLE, color: C.white, bold: true, margin: 0
  });
  s13.addText("传统风控失效、四类新型欺诈、Agent 原生风控范式", {
    x: 0.8, y: 3.2, w: 8, h: 0.5,
    fontSize: 14, fontFace: FONT_BODY, color: C.gray, margin: 0
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 14: Why Traditional Fraud Control Fails
  // ════════════════════════════════════════════════════════════
  let s14 = pres.addSlide();
  s14.background = { color: C.offWhite };
  s14.addText("传统风控为什么在 Agent 时代失效？", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.6,
    fontSize: 22, fontFace: FONT_TITLE, color: C.darkText, bold: true, margin: 0
  });

  const failItems = [
    { signal: "浏览器指纹", human: "✅ 唯一设备特征", agent: "❌ 无浏览器 / headless" },
    { signal: "鼠标轨迹", human: "✅ 自然运动曲线", agent: "❌ 无鼠标事件" },
    { signal: "3D Secure", human: "✅ 人类完成验证", agent: "❌ 无法处理弹窗" },
    { signal: "CAPTCHA", human: "✅ 人类可通过", agent: "❌ 被设计阻止" },
    { signal: "IP 地理位置", human: "✅ 与收货地址匹配", agent: "❌ 云端 IP" },
    { signal: "页面停留时间", human: "✅ 阅读/比较时间", agent: "❌ 毫秒级浏览" },
  ];
  const fhOpts = { fill: { color: C.darkBg }, color: C.white, bold: true, fontSize: 9, fontFace: FONT_BODY, align: "center", valign: "middle" };
  const fcOpts = { fontSize: 9, fontFace: FONT_BODY, color: C.darkText, valign: "middle", align: "center" };
  const faOpts = { fontSize: 9, fontFace: FONT_BODY, color: C.darkText, valign: "middle", align: "center", fill: { color: "F8FAFC" } };

  const failRows = [
    [{ text: "传统风控信号", options: fhOpts }, { text: "人类交易", options: fhOpts }, { text: "Agent 交易", options: fhOpts }],
    ...failItems.map((f, i) => [
      { text: f.signal, options: i % 2 === 0 ? fcOpts : faOpts },
      { text: f.human, options: i % 2 === 0 ? fcOpts : faOpts },
      { text: f.agent, options: i % 2 === 0 ? fcOpts : faOpts },
    ])
  ];
  s14.addTable(failRows, {
    x: 0.5, y: 1.0, w: 5.5,
    colW: [1.8, 1.8, 1.8],
    border: { pt: 0.5, color: "E2E8F0" },
    rowH: [0.35, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38],
  });

  // Right side: threat stats
  s14.addShape(pres.shapes.RECTANGLE, {
    x: 6.3, y: 1.0, w: 3.2, h: 3.8,
    fill: { color: C.darkBg }
  });
  s14.addText("威胁数据", {
    x: 6.5, y: 1.2, w: 2.8, h: 0.35,
    fontSize: 14, fontFace: FONT_BODY, color: C.accent2, bold: true, margin: 0
  });
  const threatStats = [
    { val: "450%↑", lbl: "暗网 AI Agent 提及" },
    { val: "$1,860亿", lbl: "年度 Bot 欺诈损失" },
    { val: "50%", lbl: "互联网 Bot 流量占比" },
    { val: "28%", lbl: "Buy for Me 退单率" },
    { val: "24%↑", lbl: "退单量增长 (2025-28)" },
  ];
  threatStats.forEach((ts, i) => {
    const ty = 1.7 + i * 0.6;
    s14.addText(ts.val, {
      x: 6.5, y: ty, w: 1.3, h: 0.35,
      fontSize: 16, fontFace: FONT_TITLE, color: C.accent2, bold: true, margin: 0
    });
    s14.addText(ts.lbl, {
      x: 7.8, y: ty, w: 1.5, h: 0.35,
      fontSize: 9, fontFace: FONT_BODY, color: C.gray, margin: 0, valign: "middle"
    });
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 15: Four Fraud Categories
  // ════════════════════════════════════════════════════════════
  let s15 = pres.addSlide();
  s15.background = { color: C.offWhite };
  s15.addText("Agentic Commerce 四类新型欺诈", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.6,
    fontSize: 22, fontFace: FONT_TITLE, color: C.darkText, bold: true, margin: 0
  });

  const fraudCats = [
    { letter: "A", title: "Agent 被劫持", desc: "提示注入/越狱\n凭证窃取（假商户）\n中间人攻击", color: C.red, detect: "传统风控完全无法检测" },
    { letter: "B", title: "Agent 被利用", desc: "自动化盗卡测试\n合成身份欺诈\n大规模薅羊毛", color: C.orange, detect: "传统风控部分有效" },
    { letter: "C", title: "Agent 自身缺陷", desc: "幻觉导致错误购买\n意图误解退单\n多 Agent 冲突下单", color: C.gold, detect: "全新问题类别" },
    { letter: "D", title: "新型社会工程", desc: "假商户钓鱼 Agent\nAI 持续对话式钓鱼\n深度伪造授权", color: C.purple, detect: "传统风控完全无法检测" },
  ];
  fraudCats.forEach((fc, i) => {
    const cx = 0.5 + i * 2.35;
    // Card
    s15.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: 1.1, w: 2.15, h: 3.6,
      fill: { color: C.white }, shadow: mkShadow()
    });
    // Top accent
    s15.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: 1.1, w: 2.15, h: 0.06,
      fill: { color: fc.color }
    });
    // Letter circle
    s15.addShape(pres.shapes.OVAL, {
      x: cx + 0.75, y: 1.3, w: 0.65, h: 0.65,
      fill: { color: fc.color }
    });
    s15.addText(fc.letter, {
      x: cx + 0.75, y: 1.3, w: 0.65, h: 0.65,
      fontSize: 22, fontFace: FONT_TITLE, color: C.white, bold: true,
      align: "center", valign: "middle", margin: 0
    });
    // Title
    s15.addText(fc.title, {
      x: cx + 0.1, y: 2.1, w: 1.95, h: 0.35,
      fontSize: 13, fontFace: FONT_BODY, color: fc.color, bold: true, align: "center", margin: 0
    });
    // Desc
    s15.addText(fc.desc, {
      x: cx + 0.1, y: 2.5, w: 1.95, h: 1.0,
      fontSize: 10, fontFace: FONT_BODY, color: C.midText, align: "center", margin: 0
    });
    // Detection
    s15.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.15, y: 3.7, w: 1.85, h: 0.5,
      fill: { color: "FEF3C7" }
    });
    s15.addText(fc.detect, {
      x: cx + 0.15, y: 3.7, w: 1.85, h: 0.5,
      fontSize: 8.5, fontFace: FONT_BODY, color: C.darkText, align: "center", valign: "middle", margin: 0
    });
  });
  // Source
  s15.addText("来源：Visa 威胁情报、Fingerprint、Oscilar 研究", {
    x: 0.8, y: 5.1, w: 8.4, h: 0.3,
    fontSize: 8, fontFace: FONT_BODY, color: C.gray, margin: 0
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 16: Paradigm Shift — Old vs New Risk Control
  // ════════════════════════════════════════════════════════════
  let s16 = pres.addSlide();
  s16.background = { color: C.offWhite };
  s16.addText("风控范式转移：从 Block Bots 到 Authenticate Agents", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.6,
    fontSize: 20, fontFace: FONT_TITLE, color: C.darkText, bold: true, margin: 0
  });

  // Left column: Old
  s16.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.1, w: 4.2, h: 3.5,
    fill: { color: C.white }, shadow: mkShadow()
  });
  s16.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.1, w: 4.2, h: 0.06,
    fill: { color: C.red }
  });
  s16.addText("旧范式：检测人类行为", {
    x: 0.7, y: 1.3, w: 3.8, h: 0.35,
    fontSize: 14, fontFace: FONT_BODY, color: C.red, bold: true, margin: 0
  });
  const oldItems = [
    "设备指纹 → 浏览器/屏幕/Canvas",
    "行为生物学 → 鼠标/键盘/滚动",
    "3D Secure → 弹窗验证",
    "CAPTCHA → 阻止自动化",
    "IP 地理位置 → 匹配收货地址",
  ];
  s16.addText(oldItems.map((t, i) => ({
    text: t, options: { bullet: true, breakLine: i < oldItems.length - 1, fontSize: 11, color: C.midText }
  })), { x: 0.7, y: 1.8, w: 3.8, h: 2.5, fontFace: FONT_BODY, margin: 0, paraSpaceAfter: 6 });

  // Right column: New
  s16.addShape(pres.shapes.RECTANGLE, {
    x: 5.3, y: 1.1, w: 4.2, h: 3.5,
    fill: { color: C.white }, shadow: mkShadow()
  });
  s16.addShape(pres.shapes.RECTANGLE, {
    x: 5.3, y: 1.1, w: 4.2, h: 0.06,
    fill: { color: C.green }
  });
  s16.addText("新范式：验证 Agent 身份", {
    x: 5.5, y: 1.3, w: 3.8, h: 0.35,
    fontSize: 14, fontFace: FONT_BODY, color: C.green, bold: true, margin: 0
  });
  const newItems = [
    "密码学签名 → Ed25519 / VC",
    "Agent 行为基线 → 交易模式分析",
    "Passkey / FIDO2 → 生物识别确认",
    "WBA 签名 → 区分 Agent vs Bot",
    "Mandate 验证 → 密码学授权证明",
  ];
  s16.addText(newItems.map((t, i) => ({
    text: t, options: { bullet: true, breakLine: i < newItems.length - 1, fontSize: 11, color: C.midText }
  })), { x: 5.5, y: 1.8, w: 3.8, h: 2.5, fontFace: FONT_BODY, margin: 0, paraSpaceAfter: 6 });

  // Arrow between
  s16.addText("→", {
    x: 4.5, y: 2.5, w: 1.0, h: 0.5,
    fontSize: 28, fontFace: FONT_BODY, color: C.accent, align: "center", valign: "middle", margin: 0
  });

  // Bottom quote
  s16.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 4.8, w: 8.4, h: 0.5,
    fill: { color: "ECFDF5" }
  });
  s16.addText('SISA 2026 报告：安全核心挑战已从"阻止 Bot"演变为"通过密码学握手认证授权的 AI Agent"', {
    x: 1.0, y: 4.8, w: 8.0, h: 0.5,
    fontSize: 10, fontFace: FONT_BODY, color: C.green, italic: true, valign: "middle", margin: 0
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 17: Section Divider — 市场与趋势
  // ════════════════════════════════════════════════════════════
  let s17 = pres.addSlide();
  s17.background = { color: C.darkBg };
  s17.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });
  s17.addText("05", {
    x: 0.8, y: 1.5, w: 2, h: 0.8,
    fontSize: 48, fontFace: FONT_TITLE, color: C.accent, bold: true, margin: 0
  });
  s17.addText("市场规模与行业趋势", {
    x: 0.8, y: 2.3, w: 8, h: 0.8,
    fontSize: 36, fontFace: FONT_TITLE, color: C.white, bold: true, margin: 0
  });
  s17.addText("$3-5 万亿市场、三派博弈、跨境支付影响", {
    x: 0.8, y: 3.2, w: 8, h: 0.5,
    fontSize: 14, fontFace: FONT_BODY, color: C.gray, margin: 0
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 18: Market Size & Timeline
  // ════════════════════════════════════════════════════════════
  let s18 = pres.addSlide();
  s18.background = { color: C.offWhite };
  s18.addText("市场规模与演进时间线", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.6,
    fontSize: 24, fontFace: FONT_TITLE, color: C.darkText, bold: true, margin: 0
  });

  // Big number callouts
  const mktStats = [
    { val: "$3-5万亿", lbl: "2030 全球规模\n(McKinsey)", color: C.accent },
    { val: "25-30%", lbl: "2030 电商\nAgent 渗透率", color: C.purple },
    { val: "40%", lbl: "2027 线上交易\n涉及 AI Agent", color: C.gold },
  ];
  mktStats.forEach((ms, i) => {
    const cx = 0.5 + i * 3.15;
    s18.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: 1.1, w: 2.9, h: 1.5,
      fill: { color: C.white }, shadow: mkShadow()
    });
    s18.addText(ms.val, {
      x: cx + 0.15, y: 1.2, w: 2.6, h: 0.7,
      fontSize: 28, fontFace: FONT_TITLE, color: ms.color, bold: true, margin: 0, align: "center"
    });
    s18.addText(ms.lbl, {
      x: cx + 0.15, y: 1.9, w: 2.6, h: 0.5,
      fontSize: 10, fontFace: FONT_BODY, color: C.midText, margin: 0, align: "center"
    });
  });

  // Timeline
  s18.addText("演进时间线", {
    x: 0.8, y: 2.9, w: 8.4, h: 0.4,
    fontSize: 14, fontFace: FONT_BODY, color: C.darkText, bold: true, margin: 0
  });
  // Timeline bar
  s18.addShape(pres.shapes.RECTANGLE, {
    x: 0.8, y: 3.65, w: 8.4, h: 0.06,
    fill: { color: C.accent }
  });
  const timeline = [
    { year: "2025", label: "协议涌现期\n7 大方案发布", x: 1.2 },
    { year: "2026", label: "标准竞争期\nWBA 普及", x: 3.3 },
    { year: "2027-28", label: "整合期\n40% Agent 交易", x: 5.5 },
    { year: "2029-30", label: "成熟期\n$3-5 万亿", x: 7.7 },
  ];
  timeline.forEach((tl) => {
    // Dot
    s18.addShape(pres.shapes.OVAL, {
      x: tl.x, y: 3.5, w: 0.35, h: 0.35,
      fill: { color: C.accent }
    });
    s18.addText(tl.year, {
      x: tl.x - 0.3, y: 3.9, w: 1.0, h: 0.3,
      fontSize: 11, fontFace: FONT_BODY, color: C.accent, bold: true, align: "center", margin: 0
    });
    s18.addText(tl.label, {
      x: tl.x - 0.5, y: 4.2, w: 1.4, h: 0.6,
      fontSize: 9, fontFace: FONT_BODY, color: C.midText, align: "center", margin: 0
    });
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 19: Three Factions Game
  // ════════════════════════════════════════════════════════════
  let s19 = pres.addSlide();
  s19.background = { color: C.offWhite };
  s19.addText("三派博弈：2030 最可能的技术栈", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.6,
    fontSize: 22, fontFace: FONT_TITLE, color: C.darkText, bold: true, margin: 0
  });

  // Prediction box
  s19.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.1, w: 9.0, h: 2.0,
    fill: { color: C.darkBg }
  });
  s19.addText("2030 年最可能的技术栈预测", {
    x: 0.7, y: 1.2, w: 8.6, h: 0.35,
    fontSize: 14, fontFace: FONT_BODY, color: C.accent2, bold: true, margin: 0
  });
  const stackPred = [
    { layer: "编排层", tech: "UCP 成为事实标准（类似 HTTP）", color: C.accent },
    { layer: "支付层", tech: "AP2 + 卡网络（Visa/MC）双轨并行", color: C.purple },
    { layer: "身份层", tech: "WBA 统一 Agent 身份认证", color: C.gold },
    { layer: "结算层", tech: "卡网络（主流）+ 链上（长尾/微支付）", color: C.green },
  ];
  stackPred.forEach((sp, i) => {
    const sy = 1.65 + i * 0.33;
    s19.addText(sp.layer, {
      x: 0.9, y: sy, w: 1.2, h: 0.28,
      fontSize: 10, fontFace: FONT_BODY, color: sp.color, bold: true, margin: 0
    });
    s19.addText(sp.tech, {
      x: 2.2, y: sy, w: 6.5, h: 0.28,
      fontSize: 10, fontFace: FONT_BODY, color: C.white, margin: 0
    });
  });

  // Three factions summary cards
  const factions = [
    { name: "开放协议派", players: "Google / OpenAI / Coinbase", outlook: "⭐⭐⭐⭐ 最可能定义标准", color: C.accent },
    { name: "卡网络扩展派", players: "Visa / Mastercard", outlook: "⭐⭐⭐⭐ 结算层不可替代", color: C.gold },
    { name: "平台封闭派", players: "Amazon", outlook: "⭐⭐ 短期有效，长期受限", color: C.red },
  ];
  factions.forEach((f, i) => {
    const cx = 0.5 + i * 3.15;
    s19.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: 3.4, w: 2.9, h: 1.8,
      fill: { color: C.white }, shadow: mkShadow()
    });
    s19.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: 3.4, w: 2.9, h: 0.06,
      fill: { color: f.color }
    });
    s19.addText(f.name, {
      x: cx + 0.15, y: 3.55, w: 2.6, h: 0.3,
      fontSize: 13, fontFace: FONT_BODY, color: f.color, bold: true, margin: 0
    });
    s19.addText(f.players, {
      x: cx + 0.15, y: 3.9, w: 2.6, h: 0.3,
      fontSize: 10, fontFace: FONT_BODY, color: C.darkText, margin: 0
    });
    s19.addShape(pres.shapes.LINE, {
      x: cx + 0.15, y: 4.3, w: 2.0, h: 0,
      line: { color: "E2E8F0", width: 0.5 }
    });
    s19.addText(f.outlook, {
      x: cx + 0.15, y: 4.4, w: 2.6, h: 0.5,
      fontSize: 10, fontFace: FONT_BODY, color: C.midText, margin: 0
    });
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 20: Section Divider — AWS 定位与建议
  // ════════════════════════════════════════════════════════════
  let s20 = pres.addSlide();
  s20.background = { color: C.darkBg };
  s20.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });
  s20.addText("06", {
    x: 0.8, y: 1.5, w: 2, h: 0.8,
    fontSize: 48, fontFace: FONT_TITLE, color: C.accent, bold: true, margin: 0
  });
  s20.addText("AWS 定位与战略建议", {
    x: 0.8, y: 2.3, w: 8, h: 0.8,
    fontSize: 36, fontFace: FONT_TITLE, color: C.white, bold: true, margin: 0
  });
  s20.addText("基础设施层 · AgentCore · WAF · 中立平台", {
    x: 0.8, y: 3.2, w: 8, h: 0.5,
    fontSize: 14, fontFace: FONT_BODY, color: C.gray, margin: 0
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 21: AWS Positioning — Infrastructure Layer
  // ════════════════════════════════════════════════════════════
  let s21 = pres.addSlide();
  s21.background = { color: C.offWhite };
  s21.addText("AWS 在 Agentic Commerce 中的战略定位", {
    x: 0.8, y: 0.3, w: 8.4, h: 0.6,
    fontSize: 22, fontFace: FONT_TITLE, color: C.darkText, bold: true, margin: 0
  });

  // Core positioning statement
  s21.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.0, w: 9.0, h: 0.7,
    fill: { color: C.darkBg }
  });
  s21.addText('核心定位：不做支付协议，做 Agentic Commerce 的基础设施层 — "卖水人"策略', {
    x: 0.7, y: 1.0, w: 8.6, h: 0.7,
    fontSize: 13, fontFace: FONT_BODY, color: C.accent2, bold: true, valign: "middle", margin: 0
  });

  // Three pillars
  const awsPillars = [
    {
      title: "Agent 运行时",
      items: "Bedrock AgentCore\nAgent 编排 / 工具调用\nMCP Server 托管",
      color: C.accent,
      icon: "⚙️"
    },
    {
      title: "安全与合规",
      items: "WAF Agent 流量识别\nCognito Agent 身份\nGuardDuty 异常检测",
      color: C.purple,
      icon: "🛡️"
    },
    {
      title: "支付基础设施",
      items: "协议中立网关\nAgent Wallet 托管\n实时风控引擎",
      color: C.gold,
      icon: "💳"
    },
  ];
  awsPillars.forEach((p, i) => {
    const cx = 0.5 + i * 3.15;
    // Card
    s21.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: 1.9, w: 2.9, h: 2.4,
      fill: { color: C.white }, shadow: mkShadow()
    });
    // Top color bar
    s21.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: 1.9, w: 2.9, h: 0.06,
      fill: { color: p.color }
    });
    // Icon
    s21.addText(p.icon, {
      x: cx + 0.15, y: 2.05, w: 0.5, h: 0.4,
      fontSize: 22, margin: 0
    });
    // Title
    s21.addText(p.title, {
      x: cx + 0.6, y: 2.05, w: 2.1, h: 0.4,
      fontSize: 14, fontFace: FONT_BODY, color: p.color, bold: true, valign: "middle", margin: 0
    });
    // Items
    s21.addText(p.items, {
      x: cx + 0.2, y: 2.6, w: 2.5, h: 1.5,
      fontSize: 11, fontFace: FONT_BODY, color: C.midText, margin: 0, lineSpacingMultiple: 1.4
    });
  });

  // Bottom: competitive advantage
  s21.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.5, w: 9.0, h: 0.8,
    fill: { color: "ECFDF5" }
  });
  s21.addText([
    { text: "竞争优势：", options: { bold: true, color: C.green, fontSize: 11 } },
    { text: "AWS 是唯一同时拥有 Agent 运行时（Bedrock）、安全基础设施（WAF/Cognito）和全球支付网络接入能力的云厂商。", options: { color: C.midText, fontSize: 11 } },
    { text: "\n建议路径：", options: { bold: true, color: C.green, fontSize: 11, breakLine: true } },
    { text: "2025 AgentCore 集成 UCP/ACP → 2026 Agent WAF GA → 2027 Agentic Commerce 全栈方案", options: { color: C.midText, fontSize: 11 } },
  ], {
    x: 0.7, y: 4.5, w: 8.6, h: 0.8,
    fontFace: FONT_BODY, valign: "middle", margin: [4, 8, 4, 8]
  });

  // ════════════════════════════════════════════════════════════
  // SLIDE 22: Closing / Thank You
  // ════════════════════════════════════════════════════════════
  let s22 = pres.addSlide();
  s22.background = { color: C.darkBg };
  // Top accent line
  s22.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });
  // Decorative side bar
  s22.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.5, w: 0.06, h: 2.5, fill: { color: C.accent } });

  s22.addText("Thank You", {
    x: 1.0, y: 1.5, w: 8, h: 1.0,
    fontSize: 44, fontFace: FONT_TITLE, color: C.white, bold: true, margin: 0
  });
  s22.addText("Agentic Commerce：当 AI Agent 开始为人类消费", {
    x: 1.0, y: 2.5, w: 8, h: 0.5,
    fontSize: 16, fontFace: FONT_BODY, color: C.accent2, margin: 0
  });

  // Key takeaway
  s22.addShape(pres.shapes.RECTANGLE, {
    x: 1.0, y: 3.3, w: 8.0, h: 0.06,
    fill: { color: C.accent }
  });
  s22.addText("核心洞察：支付协议之争的本质是 Agent 信任基础设施之争。\n谁定义了 Agent 身份认证标准，谁就掌握了 Agentic Commerce 的入口。", {
    x: 1.0, y: 3.5, w: 8.0, h: 0.8,
    fontSize: 13, fontFace: FONT_BODY, color: C.gray, lineSpacingMultiple: 1.5, margin: 0
  });

  // Footer
  s22.addText("AWS Solutions Architecture · 2025", {
    x: 1.0, y: 4.8, w: 8, h: 0.3,
    fontSize: 10, fontFace: FONT_BODY, color: C.gray, margin: 0
  });

  // ════════════════════════════════════════════════════════════
  // WRITE FILE
  // ════════════════════════════════════════════════════════════
  await pres.writeFile({ fileName: "agentic_payment/Agentic_Commerce_Report.pptx" });
  console.log("✅ PPTX generated: agentic_payment/Agentic_Commerce_Report.pptx");
}

main().catch(err => { console.error("❌ Error:", err); process.exit(1); });
