import LoginForm from '@/components/auth/login-form';

const LoginPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <LoginForm isLoginPage />
    </div>
  );
};

export default LoginPage;
