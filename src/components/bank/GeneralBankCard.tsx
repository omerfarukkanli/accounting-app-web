import { Bank } from '@/service/types/bank.type.';
import { CSSProperties, useCallback, useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Pencil, Save, Trash2, X } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import DatePicker from '../main/DatePicker';
import { deleteBank, updateBank } from '@/service/bank/bank.service';
import { toast } from '@/hooks/use-toast';

interface BankProps {
  bank: Bank;
  refetch?: () => void;
}

const GeneralBankCard = ({ bank, refetch }: BankProps) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [bankData, setBankData] = useState<Bank>(bank);

  const addNewCredit = useCallback(() => {
    if (!bankData.credits) {
      bankData.credits = [];
    }
    if (!edit) {
      setEdit(true);
    }
    setBankData((prevBank) => ({
      ...prevBank,
      credits: [
        {
          totalInstallments: 0,
          installmentAmount: 0,
          monthlyPayment: 0,
          interestRate: 0,
          startDate: undefined,
        },
        ...prevBank.credits,
      ],
    }));
  }, [bankData, edit]);

  const removeCredit = useCallback((indexToRemove: number) => {
    setBankData((prevBank) => ({
      ...prevBank,
      credits: prevBank.credits.filter((_, index) => index !== indexToRemove),
    }));
  }, []);

  const removeBank = async () => {
    try {
      const response = await deleteBank(bankData._id);

      if (response.success) {
        // Call parent callback to update UI
        if (refetch) refetch();

        toast({
          className: 'bg-green-500 text-white',
          title: 'Başarılı',
          description: response.message,
          duration: 1000,
        });
      } else {
        toast({
          className: 'bg-red-500 text-white',
          title: 'Hata',
          description: response.message,
          duration: 1000,
        });
      }
    } catch (error) {
      console.error('Error deleting bank:', error);
      toast({
        className: 'bg-red-500 text-white',
        title: 'Hata',
        description: 'Banka silinirken bir hata oluştu',
        duration: 1000,
      });
    }
  };

  const handleUpdateBank = async () => {
    const response = await updateBank(bank._id, bankData);

    if (response.success) {
      setEdit(false);
      toast({
        className: 'bg-green-500 text-white',
        title: 'Başarılı',
        description: response.message,
        duration: 1000,
      });
    } else {
      toast({
        className: 'bg-red-500 text-white',
        title: 'Hata',
        description: response.message,
        duration: 1000,
      });
    }
  };

  const changeDate = (date: Date, index: number) => {
    setBankData((prevBank) => ({
      ...prevBank,
      credits: prevBank.credits.map((credit, i) => {
        if (i === index) {
          return { ...credit, startDate: date };
        }
        return credit;
      }),
    }));
  };

  const changeBalance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankData({ ...bankData, balance: parseFloat(e.target.value) });
  };

  const changeTotalDebt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankData({ ...bankData, totalDebt: parseFloat(e.target.value) });
  };

  const editModeStyles: CSSProperties = {
    borderColor: 'white',
    boxShadow: '0 0 0 0px white',
  };

  return (
    <div>
      <Card className='w-full max-w-[350px] bg-white'>
        <CardHeader className='flex flex-row justify-between items-center'>
          {bank.name}
          <div className='flex items-center gap-2'>
            {edit ? (
              <>
                <Button variant='destructive' size='icon' onClick={removeBank}>
                  <Trash2 className='h-4 w-4' />
                </Button>

                <Button
                  variant='default'
                  size='icon'
                  onClick={handleUpdateBank}
                >
                  <Save className='h-4 w-4' />
                </Button>
                <Button
                  variant='default'
                  size='icon'
                  onClick={() => {
                    setEdit(false);
                    setBankData(bank);
                  }}
                >
                  <X className='h-4 w-4' />
                </Button>
              </>
            ) : (
              <Button
                variant='default'
                size='icon'
                onClick={() => setEdit(true)}
              >
                <Pencil className='h-4 w-4' />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className='flex gap-5 w-full justify-between'>
          <>
            <div className='w-1/2'>
              <Label className='text-xs font-light'>Bakiye</Label>
              <Input
                value={bankData.balance}
                onChange={(e) => changeBalance(e)}
                type='number'
                readOnly={!edit}
                style={edit ? {} : editModeStyles}
              />
            </div>
            <div className='w-1/2'>
              <Label className='text-xs font-light'>Toplam Borç</Label>
              <Input
                value={bankData.totalDebt}
                onChange={(e) => changeTotalDebt(e)}
                type='number'
                readOnly={!edit}
                style={edit ? {} : editModeStyles}
              />
            </div>
          </>
        </CardContent>

        <CardContent className='flex justify-end'>
          <Button variant='secondary' onClick={() => setOpen(!open)}>
            Detaylar
          </Button>
        </CardContent>

        {open && (
          <>
            <CardContent className='flex justify-end border-b'>
              <Button variant='default' onClick={addNewCredit}>
                Borç Ekle
              </Button>
            </CardContent>

            <div
              className={`
      ${
        bankData.credits.length > 1
          ? 'h-[440px] overflow-y-auto snap-y snap-mandatory'
          : ''
      }
      transition-all duration-200
    `}
            >
              {bankData.credits.map((credit, index) => (
                <div
                  key={`credit-${index}`}
                  className='border-t last:border-b h-[440px] flex items-center snap-start snap-always'
                >
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
                          readOnly={!edit}
                          type='number'
                          className='mt-1'
                        />
                      </div>

                      <div>
                        <Label className='text-xs font-light'>
                          Taksit Tutarı
                        </Label>
                        <Input
                          value={credit.installmentAmount}
                          readOnly={!edit}
                          type='number'
                          className='mt-1'
                        />
                      </div>

                      <div>
                        <Label className='text-xs font-light'>
                          Toplam Taksit
                        </Label>
                        <Input
                          value={credit.totalInstallments}
                          readOnly={!edit}
                          type='number'
                          className='mt-1'
                        />
                      </div>

                      <div>
                        <Label className='text-xs font-light'>
                          Aylık Ödeme
                        </Label>
                        <Input
                          value={credit.monthlyPayment}
                          readOnly={!edit}
                          type='number'
                          className='mt-1'
                        />
                      </div>

                      <div>
                        <Label className='text-xs font-light'>
                          Başlangıç Tarihi
                        </Label>
                        <DatePicker
                          date={credit.startDate}
                          onDateSelect={(date) =>
                            date && changeDate(date, index)
                          }
                          disabled={!edit}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default GeneralBankCard;
