"""Data-quality and reconciliation tests: the dashboard must match the raw CSVs."""
import json
import pathlib

import pandas as pd
import pytest

ROOT = pathlib.Path(__file__).resolve().parent.parent
RAW = ROOT / "data/raw"


@pytest.fixture(scope="module")
def csv():
    return {n: pd.read_csv(RAW / f"{n}.csv") for n in ["Breeds", "Rabbits", "Sales", "Purchases", "Mortality", "Pregnancies"]}


@pytest.fixture(scope="module")
def data():
    return json.loads((ROOT / "data/data.json").read_text())


def test_no_missing_values(csv):
    for name, df in csv.items():
        assert not df.isna().any().any(), f"{name} has empty cells"


def test_ids_are_unique(csv):
    assert csv["Rabbits"].RabbitID.is_unique
    for name in ["Sales", "Mortality", "Pregnancies", "Purchases"]:
        assert csv[name].RabbitID.is_unique, f"a rabbit appears twice in {name}"


def test_every_event_points_to_a_known_rabbit(csv):
    ids = set(csv["Rabbits"].RabbitID)
    for name in ["Sales", "Mortality", "Pregnancies", "Purchases"]:
        assert set(csv[name].RabbitID) <= ids, f"{name} references unknown rabbits"


def test_status_matches_event_tables(csv):
    r = csv["Rabbits"]
    assert set(csv["Sales"].RabbitID) == set(r[r.Status == "Sold"].RabbitID)
    assert set(csv["Mortality"].RabbitID) == set(r[r.Status == "Deceased"].RabbitID)
    assert set(csv["Pregnancies"].RabbitID) == set(r[r.IsPregnant == "Yes"].RabbitID)
    assert set(csv["Purchases"].RabbitID) == set(r[r.Source == "Purchased"].RabbitID)


def test_profit_equals_price_minus_cost(csv):
    s = csv["Sales"]
    assert ((s.SalePrice_NGN - s.CostBasis_NGN) == s.Profit_NGN).all()


def test_pregnant_rabbits_are_female(csv):
    r = csv["Rabbits"].set_index("RabbitID")
    assert (r.loc[csv["Pregnancies"].RabbitID, "Sex"] == "Female").all()


def test_kindling_is_31_days_after_mating(csv):
    p = csv["Pregnancies"]
    gap = pd.to_datetime(p.ExpectedKindlingDate) - pd.to_datetime(p.MatingDate)
    assert (gap.dt.days == 31).all()


def test_kpis_match_raw_data(csv, data):
    k, r, s = data["kpi"], csv["Rabbits"], csv["Sales"]
    assert k["total_rabbits"] == len(r)
    assert k["active"] == (r.Status == "Active").sum()
    assert k["revenue"] == s.SalePrice_NGN.sum()
    assert k["profit"] == s.Profit_NGN.sum()
    assert k["mortality_rate"] == round(len(csv["Mortality"]) / len(r) * 100, 1)
    assert k["pregnant"] == len(csv["Pregnancies"])


def test_chart_series_add_up(data):
    k = data["kpi"]
    assert sum(m["revenue"] for m in data["monthly"]) == k["revenue"]
    assert sum(y["profit"] for y in data["yearly"]) == k["profit"]
    assert sum(c["revenue"] for c in data["channels"]) == k["revenue"]
    assert sum(c["count"] for c in data["mortality_cause"]) == k["deceased"]
    assert sum(v["Female"] + v["Male"] for v in data["active_breed_sex"].values()) == k["active"]
    assert sum(data["status"].values()) == k["total_rabbits"]
    assert len(data["births"]) == k["pregnant"]


def test_no_chart_is_empty(data):
    for key in ["monthly", "yearly", "channels", "breed_sales", "mortality_cause", "births"]:
        assert len(data[key]) > 0, f"{key} is empty"
