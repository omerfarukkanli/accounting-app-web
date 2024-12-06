export const register = async () => {
  const response = await fetch('http://localhost:8081/auth/signup', {
    body: JSON.stringify({
      email: 'test123@gmail.com',
      password: '123456',
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to register');
  }

  const data = await response.json();
  return data;
};
