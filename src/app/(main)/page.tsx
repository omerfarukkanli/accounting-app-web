'use client';
import { useCallback, useEffect, useState } from 'react';
import { getAllBanks } from '@/service/bank/bank.service';
import { Bank } from '@/service/types/bank.type.';
import GeneralBankCard from '@/components/bank/GeneralBankCard';
import { toast } from '@/hooks/use-toast';
import { BankCreateModal } from '@/components/bank/CreateBankModel';

export default function Home() {
  const [banks, setBanks] = useState<Bank[] | null>(null);

  const fetchBanks = useCallback(async () => {
    try {
      const response = await getAllBanks();
      if ('data' in response && Array.isArray(response.data.bank)) {
        setBanks(response.data.bank as Bank[]);
      }
    } catch (error) {
      console.error('Error fetching banks:', error);
      toast({
        className: 'bg-red-500 text-white',
        title: 'Hata',
        description: 'Bankalar yüklenirken bir hata oluştu',
      });
    }
  }, []);

  useEffect(() => {
    fetchBanks();
  }, [fetchBanks]);
  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-bold'>Bankalar</h1>
          <BankCreateModal refetch={fetchBanks} />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-max'>
          {banks?.map((bank) => (
            <div key={'credits' + bank._id}>
              <GeneralBankCard refetch={fetchBanks} bank={bank} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
