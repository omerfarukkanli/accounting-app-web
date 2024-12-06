'use server';
import { cookies } from 'next/headers';

export const getToken = async () => {
  const cookieStore = cookies();
  return (await cookieStore).get('access_token');
};

export const saveToken = async (access_token: string) => {
  const cookieStore = cookies();
  (await cookieStore).set('access_token', access_token);
};

export const deleteToken = async () => {
  const cookieStore = cookies();
  (await cookieStore).delete('access_token');
};

export const updateToken = async (access_token: string) => {
  const cookieStore = cookies();
  (await cookieStore).set('access_token', access_token);
};
