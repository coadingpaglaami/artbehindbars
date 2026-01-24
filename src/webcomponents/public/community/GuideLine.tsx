import { CheckCircle } from "lucide-react";

const guidelines = [
  "Be respectful and constructive",
  "Focus on reform and advocacy",
  "Verify information before sharing",
  "No hate speech or harassment",
];

export const CommunityGuideLine = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Community Guidelines
      </h3>
      
      <div className="space-y-3">
        {guidelines.map((guideline, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
            <p className="text-gray-700">{guideline}</p>
          </div>
        ))}
      </div>
    </div>
  );
};