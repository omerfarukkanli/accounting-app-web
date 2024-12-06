export type ErrorResponseType = {
  success: boolean;
  statusCode: number;
  message: string;
  path: string;
  timestamp?: string;
};
