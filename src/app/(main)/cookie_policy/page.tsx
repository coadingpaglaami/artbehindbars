import { CookiePolicy } from "@/webcomponents/public";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | The Art of Reform",
  description: "Cookie Policy for The Art of Reform.",
  keywords: [
    "The Art of Reform",
    "Reform",
    "Art",
    "Cookie Policy",
    "Prison Art",
    "Inmate Art",
    "Art Behind Bars",
    "Art for Social Change",
  ],
};

export default function CookiePolicyPage() {
    return <CookiePolicy />;

}