import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";

const body = DM_Sans({ subsets: ["latin"], axes: ["opsz"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono" });
const display = Syne({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });

export const fontVars = `${body.variable} ${mono.variable} ${display.variable}`;
