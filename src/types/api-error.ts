export interface ApiErrorResponse {
  statusCode?: number;
  message?: string | string[];
  error?: string;
  errorCode?: string;
}