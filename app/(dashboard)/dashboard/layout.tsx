import type { Metadata } from "next";
import { fontVars } from "@/lib/fonts";
import "./dashboard.css";

export const metadata: Metadata = {
  title: "Rabbit Farm Operations Dashboard · Adrián Rodríguez",
  description:
    "Operations dashboard for a 1,000-rabbit farm: herd, sales, profit, mortality and upcoming births. Portfolio project by Adrián Rodríguez.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
