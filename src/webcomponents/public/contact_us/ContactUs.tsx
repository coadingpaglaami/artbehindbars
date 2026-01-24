import { ContactInformation } from "./ContactInformation";
import { OfficeHours } from "./OfficeHours";
import { ResponseTime } from "./ResponseTime";
import { SendMessage } from "./SendMessage";

export const ContactUs = () => {
  return (
    <div className="max-w-max mx-auto py-16 flex flex-col gap-6">
      <div className="flex flex-col gap-2 items-center text-center">
        <h2 className="md:text-4xl text-2xl font-semibold">Contact Us</h2>
        <span className="text-[#525252]">
          Have questions or need assistance? We&apos;re here to help.
        </span>
      </div>
      <div className="flex flex-col gap-3.5 lg:flex-row lg:gap-4 lg:items-start">
        <div className="md:w-[70%] w-full">
          <SendMessage />
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
