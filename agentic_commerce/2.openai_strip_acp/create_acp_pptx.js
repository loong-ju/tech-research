const pptxgen = require('pptxgenjs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const sharp = require('sharp');
const {
  FaShoppingCart, FaLock, FaKey, FaCreditCard, FaPlug,
  FaSearch, FaShieldAlt, FaUserCheck, FaStore, FaExchangeAlt,
  FaRocket, FaChartLine, FaUsers, FaCode, FaCogs,
  FaCheckCircle, FaTimesCircle, FaExclamationTriangle,
  FaHandshake, FaGlobe, FaLayerGroup, FaBolt
} = require('react-icons/fa');

// ── Icon helper ──
function renderIconSvg(IconComponent, color = '#000000', size = 256) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
}
async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = renderIconSvg(IconComponent, color, size);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return 'image/png;base64,' + pngBuffer.toString('base64');
}

// ── Color palette (Stripe-inspired) ──
const C = {
  primary: '635BFF',     // Stripe purple
  dark: '1A1A2E',        // Deep navy
  darkAlt: '16213E',     // Slightly lighter navy
  light: 'F6F9FC',       // Stripe light bg
  white: 'FFFFFF',
  accent: '00D4AA',      // Teal accent
  accentAlt: 'FF6B6B',   // Coral for warnings
  orange: 'F7B731',      // Orange for highlights
  text: '1A1A2E',        // Dark text
  textMuted: '6B7280',   // Muted text
  textLight: 'A0AEC0',   // Light text on dark
  cardBg: 'FFFFFF',
  stripe: '635BFF',
  google: '4285F4',
  visa: 'F9A825',
  amazon: 'FF9900',
};

// ── Shadow factory ──
const mkShadow = () => ({ type: 'outer', blur: 4, offset: 2, angle: 135, color: '000000', opacity: 0.1 });

