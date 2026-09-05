import { TrackedAnchor } from '@/components/TrackedAnchor';

export const metadata = {
  title: 'Follow-up que Vende — E-book para Corretores de Imóveis',
  description:
    'E-book para corretores: organize seu CRM, acompanhe clientes e recupere oportunidades esquecidas.'
};

const CHECKOUT_URL = 'https://pay.kiwify.com.br/vUcvQZ8';

const CSS = `
.fu-page{
  --bg: #F3F9F9;
  --surface: #FFFFFF;
  --surface-2: #E9F1F3;
  --navy: #0B1E3D;
  --navy-2: #14315E;
  --blue: #2F6BB0;
  --blue-2: #5B9AD6;
  --ink: #16223A;
  --muted: #566487;
  --line: #DCE6EA;
  --hot: #DD5433;
  --hot-soft: #FBEAE6;
  --good: #237A46;
  --good-soft: #E8F5EC;
  --on-navy: #F3F9F9;
  --on-navy-muted: #9FB3D1;
  --shadow: 0 10px 30px -12px rgba(11,30,61,0.18);
}
@media (prefers-color-scheme: dark){
  .fu-page:not([data-theme="light"]){
    --bg: #081326;
    --surface: #0F2038;
    --surface-2: #142A4A;
    --navy: #12294E;
    --navy-2: #1B3C70;
    --blue: #6AA6DE;
    --blue-2: #8FC0EC;
    --ink: #E8EEF8;
    --muted: #9BB0D1;
    --line: #223554;
    --hot: #FF8563;
    --hot-soft: #3A2035;
    --good: #6FD79A;
    --good-soft: #14322A;
    --on-navy: #F3F9F9;
    --on-navy-muted: #A9BEDD;
    --shadow: 0 10px 30px -12px rgba(0,0,0,0.5);
  }
}
.fu-page[data-theme="dark"]{
  --bg: #081326;
  --surface: #0F2038;
  --surface-2: #142A4A;
  --navy: #12294E;
  --navy-2: #1B3C70;
  --blue: #6AA6DE;
  --blue-2: #8FC0EC;
  --ink: #E8EEF8;
  --muted: #9BB0D1;
  --line: #223554;
  --hot: #FF8563;
  --hot-soft: #3A2035;
  --good: #6FD79A;
  --good-soft: #14322A;
  --on-navy: #F3F9F9;
  --on-navy-muted: #A9BEDD;
  --shadow: 0 10px 30px -12px rgba(0,0,0,0.5);
}

.fu-page, .fu-page *{ box-sizing: border-box; }
.fu-page{
  margin:0; background: var(--bg); color: var(--ink);
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Arial, sans-serif;
  font-size: 15.5px; line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
.fu-page h1, .fu-page h2, .fu-page h3, .fu-page h4{ font-family: 'Poppins', 'Inter', sans-serif; margin:0; text-wrap: balance; color: var(--navy); }
.fu-page[data-theme="dark"] h1, .fu-page[data-theme="dark"] h2, .fu-page[data-theme="dark"] h3, .fu-page[data-theme="dark"] h4 { color: var(--ink); }
@media (prefers-color-scheme: dark){ .fu-page:not([data-theme="light"]) h1, .fu-page:not([data-theme="light"]) h2, .fu-page:not([data-theme="light"]) h3, .fu-page:not([data-theme="light"]) h4 { color: var(--ink); } }
.fu-page p{ margin:0; }
.fu-page a{ color: inherit; }
.fu-page img{ max-width:100%; display:block; }
.fu-page .wrap{ max-width: 1080px; margin: 0 auto; padding: 0 24px; }
.fu-page section{ padding: 74px 0; }
.fu-page .eyebrow{
  display:inline-flex; align-items:center; gap:8px; font-size: 11.5px; font-weight:700;
  letter-spacing: 1.8px; text-transform: uppercase; color: var(--blue);
}
.fu-page .eyebrow::before{ content:""; width:16px; height:2px; background: var(--blue); border-radius:2px; }

.fu-page .nav{
  position: sticky; top:0; z-index:50; background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: blur(10px); border-bottom: 1px solid var(--line);
}
.fu-page .nav-inner{ display:flex; align-items:center; justify-content:space-between; padding: 14px 24px; max-width:1080px; margin:0 auto; }
.fu-page .logo{ display:flex; align-items:center; gap:8px; }
.fu-page .logo .word{ font-family:'Poppins',sans-serif; font-weight:700; font-size:16.5px; color: var(--ink); }
.fu-page .logo .word .imob{ color: var(--blue); }
.fu-page .nav-cta{
  background: var(--navy); color: var(--on-navy); border:none; padding: 10px 20px; border-radius: 8px;
  font-weight:600; font-size:13.5px; cursor:pointer; text-decoration:none; white-space:nowrap;
}

.fu-page .hero{ padding: 60px 0 40px; }
.fu-page .hero-grid{ display:grid; grid-template-columns: 1.05fr 0.85fr; gap: 56px; align-items:center; }
.fu-page .hero h1{ font-size: 40px; font-weight:800; line-height:1.14; margin: 16px 0 18px; }
.fu-page .hero h1 .accent{ color: var(--blue); }
.fu-page .hero .sub{ font-size: 16px; color: var(--muted); line-height:1.65; max-width: 46ch; }
.fu-page .hero-ctas{ display:flex; align-items:center; gap:16px; margin-top: 30px; flex-wrap: wrap; }
.fu-page .btn-primary{
  background: var(--blue); color:#fff; border:none; padding: 15px 28px; border-radius: 10px;
  font-weight:700; font-size:15px; cursor:pointer; text-decoration:none; display:inline-block;
  box-shadow: 0 8px 20px -8px color-mix(in srgb, var(--blue) 70%, transparent);
}
.fu-page .price-note{ font-size: 12.5px; color: var(--muted); }
.fu-page .price-note b{ color: var(--navy); font-size: 15px; }
.fu-page[data-theme="dark"] .price-note b{ color: var(--ink); }
.fu-page .hero-stats{ display:flex; gap: 26px; margin-top: 34px; padding-top: 24px; border-top: 1px solid var(--line); }
.fu-page .hero-stats .stat .n{ font-family:'Poppins',sans-serif; font-weight:800; font-size:22px; color: var(--navy); }
.fu-page[data-theme="dark"] .hero-stats .stat .n{ color: var(--ink); }
.fu-page .hero-stats .stat .l{ font-size:11.5px; color: var(--muted); text-transform:uppercase; letter-spacing:0.6px; margin-top:2px; }

.fu-page .cover-mock{
  background: radial-gradient(ellipse at 25% 0%, var(--navy-2) 0%, var(--navy) 60%, #060f1e 100%);
  border-radius: 16px; padding: 30px 26px; color: var(--on-navy); position:relative;
  box-shadow: var(--shadow); transform: rotate(1.6deg);
  aspect-ratio: 210/280; display:flex; flex-direction:column; justify-content:space-between;
}
.fu-page .cover-mock .cm-logo{ display:flex; align-items:center; gap:6px; font-size:12px; font-weight:700; font-family:'Poppins',sans-serif; }
.fu-page .cover-mock .cm-logo .imob{ color: var(--blue-2); }
.fu-page .cover-mock .cm-kicker{ font-size:9.5px; letter-spacing:2px; text-transform:uppercase; color: var(--blue-2); font-weight:700; margin-top:26px; }
.fu-page .cover-mock .cm-title{ font-family:'Poppins',sans-serif; font-weight:800; font-size:22px; line-height:1.18; margin-top:10px; }
.fu-page .cover-mock .cm-title .a{ color: var(--blue-2); }
.fu-page .cover-mock .cm-sub{ font-size:10.5px; color: var(--on-navy-muted); margin-top:10px; line-height:1.5; }
.fu-page .cover-mock .cm-foot{ font-size:9px; color: var(--on-navy-muted); border-top:1px solid rgba(255,255,255,0.15); padding-top:10px; display:flex; justify-content:space-between; }
.fu-page .cover-badge{
  position:absolute; top:-14px; right:-14px; background: var(--hot); color:#fff; font-weight:800; font-size:11.5px;
  padding: 10px 14px; border-radius:50%; width:64px; height:64px; display:flex; align-items:center; justify-content:center;
  text-align:center; line-height:1.15; transform: rotate(8deg); box-shadow: 0 8px 16px -6px rgba(221,84,51,0.5);
}

.fu-page .pain-grid{ display:grid; grid-template-columns: 1fr 1fr; gap: 10px 28px; margin-top: 30px; }
.fu-page .pain-item{ display:flex; gap:12px; align-items:flex-start; padding: 12px 0; border-bottom: 1px solid var(--line); }
.fu-page .pain-item .x{ color: var(--hot); font-weight:800; font-size:15px; line-height:1.5; }
.fu-page .pain-item .t{ font-size: 14.5px; color: var(--ink); }
.fu-page .pain-item .t b{ color: var(--navy); }
.fu-page[data-theme="dark"] .pain-item .t b{ color: var(--ink); }

.fu-page .callout-band{ background: var(--navy); color: var(--on-navy); }
.fu-page .callout-band .wrap{ padding: 56px 24px; text-align:center; }
.fu-page .callout-band .small{ font-size:11.5px; letter-spacing:2px; text-transform:uppercase; color: var(--on-navy-muted); font-weight:700; }
.fu-page .callout-band .big{ font-family:'Poppins',sans-serif; font-weight:800; font-size: 27px; margin-top:14px; line-height:1.4; max-width: 640px; margin-left:auto; margin-right:auto; }
.fu-page .callout-band .big .accent{ color: var(--blue-2); }

.fu-page .cluster{ margin-top: 34px; }
.fu-page .cluster-h{ font-size:12px; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; color: var(--blue); margin-bottom: 12px; }
.fu-page .mod-list{ border-top: 1px solid var(--line); }
.fu-page .mod{ display:flex; align-items:center; gap:16px; padding: 14px 4px; border-bottom: 1px solid var(--line); }
.fu-page .mod .num{ font-family:'Poppins',sans-serif; font-weight:800; font-size:14px; color: var(--blue-2); width: 28px; flex-shrink:0; }
.fu-page .mod .t{ font-size:14.5px; font-weight:600; color: var(--ink); }

.fu-page .preview-grid{ display:grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 36px; align-items:start; }
.fu-page .pv-card{ background: var(--surface); border:1px solid var(--line); border-radius: 14px; padding: 22px 22px 24px; box-shadow: var(--shadow); }
.fu-page .pv-card .pv-h{ font-size:11px; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; color:var(--muted); margin-bottom:14px; }
.fu-page .mini-stage{ display:flex; align-items:center; gap:10px; background: var(--surface-2); border-left:4px solid var(--blue); border-radius:7px; padding:9px 12px; margin-bottom:6px; }
.fu-page .mini-stage .mn{ width:20px; height:20px; border-radius:50%; background:var(--navy); color:#fff; font-size:10px; font-weight:800; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.fu-page[data-theme="dark"] .mini-stage .mn{ color: var(--on-navy); }
.fu-page .mini-stage .mt{ font-size:12px; font-weight:700; color: var(--navy); letter-spacing:0.2px; }
.fu-page[data-theme="dark"] .mini-stage .mt{ color: var(--ink); }
.fu-page .temps-mini{ display:flex; gap:8px; }
.fu-page .temp-mini{ flex:1; border-radius:9px; padding:12px 10px; color:#fff; }
.fu-page .temp-mini .e{ font-size:15px; }
.fu-page .temp-mini .n{ font-size:11px; font-weight:800; margin-top:4px; }
.fu-page .temp-mini.hot{ background: linear-gradient(160deg, #E0552F, #B5401F); }
.fu-page .temp-mini.warm{ background: linear-gradient(160deg, #E0A13B, #B77E1E); }
.fu-page .temp-mini.cold{ background: linear-gradient(160deg, #2F6BB0, #1E4C82); }
.fu-page .pv-foot{ font-size:11.5px; color: var(--muted); margin-top:14px; line-height:1.5; }

.fu-page .audience-grid{ display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:30px; }
.fu-page .aud-box{ border-radius:14px; padding:24px; }
.fu-page .aud-box.yes{ background: var(--good-soft); border:1px solid color-mix(in srgb, var(--good) 35%, transparent); }
.fu-page .aud-box.no{ background: var(--hot-soft); border:1px solid color-mix(in srgb, var(--hot) 30%, transparent); }
.fu-page .aud-box .lbl{ font-size:11.5px; font-weight:800; letter-spacing:1.2px; text-transform:uppercase; margin-bottom:12px; }
.fu-page .aud-box.yes .lbl{ color: var(--good); }
.fu-page .aud-box.no .lbl{ color: var(--hot); }
.fu-page .aud-box ul{ margin:0; padding:0; list-style:none; }
.fu-page .aud-box li{ font-size:13.8px; padding: 6px 0; color: var(--ink); }

.fu-page .outcome-grid{ display:grid; grid-template-columns: repeat(3,1fr); gap:18px; margin-top:30px; }
.fu-page .outcome{ background: var(--surface); border:1px solid var(--line); border-radius:12px; padding:20px; }
.fu-page .outcome .ic{ font-size:18px; }
.fu-page .outcome .t{ font-family:'Poppins',sans-serif; font-weight:700; font-size:14px; color: var(--navy); margin:10px 0 6px; }
.fu-page[data-theme="dark"] .outcome .t{ color: var(--ink); }
.fu-page .outcome .d{ font-size:12.6px; color: var(--muted); line-height:1.55; }

.fu-page .offer-section{ background: var(--surface-2); }
.fu-page .offer-card{
  background: var(--surface); border:1px solid var(--line); border-radius:18px; padding: 42px;
  box-shadow: var(--shadow); text-align:center; max-width: 560px; margin: 34px auto 0;
}
.fu-page .offer-card .of-eyebrow{ font-size:11.5px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:var(--blue); }
.fu-page .offer-card .of-title{ font-family:'Poppins',sans-serif; font-weight:800; font-size:20px; margin-top:10px; color:var(--navy); }
.fu-page[data-theme="dark"] .offer-card .of-title{ color: var(--ink); }
.fu-page .price-row{ display:flex; align-items:baseline; justify-content:center; gap:10px; margin: 22px 0 6px; }
.fu-page .price-row .old{ font-size:15px; color: var(--muted); text-decoration: line-through; }
.fu-page .price-row .now{ font-family:'Poppins',sans-serif; font-size:44px; font-weight:800; color: var(--navy); }
.fu-page[data-theme="dark"] .price-row .now{ color: var(--ink); }
.fu-page .price-row .cur{ font-size:18px; font-weight:700; color: var(--navy); align-self:flex-start; margin-top:6px; }
.fu-page[data-theme="dark"] .price-row .cur{ color: var(--ink); }
.fu-page .offer-note{ font-size:12px; color: var(--muted); }
.fu-page .offer-card .btn-primary{ width:100%; margin-top:22px; padding:16px 20px; font-size:16px; }
.fu-page .offer-list{ list-style:none; margin: 24px 0 0; padding: 20px 0 0; border-top:1px solid var(--line); text-align:left; display:flex; flex-direction:column; gap:9px; }
.fu-page .offer-list li{ font-size:13.3px; color: var(--ink); display:flex; gap:9px; align-items:flex-start; }
.fu-page .offer-list li .c{ color: var(--good); font-weight:800; }
.fu-page .guarantee{ margin-top:22px; display:flex; align-items:center; justify-content:center; gap:8px; font-size:12px; color: var(--muted); }

.fu-page .faq{ max-width: 720px; margin: 30px auto 0; }
.fu-page .faq details{ border-bottom: 1px solid var(--line); padding: 16px 2px; }
.fu-page .faq summary{ cursor:pointer; font-weight:600; font-size:14.5px; color: var(--navy); list-style:none; display:flex; justify-content:space-between; gap:12px; align-items:center; }
.fu-page[data-theme="dark"] .faq summary{ color: var(--ink); }
.fu-page .faq summary::-webkit-details-marker{ display:none; }
.fu-page .faq summary::after{ content:"+"; font-size:20px; font-weight:400; color: var(--blue); flex-shrink:0; }
.fu-page .faq details[open] summary::after{ content:"–"; }
.fu-page .faq .faq-a{ font-size:13.6px; color: var(--muted); line-height:1.6; margin-top:10px; padding-right: 28px; }

.fu-page .final-band{ background: var(--navy); color: var(--on-navy); text-align:center; }
.fu-page .final-band h2{ color: var(--on-navy); font-size:28px; }
.fu-page .final-band .sub2{ color: var(--on-navy-muted); font-size:14.5px; margin-top:12px; max-width:44ch; margin-left:auto; margin-right:auto; }
.fu-page .final-band .btn-primary{ margin-top:26px; }

.fu-page footer{ padding: 34px 0; }
.fu-page footer .wrap{ display:flex; justify-content:space-between; align-items:center; font-size:12px; color: var(--muted); flex-wrap:wrap; gap:10px; }

@media (max-width: 860px){
  .fu-page .hero-grid{ grid-template-columns:1fr; }
  .fu-page .cover-mock{ max-width:280px; margin:0 auto; }
  .fu-page .pain-grid, .fu-page .preview-grid, .fu-page .audience-grid{ grid-template-columns:1fr; }
  .fu-page .outcome-grid{ grid-template-columns:1fr 1fr; }
  .fu-page .hero h1{ font-size:31px; }
  .fu-page section{ padding: 52px 0; }
  .fu-page .offer-card{ padding: 30px 22px; }
}
@media (max-width: 480px){
  .fu-page .outcome-grid{ grid-template-columns:1fr; }
}
`;

