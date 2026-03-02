import axios from "@/lib/axios";
import {
  CreatePostDto,
  CreateCommentDto,
  CreateReportDto,
  CreateCategoryDto,
  CreateStateDto,
  PaginationQueryDto,
  GetPostQueryDto,
  AdminGetPostsQueryDto,
  PaginatedResponseDto,
  PostResponse,
  CategoryResponse,
  StateResponse,
  LikeToggleResponse,
} from "@/types/post.type";

const POST = "/post";

/* ---------- POSTS ---------- */

export const createPost = async (
  payload: CreatePostDto,
  images?: File[],
  video?: File
) => {
  const form = new FormData();

  Object.entries(payload).forEach(([k, v]) => form.append(k, v));

  images?.forEach((img) => form.append("images", img));
  if (video) form.append("video", video);

  const { data } = await axios.post(POST, form,{
    timeout: 60000, // 60 seconds timeout for post creation with media
  });
  return data;
};

export const getAllPosts = async (
  params: GetPostQueryDto
): Promise<PaginatedResponseDto<PostResponse>> => {
  const { data } = await axios.get(POST, { params });
  return data;
};

export const getPostById = async (id: string): Promise<PostResponse> => {
  const { data } = await axios.get(`${POST}/${id}`);
  return data;
};

/* ---------- LIKE / COMMENT / REPORT ---------- */

export const toggleLike = async (postId: string): Promise<LikeToggleResponse> => {
  const { data } = await axios.patch(`${POST}/${postId}/like`);
  return data;
};

export const createComment = async (
  postId: string,
  payload: CreateCommentDto
) => {
  const { data } = await axios.post(`${POST}/${postId}/comment`, payload);
  return data;
};

export const getComments = async (postId: string) => {
  const { data } = await axios.get(`${POST}/${postId}/comment`);
  return data;
};

export const reportPost = async (
  postId: string,
  payload: CreateReportDto
) => {
  const { data } = await axios.post(`${POST}/${postId}/report`, payload);
  return data;
};

/* ---------- STATES ---------- */

export const getStates = async (
  params: PaginationQueryDto
): Promise<PaginatedResponseDto<StateResponse>> => {
  const { data } = await axios.get(`${POST}/states`, { params });
  return data;
};

export const createState = async (payload: CreateStateDto) => {
  const { data } = await axios.post(`${POST}/state`, payload);
  return data;
};

export const updateState = async (id: string, payload: CreateStateDto) => {
  const { data } = await axios.patch(`${POST}/state/${id}`, payload);
  return data;
};

export const deleteState = async (id: string) => {
  const { data } = await axios.delete(`${POST}/state/${id}`);
  return data;
};

/* ---------- CATEGORIES ---------- */

export const getCategories = async (
  params: PaginationQueryDto
): Promise<PaginatedResponseDto<CategoryResponse>> => {
  const { data } = await axios.get(`${POST}/categories`, { params });
  return data;
};

export const createCategory = async (payload: CreateCategoryDto) => {
  const { data } = await axios.post(`${POST}/category`, payload);
  return data;
};

export const updateCategory = async (id: string, payload: CreateCategoryDto) => {
  const { data } = await axios.patch(`${POST}/category/${id}`, payload);
  return data;
};

export const deleteCategory = async (id: string) => {
  const { data } = await axios.delete(`${POST}/category/${id}`);
  return data;
};

/* ---------- ADMIN ---------- */

export const getReportedPosts = async (
  params: AdminGetPostsQueryDto
): Promise<PaginatedResponseDto<PostResponse>> => {
  const { data } = await axios.get(`${POST}/admin/reported-posts`, { params });
  return data;
};

export const adminDeletePost = async (postId: string) => {
  const { data } = await axios.delete(`${POST}/admin/posts/${postId}`);
  return data;
};

export const suspendUser = async (userId: string, days: number) => {
  const { data } = await axios.post(`${POST}/admin/users/${userId}/suspend`, {
    days,
  });
  return data;
};

export const unSuspendUser = async (userId: string) => {
  const { data } = await axios.post(`${POST}/admin/users/${userId}/unsuspend`);
  return data;
};

export const getUserPosts = async (
  userId: string,
  params: PaginationQueryDto
): Promise<PaginatedResponseDto<PostResponse>> => {
  const { data } = await axios.get(`${POST}/${userId}/user/`, { params });
  return data;
}

export const warnUser = async (userId: string, reason: string) => {
  const { data } = await axios.post(`${POST}/warn-user`, {
    userId,
    reason,
  });
  return data;
}