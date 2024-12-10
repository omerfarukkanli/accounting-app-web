import { Credit } from '../bank.type.';

export type CreateBank = {
  name: string;
  totalDebt: number;
  balance: number;
  credits: Credit[];
};
