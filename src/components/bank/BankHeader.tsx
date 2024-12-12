import { Pencil, Save, Trash2, X } from 'lucide-react';
import { Button } from '../ui/button';
import { CardHeader } from '../ui/card';
import { Bank } from '@/service/types/bank.type.';
import { deleteBank, updateBank } from '@/service/bank/bank.service';
import { toast } from '@/hooks/use-toast';

interface BankHeaderProps {
  bank: Bank;
  edit: boolean;
  setEdit: (edit: boolean) => void;
  setBank: (bank: Bank) => void;
  refetch?: () => void;
}

const BankHeader = ({
  bank,
  edit,
  setEdit,
  setBank,
  refetch,
}: BankHeaderProps) => {
  const removeBank = async () => {
    try {
      const response = await deleteBank(bank._id);

      if (response.success) {
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
    console.log('bank:', bank);
    try {
      const response = await updateBank(bank._id, bank);

      if (response.success) {
        setEdit(false);
        toast({
          className: 'bg-green-500 text-white',
          title: 'Başarılı',
          description: response.message,
          duration: 1000,
        });
        await refetch?.();
      } else {
        throw new Error(response.message || 'Güncelleme başarısız oldu');
      }
    } catch (error) {
      console.error('Error updating bank:', error);
      toast({
        className: 'bg-red-500 text-white',
        title: 'Hata',
        description:
          error instanceof Error
            ? error.message
            : 'Banka güncellenirken bir hata oluştu',
        duration: 1000,
      });
    }
  };
  return (
    <CardHeader className='flex flex-row justify-between items-center'>
      {bank.name}
      <div className='flex items-center gap-2'>
        {edit ? (
          <>
            <Button variant='destructive' size='icon' onClick={removeBank}>
              <Trash2 className='h-4 w-4' />
            </Button>

            <Button variant='default' size='icon' onClick={handleUpdateBank}>
              <Save className='h-4 w-4' />
            </Button>
            <Button
              variant='default'
              size='icon'
              onClick={() => {
                setEdit(false);
                setBank(bank);
              }}
            >
              <X className='h-4 w-4' />
            </Button>
          </>
        ) : (
          <Button variant='default' size='icon' onClick={() => setEdit(true)}>
            <Pencil className='h-4 w-4' />
          </Button>
        )}
      </div>
    </CardHeader>
  );
};

export default BankHeader;
