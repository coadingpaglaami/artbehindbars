"use client";

import { ReactNode } from "react";

export interface PolicySection {
  title: string;
  content: ReactNode;
}

export interface PolicyPageProps {
  badge: string;
  title: string;
  effectiveDate: string;
  website: string;
  intro: string;
  sections: PolicySection[];
}

export const PolicyPage = ({
  badge,
  title,
  effectiveDate,
  website,
  intro,
  sections,
}: PolicyPageProps) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Hero */}
      <div className="bg-[#2C2420] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A882] border border-[#C5A882]/40 rounded-full px-4 py-1.5 mb-6">
            {badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mt-6">
            <span>
              Effective:{" "}
              <span className="text-white/80 font-medium">{effectiveDate}</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="text-[#C5A882]/80">{website}</span>
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-4xl mx-auto px-4 pt-10 pb-2">
        <p className="text-[#5C4A3A] text-base leading-relaxed border-l-4 border-[#C5A882] pl-5 bg-white rounded-r-xl py-4 pr-4 shadow-sm">
          {intro}
        </p>
      </div>

      {/* Sections */}
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-3">
        {sections.map((section, index) => (
          <PolicySection
            key={index}
            index={index + 1}
            title={section.title}
            content={section.content}
          />
        ))}
      </div>

      {/* Footer strip */}
      <div className="border-t border-[#C5A882]/20 bg-[#2C2420]/5 py-6 px-4">
        <div className="max-w-4xl mx-auto text-center text-xs text-[#5C4A3A]/50">
          © {new Date().getFullYear()} The Art of Reform · {website}
        </div>
      </div>
    </div>
  );
};

/* ── Internal section accordion ── */
const PolicySection = ({
  index,
  title,
  content,
}: {
  index: number;
  title: string;
  content: ReactNode;
}) => {
  return (
    <details
      className="group bg-white border border-[#C5A882]/20 rounded-2xl shadow-sm overflow-hidden open:shadow-md transition-shadow duration-200"
      open={index === 1}
    >
      <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none">
        <div className="flex items-center gap-4">
          <span className="shrink-0 w-8 h-8 rounded-full bg-[#C5A882]/15 text-[#C5A882] text-xs font-bold flex items-center justify-center">
            {index}
          </span>
          <span className="font-semibold text-[#2C2420] text-sm md:text-base">
            {title}
          </span>
        </div>
        {/* Chevron */}
        <svg
          className="shrink-0 w-4 h-4 text-[#C5A882] transition-transform duration-200 group-open:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>
      <div className="px-6 pb-6 pt-1 text-sm text-[#5C4A3A] leading-relaxed border-t border-[#C5A882]/10">
        {content}
      </div>
    </details>
  );
};

/* ── Shared prose helpers (re-export for use in page files) ── */
export const P = ({ children }: { children: ReactNode }) => (
  <p className="mt-3 first:mt-0">{children}</p>
);

export const UL = ({ items }: { items: string[] }) => (
  <ul className="mt-3 space-y-1.5 pl-1">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2.5">
        <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#C5A882]" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

export const Strong = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-[#2C2420]">{children}</strong>
);

export const SubSection = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div className="mt-4">
    <p className="font-semibold text-[#2C2420] mb-1">{label}</p>
    {children}
  </div>
);
