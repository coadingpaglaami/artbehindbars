import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./api";
import {
  CreatePostDto,
  CreateCommentDto,
  CreateReportDto,
  CreateCategoryDto,
  CreateStateDto,
  PaginationQueryDto,
  GetPostQueryDto,
  AdminGetPostsQueryDto,
  PostResponse,
  ReportedPost,
} from "@/types/post.type";
import { PaginatedResponseDto } from "@/types/auction.type";

/* -------- POSTS -------- */

export const useGetAllPosts = (params: GetPostQueryDto) =>
  useQuery({
    queryKey: ["posts", params],
    queryFn: () => api.getAllPosts(params),
  });

export const useGetAllInfinitePosts = (
  search?: string,
  stateId?: string,
  topicId?: string,
  recent?: boolean,
  popular?: boolean,
  limit: number = 10,
) =>
  useInfiniteQuery({
    queryKey: [
      "posts",
      "infinite",
      { search, stateId, topicId, recent, popular, limit },
    ],
    queryFn: ({ pageParam = 1 }) =>
      api.getAllPosts({
        page: pageParam,
        limit,
        ...(search && { search }),
        ...(stateId && { stateId }),
        ...(topicId && { topicId }),
        ...(recent && { recent }),
        ...(popular && { popular }),
      }),
    getNextPageParam: (lastPage: PaginatedResponseDto<PostResponse>) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

export const usePost = (id: string) =>
  useQuery({
    queryKey: ["post", id],
    queryFn: () => api.getPostById(id),
    enabled: !!id,
  });

export const useCreatePost = () =>
  useMutation({
    mutationKey: ["createPost"],
    mutationFn: ({
      payload,
      images,
      video,
    }: {
      payload: CreatePostDto;
      images?: File[];
      video?: File;
    }) => api.createPost(payload, images, video),
  });

/* -------- LIKE / COMMENT / REPORT -------- */

export const useToggleLike = () =>
  useMutation({
    mutationKey: ["toggleLike"],
    mutationFn: api.toggleLike,
  });

export const useCreateComment = () =>
  useMutation({
    mutationKey: ["createComment"],
    mutationFn: ({
      postId,
      payload,
    }: {
      postId: string;
      payload: CreateCommentDto;
    }) => api.createComment(postId, payload),
  });

export const useGetComments = (postId: string) =>
  useQuery({
    queryKey: ["comments", postId],
    queryFn: () => api.getComments(postId),
    enabled: !!postId,
  });

export const useReportPost = () =>
  useMutation({
    mutationKey: ["reportPost"],
    mutationFn: ({
      postId,
      payload,
    }: {
      postId: string;
      payload: CreateReportDto;
    }) => api.reportPost(postId, payload),
  });

/* -------- STATES -------- */

export const useStates = (params: PaginationQueryDto) =>
  useQuery({
    queryKey: ["states", params],
    queryFn: () => api.getStates(params),
  });

export const useCreateState = () =>
  useMutation({
    mutationKey: ["createState"],
    mutationFn: (payload: CreateStateDto) => api.createState(payload),
  });

export const useUpdateState = () =>
  useMutation({
    mutationKey: ["updateState"],
    mutationFn: ({ id, payload }: { id: string; payload: CreateStateDto }) =>
      api.updateState(id, payload),
  });

export const useDeleteState = () =>
  useMutation({
    mutationKey: ["deleteState"],
    mutationFn: (id: string) => api.deleteState(id),
  });

/* -------- CATEGORIES -------- */

export const useCategories = (params: PaginationQueryDto) =>
  useQuery({
    queryKey: ["categories", params],
    queryFn: () => api.getCategories(params),
  });

export const useCreateCategory = () =>
  useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (payload: CreateCategoryDto) => api.createCategory(payload),
  });

export const useUpdateCategory = () =>
  useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: ({ id, payload }: { id: string; payload: CreateCategoryDto }) =>
      api.updateCategory(id, payload),
  });

export const useDeleteCategory = () =>
  useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (id: string) => api.deleteCategory(id),
  });

/* -------- ADMIN -------- */

export const useGetReportedPosts = (params: AdminGetPostsQueryDto) =>
  useQuery({
    queryKey: ["reportedPosts", params],
    queryFn: () => api.getReportedPosts(params),
  });

export const useAdminDeletePostMutation = () =>
  useMutation({
    mutationKey: ["adminDeletePost"],
    mutationFn: (postId: string) => api.adminDeletePost(postId),
  });

export const useSuspendUserMutation = () =>
  useMutation({
    mutationKey: ["suspendUser"],
    mutationFn: ({ userId, days }: { userId: string; days: number }) =>
      api.suspendUser(userId, days),
  });

export const useUnSuspendUserMutation = () =>
  useMutation({
    mutationKey: ["unSuspendUser"],
    mutationFn: (userId: string) => api.unSuspendUser(userId),
  });

export const useInfiniteCategories = (limit: number = 10) =>
  useInfiniteQuery({
    queryKey: ["categories", "infinite"],
    queryFn: ({ pageParam = 1 }) =>
      api.getCategories({ page: pageParam, limit }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

export const useInfiniteStates = (limit: number = 10) =>
  useInfiniteQuery({
    queryKey: ["states", "infinite"],
    queryFn: ({ pageParam = 1 }) => api.getStates({ page: pageParam, limit }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

export const useGetInfiniteUserPosts = (
  userId: string,
  params?: PaginationQueryDto & {
    enabled?: boolean;
  },
) => {
  const { enabled = true, ...queryParams } = params || {};

  return useInfiniteQuery({
    queryKey: ["posts", "user", userId, "infinite", queryParams],
    queryFn: ({ pageParam = 1 }) =>
      api.getUserPosts(userId, {
        page: pageParam,
        limit: queryParams.limit || 10,
        ...queryParams,
      }),
    getNextPageParam: (lastPage: PaginatedResponseDto<PostResponse>) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!userId && enabled,
  });
};

export const useWarnUserMutation = () =>
  useMutation({
    mutationKey: ["warnUser"],
    mutationFn: ({ userId, reason }: { userId: string; reason: string }) =>
      api.warnUser(userId, reason),
  });
