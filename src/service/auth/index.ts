import { saveToken } from '@/utils/getOrUpdateToken.utils';
import fetchClient from '../fetchClient';
import { User } from '../types/userType';
import { ErrorResponseType } from '../types/db/ErrorResponseType';
import { SuccessResponseType } from '../types/db/SucceccResponseType';

export const login = async (
  body: User
): Promise<ErrorResponseType | SuccessResponseType> => {
  const response: SuccessResponseType | ErrorResponseType = await fetchClient(
    '/auth/signin',
    {
      method: 'POST',
      body: JSON.stringify(body),
    }
  );
  if (!response.success) {
    return response as ErrorResponseType;
  }
  saveToken((response as SuccessResponseType).data.access_token);
  return response as SuccessResponseType;
};

export const register = async (
  body: User
): Promise<ErrorResponseType | SuccessResponseType> => {
  const response: SuccessResponseType | ErrorResponseType = await fetchClient(
    '/auth/signup',
    {
      method: 'POST',
      body: JSON.stringify(body),
    }
  );
  if (!response.success) {
    return response as ErrorResponseType;
  }
  saveToken((response as SuccessResponseType).data.access_token);
  return response as SuccessResponseType;
};
