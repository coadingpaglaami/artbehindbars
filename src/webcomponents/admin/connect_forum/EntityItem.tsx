import { useState } from 'react';
import { CategoryResponse, StateResponse } from '@/types/post.type';

// Types for the component

type EntityResponse = CategoryResponse | StateResponse;


interface EntityItemProps {
  entity: EntityResponse;
  onEdit: (entity: EntityResponse) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
  isUpdating?: boolean;
}

// Entity Item Component
export const EntityItem = ({ entity,  onEdit, onDelete, isDeleting, isUpdating }: EntityItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(entity.name);

  const handleSave = () => {
    if (editedName.trim() !== entity.name) {
      onEdit({ ...entity, name: editedName });
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') {
                setIsEditing(false);
                setEditedName(entity.name);
              }
            }}
          />
          <button
            onClick={handleSave}
            disabled={isUpdating}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditedName(entity.name);
            }}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span className="text-gray-800">{entity.name}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(entity.id)}
              disabled={isDeleting}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Main Component


// Usage examples:
// <CategoryOrState type="category" />
// <CategoryOrState type="state" />