import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

interface DatePickerProps {
  date?: Date;
  onDateSelect: (date: Date | undefined) => void;
  disabled?: boolean;
}

const DatePicker = ({ date, onDateSelect, disabled }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? (
            format(date, 'd MMMM yyyy', { locale: tr })
          ) : (
            <span>Tarih Seçin</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className=' bg-white'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={onDateSelect}
          locale={tr}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
