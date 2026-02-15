/* ---------------- Enums (mirror Prisma) ---------------- */

export type ReportReason =
   "SPAM"
  | "ABUSE"
  | "HARASSMENT"
  | "HATE_SPEECH"
  | "FALSE_INFORMATION"
  | "OTHER";

export type ReportStatus =
  | "PENDING"
  | "RESOLVED";

/* ---------------- Pagination ---------------- */

export interface PaginationQueryDto {
  page?: number;
  limit?: number;
}

export interface PaginationMetaDto {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponseDto<T> {
  data: T[];
  meta: PaginationMetaDto;
}

/* ---------------- Request DTOs ---------------- */

export interface CreatePostDto {
  title: string;
  content: string;
  stateId: string;
  topicId: string;
}

export interface CreateCommentDto {
  content: string;
  parentId?: string;
}

export interface CreateReportDto {
  reason: ReportReason;
  message?: string;
}

export interface CreateCategoryDto {
  name: string;
}

export interface CreateStateDto {
  name: string;
}

/* ---------------- Responses ---------------- */

export interface UserBasicResponse {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface StateResponse {
  id: string;
  name: string;
}

export interface CategoryResponse {
  id: string;
  name: string;
}

export interface TopicResponse {
  id: string;
  name: string;
}

export interface CommentResponse {
  id: string;
  content: string;
  createdAt: string;
  user: UserBasicResponse;
  replies?: CommentResponse[];
}

export interface ReportResponse {
  id: string;
  reason: ReportReason;
  status: ReportStatus;
  createdAt: string;
}

export interface PostResponse {
  id: string;
  title: string;
  content: string;
  imageUrl?: string[];
  videoUrl?: string;
  createdAt: string;

  user: UserBasicResponse;
  state: StateResponse;
  topic: CategoryResponse;

  _count: {
    likes: number;
    comments: number;
  };

  isLiked?: boolean;
  reports?: ReportResponse[];
  comments?: CommentResponse[];
}

export interface LikeToggleResponse {
  liked: boolean;
}

/* ---------------- Query DTOs ---------------- */

export interface GetPostQueryDto extends PaginationQueryDto {
  search?: string;
  stateId?: string;
  topicId?: string;
  recent?: boolean;
  popular?: boolean;
}

export interface AdminGetPostsQueryDto extends PaginationQueryDto {
  minReports?: number;
}
