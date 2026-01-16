const popularTopics = [
  "Prison Reform",
  "Education",
  "Healthcare",
  "Visitation",
  "Reentry",
  "Mental Health",
  "Sentencing",
  "Rehabilitation",
];

export const PopularTags = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Popular Topics
      </h3>

      <div className="flex flex-wrap gap-2">
        {popularTopics.map((topic, idx) => (
          <span
            key={idx}
            className="px-3 py-1.5 rounded-full text-sm font-medium bg-[#F5F5F5] text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
};
