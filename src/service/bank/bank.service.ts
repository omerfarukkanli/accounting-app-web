import fetchClient from '../fetchClient';
import { Bank } from '../types/bank.type.';
import { CreateBank } from '../types/db/CreateBankType';
import { ErrorResponseType } from '../types/db/ErrorResponseType';
import { SuccessResponseType } from '../types/db/SucceccResponseType';

export const createBank = async (
  body: CreateBank
): Promise<ErrorResponseType | SuccessResponseType> => {
  const response: SuccessResponseType | ErrorResponseType = await fetchClient(
    '/bank',
    {
      method: 'POST',
      body: JSON.stringify(body),
    }
  );

  if (!response.success) return response as ErrorResponseType;

  return response as SuccessResponseType;
};
export const getAllBanks = async (): Promise<
  ErrorResponseType | SuccessResponseType
> => {
  const response: SuccessResponseType | ErrorResponseType = await fetchClient(
    '/bank',
    {
      method: 'GET',
    }
  );
  if (!response.success) return response as ErrorResponseType;

  return response as SuccessResponseType;
};

export const getBankById = async (
  id: string
): Promise<ErrorResponseType | SuccessResponseType> => {
  const response: SuccessResponseType | ErrorResponseType = await fetchClient(
    `/bank/${id}`,
    {
      method: 'GET',
    }
  );
  if (!response.success) return response as ErrorResponseType;

  return response as SuccessResponseType;
};

export const deleteBank = async (
  id: string
): Promise<ErrorResponseType | SuccessResponseType> => {
  const response: SuccessResponseType | ErrorResponseType = await fetchClient(
    `/bank/${id}`,
    {
      method: 'DELETE',
    }
  );
  if (!response.success) return response as ErrorResponseType;

  return response as SuccessResponseType;
};

export const updateBank = async (
  id: string,
  body: Bank
): Promise<ErrorResponseType | SuccessResponseType> => {
  const response: SuccessResponseType | ErrorResponseType = await fetchClient(
    `/bank/${id}`,
    {
      body: JSON.stringify(body),
      method: 'PATCH',
    }
  );
  if (!response.success) return response as ErrorResponseType;

  return response as SuccessResponseType;
};
