export type Bank = {
  name: string;
  totalDept: number;
  balance: number;
  credits: Credit[];
};
export type Credit = {
  installmentAmount: number;
  totalInstallments: number;
  monthlyPayment: number;
  interestRate: number;
  startDate: Date;
};
