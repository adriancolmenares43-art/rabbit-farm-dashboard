/* Chart + i18n code carried over from the static build. Returns a cleanup function. */
export default function initDashboard(D){
const ac=new AbortController(), signal=ac.signal;
const K = D.kpi;
const NS = "http://www.w3.org/2000/svg";
const C = {s1:"#3987e5",s2:"#d95926",s3:"#199e70",s4:"#c98500",s5:"#d55181",s6:"#0ca30c",crit:"#e66767",grid:"rgba(160,190,255,.09)",surface:"#101b33"};
const BREED_COLOR = {}; ["s1","s2","s3","s4","s5","s6"].forEach((k,i)=>{ if(D.breeds[i]) BREED_COLOR[D.breeds[i].BreedName]=C[k]; });

/* ---------------- i18n ---------------- */
const I18N = {
 en:{ locale:"en-US", months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"], mil:"M", k:"k",
  title:"Rabbit Farm Operations Dashboard · Adrián Rodríguez",
  back:"← Project overview", snapshot:"Snapshot", currency:"Currency", sample:"Sample dataset",
  eyebrow:"Rabbit farm · operations", h1:(n)=>`${n} rabbits.<br><span>One clear view.</span>`,
  lede:(a)=>`Herd, sales, mortality and breeding for a rabbit farm, all from one dataset. As of <strong>${a.date}</strong> the farm holds <strong>${a.active}</strong> active rabbits, has sold <strong>${a.sold}</strong> for <strong>${a.rev}</strong>, and has <strong>${a.preg}</strong> does due to kindle within a month.`,
  kTotal:"Total rabbits recorded", kTotalF:(v)=>`<b>${v}</b> bred on-farm`,
  kActive:"Active stock", kActiveF:(v)=>`<b>${v}</b> of all rabbits`,
  kRev:"Total revenue", kRevF:(s,a)=>`<b>${s}</b> sales · avg <b>${a}</b>`,
  kProfit:"Gross profit", kProfitF:(v)=>`<b>${v}</b> margin on sales`,
  kMort:"Mortality rate", kMortF:(v)=>`<b>${v}</b> deaths recorded`,
  kPreg:"Pregnant does", kPregF:(v)=>`<b>${v}</b> due in 7 days`,
  trendTitle:"Sales & gross profit over time", monthly:"Monthly", yearly:"Yearly",
  revenue:"Revenue", profit:"Gross profit", sold:"Rabbits sold",
  trendSubM:(n,a,b,p)=>`${n} months, ${a} – ${b} (${p} partial)`, trendSubY:(y,d)=>`Calendar years; ${y} runs to ${d}`, yearTo:(d)=>` (to ${d})`,
  best:"Best month", soFar:(a,b)=>`${a} so far vs all of ${b}`, vs:"vs", avgM:"Avg per month",
  chTitle:"Revenue by sales channel", chSub:(n,a,b)=>`All ${n} sales, ${a} – ${b}`,
  chTop:"Top channel share", chLow:"Smallest channel", chN:"Channels used", share:"Share",
  chNote:(top,lo,hi)=>`No single channel dominates: ${top} leads, but every channel brings in between ${lo} and ${hi} of revenue.`,
  breedTitle:"Active stock by breed & sex", breedSub:(a,b)=>`${a} active rabbits across ${b} breeds`, female:"Female", male:"Male", total:"Total",
  ageTitle:"Active stock by age group", ageSub:"Split by sex",
  ageNote:(p,f,m)=>`Females are <b class="num" style="color:var(--ink-2)">${p}</b> of active stock: <span class="num">${f}</span> does to <span class="num">${m}</span> bucks.`,
  lifeTitle:"Herd lifecycle", lifeSub:"Every rabbit ever recorded", rabbits:"Rabbits", herdShare:"Share of herd",
  lifeNote:(t,b,s)=>`${t} rabbits recorded; ${b} bred on the farm, the rest bought from suppliers for ${s}.`,
  mortTitle:"Mortality by cause", deaths:"Deaths", deathShare:"Share of deaths",
  mortSub:(n,c,p,y)=>`${n} deaths. Top cause: ${c} (${p}). ${y} were young rabbits.`,
  myTitle:"Deaths per year", mySub:(a,ay,b,by,d)=>`Rising every year, from ${a} in ${ay} to ${b} in ${by} (to ${d}).`,
  bpTitle:"Profit by breed", bpSub:"Gross profit on sales, highest first", avgPrice:"Avg sale price",
  birthsTitle:"Upcoming births", win7:"Next 7 days", win14:"Next 14 days", winAll:"All",
  birthsSub:(s,t,a,b,d)=>`Showing ${s} of ${t} pregnant does · due ${a} – ${b} · ${d} marked due soon`,
  thDate:"Expected kindling", thIn:"In", thDoe:"Doe", thBreed:"Breed", thHutch:"Hutch", thMated:"Mated", thStatus:"Status",
  birthsNote:"Kindling dates are mating date + 31 days, counted from the snapshot date.",
  fHow:"How the numbers are calculated", fMort:"Mortality rate = deaths ÷ every rabbit recorded (1,000).",
  fProfit:"Gross profit = sale price − the rabbit's cost basis. Feed, labour and housing are not in the dataset.",
  fPartial:"September 2026 is a partial month (sales up to 3 Sep).", fBuilt:"Built by", fSvg:"Custom SVG charts · no chart library", fSample:"Sample dataset, used for a portfolio project",
  status:{"Active":"Active","Sold":"Sold","Deceased":"Deceased","Confirmed pregnant":"Confirmed pregnant","Due soon":"Due soon"},
  age:{"Young":"Young","Adult":"Adult"},
  cause:{"Unknown/Natural causes":"Unknown / natural","Predator attack":"Predator attack","Coccidiosis":"Coccidiosis","Chilling/Cold stress":"Chilling / cold stress","Enteritis (digestive upset)":"Enteritis (digestive)","Weaning stress":"Weaning stress","Kindling complications":"Kindling complications","Heat stress":"Heat stress","Injury/Accident":"Injury / accident","Respiratory infection (snuffles)":"Respiratory (snuffles)"},
  channel:{"Social media/WhatsApp":"Social / WhatsApp","Wholesale/Bulk order":"Wholesale / bulk","Farm gate":"Farm gate","Restaurant supply contract":"Restaurant contracts","Local market":"Local market"},
  breed:{"Local Breed (Mixed)":"Local Breed (Mixed)"} },
 es:{ locale:"es-CL", months:["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"], mil:" mill.", k:" mil",
  title:"Dashboard de operaciones · Granja de conejos · Adrián Rodríguez",
  back:"← Volver al proyecto", snapshot:"Corte", currency:"Moneda", sample:"Datos de muestra",
  eyebrow:"Granja de conejos · operaciones", h1:(n)=>`${n} conejos.<br><span>Una vista clara.</span>`,
  lede:(a)=>`Plantel, ventas, mortalidad y reproducción de una granja de conejos, todo desde un solo dataset. Al <strong>${a.date}</strong> la granja tiene <strong>${a.active}</strong> conejos activos, ha vendido <strong>${a.sold}</strong> por <strong>${a.rev}</strong> y tiene <strong>${a.preg}</strong> hembras que parirán dentro de un mes.`,
  kTotal:"Conejos registrados", kTotalF:(v)=>`<b>${v}</b> nacidos en la granja`,
  kActive:"Stock activo", kActiveF:(v)=>`<b>${v}</b> del total`,
  kRev:"Ingresos totales", kRevF:(s,a)=>`<b>${s}</b> ventas · prom. <b>${a}</b>`,
  kProfit:"Utilidad bruta", kProfitF:(v)=>`<b>${v}</b> de margen`,
  kMort:"Tasa de mortalidad", kMortF:(v)=>`<b>${v}</b> muertes registradas`,
  kPreg:"Hembras preñadas", kPregF:(v)=>`<b>${v}</b> paren en 7 días`,
  trendTitle:"Ventas y utilidad bruta en el tiempo", monthly:"Mensual", yearly:"Anual",
  revenue:"Ingresos", profit:"Utilidad bruta", sold:"Conejos vendidos",
  trendSubM:(n,a,b,p)=>`${n} meses, ${a} – ${b} (${p} parcial)`, trendSubY:(y,d)=>`Años calendario; ${y} llega hasta el ${d}`, yearTo:(d)=>` (al ${d})`,
  best:"Mejor mes", soFar:(a,b)=>`${a} a la fecha vs todo ${b}`, vs:"vs", avgM:"Promedio mensual",
  chTitle:"Ingresos por canal de venta", chSub:(n,a,b)=>`Las ${n} ventas, ${a} – ${b}`,
  chTop:"Canal principal", chLow:"Canal más chico", chN:"Canales", share:"Participación",
  chNote:(top,lo,hi)=>`Ningún canal domina: ${top} lidera, pero cada canal aporta entre ${lo} y ${hi} de los ingresos.`,
  breedTitle:"Stock activo por raza y sexo", breedSub:(a,b)=>`${a} conejos activos en ${b} razas`, female:"Hembras", male:"Machos", total:"Total",
  ageTitle:"Stock activo por edad", ageSub:"Por sexo",
  ageNote:(p,f,m)=>`Las hembras son el <b class="num" style="color:var(--ink-2)">${p}</b> del stock activo: <span class="num">${f}</span> hembras y <span class="num">${m}</span> machos.`,
  lifeTitle:"Ciclo del plantel", lifeSub:"Todos los conejos registrados", rabbits:"Conejos", herdShare:"Del plantel",
  lifeNote:(t,b,s)=>`${t} conejos registrados; el ${b} nació en la granja y el resto se compró a proveedores por ${s}.`,
  mortTitle:"Mortalidad por causa", deaths:"Muertes", deathShare:"Del total de muertes",
  mortSub:(n,c,p,y)=>`${n} muertes. Causa principal: ${c} (${p}). El ${y} eran conejos jóvenes.`,
  myTitle:"Muertes por año", mySub:(a,ay,b,by,d)=>`Suben todos los años: de ${a} en ${ay} a ${b} en ${by} (al ${d}).`,
  bpTitle:"Utilidad por raza", bpSub:"Utilidad bruta de ventas, de mayor a menor", avgPrice:"Precio promedio",
  birthsTitle:"Próximos partos", win7:"Próximos 7 días", win14:"Próximos 14 días", winAll:"Todos",
  birthsSub:(s,t,a,b,d)=>`Mostrando ${s} de ${t} hembras preñadas · partos del ${a} al ${b} · ${d} marcadas como próximas`,
  thDate:"Parto estimado", thIn:"En", thDoe:"Hembra", thBreed:"Raza", thHutch:"Jaula", thMated:"Monta", thStatus:"Estado",
  birthsNote:"Fecha de parto = fecha de monta + 31 días, contada desde la fecha de corte.",
  fHow:"Cómo se calculan las cifras", fMort:"Tasa de mortalidad = muertes ÷ todos los conejos registrados (1.000).",
  fProfit:"Utilidad bruta = precio de venta − costo del conejo. Alimento, mano de obra e instalaciones no están en los datos.",
  fPartial:"Septiembre 2026 es un mes parcial (ventas hasta el 3 de sep).", fBuilt:"Hecho por", fSvg:"Gráficos SVG propios · sin librería de gráficos", fSample:"Datos de muestra, usados para un proyecto de portafolio",
  status:{"Active":"Activos","Sold":"Vendidos","Deceased":"Muertos","Confirmed pregnant":"Preñez confirmada","Due soon":"Parto próximo"},
  age:{"Young":"Jóvenes","Adult":"Adultos"},
  cause:{"Unknown/Natural causes":"Desconocida / natural","Predator attack":"Ataque de depredador","Coccidiosis":"Coccidiosis","Chilling/Cold stress":"Frío / estrés térmico","Enteritis (digestive upset)":"Enteritis (digestiva)","Weaning stress":"Estrés de destete","Kindling complications":"Complicaciones del parto","Heat stress":"Golpe de calor","Injury/Accident":"Lesión / accidente","Respiratory infection (snuffles)":"Respiratoria (coriza)"},
  channel:{"Social media/WhatsApp":"Redes / WhatsApp","Wholesale/Bulk order":"Mayorista","Farm gate":"Venta en granja","Restaurant supply contract":"Contratos restaurantes","Local market":"Mercado local"},
  breed:{"Local Breed (Mixed)":"Raza local (mestiza)"} },
 pt:{ locale:"pt-BR", months:["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"], mil:" mi", k:" mil",
  title:"Dashboard de operações · Fazenda de coelhos · Adrián Rodríguez",
  back:"← Voltar ao projeto", snapshot:"Data-base", currency:"Moeda", sample:"Dados de exemplo",
  eyebrow:"Fazenda de coelhos · operações", h1:(n)=>`${n} coelhos.<br><span>Uma visão clara.</span>`,
  lede:(a)=>`Plantel, vendas, mortalidade e reprodução de uma fazenda de coelhos, tudo a partir de um só dataset. Em <strong>${a.date}</strong> a fazenda tem <strong>${a.active}</strong> coelhos ativos, vendeu <strong>${a.sold}</strong> por <strong>${a.rev}</strong> e tem <strong>${a.preg}</strong> fêmeas com parto previsto em até um mês.`,
  kTotal:"Coelhos registrados", kTotalF:(v)=>`<b>${v}</b> nascidos na fazenda`,
  kActive:"Estoque ativo", kActiveF:(v)=>`<b>${v}</b> do total`,
  kRev:"Receita total", kRevF:(s,a)=>`<b>${s}</b> vendas · média <b>${a}</b>`,
  kProfit:"Lucro bruto", kProfitF:(v)=>`<b>${v}</b> de margem`,
  kMort:"Taxa de mortalidade", kMortF:(v)=>`<b>${v}</b> mortes registradas`,
  kPreg:"Fêmeas prenhes", kPregF:(v)=>`<b>${v}</b> parem em 7 dias`,
  trendTitle:"Vendas e lucro bruto ao longo do tempo", monthly:"Mensal", yearly:"Anual",
  revenue:"Receita", profit:"Lucro bruto", sold:"Coelhos vendidos",
  trendSubM:(n,a,b,p)=>`${n} meses, ${a} – ${b} (${p} parcial)`, trendSubY:(y,d)=>`Anos civis; ${y} vai até ${d}`, yearTo:(d)=>` (até ${d})`,
  best:"Melhor mês", soFar:(a,b)=>`${a} até agora vs todo ${b}`, vs:"vs", avgM:"Média mensal",
  chTitle:"Receita por canal de venda", chSub:(n,a,b)=>`Todas as ${n} vendas, ${a} – ${b}`,
  chTop:"Maior canal", chLow:"Menor canal", chN:"Canais", share:"Participação",
  chNote:(top,lo,hi)=>`Nenhum canal domina: ${top} lidera, mas cada canal traz entre ${lo} e ${hi} da receita.`,
  breedTitle:"Estoque ativo por raça e sexo", breedSub:(a,b)=>`${a} coelhos ativos em ${b} raças`, female:"Fêmeas", male:"Machos", total:"Total",
  ageTitle:"Estoque ativo por idade", ageSub:"Por sexo",
  ageNote:(p,f,m)=>`As fêmeas são <b class="num" style="color:var(--ink-2)">${p}</b> do estoque ativo: <span class="num">${f}</span> fêmeas e <span class="num">${m}</span> machos.`,
  lifeTitle:"Ciclo do plantel", lifeSub:"Todos os coelhos já registrados", rabbits:"Coelhos", herdShare:"Do plantel",
  lifeNote:(t,b,s)=>`${t} coelhos registrados; ${b} nasceram na fazenda e o restante foi comprado de fornecedores por ${s}.`,
  mortTitle:"Mortalidade por causa", deaths:"Mortes", deathShare:"Do total de mortes",
  mortSub:(n,c,p,y)=>`${n} mortes. Principal causa: ${c} (${p}). ${y} eram coelhos jovens.`,
  myTitle:"Mortes por ano", mySub:(a,ay,b,by,d)=>`Sobem todo ano: de ${a} em ${ay} para ${b} em ${by} (até ${d}).`,
  bpTitle:"Lucro por raça", bpSub:"Lucro bruto das vendas, do maior para o menor", avgPrice:"Preço médio",
  birthsTitle:"Próximos partos", win7:"Próximos 7 dias", win14:"Próximos 14 dias", winAll:"Todos",
  birthsSub:(s,t,a,b,d)=>`Mostrando ${s} de ${t} fêmeas prenhes · partos de ${a} a ${b} · ${d} marcadas como próximas`,
  thDate:"Parto previsto", thIn:"Em", thDoe:"Fêmea", thBreed:"Raça", thHutch:"Gaiola", thMated:"Cobertura", thStatus:"Status",
  birthsNote:"Data do parto = data da cobertura + 31 dias, contada a partir da data-base.",
  fHow:"Como os números são calculados", fMort:"Taxa de mortalidade = mortes ÷ todos os coelhos registrados (1.000).",
  fProfit:"Lucro bruto = preço de venda − custo do coelho. Ração, mão de obra e instalações não estão nos dados.",
  fPartial:"Setembro de 2026 é um mês parcial (vendas até 3 de set).", fBuilt:"Feito por", fSvg:"Gráficos SVG próprios · sem biblioteca de gráficos", fSample:"Dados de exemplo, usados em um projeto de portfólio",
  status:{"Active":"Ativos","Sold":"Vendidos","Deceased":"Mortos","Confirmed pregnant":"Prenhez confirmada","Due soon":"Parto próximo"},
  age:{"Young":"Jovens","Adult":"Adultos"},
  cause:{"Unknown/Natural causes":"Desconhecida / natural","Predator attack":"Ataque de predador","Coccidiosis":"Coccidiose","Chilling/Cold stress":"Frio / estresse térmico","Enteritis (digestive upset)":"Enterite (digestiva)","Weaning stress":"Estresse do desmame","Kindling complications":"Complicações no parto","Heat stress":"Estresse por calor","Injury/Accident":"Lesão / acidente","Respiratory infection (snuffles)":"Respiratória (coriza)"},
  channel:{"Social media/WhatsApp":"Redes / WhatsApp","Wholesale/Bulk order":"Atacado","Farm gate":"Venda na fazenda","Restaurant supply contract":"Contratos com restaurantes","Local market":"Feira local"},
  breed:{"Local Breed (Mixed)":"Raça local (mestiça)"} }
};
let L, LANG;
const map = (dict, v) => (dict && dict[v]) || v;

/* formatting (depends on current language) */
let nf, pf;
const n = v => nf.format(Math.round(v));
const pct = (a,b) => pf.format(a/b);
const ngn = v => "₦" + n(v);
const ngnShort = v => { const a=Math.abs(v); const d=new Intl.NumberFormat(L.locale,{maximumFractionDigits:a>=1e7?1:2});
  if(a>=1e6) return "₦"+d.format(v/1e6)+L.mil; if(a>=1e3) return "₦"+n(v/1e3)+L.k; return "₦"+n(v); };
const kpiMoney = v => { const t=ngnShort(v); const m=t.match(/^(₦[\d.,]+)\s*(.*)$/); return m&&m[2] ? `${m[1]}<small>${m[2]}</small>` : t; };
const fmtDate = s => { const [y,m,d]=s.split("-"); return +d+" "+L.months[+m-1]+" "+y; };
const fmtDM = s => fmtDate(s).replace(/ \d{4}$/,"");
const fmtYm = s => { const [y,m]=s.split("-"); return L.months[+m-1]+" "+y; };

function el(tag, attrs, parent){ const e=document.createElementNS(NS,tag); for(const k in attrs) e.setAttribute(k,attrs[k]); if(parent) parent.appendChild(e); return e; }
function txt(parent, x, y, s, cls, extra){ const t=el("text",Object.assign({x,y,class:cls},extra||{}),parent); t.textContent=s; return t; }
function niceMax(v){ const p=Math.pow(10,Math.floor(Math.log10(v))); const f=v/p; return (f<=1?1:f<=2?2:f<=2.5?2.5:f<=5?5:10)*p; }
function svgFor(host,h){ host.innerHTML=""; const w=Math.max(260,host.clientWidth); const s=el("svg",{viewBox:`0 0 ${w} ${h}`,height:h,role:"img"},host); return {s,w,h}; }
function hbarPath(x,y,w,h,r){ r=Math.min(r,w,h/2); if(w<=0) return ""; return `M${x},${y}H${x+w-r}Q${x+w},${y} ${x+w},${y+r}V${y+h-r}Q${x+w},${y+h} ${x+w-r},${y+h}H${x}Z`; }
function vbarPath(x,y,w,h,r){ r=Math.min(r,h,w/2); if(h<=0) return ""; return `M${x},${y+h}V${y+r}Q${x},${y} ${x+r},${y}H${x+w-r}Q${x+w},${y} ${x+w},${y+r}V${y+h}Z`; }

/* tooltip */
const tip=document.getElementById("tip");
function showTip(e, title, rows){
  tip.innerHTML=`<div class="t">${title}</div>`+rows.map(r=>`<div class="r"><span>${r.c?`<i style="background:${r.c}"></i>`:""}${r.k}</span><b>${r.v}</b></div>`).join("");
  tip.classList.add("show"); moveTip(e);
}
function moveTip(e){ const pad=14, r=tip.getBoundingClientRect(); let x=e.clientX+pad, y=e.clientY+pad; if(x+r.width>innerWidth-8) x=e.clientX-r.width-pad; if(y+r.height>innerHeight-8) y=e.clientY-r.height-pad; tip.style.left=x+"px"; tip.style.top=y+"px"; }
function hideTip(){ tip.classList.remove("show"); }
function hoverRow(hitR, markNode, host, title, rows){
  markNode.classList.add("mark");
  hitR.addEventListener("mouseenter",e=>{ host.classList.add("dim"); markNode.classList.add("on"); showTip(e,title,rows); });
  hitR.addEventListener("mousemove",moveTip);
  hitR.addEventListener("mouseleave",()=>{ host.classList.remove("dim"); markNode.classList.remove("on"); hideTip(); });
}

/* ---------- static text + header + KPIs ---------- */
function renderText(){
  document.documentElement.lang = LANG;
  document.title = L.title;
  document.querySelectorAll("[data-i18n]").forEach(e=>{ const v=L[e.dataset.i18n]; if(typeof v==="string") e.textContent=v; });
  document.querySelectorAll("[data-lang]").forEach(b=>b.setAttribute("aria-pressed", b.dataset.lang===LANG));
  document.getElementById("asof").textContent=fmtDate(D.asof);
  document.getElementById("h1").innerHTML=L.h1(n(K.total_rabbits));
  document.getElementById("lede").innerHTML=L.lede({date:fmtDate(D.asof),active:n(K.active),sold:n(K.sold),rev:ngn(K.revenue),preg:n(K.pregnant)});
  const bred=pf.format(K.bred_share/100);
  const kpis=[
    {label:L.kTotal,value:n(K.total_rabbits),foot:L.kTotalF(bred),c:"var(--s1)",primary:true},
    {label:L.kActive,value:n(K.active),foot:L.kActiveF(pct(K.active,K.total_rabbits)),c:"var(--s3)"},
    {label:L.kRev,value:kpiMoney(K.revenue),foot:L.kRevF(n(K.sold),ngn(K.avg_sale)),c:"var(--s4)",title:ngn(K.revenue)},
    {label:L.kProfit,value:kpiMoney(K.profit),foot:L.kProfitF(pf.format(K.margin/100)),c:"var(--s6)",title:ngn(K.profit)},
    {label:L.kMort,value:pf.format(K.mortality_rate/100),foot:L.kMortF(n(K.deceased)),c:"var(--crit)"},
    {label:L.kPreg,value:n(K.pregnant),foot:L.kPregF(n(D.births_next7)),c:"var(--s5)"}
  ];
  const kWrap=document.getElementById("kpis"); kWrap.innerHTML="";
  kpis.forEach((k,i)=>{ const a=document.createElement("article"); a.className="card kpi"+(k.primary?" primary":""); a.style.setProperty("--k",k.c);
    a.innerHTML=`<div class="label">${k.label}</div><div class="value"${k.title?` title="${k.title}"`:""}>${k.value}</div><div class="foot">${k.foot}</div>`; kWrap.appendChild(a); });
  document.getElementById("trend-legend").innerHTML=[[L.revenue,C.s1],[L.profit,C.s3]].map(([nm,c])=>`<span><i style="background:${c}"></i>${nm}</span>`).join("");
  document.getElementById("ch-sub").textContent=L.chSub(n(K.sold),fmtYm(D.sales_span[0].slice(0,7)),fmtYm(D.sales_span[1].slice(0,7)));
  document.getElementById("breed-sub").textContent=L.breedSub(n(K.active),D.breeds.length);
  document.getElementById("age-note").innerHTML=L.ageNote(pct(D.active_sex.Female,K.active),n(D.active_sex.Female),n(D.active_sex.Male));
  document.getElementById("status-note").textContent=L.lifeNote(n(K.total_rabbits),bred,ngn(K.purchase_spend));
  const top=D.mortality_cause[0];
  document.getElementById("mort-sub").textContent=L.mortSub(n(K.deceased),map(L.cause,top.cause).toLowerCase(),pct(top.count,K.deceased),pct(D.mortality_age.Young||0,K.deceased));
  const yrs=Object.entries(D.mortality_year);
  document.getElementById("mortyear-sub").textContent=L.mySub(yrs[0][1],yrs[0][0],yrs[yrs.length-1][1],yrs[yrs.length-1][0],fmtDate(D.asof));
  const ch=D.channels, chTop=ch[0], chLow=ch[ch.length-1];
  document.getElementById("channel-stats").innerHTML=`<div>${L.chTop}<b>${pct(chTop.revenue,K.revenue)}</b></div><div>${L.chLow}<b>${pct(chLow.revenue,K.revenue)}</b></div><div>${L.chN}<b>${ch.length}</b></div>`;
  document.getElementById("channel-note").textContent=L.chNote(map(L.channel,chTop.channel),pct(chLow.revenue,K.revenue),pct(chTop.revenue,K.revenue));
}

/* ---------- trend line ---------- */
let grain="month";
function trendRows(){ const yNow=+D.asof.slice(0,4); return grain==="month" ? D.monthly.map(m=>({x:m.month,lab:fmtYm(m.month),...m})) : D.yearly.map(y=>({x:String(y.year),lab:String(y.year)+(y.year===yNow?L.yearTo(fmtDM(D.sales_span[1])):""),...y})); }
function drawTrend(){
  const SERIES=[{key:"revenue",name:L.revenue,c:C.s1},{key:"profit",name:L.profit,c:C.s3}];
  const host=document.getElementById("trend"); const rows=trendRows();
  const {s,w,h}=svgFor(host,300); const m={l:LANG==="en"?52:72,r:LANG==="en"?96:118,t:16,b:30};
  const iw=w-m.l-m.r, ih=h-m.t-m.b;
  const max=niceMax(Math.max(...rows.map(r=>r.revenue))*1.05);
  const X=i=> m.l + (rows.length===1?iw/2: i*iw/(rows.length-1));
  const Y=v=> m.t + ih - v/max*ih;
  for(let i=0;i<=4;i++){ const v=max*i/4, y=Y(v); el("line",{x1:m.l,x2:m.l+iw,y1:y,y2:y,stroke:i===0?"rgba(160,190,255,.22)":C.grid},s); txt(s,m.l-10,y+4,ngnShort(v),"ax",{"text-anchor":"end"}); }
  rows.forEach((r,i)=>{ if(grain==="year" || r.x.endsWith("-01")) txt(s,X(i),h-8,grain==="year"?r.x:r.x.slice(0,4),"ax",{"text-anchor":"middle"}); });
  const defs=el("defs",{},s); const g=el("linearGradient",{id:"ga",x1:0,x2:0,y1:0,y2:1},defs);
  el("stop",{offset:"0%","stop-color":C.s1,"stop-opacity":.28},g); el("stop",{offset:"100%","stop-color":C.s1,"stop-opacity":0},g);
  const pathFor=k=>rows.map((r,i)=>(i?"L":"M")+X(i).toFixed(1)+","+Y(r[k]).toFixed(1)).join("");
  el("path",{d:pathFor("revenue")+`L${X(rows.length-1)},${Y(0)}L${X(0)},${Y(0)}Z`,fill:"url(#ga)"},s);
  SERIES.forEach(se=>{ el("path",{d:pathFor(se.key),fill:"none",stroke:se.c,"stroke-width":2,"stroke-linejoin":"round","stroke-linecap":"round"},s);
    const last=rows[rows.length-1]; el("circle",{cx:X(rows.length-1),cy:Y(last[se.key]),r:4,fill:se.c,stroke:C.surface,"stroke-width":2},s); });
  const last=rows[rows.length-1]; let ys=SERIES.map(se=>Y(last[se.key])); if(Math.abs(ys[0]-ys[1])<28){ const mid=(ys[0]+ys[1])/2; ys=[mid-14,mid+14]; }
  SERIES.forEach((se,i)=>{ txt(s,X(rows.length-1)+10,ys[i]-1,se.name,"endlbl",{fill:se.c}); txt(s,X(rows.length-1)+10,ys[i]+13,ngnShort(last[se.key]),"val"); });
  if(grain==="year"){ rows.forEach((r,i)=>{ el("circle",{cx:X(i),cy:Y(r.revenue),r:4,fill:C.s1,stroke:C.surface,"stroke-width":2},s); el("circle",{cx:X(i),cy:Y(r.profit),r:4,fill:C.s3,stroke:C.surface,"stroke-width":2},s); }); }
  const cross=el("line",{y1:m.t,y2:m.t+ih,stroke:"rgba(238,242,251,.35)","stroke-dasharray":"3 3",opacity:0},s);
  const dots=SERIES.map(se=>el("circle",{r:5,fill:se.c,stroke:C.surface,"stroke-width":2,opacity:0},s));
  const hit=el("rect",{x:m.l-8,y:m.t,width:iw+16,height:ih,fill:"transparent"},s);
  hit.addEventListener("mousemove",e=>{ const b=s.getBoundingClientRect(); const px=(e.clientX-b.left)*(w/b.width); const i=Math.max(0,Math.min(rows.length-1,Math.round((px-m.l)/(iw/Math.max(1,rows.length-1))))); const r=rows[i];
    cross.setAttribute("x1",X(i)); cross.setAttribute("x2",X(i)); cross.setAttribute("opacity",1);
    SERIES.forEach((se,k)=>{ dots[k].setAttribute("cx",X(i)); dots[k].setAttribute("cy",Y(r[se.key])); dots[k].setAttribute("opacity",1); });
    showTip(e,r.lab,[{k:L.revenue,v:ngn(r.revenue),c:C.s1},{k:L.profit,v:ngn(r.profit),c:C.s3},{k:L.sold,v:n(r.units)}]); });
  hit.addEventListener("mouseleave",()=>{ cross.setAttribute("opacity",0); dots.forEach(d=>d.setAttribute("opacity",0)); hideTip(); });
  const best=[...D.monthly].sort((a,b)=>b.revenue-a.revenue)[0];
  const y1=D.yearly[D.yearly.length-2], y2=D.yearly[D.yearly.length-1];
  const lastM=D.monthly[D.monthly.length-1].month;
  document.getElementById("trend-sub").textContent= grain==="month" ? L.trendSubM(D.monthly.length,fmtYm(D.monthly[0].month),fmtYm(lastM),fmtYm(lastM)) : L.trendSubY(y2.year,fmtDate(D.sales_span[1]));
  document.getElementById("trend-stats").innerHTML=`<div>${L.best}<b>${fmtYm(best.month)} · ${ngnShort(best.revenue)}</b></div><div>${L.soFar(y2.year,y1.year)}<b>${ngnShort(y2.revenue)} ${L.vs} ${ngnShort(y1.revenue)}</b></div><div>${L.avgM}<b>${ngnShort(K.revenue/D.monthly.length)}</b></div>`;
}
document.querySelectorAll("[data-grain]").forEach(b=>b.addEventListener("click",()=>{ grain=b.dataset.grain; document.querySelectorAll("[data-grain]").forEach(x=>x.setAttribute("aria-pressed",x===b)); drawTrend(); },{signal}));

/* ---------- bars ---------- */
function drawHbars(hostId, items, opt){
  const host=document.getElementById(hostId); const rowH=opt.rowH||34, gap=opt.gap||10;
  const {s,w}=svgFor(host, items.length*rowH+4);
  const labW=Math.min(opt.labW||190, w*.46), valW=opt.valW||(LANG==="en"?86:100); const iw=w-labW-valW;
  const max=Math.max(...items.map(d=>d.value));
  items.forEach((d,i)=>{ const y=i*rowH; const bw=Math.max(2,d.value/max*iw); const bh=rowH-gap;
    txt(s,0,y+bh/2+4,d.label,"lbl");
    const p=el("path",{d:hbarPath(labW,y,bw,bh,4),fill:d.c||opt.c},s);
    txt(s,labW+bw+8,y+bh/2+4,opt.fmt(d.value),"val");
    const hitR=el("rect",{x:0,y:y-gap/2,width:w,height:rowH,fill:"transparent"},s);
    hoverRow(hitR,p,host,d.label,d.tip);
  });
}
function drawStacked(hostId, rows, parts, opt){
  const host=document.getElementById(hostId); const rowH=opt.rowH||34, gap=10;
  const {s,w}=svgFor(host, rows.length*rowH+4);
  const labW=opt.labW, valW=46, iw=w-labW-valW;
  const max=Math.max(...rows.map(r=>parts.reduce((a,p)=>a+r.v[p.k],0)));
  rows.forEach((r,i)=>{ const y=i*rowH, bh=rowH-gap; let x=labW; const tot=parts.reduce((a,p)=>a+r.v[p.k],0);
    txt(s,0,y+bh/2+4,r.label,"lbl");
    const g=el("g",{},s);
    parts.forEach((p,k)=>{ const bw=r.v[p.k]/max*iw; const isLast=k===parts.length-1; const wseg=Math.max(0,bw-(isLast?0:2));
      el(isLast?"path":"rect", isLast?{d:hbarPath(x,y,wseg,bh,4),fill:p.c}:{x,y,width:wseg,height:bh,fill:p.c},g); x+=bw; });
    txt(s,x+8,y+bh/2+4,n(tot),"val");
    const hitR=el("rect",{x:0,y:y-gap/2,width:w,height:rowH,fill:"transparent"},s);
    hoverRow(hitR,g,host,r.label,parts.map(p=>({k:p.name,v:`${n(r.v[p.k])} (${pct(r.v[p.k],tot)})`,c:p.c})).concat([{k:L.total,v:n(tot)}]));
  });
}
function drawCols(hostId, items, opt){
  const host=document.getElementById(hostId); const {s,w,h}=svgFor(host,opt.h||170); const m={t:20,b:24};
  const ih=h-m.t-m.b, max=Math.max(...items.map(d=>d.value)); const slot=w/items.length, bw=Math.min(54,slot*.56);
  el("line",{x1:0,x2:w,y1:m.t+ih,y2:m.t+ih,stroke:"rgba(160,190,255,.22)"},s);
  items.forEach((d,i)=>{ const bh=d.value/max*ih, x=i*slot+(slot-bw)/2, y=m.t+ih-bh;
    const p=el("path",{d:vbarPath(x,y,bw,bh,4),fill:opt.c},s);
    txt(s,x+bw/2,y-6,n(d.value),"val",{"text-anchor":"middle"}); txt(s,x+bw/2,h-6,d.label,"ax",{"text-anchor":"middle"});
    const hitR=el("rect",{x:i*slot,y:m.t,width:slot,height:ih,fill:"transparent"},s);
    hoverRow(hitR,p,host,d.label,d.tip); });
}

function drawAll(){
  drawTrend();
  drawHbars("channels", D.channels.map(c=>({label:map(L.channel,c.channel),value:c.revenue,tip:[{k:L.revenue,v:ngn(c.revenue),c:C.s1},{k:L.sold,v:n(c.units)},{k:L.share,v:pct(c.revenue,K.revenue)}]})), {c:C.s1,fmt:ngnShort,labW:LANG==="pt"?175:150,rowH:40});
  const FM=[{k:"Female",name:L.female,c:C.s1},{k:"Male",name:L.male,c:C.s2}];
  const breedRows=D.breeds.map(b=>({label:map(L.breed,b.BreedName),v:D.active_breed_sex[b.BreedName]})).sort((a,b)=>(b.v.Female+b.v.Male)-(a.v.Female+a.v.Male));
  drawStacked("breeds", breedRows, FM, {labW:160});
  drawStacked("age", Object.keys(D.active_age_sex).map(k=>({label:map(L.age,k),v:D.active_age_sex[k]})), FM, {labW:72,rowH:46});
  drawHbars("status", [["Active",C.s3],["Sold",C.s1],["Deceased",C.crit]].map(([k,c])=>({label:map(L.status,k),value:D.status[k],c,tip:[{k:L.rabbits,v:n(D.status[k]),c},{k:L.herdShare,v:pct(D.status[k],K.total_rabbits)}]})), {fmt:v=>n(v),labW:86,rowH:46,valW:48});
  drawHbars("mortality", D.mortality_cause.map(c=>({label:map(L.cause,c.cause),value:c.count,tip:[{k:L.deaths,v:n(c.count),c:C.crit},{k:L.deathShare,v:pct(c.count,K.deceased)}]})), {c:C.crit,fmt:v=>n(v),labW:210,rowH:34,valW:40});
  drawCols("mortyear", Object.entries(D.mortality_year).map(([y,v])=>({label:y,value:v,tip:[{k:L.deaths,v:n(v),c:C.crit}]})), {c:C.crit,h:160});
  drawHbars("breedprofit", D.breed_sales.map(b=>({label:map(L.breed,b.breed),value:b.profit,c:BREED_COLOR[b.breed],tip:[{k:L.profit,v:ngn(b.profit),c:BREED_COLOR[b.breed]},{k:L.revenue,v:ngn(b.revenue)},{k:L.sold,v:n(b.units)},{k:L.avgPrice,v:ngn(b.avg_price)}]})), {fmt:ngnShort,labW:160,rowH:30,gap:8});
}

/* ---------- births table ---------- */
let win="all";
function drawBirths(){
  const rows=D.births.filter(b=>win==="all"||b.DaysUntilKindling<=+win);
  document.getElementById("births").innerHTML=rows.map(b=>`<tr><td class="date">${fmtDate(b.ExpectedKindlingDate)}</td><td><span class="days${b.DaysUntilKindling<=7?" soon":""}">${b.DaysUntilKindling} d</span></td><td class="mono">${b.RabbitID}</td><td><span class="breed-dot" style="background:${BREED_COLOR[b.BreedName]}"></span>${map(L.breed,b.BreedName)}</td><td class="mono">${b.HutchNumber}</td><td class="mono">${fmtDate(b.MatingDate)}</td><td><span class="status${b.PregnancyStatus==="Due soon"?" due":""}">${map(L.status,b.PregnancyStatus)}</span></td></tr>`).join("");
  document.getElementById("births-sub").textContent=L.birthsSub(rows.length,D.births.length,fmtDate(D.births[0].ExpectedKindlingDate),fmtDate(D.births[D.births.length-1].ExpectedKindlingDate),D.births_status["Due soon"]||0);
}
document.querySelectorAll("[data-win]").forEach(b=>b.addEventListener("click",()=>{ win=b.dataset.win; document.querySelectorAll("[data-win]").forEach(x=>x.setAttribute("aria-pressed",x===b)); drawBirths(); },{signal}));

/* ---------- language ---------- */
function pickLang(){
  let saved=null; try{ saved=localStorage.getItem("lang"); }catch(e){}
  if(I18N[saved]) return saved;
  const nav=(navigator.language||"en").slice(0,2).toLowerCase();
  return I18N[nav]?nav:"en";
}
function setLang(code){
  LANG=code; L=I18N[code];
  nf=new Intl.NumberFormat(L.locale); pf=new Intl.NumberFormat(L.locale,{style:"percent",minimumFractionDigits:1,maximumFractionDigits:1});
  try{ localStorage.setItem("lang",code); }catch(e){}
  hideTip(); renderText(); drawAll(); drawBirths();
}
document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang),{signal}));
setLang(pickLang());
let rt; addEventListener("resize",()=>{ clearTimeout(rt); rt=setTimeout(drawAll,150); },{signal});
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>{ if(!signal.aborted) drawAll(); });
return ()=>{ ac.abort(); clearTimeout(rt); hideTip(); };
}
