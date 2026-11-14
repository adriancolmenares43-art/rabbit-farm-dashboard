import type { CSSProperties } from "react";
import Link from "next/link";
import LandingClient from "./Client";

const LINKEDIN = "https://www.linkedin.com/in/adri%C3%A1n-rodr%C3%ADguez-/";
// CSS custom properties (--d reveal delay, --glow card colour) aren't in React's style type.
const vars = (v: Record<string, string>) => v as CSSProperties;

export default function LandingPage() {
  return (
    <>
      <nav id="nav">
        <div className="wrap">
          <a className="logo" href="#top" aria-label="Adrián Rodríguez"><span className="logo-mark">AR</span><span className="name">Adrián Rodríguez</span></a>
          <div className="nav-right">
            <div className="lang" role="group" aria-label="Language">
              <button type="button" data-lang="en" lang="en">EN</button>
              <button type="button" data-lang="es" lang="es">ES</button>
              <button type="button" data-lang="pt" lang="pt">PT</button>
            </div>
            <Link className="btn btn-primary" href="/dashboard/"><span data-i18n="navCta"></span> <span className="arr">&rarr;</span></Link>
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow rv" style={vars({ "--d": ".05s" })} data-i18n="heroEyebrow"></div>
            <h1 className="rv" style={vars({ "--d": ".12s" })} data-i18n="heroH1"></h1>
            <p className="sub rv" style={vars({ "--d": ".2s" })} data-i18n="heroSub"></p>
            <div className="ctas rv" style={vars({ "--d": ".28s" })}>
              <Link className="btn btn-primary" href="/dashboard/"><span data-i18n="ctaDash"></span> <span className="arr">&rarr;</span></Link>
              <a className="btn btn-ghost" href={LINKEDIN} target="_blank" rel="noopener" data-i18n="ctaLinked"></a>
            </div>
            <div className="proof rv" style={vars({ "--d": ".36s" })} id="proof"></div>
          </div>

          <div className="stage rv" style={vars({ "--d": ".2s" })} aria-hidden="true">
            <div className="panel p-main">
              <div className="t"><span data-i18n="panelSales"></span><span className="live" data-i18n="realData"></span></div>
              <div className="legend">
                <span><i style={{ background: "var(--s1)" }}></i><span data-i18n="revenue"></span></span>
                <span><i style={{ background: "var(--s3)" }}></i><span data-i18n="profit"></span></span>
              </div>
              <svg id="spark" viewBox="0 0 400 230" preserveAspectRatio="none" style={{ height: 240, marginTop: 10 }}></svg>
            </div>
            <div className="panel p-kpi">
              <div className="t"><span data-i18n="panelRev"></span><span>NGN</span></div>
              <div className="big" id="pk-rev">₦0</div>
              <div className="mini" id="pk-rev-f"></div>
            </div>
            <div className="panel p-births">
              <div className="t"><span data-i18n="panelBirths"></span><span id="pb-n"></span></div>
              <div id="pb-rows" style={{ marginTop: 8 }}></div>
            </div>
          </div>
        </div>
      </header>

      <section className="problem" aria-labelledby="pb-h">
        <div className="wrap">
          <div className="eyebrow" data-i18n="pbEyebrow"></div>
          <h2 id="pb-h" data-i18n="pbH"></h2>
          <div className="pains">
            <div className="pain"><div className="n">01</div><h3 data-i18n="p1h"></h3><p data-i18n="p1p"></p></div>
            <div className="pain"><div className="n">02</div><h3 data-i18n="p2h"></h3><p data-i18n="p2p"></p></div>
            <div className="pain"><div className="n">03</div><h3 data-i18n="p3h"></h3><p data-i18n="p3p"></p></div>
          </div>
        </div>
      </section>

      <section className="benefits" aria-labelledby="bn-h">
        <div className="wrap">
          <div className="benefits-head">
            <div><div className="eyebrow" data-i18n="bnEyebrow"></div><h2 id="bn-h" style={{ marginTop: 16 }} data-i18n="bnH"></h2></div>
            <p data-i18n="bnP"></p>
          </div>
          <div className="bgrid">
            <article className="b rv" style={vars({ "--glow": "rgba(57,135,229,.5)" })}><div className="k" data-i18n="b1k"></div><h3 data-i18n="b1h"></h3><p data-i18n="b1p"></p><div className="fig"><span data-i18n="b1f"></span></div></article>
            <article className="b rv" style={vars({ "--glow": "rgba(242,181,68,.5)" })}><div className="k" data-i18n="b2k"></div><h3 data-i18n="b2h"></h3><p data-i18n="b2p"></p><div className="fig"><span>350 = 350 · 100 = 100 · 80 = 80</span></div></article>
            <article className="b rv" style={vars({ "--glow": "rgba(25,158,112,.5)" })}><div className="k" data-i18n="b3k"></div><h3 data-i18n="b3h"></h3><p data-i18n="b3p"></p><div className="fig"><span data-i18n="b3f"></span></div></article>
            <article className="b rv" style={vars({ "--glow": "rgba(213,81,129,.5)" })}><div className="k" data-i18n="b4k"></div><h3 data-i18n="b4h"></h3><p id="b4p"></p><div className="fig"><span id="b4f"></span></div></article>
          </div>
        </div>
      </section>

      <section className="stats" aria-labelledby="st-h">
        <div className="wrap">
          <div className="stats-box rv">
            <div>
              <div className="eyebrow" data-i18n="stEyebrow"></div>
              <h2 id="st-h" style={{ marginTop: 14 }} data-i18n="stH"></h2>
              <p data-i18n="stP"></p>
            </div>
            <div className="sgrid">
              <div><div className="sv" data-count="total_rabbits">0</div><div className="sl" data-i18n="sl1"></div></div>
              <div><div className="sv" data-count="sold">0</div><div className="sl" data-i18n="sl2"></div></div>
              <div><div className="sv" data-count="revenue" data-fmt="ngn">0</div><div className="sl" data-i18n="sl3"></div></div>
              <div><div className="sv" data-count="deceased">0</div><div className="sl" data-i18n="sl4"></div></div>
              <div><div className="sv" data-count="pregnant">0</div><div className="sl" data-i18n="sl5"></div></div>
              <div><div className="sv" data-count="months">0</div><div className="sl" data-i18n="sl6"></div></div>
              <div className="creds">
                <span className="cred"><b>Oracle SQL</b> · Duoc UC</span>
                <span className="cred"><b>Oracle PL/SQL</b> · Duoc UC</span>
                <span className="cred" data-i18n="cred3"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap faq" aria-labelledby="fq-h">
        <h2 id="fq-h" data-i18n="fqH"></h2>
        <div>
          {[1, 2, 3, 4, 5].map((i) => (
            <details className="rv" key={i}><summary><span data-i18n={`q${i}`}></span><span className="pm">+</span></summary><p data-i18n={`a${i}`}></p></details>
          ))}
        </div>
      </section>

      <section className="final">
        <div className="wrap">
          <div className="final-box rv">
            <div className="eyebrow" data-i18n="fnEyebrow"></div>
            <h2 data-i18n="fnH"></h2>
            <p data-i18n="fnP"></p>
            <div className="ctas">
              <Link className="btn btn-primary" href="/dashboard/"><span data-i18n="fnCta1"></span> <span className="arr">&rarr;</span></Link>
              <a className="btn btn-ghost" href={LINKEDIN} target="_blank" rel="noopener" data-i18n="fnCta2"></a>
            </div>
            <p className="contact"><span data-i18n="fnEmail" style={{ fontFamily: "var(--f-b)", color: "var(--ink-3)" }}></span> <span>adriancolmenares43@gmail.com</span></p>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <span>© <span id="yr">2026</span> Adrián Rodríguez · Santiago, Chile</span>
          <span>
            <a href="https://github.com/adriancolmenares43-art" target="_blank" rel="noopener">GitHub</a> &nbsp;·&nbsp;{" "}
            <a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a> &nbsp;·&nbsp; <span data-i18n="ftSample"></span>
          </span>
        </div>
      </footer>
      <LandingClient />
    </>
  );
}
