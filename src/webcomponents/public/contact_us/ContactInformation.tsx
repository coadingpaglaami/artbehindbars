import { Mail, Phone, MapPin } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    text: "support@artbehindbars.org",
  },
  {
    icon: Phone,
    label: "Phone",
    text: "(555) 123-4567",
  },
  {
    icon: MapPin,
    label: "Address",
    text: "123 Art Street\nCreative District\nNew York, NY 10001",
  },
];

export const ContactInformation = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Contact Information
      </h3>
      
      <div className="space-y-6">
        {contactInfo.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex gap-3">
              <Icon size={24} className="text-primary shrink-0 mt-1" />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900 mb-1">
                  {item.label}
                </span>
                <span className="text-gray-600 whitespace-pre-line">
                  {item.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};