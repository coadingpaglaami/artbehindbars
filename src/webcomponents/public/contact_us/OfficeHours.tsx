const officeHours = [
  { day: "Monday - Friday", openTime: "9:00 AM - 6:00 PM" },
  { day: "Saturday", openTime: "10:00 AM - 4:00 PM" },
  { day: "Sunday", openTime: "Closed" },
];

export const OfficeHours = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Office Hours
      </h3>
      
      <div className="space-y-3">
        {officeHours.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">{item.day}</span>
            <span className="text-gray-600">{item.openTime}</span>
          </div>
        ))}
      </div>
    </div>
  );
};