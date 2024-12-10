import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createBank } from '@/service/bank/bank.service';
import { Bank } from '@/service/types/bank.type.';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { CreateBank } from '@/service/types/db/CreateBankType';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface BankCreateModalProps {
  refetch: () => void;
}

export function BankCreateModal({ refetch }: BankCreateModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createBankData, setCreateBankData] = useState<CreateBank>({
    name: '',
    totalDebt: 0,
    balance: 0,
    credits: [],
  });

  const handleSubmit = async () => {
    try {
      if (!createBankData.name.trim()) {
        toast({
          className: 'bg-red-500 text-white',
          title: 'Hata',
          description: 'Banka adı boş olamaz',
          duration: 2000,
        });
        return;
      }

      setLoading(true);
      const response = await createBank({
        ...createBankData,
        name: createBankData.name.trim(),
        totalDebt: Number(createBankData.totalDebt) || 0,
        balance: Number(createBankData.balance) || 0,
        credits: createBankData.credits || [],
      });

      if (!response.success) {
        throw new Error(response.message || 'Banka oluşturulamadı');
      }

      toast({
        className: 'bg-green-500 text-white',
        title: 'Başarılı',
        description: 'Banka başarıyla oluşturuldu',
        duration: 2000,
      });

      // Reset form and close modal before refetch
      setCreateBankData({
        name: '',
        totalDebt: 0,
        balance: 0,
        credits: [],
      });
      setOpen(false);

      // Perform refetch after UI updates
      await refetch();
    } catch (error) {
      console.error('Error:', error);
      toast({
        className: 'bg-red-500 text-white',
        title: 'Hata',
        description: error instanceof Error ? error.message : 'Bir hata oluştu',
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='default'>Banka Ekle</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Yeni Banka Ekle</DialogTitle>
        </DialogHeader>
        <Card>
          <CardHeader>Banka Bilgileri</CardHeader>
          <CardContent>
            <Label className=' '>Banka Adı</Label>
            <Input
              type='text'
              value={createBankData.name}
              onChange={(e) =>
                setCreateBankData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <Label className=' '>Toplam Borç</Label>
            <Input
              type='number'
              value={createBankData.totalDebt}
              onChange={(e) =>
                setCreateBankData((prev) => ({
                  ...prev,
                  totalDebt: Number(e.target.value),
                }))
              }
            />
            <Label className=' '>Bakiye</Label>
            <Input
              type='number'
              value={createBankData.balance}
              onChange={(e) =>
                setCreateBankData((prev) => ({
                  ...prev,
                  balance: Number(e.target.value),
                }))
              }
            />
          </CardContent>
          <CardContent>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Oluşturuluyor...' : 'Kaydet'}
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
