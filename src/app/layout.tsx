import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import { Toaster } from "sonner";
import SocketQueryProvider from "@/context/QueryClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Art of Reform",
  description: "Welcome To The Art of Reform",
  icons: {
    icon: "/navbar/logo.svg",
  },
  keywords: [
    "The Art of Reform",
    "Reform",
    "Art",
    "Drawing",
    "Painting",
    "Sculpture",
    "Photography",
    "Mixed Media",
    "Contemporary Art",
    "Abstract Art",
    "Realism",
    "Impressionism ",
    "Expressionism",
    "Surrealism",
    "Minimalism",
    "Conceptual Art",
    "Street Art",
    "Digital Art",
    "Prison Art",
    "Inmate Art",
    "Art Behind Bars",
    "Art for Social Change",
  ],
  openGraph: {
    title: "The Art of Reform",
    description: "Welcome To The Art of Reform",
    images: [
      {
        url: "https://theartofreform.com/navbar/logo.png",
        height: 731,
        width: 800,
        alt: "The Art of Reform",
      },
    ],
    type: "website",
    siteName: "The Art of Reform",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Art of Reform",
    description: "Welcome To The Art of Reform",
    images: ["https://theartofreform.com/navbar/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <SocketQueryProvider>
          {children} <Toaster />
        </SocketQueryProvider>
      </body>
    </html>
  );
}
