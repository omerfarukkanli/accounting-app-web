import { Bank } from '../bank.type.';

export type SuccessResponseType = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: AuthResponse | Bank | any;
  timestamp?: string;
};

export type AuthResponse = {
  access_token: string;
};
