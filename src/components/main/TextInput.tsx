import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface TextInputProps {
  text: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const TextInput = ({ text, label, onchange }: TextInputProps) => {
  return (
    <div>
      {label && <Label className='text-xs font-light'>{label}</Label>}
      <Input
        className='text-base'
        value={text}
        onChange={onchange}
        type='number'
        style={{
          border: 0,
          boxShadow: '0 0 0 0px #e2e8f0',
          borderRadius: '0.375rem',
          padding: '0.5rem',
          width: '100%',
        }}
      />
    </div>
  );
};

export default TextInput;
