'use client';
import { useContactUsMutation } from "@/api/account";
import { ContactInformation } from "./ContactInformation";
import { OfficeHours } from "./OfficeHours";
import { ResponseTime } from "./ResponseTime";
import { SendMessage } from "./SendMessage";
import { toast } from 'sonner';
import { useState } from 'react';
import { ContactUsDto } from "@/types/account.type"; // Adjust import path
import { ErrorResponse } from "@/types/error.type";

export const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useContactUsMutation();

  const handleSendMessage = (data: ContactUsDto) => {
    setIsSubmitting(true);
    
    mutate(data, {
      onSuccess: () => {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you as soon as possible.",
          duration: 5000,
        });
        setIsSubmitting(false);
      },
      onError: (error: unknown) => {
        toast.error("Failed to send message", {
          description: (error as ErrorResponse)?.response?.data?.message || "Please try again later.",
          duration: 5000,
        });
        setIsSubmitting(false);
      },
    });
  };

  return (
    <div className="py-16 flex flex-col gap-6">
      <div className="flex flex-col gap-2 items-center text-center">
        <h2 className="md:text-4xl text-2xl font-semibold">Contact Us</h2>
        <span className="text-[#525252]">
          Have questions or need assistance? We&apos;re here to help.
        </span>
      </div>
      <div className="flex flex-col gap-3.5 lg:flex-row lg:gap-4 lg:items-start">
        <div className="md:w-[70%] w-full">
          <SendMessage 
            handleSubmit={handleSendMessage} 
            isSubmitting={isSubmitting}
          />
        </div>
        <div className="md:w-[30%] w-full flex flex-col gap-3">
          <ContactInformation />
          <OfficeHours />
          <ResponseTime />
        </div>
      </div>
    </div>
  );
};