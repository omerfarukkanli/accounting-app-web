export type SuccessResponseType = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: AuthResponse | any;
  timestamp?: string;
};

export type AuthResponse = {
  access_token: string;
};
