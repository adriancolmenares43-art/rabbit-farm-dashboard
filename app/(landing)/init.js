/* Landing i18n, sparkline and count-up code carried over from the static build. Returns a cleanup function. */
export default function initLanding(D){
const ac=new AbortController(), signal=ac.signal;
const K=D.kpi;
const yrs=Object.entries(D.mortality_year), Y0=yrs[0], Y1=yrs[yrs.length-1];
const I18N={
 en:{locale:"en-US",months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],mil:"M",
  title:"Adrián Rodríguez · Rabbit Farm Dashboard",
  desc:"A farm operations dashboard built from 1,000 records across six datasets. Portfolio project by Adrián Rodríguez, QA and software development student at Duoc UC.",
  navCta:'<span class="long">Open the live </span>Dashboard',
  heroEyebrow:"Portfolio project · data &amp; QA",
  heroH1:'You\'ve read a hundred CVs that say "SQL". This one <em>shows&nbsp;it.</em>',
  heroSub:(r)=>`Skip the guesswork. Open a working dashboard built from <span class="num">${r}</span> farm records and judge my skills by what you can click.`,
  ctaDash:"See the live dashboard", ctaLinked:"Message me on LinkedIn",
  proof:(f,r)=>`<span><b>${f}</b> datasets</span><span class="dot"></span><span><b>${r}</b> rows checked</span><span class="dot"></span><span><b>0</b> blank charts</span>`,
  panelSales:"Sales &amp; gross profit", realData:"real data", revenue:"Revenue", profit:"Gross profit",
  panelRev:"Total revenue", panelRevF:(s,m)=>`${s} sales · ${m} gross margin`, panelBirths:"Kindling this week", does:(n)=>`${n} does`,
  pbEyebrow:"The part of hiring nobody enjoys", pbH:"You can't tell who can do the work from a skills list.",
  p1h:"Every junior CV looks the same.", p1p:'Python, SQL, Agile, "detail-oriented". You\'ve seen the list so often it no longer tells you anything.',
  p2h:"The proof only shows up later.", p2p:"You find out whether someone can clean messy data or catch a wrong number three interviews in, after the time is already spent.",
  p3h:"Pretty reports hide wrong numbers.", p3p:"A chart that looks good and adds up wrong is worse than no chart. You need someone who checks before they ship.",
  bnEyebrow:"What you get from this project", bnH:"Answers before the first interview.",
  bnP:"Six raw CSV files became one dashboard a farm manager could actually use. Here is what that tells you about how I'd work on your team.",
  b1k:"01 · EVIDENCE", b1h:"You judge real work, not keywords.", b1p:"Open the dashboard, hover any chart, filter the births table. It takes two minutes, with no setup and no take-home test.", b1f:"8 charts · 6 KPIs · 80-row table",
  b2k:"02 · ACCURACY", b2h:"You can trust the numbers you see.", b2p:"Every ID was cross-checked across files: sales against sold rabbits, deaths against deceased, pregnancies against flags. The math behind each figure is written on the page.",
  b3k:"03 · QA MINDSET", b3h:"You get someone who tests before shipping.", b3p:"Each chart was rendered and checked in a headless browser before publishing, to confirm no KPI or chart ever loads empty. That's QA applied to my own work.", b3f:"0 blank charts · 0 chart libraries",
  b4k:"04 · BUSINESS SENSE", b4h:"You get insight, not just pictures.",
  b4p:(d)=>`The dashboard points out what a manager should act on: deaths rising every year, predators and coccidiosis as the top known causes, <span class="num">${d}</span> births due within a week.`,
  b4f:`deaths/yr: ${Y0[1]} (${Y0[0]}) → ${Y1[1]} (${Y1[0]})`,
  stEyebrow:"By the numbers", stH:"Small project. Real volume.", stP:"The same skills I'm finishing at Duoc UC, applied end to end: loading, cleaning, checking, explaining.",
  sl1:"rabbit records", sl2:"sales analysed", sl3:"revenue traced", sl4:"deaths by cause", sl5:"births scheduled", sl6:"months of sales",
  cred3:"<b>Ingeniería en Informática</b> · Duoc UC, expected Dec 2026",
  fqH:"Questions you're probably asking.",
  q1:"Is this a real farm?", a1:"No. It's a sample dataset of a rabbit farm, priced in Nigerian naira. I chose it because it's messy in realistic ways: six linked files, money, dates and life events that all have to agree.",
  q2:"Did you build this yourself?", a2:"I directed it and checked it, using AI-assisted development (Claude) the way most teams now work. I chose the questions, reviewed the code, and verified every figure against the source CSVs. Ask me to walk you through any chart and I will.",
  q3:"Can you work with our tools, not just this one?", a3:"The method stays the same: load, clean, test, present. I've used Python, SQL and PL/SQL on Oracle, and BigQuery with Looker Studio on Google Cloud in coursework. I pick up new tools fast; in my previous job I kept adapting to new CNC machines and software.",
  q4:"Why does a QA candidate build dashboards?", a4:"Because testing is checking whether numbers and behaviour match what they should be. This project is that skill made visible: every total reconciled, every chart verified before release.",
  q5:"Are you available?", a5:"Yes. I'm in Santiago, finishing Ingeniería en Informática at Duoc UC, and looking for my práctica profesional (internship) in QA or software development. I speak Spanish, English and Portuguese.",
  fnEyebrow:"Two minutes, no signup", fnH:"See the work. Then let's talk.",
  fnP:"Click through the dashboard, try to find a number that doesn't add up, and send me what you find. That conversation will tell you more than my CV.",
  fnCta1:"Open the dashboard", fnCta2:"Contact me on LinkedIn", fnEmail:"Or email", ftSample:"Sample dataset"},
 es:{locale:"es-CL",months:["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],mil:" mill.",
  title:"Adrián Rodríguez · Dashboard granja de conejos",
  desc:"Dashboard de operaciones de una granja construido con 1.000 registros de seis datasets. Proyecto de portafolio de Adrián Rodríguez, estudiante de Ingeniería en Informática en Duoc UC.",
  navCta:'<span class="long">Abrir el </span>Dashboard',
  heroEyebrow:"Proyecto de portafolio · datos y QA",
  heroH1:"Has leído cien CV que dicen «SQL». Este lo <em>demuestra.</em>",
  heroSub:(r)=>`Olvídate de adivinar. Abre un dashboard real, construido con <span class="num">${r}</span> registros de una granja, y evalúa mis habilidades por lo que puedes explorar.`,
  ctaDash:"Ver el dashboard en vivo", ctaLinked:"Escríbeme por LinkedIn",
  proof:(f,r)=>`<span><b>${f}</b> datasets</span><span class="dot"></span><span><b>${r}</b> filas revisadas</span><span class="dot"></span><span><b>0</b> gráficos vacíos</span>`,
  panelSales:"Ventas y utilidad bruta", realData:"datos reales", revenue:"Ingresos", profit:"Utilidad bruta",
  panelRev:"Ingresos totales", panelRevF:(s,m)=>`${s} ventas · ${m} de margen bruto`, panelBirths:"Partos esta semana", does:(n)=>`${n} hembras`,
  pbEyebrow:"La parte de reclutar que nadie disfruta", pbH:"Una lista de habilidades no te dice quién sabe hacer el trabajo.",
  p1h:"Todos los CV junior se ven iguales.", p1p:"Python, SQL, Agile, «orientado al detalle». Has visto esa lista tantas veces que ya no te dice nada.",
  p2h:"La prueba llega tarde.", p2p:"Recién en la tercera entrevista descubres si alguien sabe limpiar datos o detectar un número malo, cuando el tiempo ya se gastó.",
  p3h:"Un reporte bonito puede esconder números malos.", p3p:"Un gráfico que se ve bien y suma mal es peor que no tener gráfico. Necesitas a alguien que revise antes de publicar.",
  bnEyebrow:"Lo que te muestra este proyecto", bnH:"Respuestas antes de la primera entrevista.",
  bnP:"Seis archivos CSV en bruto se convirtieron en un dashboard que un administrador de granja podría usar de verdad. Esto te dice cómo trabajaría en tu equipo.",
  b1k:"01 · EVIDENCIA", b1h:"Evalúas trabajo real, no palabras clave.", b1p:"Abre el dashboard, pasa el mouse por cualquier gráfico, filtra la tabla de partos. Toma dos minutos, sin instalar nada y sin prueba técnica para la casa.", b1f:"8 gráficos · 6 KPIs · tabla de 80 filas",
  b2k:"02 · PRECISIÓN", b2h:"Puedes confiar en las cifras que ves.", b2p:"Cada ID se cruzó entre archivos: ventas contra conejos vendidos, muertes contra fallecidos, preñeces contra su marca. El cálculo de cada cifra está explicado en la página.",
  b3k:"03 · MENTALIDAD QA", b3h:"Tienes a alguien que prueba antes de publicar.", b3p:"Cada gráfico se renderizó y revisó en un navegador headless antes de publicar, para confirmar que ningún KPI ni gráfico carga vacío. Es QA aplicado a mi propio trabajo.", b3f:"0 gráficos vacíos · 0 librerías de gráficos",
  b4k:"04 · VISIÓN DE NEGOCIO", b4h:"Recibes conclusiones, no solo dibujos.",
  b4p:(d)=>`El dashboard muestra lo que un administrador debería atender: muertes que suben cada año, depredadores y coccidiosis como principales causas conocidas y <span class="num">${d}</span> partos en la próxima semana.`,
  b4f:`muertes/año: ${Y0[1]} (${Y0[0]}) → ${Y1[1]} (${Y1[0]})`,
  stEyebrow:"En números", stH:"Proyecto chico. Volumen real.", stP:"Las mismas habilidades que estoy terminando en Duoc UC, aplicadas de punta a punta: cargar, limpiar, verificar y explicar.",
  sl1:"registros de conejos", sl2:"ventas analizadas", sl3:"ingresos trazados", sl4:"muertes por causa", sl5:"partos programados", sl6:"meses de ventas",
  cred3:"<b>Ingeniería en Informática</b> · Duoc UC, egreso dic. 2026",
  fqH:"Preguntas que probablemente te estás haciendo.",
  q1:"¿Es una granja real?", a1:"No. Es un dataset de muestra de una granja de conejos, con precios en nairas nigerianas. Lo elegí porque es desordenado de forma realista: seis archivos enlazados con dinero, fechas y eventos que tienen que cuadrar entre sí.",
  q2:"¿Lo hiciste tú?", a2:"Lo dirigí y lo verifiqué, usando desarrollo asistido por IA (Claude), como trabajan hoy la mayoría de los equipos. Elegí las preguntas, revisé el código y comprobé cada cifra contra los CSV originales. Pídeme que te explique cualquier gráfico y lo hago.",
  q3:"¿Puedes trabajar con nuestras herramientas, no solo con esta?", a3:"El método es el mismo: cargar, limpiar, probar y presentar. He usado Python, SQL y PL/SQL en Oracle, y BigQuery con Looker Studio en Google Cloud en mis ramos. Aprendo herramientas nuevas rápido; en mi trabajo anterior me adapté constantemente a nuevas máquinas CNC y software.",
  q4:"¿Por qué alguien de QA construye dashboards?", a4:"Porque probar es verificar que los números y el comportamiento sean los que deberían. Este proyecto hace visible esa habilidad: cada total cuadrado y cada gráfico verificado antes de publicarse.",
  q5:"¿Estás disponible?", a5:"Sí. Vivo en Santiago, estoy terminando Ingeniería en Informática en Duoc UC y busco mi práctica profesional en QA o desarrollo de software. Hablo español, inglés y portugués.",
  fnEyebrow:"Dos minutos, sin registro", fnH:"Mira el trabajo. Después conversemos.",
  fnP:"Recorre el dashboard, intenta encontrar un número que no cuadre y cuéntame qué encontraste. Esa conversación te dirá más que mi CV.",
  fnCta1:"Abrir el dashboard", fnCta2:"Contáctame por LinkedIn", fnEmail:"O escríbeme a", ftSample:"Datos de muestra"},
 pt:{locale:"pt-BR",months:["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"],mil:" mi",
  title:"Adrián Rodríguez · Dashboard fazenda de coelhos",
  desc:"Dashboard de operações de uma fazenda feito com 1.000 registros de seis datasets. Projeto de portfólio de Adrián Rodríguez, estudante de Ingeniería en Informática na Duoc UC.",
  navCta:'<span class="long">Abrir o </span>Dashboard',
  heroEyebrow:"Projeto de portfólio · dados e QA",
  heroH1:"Você já leu cem currículos que dizem “SQL”. Este <em>mostra.</em>",
  heroSub:(r)=>`Chega de adivinhar. Abra um dashboard de verdade, feito com <span class="num">${r}</span> registros de uma fazenda, e avalie minhas habilidades pelo que você pode explorar.`,
  ctaDash:"Ver o dashboard ao vivo", ctaLinked:"Fale comigo no LinkedIn",
  proof:(f,r)=>`<span><b>${f}</b> datasets</span><span class="dot"></span><span><b>${r}</b> linhas verificadas</span><span class="dot"></span><span><b>0</b> gráficos vazios</span>`,
  panelSales:"Vendas e lucro bruto", realData:"dados reais", revenue:"Receita", profit:"Lucro bruto",
  panelRev:"Receita total", panelRevF:(s,m)=>`${s} vendas · ${m} de margem bruta`, panelBirths:"Partos nesta semana", does:(n)=>`${n} fêmeas`,
  pbEyebrow:"A parte do recrutamento que ninguém curte", pbH:"Uma lista de habilidades não mostra quem sabe fazer o trabalho.",
  p1h:"Todo currículo júnior parece igual.", p1p:"Python, SQL, Agile, “atento aos detalhes”. Você já viu essa lista tantas vezes que ela não diz mais nada.",
  p2h:"A prova só aparece tarde.", p2p:"Você só descobre se alguém sabe limpar dados ou achar um número errado na terceira entrevista, depois que o tempo já foi gasto.",
  p3h:"Relatório bonito esconde número errado.", p3p:"Um gráfico que parece bom e soma errado é pior do que nenhum gráfico. Você precisa de alguém que confere antes de publicar.",
  bnEyebrow:"O que este projeto mostra para você", bnH:"Respostas antes da primeira entrevista.",
  bnP:"Seis arquivos CSV brutos viraram um dashboard que um gestor de fazenda poderia usar de verdade. Isso mostra como eu trabalharia no seu time.",
  b1k:"01 · EVIDÊNCIA", b1h:"Você avalia trabalho real, não palavras-chave.", b1p:"Abra o dashboard, passe o mouse em qualquer gráfico, filtre a tabela de partos. Leva dois minutos, sem instalar nada e sem teste para fazer em casa.", b1f:"8 gráficos · 6 KPIs · tabela com 80 linhas",
  b2k:"02 · PRECISÃO", b2h:"Você pode confiar nos números que vê.", b2p:"Cada ID foi cruzado entre os arquivos: vendas com coelhos vendidos, mortes com falecidos, prenhezes com a marcação. A conta por trás de cada número está escrita na página.",
  b3k:"03 · MENTALIDADE QA", b3h:"Você ganha alguém que testa antes de publicar.", b3p:"Cada gráfico foi renderizado e conferido em um navegador headless antes da publicação, para garantir que nenhum KPI ou gráfico carregue vazio. É QA aplicado ao meu próprio trabalho.", b3f:"0 gráficos vazios · 0 bibliotecas de gráficos",
  b4k:"04 · VISÃO DE NEGÓCIO", b4h:"Você recebe conclusões, não só desenhos.",
  b4p:(d)=>`O dashboard aponta o que um gestor deveria tratar: mortes subindo todo ano, predadores e coccidiose como principais causas conhecidas e <span class="num">${d}</span> partos na próxima semana.`,
  b4f:`mortes/ano: ${Y0[1]} (${Y0[0]}) → ${Y1[1]} (${Y1[0]})`,
  stEyebrow:"Em números", stH:"Projeto pequeno. Volume real.", stP:"As mesmas habilidades que estou concluindo na Duoc UC, aplicadas de ponta a ponta: carregar, limpar, verificar e explicar.",
  sl1:"registros de coelhos", sl2:"vendas analisadas", sl3:"receita rastreada", sl4:"mortes por causa", sl5:"partos agendados", sl6:"meses de vendas",
  cred3:"<b>Ingeniería en Informática</b> · Duoc UC, formatura prevista dez. 2026",
  fqH:"Perguntas que você provavelmente está fazendo.",
  q1:"É uma fazenda real?", a1:"Não. É um dataset de exemplo de uma fazenda de coelhos, com preços em naira nigeriana. Escolhi porque ele é bagunçado de um jeito realista: seis arquivos ligados, com dinheiro, datas e eventos que precisam bater entre si.",
  q2:"Você fez isso sozinho?", a2:"Eu dirigi e verifiquei, usando desenvolvimento assistido por IA (Claude), como a maioria dos times trabalha hoje. Escolhi as perguntas, revisei o código e conferi cada número com os CSVs originais. Peça para eu explicar qualquer gráfico e eu explico.",
  q3:"Você trabalha com as nossas ferramentas, não só com esta?", a3:"O método é o mesmo: carregar, limpar, testar e apresentar. Usei Python, SQL e PL/SQL no Oracle, e BigQuery com Looker Studio no Google Cloud nas disciplinas. Aprendo ferramentas novas rápido; no meu trabalho anterior me adaptei o tempo todo a novas máquinas CNC e softwares.",
  q4:"Por que um candidato de QA constrói dashboards?", a4:"Porque testar é conferir se números e comportamento são o que deveriam ser. Este projeto torna essa habilidade visível: cada total conferido e cada gráfico verificado antes de ir ao ar.",
  q5:"Você está disponível?", a5:"Sim. Moro em Santiago, estou concluindo Ingeniería en Informática na Duoc UC e procuro meu estágio profissional (práctica) em QA ou desenvolvimento de software. Falo espanhol, inglês e português.",
  fnEyebrow:"Dois minutos, sem cadastro", fnH:"Veja o trabalho. Depois a gente conversa.",
  fnP:"Navegue pelo dashboard, tente achar um número que não bate e me conte o que encontrou. Essa conversa vai dizer mais do que o meu currículo.",
  fnCta1:"Abrir o dashboard", fnCta2:"Fale comigo no LinkedIn", fnEmail:"Ou envie um e-mail para", ftSample:"Dados de exemplo"}
};
let L, nf;
const n=v=>nf.format(Math.round(v));
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const totalRows=K.total_rabbits+K.sold+Math.round(K.total_rabbits*(1-K.bred_share/100))+K.deceased+K.pregnant+D.breeds.length;
const vals={...K,months:D.monthly.length};
const fd=s=>{const[y,m,d]=s.split("-");return +d+" "+L.months[+m-1];};
const fmtCount=(el,v)=> el.dataset.fmt==="ngn" ? "₦"+(v>=1e6? new Intl.NumberFormat(L.locale,{maximumFractionDigits:2}).format(v/1e6)+L.mil : n(v)) : n(v);
const counted=new Set();

function render(){
  document.documentElement.lang=L.locale.slice(0,2);
  document.title=L.title; document.querySelector('meta[name="description"]').setAttribute("content",L.desc);
  document.querySelectorAll("[data-i18n]").forEach(e=>{ const v=L[e.dataset.i18n]; if(typeof v==="string") e.innerHTML=v; });
  document.querySelectorAll("[data-lang]").forEach(b=>b.setAttribute("aria-pressed",I18N[b.dataset.lang]===L));
  document.querySelector('[data-i18n="heroSub"]').innerHTML=L.heroSub(n(K.total_rabbits));
  document.getElementById("proof").innerHTML=L.proof(6,n(totalRows));
  document.getElementById("pk-rev").textContent="₦"+n(K.revenue);
  const pf=new Intl.NumberFormat(L.locale,{style:"percent",minimumFractionDigits:1,maximumFractionDigits:1});
  document.getElementById("pk-rev-f").textContent=L.panelRevF(n(K.sold),pf.format(K.margin/100));
  document.getElementById("b4p").innerHTML=L.b4p(D.births_next7);
  document.getElementById("b4f").textContent=L.b4f;
  const wk=D.births.filter(b=>b.DaysUntilKindling<=7);
  document.getElementById("pb-n").textContent=L.does(wk.length);
  document.getElementById("pb-rows").innerHTML=wk.slice(0,4).map(b=>`<div class="brow"><span>${b.RabbitID} · ${b.BreedName.replace(" (Mixed)","")}</span><b>${fd(b.ExpectedKindlingDate)}</b></div>`).join("");
  document.querySelectorAll("[data-count]").forEach(el=>{ if(counted.has(el)) el.textContent=fmtCount(el,vals[el.dataset.count]); });
}
function setLang(code){ L=I18N[code]; nf=new Intl.NumberFormat(L.locale); try{localStorage.setItem("lang",code);}catch(e){} render(); }
function pickLang(){ let s=null; try{s=localStorage.getItem("lang");}catch(e){} if(I18N[s]) return s; const nv=(navigator.language||"en").slice(0,2).toLowerCase(); return I18N[nv]?nv:"en"; }
document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang),{signal}));
setLang(pickLang());

