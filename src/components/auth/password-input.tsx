'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PasswordInput = ({ value, onChange }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex items-center space-x-2'>
      <div className='relative w-full'>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder='Şifre'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='pr-10'
        />
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7'
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeOff className='h-4 w-4 text-gray-500' />
          ) : (
            <Eye className='h-4 w-4 text-gray-500' />
          )}
        </Button>
      </div>
    </div>
  );
};

export default PasswordInput;
