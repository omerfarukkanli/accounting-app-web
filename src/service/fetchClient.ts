import { deleteToken, getToken } from '@/utils/getOrUpdateToken.utils';

export const baseURL = 'http://localhost:8081';

async function fetchClient(url: string, options: RequestInit) {
  const token = await getToken();
  const headers = new Headers(options.headers);

  if (token?.value) {
    headers.set('Authorization', `Bearer ${token.value}`);
  }
  headers.set('Content-Type', 'application/json');

  try {
    const fullUrl = baseURL + url;
    const response = await fetch(fullUrl, {
      ...options,
      headers,
      cache: options.cache || 'no-store',
    });

    if (response.status === 401) {
      deleteToken();
      return response.json();
    }

    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
}

export default fetchClient;
