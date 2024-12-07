'use client';
import { FormEvent, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import CardHeader from './card-header';
import PasswordInput from './password-input';
import { useToast } from '@/hooks/use-toast';
import { register, login } from '@/service/auth';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';

interface LoginFormProps {
  isLoginPage?: boolean;
}

const LoginForm = ({ isLoginPage }: LoginFormProps) => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleLoginOrRegisterClick = async (e: FormEvent) => {
    e.preventDefault();

    let title;
    let description;

    const isValid = email.length === 0 && password.length === 0;

    console.log('isValid:', isValid);
    if (isValid) {
      title = 'Hata';
      description = 'Lütfen tüm alanları doldurunuz';
      return toast({
        className: 'bg-red-500 text-white',
        title: title,
        description: description,
        duration: 1000,
      });
    }

    try {
      const data = isLoginPage
        ? await login({ email, password })
        : await register({ email, password });

      title = data.success ? 'Başarılı' : 'Hata';
      description = data.message;

      toast({
        className: data.success
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white',
        title: title,
        description: description,
        duration: 1000,
      });

      if (data.success) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRouteChange = () => {
    if (isLoginPage) {
      router.push('/auth/register');
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <Card className='w-[350px]'>
      <CardHeader
        title={isLoginPage ? 'Giriş Yap' : 'Kayıt Ol'}
        description={
          isLoginPage
            ? 'Giriş yapmak için email ve şifrenizi giriniz'
            : 'Kayıt olmak için email ve şifrenizi giriniz'
        }
      />
      <CardContent>
        <form>
          <div className='gap-5 flex flex-col'>
            <Input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput value={password} onChange={(e) => setPassword(e)} />

            <Button onClick={handleLoginOrRegisterClick}>
              {isLoginPage ? 'Giriş Yap' : 'Kayıt Ol'}
            </Button>
            <div className='flex flex-row justify-between'>
              <label className='flex items-center'>
                {isLoginPage
                  ? 'Kayıtlı değil misiniz?'
                  : 'Zaten hesabınız var mı?'}
              </label>
              <label
                className='hover:underline cursor-pointer'
                onClick={handleRouteChange}
              >
                {isLoginPage ? 'Kayıt Ol' : 'Giriş Yap'}
              </label>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
