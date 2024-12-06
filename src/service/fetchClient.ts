import { deleteToken, getToken } from '@/utils/getOrUpdateToken.utils';

async function fetchClient(url: string, options: RequestInit) {
  const token = await getToken();
  const baseURL = 'http://localhost:8081';
  const headers = new Headers(options.headers);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  headers.set('Content-Type', 'application/json');

  try {
    const fullUrl = baseURL ? `${baseURL}${url}` : url;
    const response = await fetch(fullUrl, {
      ...options,
      headers,
      cache: options.cache || 'no-store',
    });

    if (response.status == 401) {
      if (response.status === 401) {
        deleteToken();

        return response.json();
      }
    }

    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
}

export default fetchClient;
