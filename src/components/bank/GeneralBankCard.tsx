import { Bank } from '@/service/types/bank.type.';
import { useCallback, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import BankHeader from './BankHeader';
import BankCardMainContent from './BankCardMainContent';
import CreditCardContent from './CreditCardContent';

interface BankProps {
  bank: Bank;
  refetch?: () => void;
}

const GeneralBankCard = ({ bank, refetch }: BankProps) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [bankData, setBankData] = useState<Bank>({
    ...bank,
    credits: bank.credits || [],
  });

  const addNewCredit = useCallback(() => {
    if (!edit) {
      setEdit(true);
    }

    setBankData((prevBank) => {
      const newCredit = {
        totalInstallments: 0,
        installmentAmount: 0,
        monthlyPayment: 0,
        interestRate: 0,
        startDate: new Date(),
      };

      const updatedCredits = Array.isArray(prevBank.credits)
        ? [newCredit, ...prevBank.credits]
        : [newCredit];

      return {
        ...prevBank,
        credits: updatedCredits,
      };
    });
  }, [edit]);

  const removeCredit = useCallback(
    (indexToRemove: number) => {
      setBankData((prevBank) => ({
        ...prevBank,
        credits: prevBank.credits.filter((_, i) => i !== indexToRemove),
      }));
    },
    [setBankData]
  );

  const changeDate = (date: Date, index: number) => {
    setBankData((prevBank: Bank) => ({
      ...prevBank,
      credits: prevBank.credits.map((credit, i) => {
        if (i === index) {
          return { ...credit, startDate: date };
        }
        return credit;
      }),
    }));
  };

  const updateCreditField = useCallback(
    (index: number, field: string, value: number) => {
      setBankData((prevBank) => {
        const updatedCredits = prevBank.credits.map((credit, i) => {
          if (i === index) {
            const updatedCredit = { ...credit, [field]: value };

            const principal = updatedCredit.installmentAmount;
            const interestRate = updatedCredit.interestRate / 100 / 12; // Aylık faiz oranı
            const totalInstallments = updatedCredit.totalInstallments;

            if (interestRate > 0 && totalInstallments > 0) {
              const monthlyPayment =
                (principal * interestRate) /
                (1 - Math.pow(1 + interestRate, -totalInstallments));

              updatedCredit.monthlyPayment = parseFloat(
                monthlyPayment.toFixed(2)
              );
              bankData.totalDebt = parseFloat(
                (monthlyPayment * totalInstallments).toFixed(2)
              );
            } else {
              updatedCredit.monthlyPayment = 0;
              bankData.totalDebt = 0;
            }

            return updatedCredit;
          }
          return credit;
        });

        return {
          ...prevBank,
          credits: updatedCredits,
        };
      });
    },
    [bankData]
  );

  return (
    <div>
      <Card className='w-full max-w-[350px] bg-white'>
        <BankHeader
          bank={bankData}
          setBank={setBankData}
          edit={edit}
          setEdit={setEdit}
          refetch={refetch}
        />
        <BankCardMainContent
          bank={bankData}
          setBank={setBankData}
          edit={edit}
        />
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
                <CreditCardContent
                  edit={edit}
                  key={`credit-${index}`}
                  credit={credit}
                  index={index}
                  removeCredit={removeCredit}
                  changeDate={changeDate}
                  updateCreditField={updateCreditField}
                />
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default GeneralBankCard;