function LogoMark({ small = false }: { small?: boolean }) {
  const size = small ? 18 : 22;
  return (
    <div className="logo">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <path d="M6 17L16 8L26 17" stroke="#5B9AD6" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 15V25H23V15" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 7L26 7L26 14" stroke="#5B9AD6" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="word" style={small ? { fontSize: '13px' } : undefined}>
        <span className="imob">Imob</span>Flux
      </div>
    </div>
  );
}

export default function GuiaFollowupPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="fu-page">
        {/* ============ NAV ============ */}
        <div className="nav">
          <div className="nav-inner">
            <LogoMark />
            <a href="#oferta" className="nav-cta">Quero o e-book</a>
          </div>
        </div>

        {/* ============ HERO ============ */}
        <header className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow">E-book para corretores de imóveis</span>
              <h1>
                Pare de perder vendas que já estavam <span className="accent">na sua carteira.</span>
              </h1>
              <p className="sub">
                Um método simples para organizar seu CRM, saber exatamente quem chamar a cada dia e transformar
                clientes esquecidos em propostas fechadas — sem depender da memória ou de rolar o WhatsApp.
              </p>
              <div className="hero-ctas">
                <a href="#oferta" className="btn-primary">Quero organizar meu follow-up</a>
                <span className="price-note">PDF · acesso imediato</span>
              </div>
              <div className="hero-stats">
                <div className="stat"><div className="n">18</div><div className="l">Páginas</div></div>
                <div className="stat"><div className="n">14</div><div className="l">Capítulos</div></div>
                <div className="stat"><div className="n">7</div><div className="l">Etapas de pipeline</div></div>
              </div>
            </div>
            <div>
              <div className="cover-mock">
                <div className="cover-badge">18 pgs</div>
                <div className="cm-logo"><span className="imob">Imob</span>Flux</div>
                <div>
                  <div className="cm-kicker">Follow-up que vende</div>
                  <div className="cm-title">
                    Como organizar seu <span className="a">CRM</span> e transformar oportunidades esquecidas em{' '}
                    <span className="a">vendas</span>
                  </div>
                  <div className="cm-sub">Um mini treinamento de gestão comercial para corretores de imóveis.</div>
                </div>
                <div className="cm-foot"><span>ImobFlux</span><span>siteimobflux.com</span></div>
              </div>
            </div>
          </div>
        </header>

        {/* ============ AGITATION ============ */}
        <section>
          <div className="wrap">
            <span className="eyebrow">Isso acontece com você?</span>
            <h2 style={{ fontSize: '27px', fontWeight: 800, marginTop: '14px', maxWidth: '34ch' }}>
              Você atende bastante gente. Mas vende menos do que deveria.
            </h2>
            <div className="pain-grid">
              <div className="pain-item"><span className="x">✕</span><span className="t">Leads espalhados pelo <b>WhatsApp</b>, entre conversas e status que somem no meio do dia.</span></div>
              <div className="pain-item"><span className="x">✕</span><span className="t">Clientes <b>sem histórico</b> — você lembra que falou, mas não lembra o que foi combinado.</span></div>
              <div className="pain-item"><span className="x">✕</span><span className="t"><b>Falta de retorno</b> em propostas que ninguém cobrou.</span></div>
              <div className="pain-item"><span className="x">✕</span><span className="t"><b>Visitas sem acompanhamento</b> — o cliente conheceu o imóvel e depois, silêncio.</span></div>
              <div className="pain-item"><span className="x">✕</span><span className="t">Carteira grande, mas <b>sem critério</b> para saber por onde começar o dia.</span></div>
              <div className="pain-item"><span className="x">✕</span><span className="t">Não saber quais clientes estão <b>realmente quentes</b> — todo mundo recebe a mesma atenção.</span></div>
            </div>
          </div>
        </section>

        {/* ============ REFRAME ============ */}
        <div className="callout-band">
          <div className="wrap">
            <div className="small">A virada de chave deste e-book</div>
            <div className="big">
              O problema muitas vezes não é falta de clientes.<br />
              <span className="accent">É falta de processo.</span>
            </div>
          </div>
        </div>

        {/* ============ CURRICULUM ============ */}
        <section id="conteudo">
          <div className="wrap">
            <span className="eyebrow">O que tem dentro</span>
            <h2 style={{ fontSize: '27px', fontWeight: 800, marginTop: '14px' }}>
              14 capítulos, do diagnóstico até a rotina pronta para aplicar
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '14.5px', marginTop: '10px', maxWidth: '60ch' }}>
              O e-book segue a ordem exata em que você vai aplicar o método — sem enrolação, sem teoria solta.
            </p>

            <div className="cluster">
              <div className="cluster-h">Fundamentos</div>
              <div className="mod-list">
                <div className="mod"><div className="num">01</div><div className="t">Por que corretores perdem vendas mesmo tendo leads</div></div>
                <div className="mod"><div className="num">02</div><div className="t">O que é CRM imobiliário</div></div>
                <div className="mod"><div className="num">03</div><div className="t">Como organizar sua carteira de clientes</div></div>
              </div>
            </div>

            <div className="cluster">
              <div className="cluster-h">O motor do processo</div>
              <div className="mod-list">
                <div className="mod"><div className="num">04</div><div className="t">O pipeline do corretor</div></div>
                <div className="mod"><div className="num">05</div><div className="t">A regra de ouro do CRM</div></div>
                <div className="mod"><div className="num">06</div><div className="t">Temperatura dos leads</div></div>
              </div>
            </div>

            <div className="cluster">
              <div className="cluster-h">Colocando em prática</div>
              <div className="mod-list">
                <div className="mod"><div className="num">07</div><div className="t">Como usar o CRM para fazer follow-up</div></div>
                <div className="mod"><div className="num">08</div><div className="t">Como cadastrar um novo lead</div></div>
                <div className="mod"><div className="num">09</div><div className="t">Como não deixar o CRM virar uma bagunça</div></div>
              </div>
            </div>

            <div className="cluster">
              <div className="cluster-h">Gestão e resultados</div>
              <div className="mod-list">
                <div className="mod"><div className="num">10</div><div className="t">CRM + WhatsApp</div></div>
                <div className="mod"><div className="num">11</div><div className="t">Como recuperar oportunidades esquecidas</div></div>
                <div className="mod"><div className="num">12</div><div className="t">O follow-up de cada etapa</div></div>
                <div className="mod"><div className="num">13</div><div className="t">Métricas do CRM</div></div>
                <div className="mod"><div className="num">14</div><div className="t">E finalmente: o ImobFlux</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ PREVIEW VISUALS ============ */}
        <section style={{ background: 'var(--surface-2)' }}>
          <div className="wrap">
            <span className="eyebrow">Uma prévia do material</span>
            <h2 style={{ fontSize: '27px', fontWeight: 800, marginTop: '14px' }}>
              Como o e-book coloca o método na sua rotina
            </h2>
            <div className="preview-grid">
              <div className="pv-card">
                <div className="pv-h">O pipeline do corretor</div>
                <div className="mini-stage"><div className="mn">1</div><div className="mt">NOVO LEAD</div></div>
                <div className="mini-stage"><div className="mn">2</div><div className="mt">EM ATENDIMENTO</div></div>
                <div className="mini-stage"><div className="mn">3</div><div className="mt">NEGOCIAÇÃO</div></div>
                <div className="mini-stage"><div className="mn">4</div><div className="mt">AGENDAMENTO</div></div>
                <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--muted)', padding: '2px 0' }}>⋮ mais 2 etapas no e-book</div>
                <div className="mini-stage"><div className="mn">✓</div><div className="mt">SUCESSO</div></div>
                <div className="pv-foot">Todo cliente da sua carteira está em um destes momentos — nunca fora deles.</div>
              </div>
              <div className="pv-card">
                <div className="pv-h">Temperatura dos leads</div>
                <div className="temps-mini">
                  <div className="temp-mini hot"><div className="e">🔥</div><div className="n">QUENTE</div></div>
                  <div className="temp-mini warm"><div className="e">🟡</div><div className="n">MORNO</div></div>
                  <div className="temp-mini cold"><div className="e">🔵</div><div className="n">FRIO</div></div>
                </div>
                <div className="pv-foot">Nem todo cliente merece a mesma energia no mesmo dia. A temperatura te diz onde focar primeiro.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ AUDIENCE ============ */}
        <section>
          <div className="wrap">
            <span className="eyebrow">Para quem é</span>
            <h2 style={{ fontSize: '27px', fontWeight: 800, marginTop: '14px' }}>Esse material é pra você?</h2>
            <div className="audience-grid">
              <div className="aud-box yes">
                <div className="lbl">✅ É pra você se</div>
                <ul>
                  <li>Você atende leads todos os dias e sente que alguns somem no meio do caminho.</li>
                  <li>Sua carteira já passou do ponto de caber na sua memória.</li>
                  <li>Você quer um processo simples, sem depender de sistemas complicados.</li>
                  <li>Você quer saber, em segundos, quem precisa da sua atenção hoje.</li>
                </ul>
              </div>
              <div className="aud-box no">
                <div className="lbl">✕ Não é pra você se</div>
                <ul>
                  <li>Você já tem um processo de CRM estruturado e funcionando bem.</li>
                  <li>Você procura teoria de vendas em geral, não um método aplicado ao dia a dia do corretor.</li>
                  <li>Você não atende clientes diretamente hoje.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============ OUTCOMES ============ */}
        <section style={{ background: 'var(--surface-2)' }}>
          <div className="wrap">
            <span className="eyebrow">Depois de ler</span>
            <h2 style={{ fontSize: '27px', fontWeight: 800, marginTop: '14px' }}>O que você sai sabendo fazer</h2>
            <div className="outcome-grid">
              <div className="outcome"><div className="ic">🧭</div><div className="t">Montar a ficha certa de cada cliente</div><div className="d">Dados, perfil de compra e informações comerciais — sem faltar o que importa.</div></div>
              <div className="outcome"><div className="ic">🔄</div><div className="t">Colocar cada lead na etapa certa</div><div className="d">Usar o pipeline de 7 etapas para saber exatamente onde cada negociação está.</div></div>
              <div className="outcome"><div className="ic">🔥</div><div className="t">Priorizar quem está perto de comprar</div><div className="d">Classificar temperatura e parar de tratar todo lead do mesmo jeito.</div></div>
              <div className="outcome"><div className="ic">📅</div><div className="t">Nunca mais esquecer um follow-up</div><div className="d">Aplicar a regra de ouro: nenhum cliente sem próxima ação definida.</div></div>
              <div className="outcome"><div className="ic">🗂️</div><div className="t">Recuperar oportunidades paradas</div><div className="d">Usar 4 filtros simples para achar vendas escondidas na própria carteira.</div></div>
              <div className="outcome"><div className="ic">📈</div><div className="t">Acompanhar sua própria conversão</div><div className="d">Saber quantos leads, propostas e vendas você realmente tem — sem depender de achismo.</div></div>
            </div>
          </div>
        </section>

        {/* ============ OFFER ============ */}
        <section id="oferta" className="offer-section">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <span className="eyebrow">Oferta</span>
            <h2 style={{ fontSize: '27px', fontWeight: 800, marginTop: '14px' }}>Comece a organizar seu follow-up hoje</h2>
            <div className="offer-card">
              <div className="of-eyebrow">Follow-up que Vende</div>
              <div className="of-title">E-book completo em PDF</div>
              <div className="price-row">
                <span className="cur">R$</span><span className="now">9</span><span className="cur">,90</span>
              </div>
              <div className="offer-note">Pagamento único · acesso imediato após a confirmação</div>
              <TrackedAnchor
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                metaEvent="InitiateCheckout"
                metaParams={{ content_name: 'ebook_followup', value: 9.9, currency: 'BRL' }}
              >
                Quero o e-book agora
              </TrackedAnchor>
              <ul className="offer-list">
                <li><span className="c">✓</span> 18 páginas, 14 capítulos, direto ao ponto</li>
                <li><span className="c">✓</span> Pipeline, temperatura de leads e regra de ouro do CRM</li>
                <li><span className="c">✓</span> Passo a passo para cadastrar e dar follow-up em cada lead</li>
                <li><span className="c">✓</span> Leitura de menos de 1 hora, aplicável no mesmo dia</li>
              </ul>
            </div>
            <div className="guarantee">🔒 Compra segura · PDF liberado na hora</div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section>
          <div className="wrap">
            <span className="eyebrow">Perguntas frequentes</span>
            <h2 style={{ fontSize: '27px', fontWeight: 800, marginTop: '14px' }}>Ainda com dúvidas?</h2>
            <div className="faq">
              <details>
                <summary>Em que formato eu recebo o e-book?</summary>
                <div className="faq-a">Em PDF, liberado para download logo após a confirmação da compra. Você pode ler no celular, tablet ou computador.</div>
              </details>
              <details>
                <summary>Preciso ter conta no ImobFlux para usar o material?</summary>
                <div className="faq-a">Não. O método funciona com qualquer ferramenta — planilha, caderno ou CRM. O ImobFlux é apresentado no último capítulo como uma forma de aplicar tudo automaticamente, mas não é obrigatório.</div>
              </details>
              <details>
                <summary>Sou corretor autônomo, sem equipe. O material serve pra mim?</summary>
                <div className="faq-a">Sim — o método foi pensado justamente para quem atende a carteira sozinho e precisa de um processo simples para não perder nenhum cliente.</div>
              </details>
              <details>
                <summary>Quanto tempo leva para aplicar?</summary>
                <div className="faq-a">A leitura leva menos de uma hora. A estrutura de ficha de cliente e o pipeline podem ser colocados em prática no mesmo dia.</div>
              </details>
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="final-band">
          <div className="wrap">
            <h2>Nenhum cliente sem próxima ação.</h2>
            <p className="sub2">Organize sua carteira, priorize quem está perto de comprar e pare de deixar vendas esquecidas no WhatsApp.</p>
            <a href="#oferta" className="btn-primary">Quero organizar meu follow-up</a>
          </div>
        </section>

        <footer>
          <div className="wrap">
            <LogoMark small />
            <div>siteimobflux.com · Organize. Acompanhe. Venda mais.</div>
          </div>
        </footer>
      </div>
    </>
  );
}
