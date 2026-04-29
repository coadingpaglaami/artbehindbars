import { PrivacyPolicy } from "@/webcomponents/public";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The Art of Reform",
  description: "Privacy Policy for The Art of Reform.",
  keywords: [
    "The Art of Reform",
    "Reform",
    "Art",
    "Privacy Policy",
    "Prison Art",
    "Inmate Art",
    "Art Behind Bars",
    "Art for Social Change",
  ],
};

export default function PrivacyPolicyPage() {
    return <PrivacyPolicy />;

}