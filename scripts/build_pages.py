"""Inject data/data.json into the page templates and write the static site to site/."""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = ROOT / "site"


def main():
    data = json.loads((ROOT / "data/data.json").read_text())
    blob = json.dumps(data, separators=(",", ":")).replace("</", "<\\/")
    pages = {"src/index.template.html": "index.html", "src/dashboard.template.html": "dashboard/index.html"}
    for src, out in pages.items():
        target = SITE / out
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text((ROOT / src).read_text().replace("/*DATA*/", blob))
        print("wrote", target.relative_to(ROOT))


if __name__ == "__main__":
    main()
