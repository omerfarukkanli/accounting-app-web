export type Bank = {
  _id: string;
  name: string;
  totalDebt: number;
  balance: number;
  credits: Credit[];
};
export type Credit = {
  installmentAmount: number;
  totalInstallments: number;
  monthlyPayment: number;
  interestRate: number;
  startDate: Date | undefined;
};
