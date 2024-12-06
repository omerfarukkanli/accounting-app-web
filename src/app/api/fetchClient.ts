'use client';

async function fetchClient(url: string, options: RequestInit = {}) {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('access_token='))
    ?.split('=')[1];
  const baseURL = 'http://localhost:8081';
  const headers = new Headers(options.headers);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  headers.set('Content-Type', 'application/json');

  try {
    const fullUrl = baseURL ? `${baseURL}${url}` : url;

    console.log(fullUrl);
    const response = await fetch(fullUrl, {
      ...options,
      headers,
      cache: options.cache || 'no-store',
    });

    if (!response.ok) {
      if (response.status === 401) {
        document.cookie = 'access_token=; Max-Age=0; path=/';
        window.location.href = '/auth/login';
      }

      const errorData = await response.json();
      throw new Error(errorData.message || 'Bir hata oluştu');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export default fetchClient;
