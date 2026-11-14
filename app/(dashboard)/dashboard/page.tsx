import Link from "next/link";
import DashboardClient from "./Client";

const delay = (s: string) => ({ animationDelay: s });

export default function DashboardPage() {
  return (
    <>
      <div className="wrap">
        <div className="top">
          <Link className="back" href="/" data-i18n="back"></Link>
          <div className="top-right">
            <div className="chips">
              <span className="chip"><span data-i18n="snapshot"></span> <b id="asof"></b></span>
              <span className="chip"><span data-i18n="currency"></span> <b>₦ NGN</b></span>
              <span className="chip" data-i18n="sample"></span>
            </div>
            <div className="lang" role="group" aria-label="Language">
              <button type="button" data-lang="en" lang="en">EN</button>
              <button type="button" data-lang="es" lang="es">ES</button>
              <button type="button" data-lang="pt" lang="pt">PT</button>
            </div>
          </div>
        </div>

        <section className="hero reveal">
          <div>
            <div className="eyebrow" data-i18n="eyebrow"></div>
            <h1 id="h1"></h1>
          </div>
          <p className="lede" id="lede"></p>
        </section>

        <section className="grid kpis" id="kpis" aria-label="KPI"></section>

        <section className="grid row-a">
          <article className="card reveal" style={delay(".15s")}>
            <div className="card-head">
              <div><h2 data-i18n="trendTitle"></h2><p className="sub" id="trend-sub"></p></div>
              <div className="seg" role="group">
                <button type="button" data-grain="month" aria-pressed="true" data-i18n="monthly"></button>
                <button type="button" data-grain="year" aria-pressed="false" data-i18n="yearly"></button>
              </div>
            </div>
            <div className="legend" id="trend-legend"></div>
            <div className="chart" id="trend" style={{ marginTop: 8 }}></div>
            <div className="stat-line" id="trend-stats"></div>
          </article>
          <article className="card reveal" style={delay(".2s")}>
            <div className="card-head"><div><h2 data-i18n="chTitle"></h2><p className="sub" id="ch-sub"></p></div></div>
            <div className="chart" id="channels"></div>
            <div className="stat-line" id="channel-stats"></div>
            <p className="note" id="channel-note"></p>
          </article>
        </section>

        <section className="grid row-b">
          <article className="card reveal" style={delay(".25s")}>
            <div className="card-head">
              <div><h2 data-i18n="breedTitle"></h2><p className="sub" id="breed-sub"></p></div>
              <div className="legend">
                <span><i style={{ background: "var(--s1)" }}></i><span data-i18n="female"></span></span>
                <span><i style={{ background: "var(--s2)" }}></i><span data-i18n="male"></span></span>
              </div>
            </div>
            <div className="chart" id="breeds"></div>
          </article>
          <article className="card reveal" style={delay(".3s")}>
            <div className="card-head"><div><h2 data-i18n="ageTitle"></h2><p className="sub" data-i18n="ageSub"></p></div></div>
            <div className="chart" id="age"></div>
            <p className="note" id="age-note"></p>
          </article>
          <article className="card reveal" style={delay(".35s")}>
            <div className="card-head"><div><h2 data-i18n="lifeTitle"></h2><p className="sub" data-i18n="lifeSub"></p></div></div>
            <div className="chart" id="status"></div>
            <p className="note" id="status-note"></p>
          </article>
        </section>

        <section className="grid row-c">
          <article className="card reveal" style={delay(".4s")}>
            <div className="card-head"><div><h2 data-i18n="mortTitle"></h2><p className="sub" id="mort-sub"></p></div></div>
            <div className="chart" id="mortality"></div>
          </article>
          <article className="card reveal" style={delay(".45s")}>
            <div className="card-head"><div><h2 data-i18n="myTitle"></h2><p className="sub" id="mortyear-sub"></p></div></div>
            <div className="chart" id="mortyear"></div>
            <div className="card-head" style={{ margin: "22px 0 14px" }}><div><h2 data-i18n="bpTitle"></h2><p className="sub" data-i18n="bpSub"></p></div></div>
            <div className="chart" id="breedprofit"></div>
          </article>
        </section>

        <section className="card reveal" style={delay(".5s")}>
          <div className="card-head">
            <div><h2 data-i18n="birthsTitle"></h2><p className="sub" id="births-sub"></p></div>
            <div className="seg" role="group">
              <button type="button" data-win="7" aria-pressed="false" data-i18n="win7"></button>
              <button type="button" data-win="14" aria-pressed="false" data-i18n="win14"></button>
              <button type="button" data-win="all" aria-pressed="true" data-i18n="winAll"></button>
            </div>
          </div>
          <div className="tbl-wrap">
            <table>
              <thead><tr><th data-i18n="thDate"></th><th data-i18n="thIn"></th><th data-i18n="thDoe"></th><th data-i18n="thBreed"></th><th data-i18n="thHutch"></th><th data-i18n="thMated"></th><th data-i18n="thStatus"></th></tr></thead>
              <tbody id="births"></tbody>
            </table>
          </div>
          <p className="note" data-i18n="birthsNote"></p>
        </section>

        <footer>
          <ul>
            <li><b style={{ color: "var(--ink-2)" }} data-i18n="fHow"></b></li>
            <li data-i18n="fMort"></li>
            <li data-i18n="fProfit"></li>
            <li data-i18n="fPartial"></li>
          </ul>
          <ul style={{ textAlign: "right" }}>
            <li><span data-i18n="fBuilt"></span> <Link href="/">Adrián Rodríguez</Link></li>
            <li data-i18n="fSvg"></li>
            <li data-i18n="fSample"></li>
          </ul>
        </footer>
      </div>
      <div className="tip" id="tip" role="tooltip"></div>
      <DashboardClient />
    </>
  );
}
