"""Compute every dashboard figure from the six CSVs and write data.json."""
import json, sys
import pandas as pd

src, out = sys.argv[1], sys.argv[2]
r = pd.read_csv(f"{src}/Rabbits.csv"); s = pd.read_csv(f"{src}/Sales.csv")
pu = pd.read_csv(f"{src}/Purchases.csv"); m = pd.read_csv(f"{src}/Mortality.csv")
p = pd.read_csv(f"{src}/Pregnancies.csv"); b = pd.read_csv(f"{src}/Breeds.csv")
asof = r.ReferenceDate.max()
active = r[r.Status == "Active"]
breed_order = list(b.BreedName)

def counts(df, col, order=None):
    vc = df[col].value_counts()
    keys = order if order else list(vc.index)
    return {k: int(vc.get(k, 0)) for k in keys}

d = {"asof": asof, "currency": "NGN"}
d["kpi"] = {
    "total_rabbits": int(len(r)),
    "active": int(len(active)),
    "sold": int((r.Status == "Sold").sum()),
    "deceased": int((r.Status == "Deceased").sum()),
    "revenue": int(s.SalePrice_NGN.sum()),
    "profit": int(s.Profit_NGN.sum()),
    "purchase_spend": int(pu.UnitCost_NGN.sum()),
    "mortality_rate": round(len(m) / len(r) * 100, 1),
    "avg_sale": int(round(s.SalePrice_NGN.mean())),
    "margin": round(s.Profit_NGN.sum() / s.SalePrice_NGN.sum() * 100, 1),
    "pregnant": int(len(p)),
    "bred_share": round((r.Source == "Bred").mean() * 100, 1),
}
d["status"] = counts(r, "Status", ["Active", "Sold", "Deceased"])
d["active_sex"] = counts(active, "Sex", ["Female", "Male"])
d["active_age"] = counts(active, "AgeGroup")
d["active_breed_sex"] = {br: counts(active[active.BreedName == br], "Sex", ["Female", "Male"]) for br in breed_order}
d["active_age_sex"] = {ag: counts(active[active.AgeGroup == ag], "Sex", ["Female", "Male"]) for ag in d["active_age"]}

s["ym"] = s.SaleDate.str[:7]
months = pd.period_range(s.SaleDate.min()[:7], s.SaleDate.max()[:7], freq="M").astype(str)
mon = s.groupby("ym").agg(revenue=("SalePrice_NGN", "sum"), profit=("Profit_NGN", "sum"), units=("SaleID", "count")).reindex(months, fill_value=0)
d["monthly"] = [{"month": k, **{c: int(v) for c, v in row.items()}} for k, row in mon.iterrows()]
yr = s.groupby("Year").agg(revenue=("SalePrice_NGN", "sum"), profit=("Profit_NGN", "sum"), units=("SaleID", "count"))
d["yearly"] = [{"year": int(k), **{c: int(v) for c, v in row.items()}} for k, row in yr.iterrows()]
ch = s.groupby("Channel").agg(revenue=("SalePrice_NGN", "sum"), units=("SaleID", "count")).sort_values("revenue", ascending=False)
d["channels"] = [{"channel": k, "revenue": int(v.revenue), "units": int(v.units)} for k, v in ch.iterrows()]
bp = s.groupby("BreedName").agg(revenue=("SalePrice_NGN", "sum"), profit=("Profit_NGN", "sum"), units=("SaleID", "count"), avg_price=("SalePrice_NGN", "mean")).sort_values("profit", ascending=False)
d["breed_sales"] = [{"breed": k, "revenue": int(v.revenue), "profit": int(v.profit), "units": int(v.units), "avg_price": int(round(v.avg_price))} for k, v in bp.iterrows()]

mc = m.CauseOfDeath.value_counts()
d["mortality_cause"] = [{"cause": k, "count": int(v)} for k, v in mc.items()]
d["mortality_age"] = counts(m, "AgeGroup")
d["mortality_year"] = {str(k): int(v) for k, v in m.Year.value_counts().sort_index().items()}

p = p.sort_values(["ExpectedKindlingDate", "PregnancyID"])
d["births"] = p[["PregnancyID", "RabbitID", "BreedName", "HutchNumber", "MatingDate", "ExpectedKindlingDate", "DaysUntilKindling", "PregnancyStatus"]].to_dict("records")
d["births_status"] = counts(p, "PregnancyStatus")
d["births_next7"] = int((p.DaysUntilKindling <= 7).sum())
d["breeds"] = b.to_dict("records")
d["sales_span"] = [s.SaleDate.min(), s.SaleDate.max()]

json.dump(d, open(out, "w"), indent=1, default=int)
print(json.dumps({k: d[k] for k in ["asof", "kpi", "status", "active_sex", "active_age", "births_status", "births_next7", "sales_span", "mortality_age", "mortality_year"]}, indent=1))
print("causes", d["mortality_cause"]); print("channels", d["channels"]); print("breed_sales", d["breed_sales"])
print("yearly", d["yearly"]); print("months", len(d["monthly"]), d["monthly"][0], d["monthly"][-1])
print("breed_sex", d["active_breed_sex"]); print("age_sex", d["active_age_sex"])
