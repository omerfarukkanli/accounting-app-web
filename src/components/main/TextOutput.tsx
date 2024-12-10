import { Label } from '../ui/label';

interface TextOutputProps {
  text: string;
  label?: string;
}

const TextOutput = ({ text, label }: TextOutputProps) => {
  return (
    <div>
      {label && <Label className='text-xs font-light'>{label}</Label>}
      <p className='text-base'>{text}</p>
    </div>
  );
};

export default TextOutput;
