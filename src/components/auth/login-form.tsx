'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import CardHeader from './card-header';
import PasswordInput from './password-input';

interface LoginFormProps {
  isLoginPage?: boolean;
}

const LoginForm = ({ isLoginPage }: LoginFormProps) => {
  const [passwprd, setPassword] = useState('');
  const [email, setEmail] = useState('');
  return (
    <Card className='w-[350px]'>
      <CardHeader
        title={isLoginPage ? 'Giriş Yap' : 'Kayıt Ol'}
        description={
          isLoginPage
            ? 'Giriş yapmak için email ve şifrenizi giriniz'
            : 'Kayıt olmak için kullanıcı adı, email ve şifrenizi giriniz'
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
            <PasswordInput value={passwprd} onChange={(e) => setPassword(e)} />
            <Button type='submit'>
              {isLoginPage ? 'Giriş Yap' : 'Kayıt Ol'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
