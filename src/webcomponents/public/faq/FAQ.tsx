"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

export const FAQ = () => {
  const [openItems, setOpenItems] = useState<number>();

  const questionsAndAnswers: { question: string; answer: string }[] = [
    {
      question: "How does the auction process work?",
      answer:
        "The auction process allows buyers to place bids on artworks. The highest bid at the end of the auction wins the artwork, and the buyer is notified to complete the purchase.",
    },
    {
      question: "Where does my money go?",
      answer:
        "The money from your purchase goes to support the artist, covering auction fees, platform fees, and shipping costs, ensuring that the artist receives fair compensation.",
    },
    {
      question: "Can I communicate directly with artists?",
      answer:
        "Yes, you can communicate with artists through the platform's messaging system, but all communications are reviewed to maintain security and privacy.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping times vary based on the location of the buyer and the seller, but typically shipping takes between 7 to 14 business days after the purchase is completed.",
    },
    {
      question: "What if I'm not satisfied with my purchase?",
      answer:
        "If you are not satisfied with your purchase, you can contact our customer service team within 7 days of receiving your order to arrange a return or exchange.",
    },
    {
      question: "Are all artists currently incarcerated?",
      answer:
        "No, not all artists are currently incarcerated. Some artists may have been released or are currently serving their sentences, but their artwork is still available for purchase.",
    },
    {
      question: "Can I request custom artwork?",
      answer:
        "Yes, you can request custom artwork from artists through the platform, and they will provide pricing and timelines based on your request.",
    },
    {
      question: "How do you ensure authenticity?",
      answer:
        "We ensure authenticity by verifying each artist's identity and their artwork before listing it on our platform. Additionally, each artwork is accompanied by a certificate of authenticity.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes, all payment information is encrypted and securely processed through our trusted payment gateway partners, ensuring that your information is safe.",
    },
    {
      question: "Can I donate to support artists without purchasing?",
      answer:
        "Yes, you can donate to support artists directly through the platform, allowing you to contribute without purchasing artwork.",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev === index ? undefined : index));
  };
  const {push}  = useRouter();

  return (
    <div className="mx-auto flex flex-col gap-6 max-w-4xl w-full py-16 px-4">
      <div className="flex flex-col gap-2 items-center text-center">
        <h2 className="md:text-4xl text-2xl font-semibold">
          Frequently Asked Questions
        </h2>
        <span className="text-[#525252]">
          Find answers to common questions about our platform, auctions, and
          mission.
        </span>
      </div>

      {/* Accordion Section */}
      <div className="flex flex-col gap-4">
        {questionsAndAnswers.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all"
          >
            {/* Question Header */}
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 pr-4">
                {item.question}
              </span>
              <ChevronDown
                size={24}
                className={`shrink-0 text-gray-600 transition-transform duration-300 ${
                  openItems === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Answer Content */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openItems === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="px-4 pb-4 pt-2 text-gray-700 border-t border-gray-200">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="p-8 bg-primary flex justify-center items-center flex-col gap-3 rounded-md text-center">
        <h3 className="text-white text-2xl font-semibold">
          Still Have Questions?
        </h3>
        <span className="text-white text-lg">
          We&apos;re here to help. Reach out to our team and we&apos;ll get back
          to you as soon as possible.
        </span>
        <Button className="bg-white text-primary hover:bg-white/90" onClick={() => push("/contact_us")}>
          Contact Us
        </Button>
      </div>
    </div>
  );
};
