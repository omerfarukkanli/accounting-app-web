'use client';
import { deleteToken } from '@/utils/getOrUpdateToken.utils';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const handleLogout = async () => {
    deleteToken().then(() => router.push('/auth/login'));
  };

  return (
    <header className='header my-2 mx-5 flex justify-end'>
      <Button onClick={handleLogout} variant='default'>
        Çıkış Yap
      </Button>
    </header>
  );
};
export default Header;
