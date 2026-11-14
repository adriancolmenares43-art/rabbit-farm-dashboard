"use client";
import { useEffect } from "react";
import data from "@/data/data.json";
import initLanding from "./init";

// Text, sparkline and counters are filled in after hydration; React owns only the static shell.
export default function LandingClient() {
  useEffect(() => initLanding(data), []);
  return null;
}
