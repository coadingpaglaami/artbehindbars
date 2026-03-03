import { useQueryClient } from '@tanstack/react-query';
import { useCategories, useCreateCategory, useCreateState, useDeleteCategory, useDeleteState, useStates, useUpdateCategory, useUpdateState } from '@/api/post';
import { CategoryResponse, CreateCategoryDto, CreateStateDto, PaginatedResponseDto, StateResponse } from '@/types/post.type';
import { useState } from 'react';
import { EntityItem } from './EntityItem';
import { toast } from 'sonner';
import { get } from 'http';
import { getErrorMessage } from '@/lib/utils';

type CreateEntityDto = CreateCategoryDto | CreateStateDto;

type EntityType = 'category' | 'state';

interface EntityTableProps {
  type: EntityType;
}

type EntityResponse = CategoryResponse | StateResponse;

export const CategoryOrState = ({ type }: EntityTableProps) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [newEntityName, setNewEntityName] = useState('');
  const limit = 10;

  // Select the appropriate hooks based on type
  const useEntities = type === 'category' ? useCategories : useStates;
  const useCreateEntity = type === 'category' ? useCreateCategory : useCreateState;
  const useUpdateEntity = type === 'category' ? useUpdateCategory : useUpdateState;
  const useDeleteEntity = type === 'category' ? useDeleteCategory : useDeleteState;


  // Queries and mutations
  const { data, isLoading, isError, error, isFetching } = useEntities({ page, limit });
  const createEntity = useCreateEntity();
  const updateEntity = useUpdateEntity();
  const deleteEntity = useDeleteEntity();

  // Pagination logic
  const totalPages = data?.meta.totalPages || 0;
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  const entities = data?.data || [];
  const isEmpty = entities.length === 0 && !isLoading;

  // Handlers with optimistic updates
  const handleCreate = () => {
    if (!newEntityName.trim()) return;

    createEntity.mutate(
      { name: newEntityName.trim() } as CreateEntityDto,
      {
        onSuccess: () => {
          setNewEntityName('');
          toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} created successfully!`);
          // Invalidate and refetch
          queryClient.invalidateQueries({ 
            queryKey: [type === 'category' ? 'categories' : 'states'] 
          });
        },
        onError: (error) => {
          const message = getErrorMessage(error);
          toast.error(message || `Failed to create ${type}`);
        }
      }
    );
  };

  const handleUpdate = (entity: EntityResponse) => {
    updateEntity.mutate(
      { id: entity.id, payload: { name: entity.name } as CreateEntityDto },
      {
        onSuccess: () => {
            toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`);
          // Invalidate and refetch
          queryClient.invalidateQueries({ 
            queryKey: [type === 'category' ? 'categories' : 'states'] 
          });
        },
        onError: (error) => {
          const message = getErrorMessage(error);
          toast.error(message || `Failed to update ${type}`);
        }
      }
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      deleteEntity.mutate(id, {
        onSuccess: () => {
          toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
          queryClient.invalidateQueries({ 
            queryKey: [type === 'category' ? 'categories' : 'states'] 
          });
        },
        onError: (error) => {
          const message = getErrorMessage(error);
          toast.error(message || `Failed to delete ${type}`);
        }
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top of the list
    const listElement = document.getElementById(`${type}-list`);
    if (listElement) {
      listElement.scrollTop = 0;
    }
  };

  const handleLoadMore = () => {
    if (hasNextPage) {
      setPage(prev => prev + 1);
    }
  };

  // Get all pages of data (for horizontal scroll view)
//   const allPagesData = type === 'category' 
//     ? queryClient.getQueryData<PaginatedResponseDto<CategoryResponse>>(['categories', { page, limit }])
//     : queryClient.getQueryData<PaginatedResponseDto<StateResponse>>(['states', { page, limit }]);

//   const allEntities = allPagesData?.data || [];

  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error loading {type}s: {(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold capitalize">
          {type}s Management
        </h2>
        <div className="flex gap-2">
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages || 1}
          </span>
        </div>
      </div>

      {/* Create Form */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newEntityName}
          onChange={(e) => setNewEntityName(e.target.value)}
          placeholder={`Enter ${type} name...`}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCreate();
          }}
        />
        <button
          onClick={handleCreate}
          disabled={createEntity.isPending || !newEntityName.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add {type}
        </button>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      ) : (
        <>
          {/* Entities List - with horizontal scroll when data overflows */}
          <div 
            id={`${type}-list`}
            className="space-y-2 max-h-96 overflow-y-auto pr-2"
            style={{ 
              maxHeight: '24rem',
              overflowY: 'auto',
              overflowX: 'hidden'
            }}
          >
            {isEmpty ? (
              <p className="text-center text-gray-500 py-8">
                No {type}s found. Create your first {type} above.
              </p>
            ) : (
              entities.map((entity) => (
                <EntityItem
                  key={entity.id}
                  entity={entity}
                  onEdit={handleUpdate}
                  onDelete={handleDelete}
                  isDeleting={deleteEntity.isPending}
                  isUpdating={updateEntity.isPending}
                />
              ))
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between pt-4 border-t">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={!hasPreviousPage || isFetching}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {/* Page numbers */}
            <div className="flex gap-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                      page === pageNum
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={!hasNextPage || isFetching}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>

          {/* Load More Button (for horizontal scroll pattern) */}
          {hasNextPage && (
            <button
              onClick={handleLoadMore}
              disabled={isFetching}
              className="w-full py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {isFetching ? 'Loading...' : 'Load More'}
            </button>
          )}

          {/* Status Indicators */}
          {isFetching && (
            <div className="text-sm text-gray-500 text-center">
              Loading...
            </div>
          )}

          {/* Items count */}
          <div className="text-sm text-gray-500 text-right">
            Showing {entities.length} of {data?.meta.total || 0} {type}s
          </div>
        </>
      )}
    </div>
  );
};