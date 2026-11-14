"use client";
import { useEffect } from "react";
import data from "@/data/data.json";
import initDashboard from "./init";

// The charts draw straight into the DOM after hydration; React owns only the static shell.
export default function DashboardClient() {
  useEffect(() => initDashboard(data), []);
  return null;
}
