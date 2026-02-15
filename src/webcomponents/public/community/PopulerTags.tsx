
import { PaginatedResponseDto } from "@/types/auction.type";
import { CategoryResponse } from "@/types/post.type";
import { InfiniteData } from "@tanstack/react-query";

interface PopularTagsProps {
  data:InfiniteData<PaginatedResponseDto<CategoryResponse>, unknown> | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  selectedTopic: string;
  setSelectedTopicId: (id: string) => void;

}

export const PopularTagsInfinite = ({ selectedTopic, setSelectedTopicId, ...props }: PopularTagsProps) => {


  const allCategories = props.data?.pages.flatMap(page=>page.data) || [];
  const totalCategories = props.data?.pages[0]?.meta.total || 0;

  const handleLoadMore = () => {
    if (props.hasNextPage && !props.isFetchingNextPage) {
      props.fetchNextPage();
    }
  };

  const handleTopicClick = (categoryId: string) => {
    setSelectedTopicId(categoryId);
  };

  if (props.isError) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Popular Topics
        </h3>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">Error loading topics: {(props.error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Popular Topics
      </h3>


      {/* Categories from API */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">All Categories</h4>
        
        {/* Loading State */}
        {props.isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : (
          <>
            {/* Categories Container with max-height and scroll */}
            <div 
              className="overflow-y-auto pr-2"
              style={{ 
                maxHeight: '300px',
                minHeight: '100px'
              }}
            >
              <div className="flex flex-wrap gap-2">
                {allCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleTopicClick(category.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      selectedTopic === category.id
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-[#F5F5F5] text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Loading indicator for next page */}
              {props.isFetchingNextPage && (
                <div className="flex justify-center items-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
                </div>
              )}
            </div>

            {/* Show More Button */}
            {props.hasNextPage && (
              <button
                onClick={handleLoadMore}
                disabled={props.isFetchingNextPage}
                className="mt-4 w-full py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {props.isFetchingNextPage ? 'Loading...' : 'Show More Topics'}
              </button>
            )}

            {/* Categories count */}
            <div className="mt-2 text-xs text-gray-500 text-right">
              Showing {allCategories.length} of {totalCategories} categories
            </div>
          </>
        )}
      </div>
    </div>
  );
};