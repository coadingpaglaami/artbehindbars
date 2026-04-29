import { TermsAndConditions } from "@/webcomponents/public";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | The Art of Reform",
  description: "Terms and Conditions for The Art of Reform.",
  keywords: [
    "The Art of Reform",
    "Reform",
    "Art",
    "Terms and Conditions",
    "Prison Art",
    "Inmate Art",
    "Art Behind Bars",
    "Art for Social Change",
  ],
};

export default function TermsConditionPage() {
  return <TermsAndConditions />;
}
