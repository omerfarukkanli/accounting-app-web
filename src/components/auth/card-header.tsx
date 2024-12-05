import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthCardHeaderProps {
  title: string;
  description: string;
}

const AuthCardHeader = ({ title, description }: AuthCardHeaderProps) => {
  return (
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
};

export default AuthCardHeader;
