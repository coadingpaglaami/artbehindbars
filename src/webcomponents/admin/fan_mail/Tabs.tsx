export const Tabs = ({ tabs, activeTab, onTabChange }: { 
  tabs: string[], 
  activeTab: string, 
  onTabChange: (tab: string) => void 
}) => {
  return (
    <div className="w-full border-b border-gray-200">
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`relative pb-4 px-1 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transition-all duration-300"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
