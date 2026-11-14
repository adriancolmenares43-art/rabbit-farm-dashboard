# Rabbit Farm Operations Dashboard

![CI](https://github.com/adriancolmenares43-art/rabbit-farm-dashboard/actions/workflows/ci.yml/badge.svg)

A Next.js site (static export) with a recruiter-facing landing page and an operations dashboard,
built from six linked CSV files about a 1,000-rabbit farm (sample dataset, prices in NGN).

**Live:** https://rabbit-farm-dashboard.vercel.app

## What it shows

- 6 KPIs: total rabbits, active stock, revenue, gross profit, mortality rate, pregnant does
- Sales and gross profit over 49 months (monthly / yearly)
- Revenue by sales channel and gross profit by breed
- Active stock by breed, sex and age group; herd lifecycle
- Mortality by cause and per year
- Upcoming births table with expected kindling dates (filter: 7 days / 14 days / all)
- English, Spanish and Portuguese (switch in the top bar; numbers and dates follow each locale)

## How it works

```
data/raw/*.csv ──scripts/build_data.py──▶ data/data.json ──next build──▶ out/
```

- `build_data.py` computes every figure with pandas.
- `app/(landing)` and `app/(dashboard)/dashboard` are two Next.js App Router pages (separate root layouts, so their styles never mix). Both import `data/data.json` at build time.
- Charts are custom SVG drawn in plain JavaScript (`init.js` next to each page), with no chart library and no runtime data fetch.

## Testing approach

`tests/test_data.py` (pytest) checks that the data is consistent and that the dashboard matches it:

- no empty cells; unique IDs; every sale, death, pregnancy and purchase points to a known rabbit
- rabbit `Status` / `IsPregnant` / `Source` match the event tables exactly
- profit = sale price − cost basis on every sale; kindling = mating + 31 days; only females are pregnant
- every KPI equals its value recomputed from the raw CSVs
- every chart's series adds up to its KPI (monthly revenue sums to total revenue, and so on)

CI rebuilds `data.json`, runs the tests, fails if `data.json` is out of date, then runs `next build`.

## Run locally

```bash
pip install -r requirements.txt
python scripts/build_data.py data/raw data/data.json
pytest -q
npm install
npm run dev          # open http://localhost:3000
```

## Deploy (Vercel)

Vercel detects Next.js and runs `next build`; no config file is needed.

1. Push this repo to GitHub.
2. On vercel.com: **Add New → Project → Import** this repo → **Deploy**.
3. Copy the URL into the CV and LinkedIn.

## Author

Adrián Rodríguez · [LinkedIn](https://www.linkedin.com/in/adri%C3%A1n-rodr%C3%ADguez-/) · [GitHub](https://github.com/adriancolmenares43-art)
Built with AI-assisted development (Claude); data checks and review by the author.
