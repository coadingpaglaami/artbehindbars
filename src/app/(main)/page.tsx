import { Home } from "@/webcomponents/public";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | The Art of Reform",
  description: "Welcome To The Art of Reform",
  keywords: [
    "The Art of Reform",
    "Reform",
    "Art",
    "Prison Art",
    "Inmate Art",
    "Art Behind Bars",
    "Art for Social Change",
  ],
};

export default function HomePage() {
  return <Home />;
}