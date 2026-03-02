export interface FanMailSender {
  id: string;
  firstName: string;
  lastName: string;
}

export interface FanMailArtist {
  id: string;
  name: string;
}

export interface FanMailItem {
  id: string;
  subject: string | null;
  message: string;
  status: 'PENDING' | 'REPLIED' | 'ARCHIVED';
  isArchived: boolean;
  createdAt: string;
  sender: FanMailSender;
  artist: FanMailArtist;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface FanMailApiResponse {
  data: FanMailItem[];
  meta: PaginationMeta;
}

// Query Parameters Interface
export interface FanMailQueryDto {
  page?: number;
  limit?: number;
  status?: 'PENDING' | 'REPLIED';
  isArchived?: boolean;
}

// Mutation DTOs
export interface ReplyFanMailDto {
  message: string;
}

export interface ReplyFanMailPayload {
  id: string;
  payload: ReplyFanMailDto;
}

// Formatted Fan Mail Interface for UI
export interface FormattedFanMail {
  messageId: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  date: string;
  status: 'Unread' | 'Replied';
  isArchived: boolean;
  senderId: string;
  artistId: string;
  originalMessage?: FanMailItem; // Keep reference to original data if needed
}