// ── Main ──
async function createPresentation() {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  pres.author = 'Agentic Commerce Research';
  pres.title = 'OpenAI + Stripe ACP 协议深度解析';

  // Pre-render icons
  const icons = {};
  const iconList = [
    ['search', FaSearch, C.primary],
    ['lock', FaLock, C.primary],
    ['key', FaKey, C.primary],
    ['credit', FaCreditCard, C.primary],
    ['plug', FaPlug, C.primary],
    ['cart', FaShoppingCart, C.white],
    ['shield', FaShieldAlt, C.white],
    ['userCheck', FaUserCheck, C.white],
    ['store', FaStore, C.white],
    ['exchange', FaExchangeAlt, C.white],
    ['rocket', FaRocket, C.white],
    ['chart', FaChartLine, C.white],
    ['users', FaUsers, C.white],
    ['code', FaCode, C.white],
    ['cogs', FaCogs, C.white],
    ['check', FaCheckCircle, '00D4AA'],
    ['times', FaTimesCircle, C.accentAlt],
    ['warn', FaExclamationTriangle, C.orange],
    ['handshake', FaHandshake, C.white],
    ['globe', FaGlobe, C.white],
    ['layer', FaLayerGroup, C.white],
    ['bolt', FaBolt, C.white],
    ['searchW', FaSearch, C.white],
    ['lockW', FaLock, C.white],
    ['keyW', FaKey, C.white],
    ['creditW', FaCreditCard, C.white],
    ['plugW', FaPlug, C.white],
    ['cartP', FaShoppingCart, C.primary],
    ['shieldP', FaShieldAlt, C.primary],
    ['storeP', FaStore, C.primary],
    ['rocketP', FaRocket, C.primary],
    ['codeP', FaCode, C.primary],
    ['checkD', FaCheckCircle, C.primary],
    ['layerP', FaLayerGroup, C.primary],
  ];
  for (const [name, comp, color] of iconList) {
    icons[name] = await iconToBase64Png(comp, color);
  }


  // ════════════════════════════════════════
  // SLIDE 1: Title
  // ════════════════════════════════════════
  let s1 = pres.addSlide();
  s1.background = { color: C.dark };
  // Purple accent bar top
  s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s1.addImage({ data: icons.cart, x: 0.7, y: 1.2, w: 0.6, h: 0.6 });
  s1.addText('OpenAI + Stripe ACP', {
    x: 1.5, y: 1.1, w: 7.5, h: 0.8, fontSize: 40, fontFace: 'Arial Black',
    color: C.white, bold: true, margin: 0
  });
  s1.addText('Agentic Commerce Protocol 深度解析', {
    x: 1.5, y: 1.9, w: 7.5, h: 0.5, fontSize: 22, fontFace: 'Calibri',
    color: C.accent, margin: 0
  });
  s1.addShape(pres.shapes.LINE, { x: 1.5, y: 2.6, w: 2.5, h: 0, line: { color: C.primary, width: 3 } });
  s1.addText('面向 SA 的技术与商业分析', {
    x: 1.5, y: 2.9, w: 7, h: 0.4, fontSize: 16, fontFace: 'Calibri', color: C.textLight, margin: 0
  });
  s1.addText('2026.02', {
    x: 1.5, y: 3.5, w: 3, h: 0.3, fontSize: 12, fontFace: 'Calibri', color: C.textMuted, margin: 0
  });

  // ════════════════════════════════════════
  // SLIDE 2: Agenda
  // ════════════════════════════════════════
  let s2 = pres.addSlide();
  s2.background = { color: C.light };
  s2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s2.addText('议程', { x: 0.7, y: 0.3, w: 9, h: 0.6, fontSize: 32, fontFace: 'Arial Black', color: C.text, margin: 0 });

  const agendaItems = [
    [icons.bolt, 'Agentic Commerce 五大核心挑战'],
    [icons.layerP, 'ACP 协议：三大子规范全链路覆盖'],
    [icons.rocketP, 'Stripe × OpenAI 的商业逻辑'],
    [icons.codeP, '技术架构与完整交易流程'],
    [icons.storeP, '商户对接路径'],
    [icons.shieldP, '安全模型与信任架构'],
    [icons.cartP, '竞争格局与生态'],
  ];
  agendaItems.forEach((item, i) => {
    const yPos = 1.2 + i * 0.55;
    s2.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: yPos, w: 8.6, h: 0.45,
      fill: { color: i % 2 === 0 ? 'FFFFFF' : 'F0EDFF' },
      shadow: mkShadow(), rectRadius: 0.05
    });
    s2.addImage({ data: item[0], x: 0.85, y: yPos + 0.07, w: 0.3, h: 0.3 });
    s2.addText(`${i + 1}.  ${item[1]}`, {
      x: 1.3, y: yPos, w: 7.5, h: 0.45, fontSize: 15, fontFace: 'Calibri',
      color: C.text, valign: 'middle', margin: 0
    });
  });

  // ════════════════════════════════════════
  // SLIDE 3: Five Core Challenges
  // ════════════════════════════════════════
  let s3 = pres.addSlide();
  s3.background = { color: C.dark };
  s3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s3.addText('Agentic Commerce 五大核心挑战', {
    x: 0.7, y: 0.25, w: 9, h: 0.55, fontSize: 28, fontFace: 'Arial Black', color: C.white, margin: 0
  });
  s3.addText('当 AI Agent 代替人类购物时，传统电商技术栈的五个根本性断裂点', {
    x: 0.7, y: 0.75, w: 9, h: 0.35, fontSize: 13, fontFace: 'Calibri', color: C.textLight, margin: 0
  });

  const challenges = [
    [icons.searchW, '商品发现', 'Agent 无法浏览网页\n需要机器可读的商品目录'],
    [icons.lockW, '信任', '商户如何区分\n合法 Agent 和恶意 Bot？'],
    [icons.keyW, '授权', 'Agent 没有"点击购买"\n如何证明用户授权？'],
    [icons.creditW, '支付', 'Agent 没有信用卡\n如何安全完成支付？'],
    [icons.plugW, '集成', 'N×M 集成成本\nAgent × 商户 指数增长'],
  ];
  challenges.forEach((ch, i) => {
    const xPos = 0.5 + i * 1.88;
    // Card bg
    s3.addShape(pres.shapes.RECTANGLE, {
      x: xPos, y: 1.35, w: 1.7, h: 3.2,
      fill: { color: '2A2A4A' }, shadow: mkShadow()
    });
    // Purple top accent
    s3.addShape(pres.shapes.RECTANGLE, {
      x: xPos, y: 1.35, w: 1.7, h: 0.06, fill: { color: C.primary }
    });
    // Icon circle
    s3.addShape(pres.shapes.OVAL, {
      x: xPos + 0.55, y: 1.65, w: 0.6, h: 0.6, fill: { color: C.primary }
    });
    s3.addImage({ data: ch[0], x: xPos + 0.65, y: 1.75, w: 0.4, h: 0.4 });
    // Title
    s3.addText(ch[1], {
      x: xPos, y: 2.45, w: 1.7, h: 0.4, fontSize: 15, fontFace: 'Calibri',
      color: C.white, bold: true, align: 'center', margin: 0
    });
    // Description
    s3.addText(ch[2], {
      x: xPos + 0.1, y: 2.9, w: 1.5, h: 1.2, fontSize: 11, fontFace: 'Calibri',
      color: C.textLight, align: 'center', margin: 0
    });
  });
  // Bottom stat
  s3.addText('2025 年 AI 流量涌入零售网站增幅超过 4,700%', {
    x: 0.7, y: 4.8, w: 9, h: 0.35, fontSize: 12, fontFace: 'Calibri', color: C.accent, align: 'center', margin: 0
  });


  // ════════════════════════════════════════
  // SLIDE 4: ACP Three Sub-specs
  // ════════════════════════════════════════
  let s4 = pres.addSlide();
  s4.background = { color: C.light };
  s4.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s4.addText('ACP 三大子规范：覆盖结账全链路', {
    x: 0.7, y: 0.25, w: 9, h: 0.55, fontSize: 28, fontFace: 'Arial Black', color: C.text, margin: 0
  });
  s4.addText('OpenAI + Stripe 于 2025 年 6 月联合发布  |  Apache 2.0 开源', {
    x: 0.7, y: 0.75, w: 9, h: 0.3, fontSize: 12, fontFace: 'Calibri', color: C.textMuted, margin: 0
  });

  // Three spec cards with arrow flow
  const specs = [
    ['Product Feed Spec', '商品数据规范', 'TSV/CSV/XML/JSON\n每 15 分钟增量同步\n商品描述/价格/库存', 'E3F2FD', '1565C0', icons.search],
    ['Agentic Checkout Spec', '结账流程规范', 'REST API · 5 个端点\nCheckout Session 状态机\nRich Cart State', 'FFF3E0', 'E65100', icons.cartP],
    ['Delegated Payment Spec', '委托支付规范', 'SharedPaymentToken\n商户/金额/时间/单次\n四重约束', 'F3E5F5', '6A1B9A', icons.shieldP],
  ];
  specs.forEach((sp, i) => {
    const xPos = 0.5 + i * 3.2;
    // Card
    s4.addShape(pres.shapes.RECTANGLE, {
      x: xPos, y: 1.3, w: 2.8, h: 3.0,
      fill: { color: C.white }, shadow: mkShadow()
    });
    // Color top bar
    s4.addShape(pres.shapes.RECTANGLE, {
      x: xPos, y: 1.3, w: 2.8, h: 0.08, fill: { color: sp[4] }
    });
    // Icon
    s4.addImage({ data: sp[5], x: xPos + 1.1, y: 1.55, w: 0.5, h: 0.5 });
    // English name
    s4.addText(sp[0], {
      x: xPos, y: 2.15, w: 2.8, h: 0.35, fontSize: 13, fontFace: 'Calibri',
      color: sp[4], bold: true, align: 'center', margin: 0
    });
    // Chinese name
    s4.addText(sp[1], {
      x: xPos, y: 2.45, w: 2.8, h: 0.3, fontSize: 11, fontFace: 'Calibri',
      color: C.textMuted, align: 'center', margin: 0
    });
    // Details
    s4.addText(sp[2], {
      x: xPos + 0.2, y: 2.85, w: 2.4, h: 1.2, fontSize: 11, fontFace: 'Calibri',
      color: C.text, align: 'center', margin: 0
    });
    // Arrow between cards
    if (i < 2) {
      s4.addText('→', {
        x: xPos + 2.8, y: 2.2, w: 0.4, h: 0.5, fontSize: 28, fontFace: 'Arial',
        color: C.primary, align: 'center', valign: 'middle', margin: 0
      });
    }
  });
  // Bottom note
  s4.addText('2025-09-29  ChatGPT Instant Checkout 正式上线  |  Shopify 100万+ 商户接入  |  Etsy · Glossier · SKIMS 等品牌', {
    x: 0.5, y: 4.6, w: 9, h: 0.4, fontSize: 11, fontFace: 'Calibri', color: C.textMuted, align: 'center', margin: 0
  });

  // ════════════════════════════════════════
  // SLIDE 5: How ACP addresses 5 challenges
  // ════════════════════════════════════════
  let s5 = pres.addSlide();
  s5.background = { color: C.light };
  s5.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s5.addText('ACP 如何应对五大挑战', {
    x: 0.7, y: 0.25, w: 9, h: 0.55, fontSize: 28, fontFace: 'Arial Black', color: C.text, margin: 0
  });

  const challengeRows = [
    ['商品发现', 'Product Feed Spec 标准化商品数据', '⭐⭐⭐⭐', icons.check],
    ['信任', 'Stripe 中心化信任模型（API Key）', '⭐⭐⭐', icons.warn],
    ['授权', 'SPT 单次交易授权（四重约束）', '⭐⭐⭐', icons.warn],
    ['支付', 'Stripe 全链路托管 + PCI DSS', '⭐⭐⭐⭐⭐', icons.check],
    ['集成', '三层接入：插件/REST/MCP', '⭐⭐⭐⭐⭐', icons.check],
  ];
  // Table header
  s5.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.05, w: 9, h: 0.45, fill: { color: C.primary } });
  s5.addText('挑战', { x: 0.5, y: 1.05, w: 1.5, h: 0.45, fontSize: 13, fontFace: 'Calibri', color: C.white, bold: true, align: 'center', valign: 'middle', margin: 0 });
  s5.addText('ACP 解决方案', { x: 2.0, y: 1.05, w: 4.5, h: 0.45, fontSize: 13, fontFace: 'Calibri', color: C.white, bold: true, align: 'center', valign: 'middle', margin: 0 });
  s5.addText('评级', { x: 6.5, y: 1.05, w: 1.8, h: 0.45, fontSize: 13, fontFace: 'Calibri', color: C.white, bold: true, align: 'center', valign: 'middle', margin: 0 });
  s5.addText('状态', { x: 8.3, y: 1.05, w: 1.2, h: 0.45, fontSize: 13, fontFace: 'Calibri', color: C.white, bold: true, align: 'center', valign: 'middle', margin: 0 });

  challengeRows.forEach((row, i) => {
    const yPos = 1.55 + i * 0.6;
    const bgColor = i % 2 === 0 ? C.white : 'F8F6FF';
    s5.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yPos, w: 9, h: 0.55, fill: { color: bgColor } });
    s5.addText(row[0], { x: 0.5, y: yPos, w: 1.5, h: 0.55, fontSize: 13, fontFace: 'Calibri', color: C.text, bold: true, align: 'center', valign: 'middle', margin: 0 });
    s5.addText(row[1], { x: 2.0, y: yPos, w: 4.5, h: 0.55, fontSize: 12, fontFace: 'Calibri', color: C.text, align: 'center', valign: 'middle', margin: 0 });
    s5.addText(row[2], { x: 6.5, y: yPos, w: 1.8, h: 0.55, fontSize: 13, fontFace: 'Calibri', align: 'center', valign: 'middle', margin: 0 });
    s5.addImage({ data: row[3], x: 8.7, y: yPos + 0.1, w: 0.35, h: 0.35 });
  });

  // Insight box
  s5.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.3, w: 9, h: 0.9, fill: { color: 'F0EDFF' } });
  s5.addText([
    { text: '核心洞察：', options: { bold: true, color: C.primary } },
    { text: '支付和集成是 ACP 最强环节（Stripe 基础设施优势），信任和授权相对薄弱（缺乏去中心化验证）。策略是"扬长避短，快速落地"。', options: { color: C.text } },
  ], { x: 0.7, y: 4.35, w: 8.6, h: 0.8, fontSize: 12, fontFace: 'Calibri', margin: 0 });


  // ════════════════════════════════════════
  // SLIDE 6: Why Stripe × OpenAI
  // ════════════════════════════════════════
  let s6 = pres.addSlide();
  s6.background = { color: C.dark };
  s6.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s6.addText('为什么是 Stripe × OpenAI？', {
    x: 0.7, y: 0.25, w: 9, h: 0.55, fontSize: 28, fontFace: 'Arial Black', color: C.white, margin: 0
  });
  s6.addText('双方的商业逻辑与战略目标', {
    x: 0.7, y: 0.75, w: 9, h: 0.3, fontSize: 13, fontFace: 'Calibri', color: C.textLight, margin: 0
  });

  // Stripe side
  s6.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.3, w: 4.3, h: 3.5, fill: { color: '2A2A4A' }, shadow: mkShadow() });
  s6.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.3, w: 4.3, h: 0.06, fill: { color: C.primary } });
  s6.addImage({ data: icons.creditW, x: 0.8, y: 1.55, w: 0.4, h: 0.4 });
  s6.addText('Stripe 的逻辑', { x: 1.3, y: 1.55, w: 3, h: 0.4, fontSize: 18, fontFace: 'Calibri', color: C.white, bold: true, margin: 0 });
  const stripePoints = [
    '防御：防止被 Agent 时代"脱媒"',
    '进攻：从支付管道 → 商务基础设施',
    '数据：首次获得商品目录数据',
    '网络效应：Agent/商户双边锁定',
    '卡位：抢在 Google/Visa 之前定义标准',
  ];
  stripePoints.forEach((pt, i) => {
    s6.addText(pt, {
      x: 0.8, y: 2.15 + i * 0.45, w: 3.8, h: 0.4, fontSize: 11, fontFace: 'Calibri',
      color: C.textLight, margin: 0, bullet: true
    });
  });

  // OpenAI side
  s6.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.3, w: 4.3, h: 3.5, fill: { color: '2A2A4A' }, shadow: mkShadow() });
  s6.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.3, w: 4.3, h: 0.06, fill: { color: C.accent } });
  s6.addImage({ data: icons.users, x: 5.5, y: 1.55, w: 0.4, h: 0.4 });
  s6.addText('OpenAI / ChatGPT 的逻辑', { x: 6.0, y: 1.55, w: 3.2, h: 0.4, fontSize: 18, fontFace: 'Calibri', color: C.white, bold: true, margin: 0 });
  const openaiPoints = [
    '变现：4 亿用户购物意图无法变现',
    '闭环：对话中直接完成购买',
    '收入：交易佣金 + 商户推广',
    '防御：对抗 Google/Amazon 商务能力',
    '体验：对话即购物，用户粘性极高',
  ];
  openaiPoints.forEach((pt, i) => {
    s6.addText(pt, {
      x: 5.5, y: 2.15 + i * 0.45, w: 3.8, h: 0.4, fontSize: 11, fontFace: 'Calibri',
      color: C.textLight, margin: 0, bullet: true
    });
  });

  // Bottom: intersection
  s6.addShape(pres.shapes.RECTANGLE, { x: 2.5, y: 5.0, w: 5, h: 0.45, fill: { color: C.primary } });
  s6.addText('共同目标：抢占 Agentic Commerce 事实标准制定权', {
    x: 2.5, y: 5.0, w: 5, h: 0.45, fontSize: 13, fontFace: 'Calibri', color: C.white, bold: true, align: 'center', valign: 'middle', margin: 0
  });

  // ════════════════════════════════════════
  // SLIDE 7: Stripe Disintermediation Risk
  // ════════════════════════════════════════
  let s7 = pres.addSlide();
  s7.background = { color: C.light };
  s7.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s7.addText('Stripe 面临的四条"脱媒"路径', {
    x: 0.7, y: 0.25, w: 9, h: 0.55, fontSize: 28, fontFace: 'Arial Black', color: C.text, margin: 0
  });
  s7.addText('Agent 时代，Stripe 的支付管道可能被架构性绕过', {
    x: 0.7, y: 0.75, w: 9, h: 0.3, fontSize: 13, fontFace: 'Calibri', color: C.textMuted, margin: 0
  });

  const paths = [
    ['① AP2 直连商户', 'Google AP2', 'Agent 持 Mandate\n直接与商户交互\n商户选择任意 PSP', C.google],
    ['② 卡网络直连', 'Visa TAP / MC', 'RFC 9421 签名\nAgent 直连收单行\nPSP 层变可选', C.visa],
    ['③ 链上支付', 'Coinbase x402', 'HTTP 402 触发\nUSDC 链上结算\n完全绕过传统支付', '9B59B6'],
    ['④ 平台闭环', 'Amazon', 'Buy for Me\nAmazon Pay 结算\n封闭生态', C.amazon],
  ];
  paths.forEach((p, i) => {
    const xPos = 0.4 + i * 2.4;
    s7.addShape(pres.shapes.RECTANGLE, {
      x: xPos, y: 1.25, w: 2.15, h: 2.8,
      fill: { color: C.white }, shadow: mkShadow()
    });
    s7.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 1.25, w: 2.15, h: 0.06, fill: { color: p[3] } });
    s7.addText(p[0], {
      x: xPos, y: 1.45, w: 2.15, h: 0.4, fontSize: 13, fontFace: 'Calibri',
      color: C.text, bold: true, align: 'center', margin: 0
    });
    s7.addText(p[1], {
      x: xPos, y: 1.85, w: 2.15, h: 0.3, fontSize: 11, fontFace: 'Calibri',
      color: p[3], align: 'center', margin: 0
    });
    s7.addShape(pres.shapes.LINE, { x: xPos + 0.3, y: 2.25, w: 1.55, h: 0, line: { color: 'E0E0E0', width: 1 } });
    s7.addText(p[2], {
      x: xPos + 0.15, y: 2.4, w: 1.85, h: 1.3, fontSize: 11, fontFace: 'Calibri',
      color: C.textMuted, align: 'center', margin: 0
    });
  });

  // Response box
  s7.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.3, w: 9, h: 0.9, fill: { color: 'F0EDFF' } });
  s7.addText([
    { text: 'Stripe 的应对：', options: { bold: true, color: C.primary } },
    { text: '从"支付管道"升级为"不可绕过的商务编排层"——Product Feed 锁定商品数据、Checkout 锁定结账流程、SPT 锁定支付授权。三层锁定确保 Stripe 在任何路径中不可替代。', options: { color: C.text } },
  ], { x: 0.7, y: 4.35, w: 8.6, h: 0.8, fontSize: 12, fontFace: 'Calibri', margin: 0 });

  // ════════════════════════════════════════
  // SLIDE 8: Competition Landscape
  // ════════════════════════════════════════
  let s8 = pres.addSlide();
  s8.background = { color: C.dark };
  s8.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s8.addText('竞争格局：三层竞争，三种逻辑', {
    x: 0.7, y: 0.25, w: 9, h: 0.55, fontSize: 28, fontFace: 'Arial Black', color: C.white, margin: 0
  });

  const compLayers = [
    ['第一层：标准之争', 'vs Google AP2+UCP', '中心化 vs 去中心化\n谁定义 Agent 商务的基本拓扑', C.google, '最核心'],
    ['第二层：控制权之争', 'vs Visa TAP / MC Agent Pay', 'PSP vs 卡网络\nAgent 身份认证归谁控制', C.visa, '中等紧迫'],
    ['第三层：时间窗口', 'vs 所有竞争者', '速度 + 生态 vs 技术 + 开放\n网络效应壁垒', C.accent, '最务实'],
  ];
  compLayers.forEach((cl, i) => {
    const yPos = 1.1 + i * 1.35;
    s8.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yPos, w: 9, h: 1.15, fill: { color: '2A2A4A' }, shadow: mkShadow() });
    s8.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yPos, w: 0.08, h: 1.15, fill: { color: cl[3] } });
    // Priority badge
    s8.addShape(pres.shapes.RECTANGLE, { x: 8.2, y: yPos + 0.1, w: 1.1, h: 0.3, fill: { color: cl[3] } });
    s8.addText(cl[4], { x: 8.2, y: yPos + 0.1, w: 1.1, h: 0.3, fontSize: 10, fontFace: 'Calibri', color: C.white, align: 'center', valign: 'middle', margin: 0 });
    // Title
    s8.addText(cl[0], { x: 0.8, y: yPos + 0.1, w: 4, h: 0.35, fontSize: 16, fontFace: 'Calibri', color: C.white, bold: true, margin: 0 });
    // Opponent
    s8.addText(cl[1], { x: 0.8, y: yPos + 0.45, w: 4, h: 0.3, fontSize: 12, fontFace: 'Calibri', color: cl[3], margin: 0 });
    // Description
    s8.addText(cl[2], { x: 5.0, y: yPos + 0.15, w: 3, h: 0.85, fontSize: 11, fontFace: 'Calibri', color: C.textLight, margin: 0 });
  });

  // Cooperation note
  s8.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 5.0, w: 9, h: 0.45, fill: { color: '2A2A4A' } });
  s8.addText('💡 与卡网络的合作逻辑强于竞争：ACP 管结账编排，TAP/Agent Pay 管 Agent 身份认证，Stripe 管支付清算', {
    x: 0.7, y: 5.0, w: 8.6, h: 0.45, fontSize: 11, fontFace: 'Calibri', color: C.accent, valign: 'middle', margin: 0
  });



  // ════════════════════════════════════════
  // SLIDE 9: Technical Architecture & Transaction Flow
  // ════════════════════════════════════════
  let s9 = pres.addSlide();
  s9.background = { color: C.light };
  s9.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s9.addText('完整交易流程：四阶段全链路', {
    x: 0.7, y: 0.25, w: 9, h: 0.55, fontSize: 28, fontFace: 'Arial Black', color: C.text, margin: 0
  });

  // Four phase cards
  const phases = [
    ['阶段 1', '商品发现', 'Product Feed Spec', 'Agent 从 Feed 中\n匹配用户需求\n每 15 分钟更新', '1565C0', icons.search],
    ['阶段 2', '结账流程', 'Agentic Checkout', 'POST /checkout_sessions\nRich Cart State\n配送/税费/折扣', 'E65100', icons.cartP],
    ['阶段 3', '委托支付', 'Delegated Payment', 'Stripe UI 确认\nSPT 签发（四重约束）\n商户扣款', '6A1B9A', icons.shieldP],
    ['阶段 4', '订单追踪', 'Webhook 回调', 'order.created\norder.updated\n发货/配送/退款', '2E7D32', icons.checkD],
  ];
  phases.forEach((ph, i) => {
    const xPos = 0.35 + i * 2.4;
    // Card
    s9.addShape(pres.shapes.RECTANGLE, {
      x: xPos, y: 1.1, w: 2.15, h: 3.5,
      fill: { color: C.white }, shadow: mkShadow()
    });
    // Color top bar
    s9.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 1.1, w: 2.15, h: 0.06, fill: { color: ph[4] } });
    // Phase label
    s9.addShape(pres.shapes.RECTANGLE, { x: xPos + 0.55, y: 1.3, w: 1.05, h: 0.3, fill: { color: ph[4] } });
    s9.addText(ph[0], { x: xPos + 0.55, y: 1.3, w: 1.05, h: 0.3, fontSize: 10, fontFace: 'Calibri', color: C.white, align: 'center', valign: 'middle', margin: 0 });
    // Icon
    s9.addImage({ data: ph[5], x: xPos + 0.78, y: 1.75, w: 0.5, h: 0.5 });
    // Title
    s9.addText(ph[1], { x: xPos, y: 2.35, w: 2.15, h: 0.35, fontSize: 15, fontFace: 'Calibri', color: C.text, bold: true, align: 'center', margin: 0 });
    // Spec name
    s9.addText(ph[2], { x: xPos, y: 2.65, w: 2.15, h: 0.25, fontSize: 10, fontFace: 'Calibri', color: ph[4], align: 'center', margin: 0 });
    // Details
    s9.addText(ph[3], { x: xPos + 0.15, y: 3.0, w: 1.85, h: 1.3, fontSize: 11, fontFace: 'Calibri', color: C.textMuted, align: 'center', margin: 0 });
    // Arrow
    if (i < 3) {
      s9.addText('→', { x: xPos + 2.15, y: 2.3, w: 0.25, h: 0.4, fontSize: 22, fontFace: 'Arial', color: C.primary, align: 'center', valign: 'middle', margin: 0 });
    }
  });

  // Bottom: key insight
  s9.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.85, w: 9, h: 0.55, fill: { color: 'F0EDFF' } });
  s9.addText([
    { text: '核心特征：', options: { bold: true, color: C.primary } },
    { text: 'Agent 全程不接触卡号，只持有 SPT（一次性令牌）。用户必须在 Stripe UI 中明确确认支付（Human-in-the-Loop）。', options: { color: C.text } },
  ], { x: 0.7, y: 4.85, w: 8.6, h: 0.55, fontSize: 12, fontFace: 'Calibri', valign: 'middle', margin: 0 });


  // ════════════════════════════════════════
  // SLIDE 10: Business Logic Relationships (5 entities)
  // ════════════════════════════════════════
  let s10 = pres.addSlide();
  s10.background = { color: C.dark };
  s10.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s10.addText('业务关系全景：五大实体交互', {
    x: 0.7, y: 0.25, w: 9, h: 0.55, fontSize: 28, fontFace: 'Arial Black', color: C.white, margin: 0
  });

  // 5 entity nodes in a pentagon-like layout
  // Top center: Stripe (hub)
  // Left: User, Right: Agent
  // Bottom-left: Card Network, Bottom-right: Merchant
  const entities = [
    { label: '💳 Stripe', sub: '信任枢纽', x: 3.8, y: 1.2, color: C.primary },
    { label: '👤 用户', sub: '授权方', x: 0.8, y: 1.8, color: '1565C0' },
    { label: '🤖 Agent', sub: '发起方', x: 6.8, y: 1.8, color: 'E65100' },
    { label: '🏪 商户', sub: '履约方', x: 6.2, y: 3.5, color: '2E7D32' },
    { label: '🌐 卡网络', sub: '清算方', x: 1.4, y: 3.5, color: 'F57F17' },
  ];
  entities.forEach(e => {
    s10.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: e.x, y: e.y, w: 2.0, h: 0.75,
      fill: { color: '2A2A4A' }, shadow: mkShadow(), rectRadius: 0.08
    });
    s10.addShape(pres.shapes.RECTANGLE, { x: e.x, y: e.y, w: 2.0, h: 0.06, fill: { color: e.color } });
    s10.addText(e.label, { x: e.x, y: e.y + 0.08, w: 2.0, h: 0.35, fontSize: 14, fontFace: 'Calibri', color: C.white, bold: true, align: 'center', margin: 0 });
    s10.addText(e.sub, { x: e.x, y: e.y + 0.42, w: 2.0, h: 0.25, fontSize: 10, fontFace: 'Calibri', color: e.color, align: 'center', margin: 0 });
  });

  // Relationship arrows (text labels)
  const rels = [
    { text: '绑卡/信任', x: 1.8, y: 1.25, color: '1565C0' },
    { text: 'API Key 认证', x: 5.8, y: 1.25, color: 'E65100' },
    { text: '自然语言交互', x: 3.5, y: 2.15, color: C.textLight },
    { text: 'SPT 授权', x: 2.5, y: 2.55, color: C.accent },
    { text: 'MCP/REST', x: 6.0, y: 2.55, color: 'E65100' },
    { text: 'Checkout/Webhook', x: 5.5, y: 3.15, color: '2E7D32' },
    { text: 'Product Feed', x: 7.0, y: 3.0, color: '2E7D32' },
    { text: 'ISO 8583', x: 2.5, y: 3.15, color: 'F57F17' },
    { text: '清算结算', x: 4.0, y: 3.85, color: 'F57F17' },
  ];
  rels.forEach(r => {
    s10.addText(r.text, { x: r.x, y: r.y, w: 1.6, h: 0.25, fontSize: 9, fontFace: 'Calibri', color: r.color, align: 'center', margin: 0 });
  });

  // Bottom insight
  s10.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.55, w: 9, h: 0.85, fill: { color: '2A2A4A' } });
  s10.addText([
    { text: '核心洞察：', options: { bold: true, color: C.accent } },
    { text: 'Stripe 处于枢纽位置，同时连接 Agent（技术接口）、商户（商品与履约）和卡网络（资金流转）。\n用户与卡网络无直接关系（Stripe 代理），商户与 Agent 无直接关系（Stripe 中介）。', options: { color: C.textLight } },
  ], { x: 0.7, y: 4.55, w: 8.6, h: 0.85, fontSize: 11, fontFace: 'Calibri', margin: 0 });


  // ════════════════════════════════════════
  // SLIDE 11: Merchant Onboarding Paths
  // ════════════════════════════════════════
  let s11 = pres.addSlide();
  s11.background = { color: C.light };
  s11.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s11.addText('商户对接：三条路径，灵活接入', {
    x: 0.7, y: 0.25, w: 9, h: 0.55, fontSize: 28, fontFace: 'Arial Black', color: C.text, margin: 0
  });

  const onboardPaths = [
    {
      title: '路径① 平台插件',
      subtitle: '零代码接入',
      color: '2E7D32',
      steps: ['安装 ACP 插件（5 分钟）', '关联 Stripe 账户（10 分钟）', '商品自动同步', '24-48 小时上线'],
      target: 'Shopify / Wix / WooCommerce\nBigCommerce / Squarespace',
      effort: '< 1 天',
      icon: icons.storeP,
    },
    {
      title: '路径② REST API',
      subtitle: '标准化对接',
      color: 'E65100',
      steps: ['注册 Stripe + API Key', '推送 Product Feed', '实现 5 个 REST 端点', 'SPT 支付 + Webhook'],
      target: '自建电商系统',
      effort: '3-4 周',
      icon: icons.codeP,
    },
    {
      title: '路径③ MCP Server',
      subtitle: '完全自定义',
      color: '6A1B9A',
      steps: ['注册 Stripe + API Key', '推送 Product Feed', '开发 MCP Server', '封装 ACP 为 MCP Tools'],
      target: '需要跨 Agent 平台\nClaude / Gemini / 自建',
      effort: '4-6 周',
      icon: icons.layerP,
    },
  ];
  onboardPaths.forEach((p, i) => {
    const xPos = 0.4 + i * 3.15;
    // Card
    s11.addShape(pres.shapes.RECTANGLE, {
      x: xPos, y: 1.05, w: 2.9, h: 4.1,
      fill: { color: C.white }, shadow: mkShadow()
    });
    // Color top bar
    s11.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 1.05, w: 2.9, h: 0.06, fill: { color: p.color } });
    // Icon
    s11.addImage({ data: p.icon, x: xPos + 1.15, y: 1.25, w: 0.5, h: 0.5 });
    // Title
    s11.addText(p.title, { x: xPos, y: 1.8, w: 2.9, h: 0.35, fontSize: 15, fontFace: 'Calibri', color: C.text, bold: true, align: 'center', margin: 0 });
    // Subtitle
    s11.addText(p.subtitle, { x: xPos, y: 2.1, w: 2.9, h: 0.25, fontSize: 11, fontFace: 'Calibri', color: p.color, align: 'center', margin: 0 });
    // Divider
    s11.addShape(pres.shapes.LINE, { x: xPos + 0.3, y: 2.45, w: 2.3, h: 0, line: { color: 'E0E0E0', width: 1 } });
    // Steps
    p.steps.forEach((step, j) => {
      s11.addText(`${j + 1}. ${step}`, {
        x: xPos + 0.2, y: 2.55 + j * 0.35, w: 2.5, h: 0.3,
        fontSize: 10, fontFace: 'Calibri', color: C.text, margin: 0
      });
    });
    // Target
    s11.addShape(pres.shapes.RECTANGLE, { x: xPos + 0.15, y: 3.95, w: 2.6, h: 0.55, fill: { color: 'F8F6FF' } });
    s11.addText(p.target, { x: xPos + 0.15, y: 3.95, w: 2.6, h: 0.55, fontSize: 9, fontFace: 'Calibri', color: C.textMuted, align: 'center', valign: 'middle', margin: 0 });
    // Effort badge
    s11.addShape(pres.shapes.RECTANGLE, { x: xPos + 0.8, y: 4.6, w: 1.3, h: 0.3, fill: { color: p.color } });
    s11.addText(p.effort, { x: xPos + 0.8, y: 4.6, w: 1.3, h: 0.3, fontSize: 10, fontFace: 'Calibri', color: C.white, align: 'center', valign: 'middle', margin: 0 });
  });

  // Bottom note
  s11.addText('注意：路径③ MCP Server 不绕过 Stripe，仍需 Stripe API Key + Product Feed + SPT 支付', {
    x: 0.5, y: 5.15, w: 9, h: 0.3, fontSize: 10, fontFace: 'Calibri', color: C.textMuted, align: 'center', margin: 0
  });


  // ════════════════════════════════════════
  // SLIDE 12: Security Model & Trust Architecture
  // ════════════════════════════════════════
  let s12 = pres.addSlide();
  s12.background = { color: C.dark };
  s12.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s12.addText('安全模型：四维防护体系', {
    x: 0.7, y: 0.25, w: 9, h: 0.55, fontSize: 28, fontFace: 'Arial Black', color: C.white, margin: 0
  });

  const secDims = [
    {
      title: '用户安全',
      icon: icons.userCheck,
      color: '1565C0',
      items: ['支付信息 Stripe 托管', 'SPT 最小权限（四重约束）', '用户明确确认（Stripe UI）', '交易可追溯'],
    },
    {
      title: 'Agent 安全',
      icon: icons.shield,
      color: 'E65100',
      items: ['Agent 不接触卡号', 'API Key 认证身份', '请求签名验证（HMAC）', '速率限制防滥用'],
    },
    {
      title: '商户安全',
      icon: icons.store,
      color: '2E7D32',
      items: ['Merchant of Record 身份', '订单接受/拒绝权', 'Webhook 签名验证', 'SPT 商户限定'],
    },
    {
      title: '支付安全',
      icon: icons.creditW,
      color: '6A1B9A',
      items: ['PCI DSS Level 1 合规', 'Network Tokenization', 'Stripe Radar AI 风控', '3D Secure + 争议处理'],
    },
  ];
  secDims.forEach((dim, i) => {
    const xPos = 0.35 + i * 2.4;
    // Card
    s12.addShape(pres.shapes.RECTANGLE, {
      x: xPos, y: 1.05, w: 2.15, h: 3.6,
      fill: { color: '2A2A4A' }, shadow: mkShadow()
    });
    s12.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 1.05, w: 2.15, h: 0.06, fill: { color: dim.color } });
    // Icon circle
    s12.addShape(pres.shapes.OVAL, { x: xPos + 0.68, y: 1.25, w: 0.6, h: 0.6, fill: { color: dim.color } });
    s12.addImage({ data: dim.icon, x: xPos + 0.78, y: 1.35, w: 0.4, h: 0.4 });
    // Title
    s12.addText(dim.title, { x: xPos, y: 1.95, w: 2.15, h: 0.35, fontSize: 15, fontFace: 'Calibri', color: C.white, bold: true, align: 'center', margin: 0 });
    // Items
    dim.items.forEach((item, j) => {
      s12.addShape(pres.shapes.RECTANGLE, {
        x: xPos + 0.1, y: 2.45 + j * 0.5, w: 1.95, h: 0.4,
        fill: { color: '353560' }, rectRadius: 0.04
      });
      s12.addText(item, {
        x: xPos + 0.15, y: 2.45 + j * 0.5, w: 1.85, h: 0.4,
        fontSize: 10, fontFace: 'Calibri', color: C.textLight, align: 'center', valign: 'middle', margin: 0
      });
    });
  });

  // Bottom
  s12.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.85, w: 9, h: 0.55, fill: { color: '2A2A4A' } });
  s12.addText([
    { text: '设计原则：', options: { bold: true, color: C.accent } },
    { text: 'Agent 全程不接触卡号（零信任），用户必须在 Stripe UI 确认（Human-in-the-Loop），SPT 四重约束确保最小权限。', options: { color: C.textLight } },
  ], { x: 0.7, y: 4.85, w: 8.6, h: 0.55, fontSize: 11, fontFace: 'Calibri', valign: 'middle', margin: 0 });


  // ════════════════════════════════════════
  // SLIDE 13: Trust Chain Deep Dive
  // ════════════════════════════════════════
  let s13 = pres.addSlide();
  s13.background = { color: C.light };
  s13.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s13.addText('信任模型深度解读：Stripe 平台背书', {
    x: 0.7, y: 0.25, w: 9, h: 0.55, fontSize: 28, fontFace: 'Arial Black', color: C.text, margin: 0
  });

  // Trust chain flow: User → Stripe → Agent → Merchant → Stripe
  const trustNodes = [
    { label: '👤 用户', sub: '绑卡/信任', x: 0.3, color: '1565C0' },
    { label: '💳 Stripe', sub: '签发 SPT', x: 2.5, color: C.primary },
    { label: '🤖 Agent', sub: '携带 SPT', x: 4.7, color: 'E65100' },
    { label: '🏪 商户', sub: '验证 SPT', x: 6.9, color: '2E7D32' },
  ];
  trustNodes.forEach((n, i) => {
    s13.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: n.x, y: 1.1, w: 1.9, h: 0.7,
      fill: { color: C.white }, shadow: mkShadow(), rectRadius: 0.06
    });
    s13.addShape(pres.shapes.RECTANGLE, { x: n.x, y: 1.1, w: 1.9, h: 0.05, fill: { color: n.color } });
    s13.addText(n.label, { x: n.x, y: 1.15, w: 1.9, h: 0.35, fontSize: 13, fontFace: 'Calibri', color: C.text, bold: true, align: 'center', margin: 0 });
    s13.addText(n.sub, { x: n.x, y: 1.48, w: 1.9, h: 0.25, fontSize: 10, fontFace: 'Calibri', color: n.color, align: 'center', margin: 0 });
    if (i < 3) {
      s13.addText('→', { x: n.x + 1.9, y: 1.2, w: 0.6, h: 0.5, fontSize: 22, fontFace: 'Arial', color: C.primary, align: 'center', valign: 'middle', margin: 0 });
    }
  });
  // Return arrow from Merchant back to Stripe
  s13.addShape(pres.shapes.LINE, { x: 3.45, y: 1.95, w: 5.35, h: 0, line: { color: C.primary, width: 1.5, dashType: 'dash' } });
  s13.addText('④ 商户向 Stripe 验证 SPT 有效性', { x: 3.5, y: 1.95, w: 5.3, h: 0.25, fontSize: 9, fontFace: 'Calibri', color: C.primary, align: 'center', margin: 0 });

  // Three core questions table
  s13.addText('Agent 时代的三个核心信任问题', { x: 0.5, y: 2.35, w: 9, h: 0.35, fontSize: 14, fontFace: 'Calibri', color: C.text, bold: true, margin: 0 });

  // Table header
  s13.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.7, w: 9, h: 0.35, fill: { color: C.primary } });
  s13.addText('问题', { x: 0.5, y: 2.7, w: 2.5, h: 0.35, fontSize: 11, fontFace: 'Calibri', color: C.white, bold: true, align: 'center', valign: 'middle', margin: 0 });
  s13.addText('传统电商', { x: 3.0, y: 2.7, w: 3.0, h: 0.35, fontSize: 11, fontFace: 'Calibri', color: C.white, bold: true, align: 'center', valign: 'middle', margin: 0 });
  s13.addText('ACP 的回答', { x: 6.0, y: 2.7, w: 3.5, h: 0.35, fontSize: 11, fontFace: 'Calibri', color: C.white, bold: true, align: 'center', valign: 'middle', margin: 0 });

  const trustRows = [
    ['请求者是谁？（身份）', '浏览器 Cookie + 登录态', 'Stripe API Key 标识 Agent 平台'],
    ['用户真的授权了？', '用户点击"购买"按钮', 'Stripe 签发 SPT（用户在 UI 确认）'],
    ['钱能收到吗？', '卡网络授权通过', 'Stripe 验证 SPT 后执行扣款'],
  ];
  trustRows.forEach((row, i) => {
    const yPos = 3.1 + i * 0.4;
    const bgColor = i % 2 === 0 ? C.white : 'F8F6FF';
    s13.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yPos, w: 9, h: 0.38, fill: { color: bgColor } });
    s13.addText(row[0], { x: 0.5, y: yPos, w: 2.5, h: 0.38, fontSize: 10, fontFace: 'Calibri', color: C.text, bold: true, align: 'center', valign: 'middle', margin: 0 });
    s13.addText(row[1], { x: 3.0, y: yPos, w: 3.0, h: 0.38, fontSize: 10, fontFace: 'Calibri', color: C.textMuted, align: 'center', valign: 'middle', margin: 0 });
    s13.addText(row[2], { x: 6.0, y: yPos, w: 3.5, h: 0.38, fontSize: 10, fontFace: 'Calibri', color: C.primary, align: 'center', valign: 'middle', margin: 0 });
  });

  // Limitations vs AP2
  s13.addText('局限性 vs AP2', { x: 0.5, y: 4.4, w: 9, h: 0.3, fontSize: 13, fontFace: 'Calibri', color: C.text, bold: true, margin: 0 });
  const limitCols = [
    ['无独立 Agent 身份协议\nAPI Key 泄露 = 冒充', 'F0EDFF'],
    ['信任链高度中心化\nStripe 宕机 = 全链断裂', 'FFF3E0'],
    ['跨生态信任缺失\n非 Stripe 商户无法接入', 'FCE4EC'],
    ['不可否认性弱\n依赖 Stripe 日志诚实性', 'FFF8E1'],
  ];
  limitCols.forEach((lc, i) => {
    const xPos = 0.5 + i * 2.25;
    s13.addShape(pres.shapes.RECTANGLE, { x: xPos, y: 4.7, w: 2.1, h: 0.75, fill: { color: lc[1] }, rectRadius: 0.04 });
    s13.addText(lc[0], { x: xPos + 0.05, y: 4.7, w: 2.0, h: 0.75, fontSize: 9, fontFace: 'Calibri', color: C.text, align: 'center', valign: 'middle', margin: 0 });
  });


  // ════════════════════════════════════════
  // SLIDE 14: Ecosystem & Partners
  // ════════════════════════════════════════
  let s14 = pres.addSlide();
  s14.background = { color: C.dark };
  s14.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s14.addText('生态全景：快速扩张的合作网络', {
    x: 0.7, y: 0.25, w: 9, h: 0.55, fontSize: 28, fontFace: 'Arial Black', color: C.white, margin: 0
  });

  // Central ACP node
  s14.addShape(pres.shapes.OVAL, { x: 3.9, y: 2.3, w: 2.2, h: 1.0, fill: { color: C.primary }, shadow: mkShadow() });
  s14.addText('ACP\n协议', { x: 3.9, y: 2.35, w: 2.2, h: 0.9, fontSize: 16, fontFace: 'Calibri', color: C.white, bold: true, align: 'center', valign: 'middle', margin: 0 });

  // Partner categories around the center
  const ecoCategories = [
    { title: 'Agent 平台', items: 'OpenAI (ChatGPT)', x: 0.3, y: 0.9, w: 2.5, color: 'E65100' },
    { title: '支付基础设施', items: 'Stripe · PayPal · Worldpay', x: 7.2, y: 0.9, w: 2.5, color: C.primary },
    { title: '电商平台', items: 'Shopify (100万+商户)\nWix · WooCommerce\nBigCommerce · Squarespace\ncommercetools', x: 0.2, y: 2.8, w: 2.8, color: '2E7D32' },
    { title: '品牌商户', items: 'Etsy · Glossier · SKIMS\nSpanx · Vuori', x: 7.0, y: 2.8, w: 2.8, color: 'F57F17' },
    { title: '企业软件', items: 'Salesforce (Agentforce)', x: 1.5, y: 4.3, w: 2.5, color: '1565C0' },
    { title: '咨询', items: 'PwC', x: 6.0, y: 4.3, w: 2.5, color: '9B59B6' },
  ];
  ecoCategories.forEach(cat => {
    s14.addShape(pres.shapes.RECTANGLE, {
      x: cat.x, y: cat.y, w: cat.w, h: cat.items.split('\n').length * 0.25 + 0.55,
      fill: { color: '2A2A4A' }, shadow: mkShadow()
    });
    s14.addShape(pres.shapes.RECTANGLE, { x: cat.x, y: cat.y, w: cat.w, h: 0.05, fill: { color: cat.color } });
    s14.addText(cat.title, {
      x: cat.x, y: cat.y + 0.08, w: cat.w, h: 0.3,
      fontSize: 11, fontFace: 'Calibri', color: cat.color, bold: true, align: 'center', margin: 0
    });
    s14.addText(cat.items, {
      x: cat.x + 0.1, y: cat.y + 0.35, w: cat.w - 0.2, h: cat.items.split('\n').length * 0.25,
      fontSize: 10, fontFace: 'Calibri', color: C.textLight, align: 'center', margin: 0
    });
  });

  // Key milestones
  s14.addShape(pres.shapes.RECTANGLE, { x: 3.0, y: 4.3, w: 4.0, h: 1.1, fill: { color: '2A2A4A' }, shadow: mkShadow() });
  s14.addShape(pres.shapes.RECTANGLE, { x: 3.0, y: 4.3, w: 4.0, h: 0.05, fill: { color: C.accent } });
  s14.addText('关键里程碑', { x: 3.0, y: 4.35, w: 4.0, h: 0.25, fontSize: 11, fontFace: 'Calibri', color: C.accent, bold: true, align: 'center', margin: 0 });
  s14.addText('2025-06  ACP 发布（Apache 2.0）\n2025-09  ChatGPT Instant Checkout 上线\n2025-10  Salesforce + PayPal 加入', {
    x: 3.1, y: 4.6, w: 3.8, h: 0.75, fontSize: 9, fontFace: 'Calibri', color: C.textLight, align: 'center', margin: 0
  });


  // ════════════════════════════════════════
  // SLIDE 15: Summary & Thank You
  // ════════════════════════════════════════
  let s15 = pres.addSlide();
  s15.background = { color: C.dark };
  s15.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.primary } });
  s15.addText('总结与关键要点', {
    x: 0.7, y: 0.25, w: 9, h: 0.55, fontSize: 28, fontFace: 'Arial Black', color: C.white, margin: 0
  });

  const takeaways = [
    { label: 'ACP 定位', text: 'OpenAI + Stripe 联合定义的 Agentic Commerce 事实标准，三大子规范覆盖商品发现→结账→支付全链路', color: C.primary },
    { label: '核心优势', text: '支付安全（Stripe 基础设施）+ 集成效率（三条接入路径）+ 快速落地（Shopify 100万+商户）', color: C.accent },
    { label: '信任模型', text: 'Stripe 平台背书（中心化），简单高效但缺乏去中心化验证。SPT 四重约束确保最小权限', color: '1565C0' },
    { label: '竞争格局', text: '三层竞争：vs Google AP2+UCP（标准之争）、vs Visa TAP/MC（控制权之争）、vs 所有人（时间窗口）', color: 'E65100' },
    { label: '合作机会', text: '与卡网络合作逻辑强于竞争：ACP 管结账编排，TAP/Agent Pay 管 Agent 身份，Stripe 管支付清算', color: '2E7D32' },
    { label: 'SA 关注点', text: '关注客户的电商平台选型（Shopify 等已原生支持）、支付服务商选择（Stripe 生态锁定）、跨 Agent 平台需求', color: '6A1B9A' },
  ];
  takeaways.forEach((t, i) => {
    const yPos = 1.0 + i * 0.6;
    s15.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yPos, w: 9, h: 0.5, fill: { color: '2A2A4A' }, shadow: mkShadow() });
    s15.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: yPos, w: 0.06, h: 0.5, fill: { color: t.color } });
    s15.addText(t.label, { x: 0.7, y: yPos, w: 1.6, h: 0.5, fontSize: 12, fontFace: 'Calibri', color: t.color, bold: true, valign: 'middle', margin: 0 });
    s15.addText(t.text, { x: 2.3, y: yPos, w: 7, h: 0.5, fontSize: 11, fontFace: 'Calibri', color: C.textLight, valign: 'middle', margin: 0 });
  });

  // Bottom: Thank you
  s15.addShape(pres.shapes.LINE, { x: 3.0, y: 4.8, w: 4, h: 0, line: { color: C.primary, width: 2 } });
  s15.addText('Thank You', {
    x: 2.5, y: 4.9, w: 5, h: 0.5, fontSize: 24, fontFace: 'Arial Black', color: C.white, align: 'center', margin: 0
  });
  s15.addText('更多 Agentic Commerce 系列报告：Google AP2 · UCP · Visa TAP · Mastercard Agent Pay · Coinbase x402', {
    x: 1.0, y: 5.3, w: 8, h: 0.3, fontSize: 10, fontFace: 'Calibri', color: C.textMuted, align: 'center', margin: 0
  });


  // ════════════════════════════════════════
  // WRITE FILE
  // ════════════════════════════════════════
  await pres.writeFile({ fileName: 'ACP_Protocol_SA_Presentation.pptx' });
  console.log('PPT generated: ACP_Protocol_SA_Presentation.pptx');
}

createPresentation().catch(err => {
  console.error('Error generating PPT:', err);
  process.exit(1);
});
