import React from 'react';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { Credit } from '@/service/types/bank.type.';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import DatePicker from '../main/DatePicker';

interface CreditCardContentProps {
  credit: Credit;
  index: number;
  edit: boolean;
  removeCredit: (index: number) => void;
  changeDate: (date: Date, index: number) => void;
  updateCreditField: (index: number, field: string, value: number) => void;
}

const CreditCardContent = ({
  credit,
  index,
  edit,
  removeCredit,
  changeDate,
  updateCreditField,
}: CreditCardContentProps) => {
  return (
    <div className='border-t last:border-b h-[440px] flex items-center snap-start snap-always'>
      <div className='w-full p-4'>
        <div className='flex justify-between items-center mb-4'>
          <span className='font-medium'>Kredi {index + 1}</span>
          {edit && (
            <Button
              variant='destructive'
              size='icon'
              onClick={() => removeCredit(index)}
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          )}
        </div>

        <div className='space-y-3'>
          <div>
            <Label className='text-xs font-light'>Faiz Oranı</Label>
            <Input
              value={credit.interestRate}
              type='number'
              className='mt-1'
              onChange={(e) =>
                updateCreditField(
                  index,
                  'interestRate',
                  parseFloat(e.target.value)
                )
              }
            />
          </div>

          <div>
            <Label className='text-xs font-light'>Taksit Tutarı</Label>
            <Input
              value={credit.installmentAmount}
              type='number'
              className='mt-1'
              onChange={(e) =>
                updateCreditField(
                  index,
                  'installmentAmount',
                  parseFloat(e.target.value)
                )
              }
            />
          </div>

          <div>
            <Label className='text-xs font-light'>Toplam Taksit</Label>
            <Input
              value={credit.totalInstallments}
              readOnly={!edit}
              type='number'
              className='mt-1'
              onChange={(e) =>
                updateCreditField(
                  index,
                  'totalInstallments',
                  parseInt(e.target.value, 10)
                )
              }
            />
          </div>

          <div>
            <Label className='text-xs font-light'>Aylık Ödeme</Label>
            <Input
              value={credit.monthlyPayment?.toString() || '0'}
              type='number'
              className='mt-1'
              readOnly
            />
          </div>

          <div>
            <Label className='text-xs font-light'>Başlangıç Tarihi</Label>
            <DatePicker
              date={credit.startDate}
              onDateSelect={(date) => date && changeDate(date, index)}
              disabled={!edit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardContent;