/* sparkline from real monthly data */
const sv=document.getElementById("spark"), NS="http://www.w3.org/2000/svg", rows=D.monthly, W=400, H=230, pad=8;
sv.innerHTML=""; // effect may run twice in dev
const max=Math.max(...rows.map(r=>r.revenue))*1.08, X=i=>pad+i*(W-2*pad)/(rows.length-1), Y=v=>H-pad-v/max*(H-2*pad);
const mk=(t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);sv.appendChild(e);return e;};
for(let i=1;i<=3;i++) mk("line",{x1:0,x2:W,y1:H*i/4,y2:H*i/4,stroke:"rgba(160,190,255,.08)","vector-effect":"non-scaling-stroke"});
const d=k=>rows.map((r,i)=>(i?"L":"M")+X(i).toFixed(1)+","+Y(r[k]).toFixed(1)).join("");
const defs=mk("defs",{}); defs.innerHTML='<linearGradient id="sg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#3987e5" stop-opacity=".35"/><stop offset="1" stop-color="#3987e5" stop-opacity="0"/></linearGradient>';
mk("path",{d:d("revenue")+`L${X(rows.length-1)},${H}L${X(0)},${H}Z`,fill:"url(#sg)"});
const lines=[mk("path",{d:d("revenue"),fill:"none",stroke:"#3987e5","stroke-width":2,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"}),mk("path",{d:d("profit"),fill:"none",stroke:"#199e70","stroke-width":2,"vector-effect":"non-scaling-stroke","stroke-linejoin":"round"})];
if(!reduce){ lines.forEach((p,i)=>{const Lg=p.getTotalLength(); p.style.strokeDasharray=Lg; p.style.strokeDashoffset=Lg; p.style.transition=`stroke-dashoffset 1.8s cubic-bezier(.2,.7,.2,1) ${0.4+i*.2}s`; requestAnimationFrame(()=>requestAnimationFrame(()=>p.style.strokeDashoffset=0));}); }

/* count-up stats */
function countUp(el){ counted.add(el); const target=vals[el.dataset.count]; if(reduce){el.textContent=fmtCount(el,target);return;} const t0=performance.now(), dur=1400;
  (function step(t){ const p=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-p,3); el.textContent=fmtCount(el,target*e); if(p<1) requestAnimationFrame(step); else el.textContent=fmtCount(el,target); })(t0); }

/* reveal on scroll */
const io=("IntersectionObserver" in window)? new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); e.target.querySelectorAll("[data-count]").forEach(countUp); io.unobserve(e.target);} }),{threshold:.15}) : null;
document.querySelectorAll(".rv").forEach(el=>{ if(io) io.observe(el); else { el.classList.add("in"); el.querySelectorAll("[data-count]").forEach(countUp);} });
document.querySelectorAll(".hero .rv").forEach(el=>el.classList.add("in"));

const nav=document.getElementById("nav"); addEventListener("scroll",()=>nav.classList.toggle("scrolled",scrollY>10),{passive:true,signal});
document.getElementById("yr").textContent=new Date().getFullYear();
return ()=>{ ac.abort(); if(io) io.disconnect(); };
}
