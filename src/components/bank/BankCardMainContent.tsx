import { Bank } from '@/service/types/bank.type.';
import { CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { CSSProperties } from 'react';

interface BankCardMainContentProps {
  bank: Bank;
  setBank: (bank: Bank) => void;
  edit: boolean;
  refetch?: () => void;
}

const BankCardMainContent = ({
  bank,
  edit,
  setBank,
}: BankCardMainContentProps) => {
  const editModeStyles: CSSProperties = {
    borderColor: 'white',
    boxShadow: '0 0 0 0px white',
  };

  const changeBalance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBank({ ...bank, balance: parseFloat(e.target.value) });
  };

  const changeTotalDebt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBank({ ...bank, totalDebt: parseFloat(e.target.value) });
  };

  return (
    <CardContent className='flex gap-5 w-full justify-between'>
      <div className='w-1/2'>
        <Label className='text-xs font-light'>Bakiye</Label>
        <Input
          value={bank.balance}
          onChange={(e) => changeBalance(e)}
          type='number'
          readOnly={!edit}
          style={edit ? {} : editModeStyles}
        />
      </div>
      <div className='w-1/2'>
        <Label className='text-xs font-light'>Toplam Borç</Label>
        <Input
          value={bank.totalDebt}
          onChange={(e) => changeTotalDebt(e)}
          type='number'
          readOnly={!edit}
          style={edit ? {} : editModeStyles}
        />
      </div>
    </CardContent>
  );
};

export default BankCardMainContent;
