import type { Metadata } from "next";
import { fontVars } from "@/lib/fonts";
import "./landing.css";

export const metadata: Metadata = {
  title: "Adrián Rodríguez · Rabbit Farm Dashboard",
  description:
    "A farm operations dashboard built from 1,000 records across six datasets. Portfolio project by Adrián Rodríguez, QA and software development student at Duoc UC.",
  openGraph: {
    title: "Rabbit Farm Dashboard · Adrián Rodríguez",
    description: "1,000 records, six datasets, one dashboard. Every number checked against its source.",
  },
};

// Landing and dashboard are separate root layouts so their global CSS never mixes.
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
