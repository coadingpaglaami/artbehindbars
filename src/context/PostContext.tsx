// contexts/PostsContext.tsx
import React, { createContext, useContext, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface PostsContextType {
  refetchPosts: () => Promise<void>;
  refreshPost: (postId: string) => Promise<void>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  const refetchPosts = useCallback(async () => {
    await queryClient.invalidateQueries({ 
      queryKey: ["posts", "infinite"],
      exact: false,
      refetchType: 'active' // Only refetch active queries
    });
  }, [queryClient]);

  const refreshPost = useCallback(async (postId: string) => {
    // For single post queries if you have them
    await queryClient.invalidateQueries({ 
      queryKey: ["post", postId],
      exact: true
    });
    
    // Also refresh the lists that might contain this post
    await queryClient.invalidateQueries({ 
      queryKey: ["posts", "infinite"],
      exact: false
    });
  }, [queryClient]);

  return (
    <PostsContext.Provider value={{ refetchPosts, refreshPost }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};