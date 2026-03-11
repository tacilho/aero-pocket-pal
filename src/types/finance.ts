export type TransactionType = 'income' | 'expense-daily' | 'expense-fixed';

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  value: number;
  date: string;
  category: string;
}

export const INCOME_CATEGORIES = ['Salário', 'Bônus', 'Freelance', 'Investimentos', 'Outros'];
export const EXPENSE_DAILY_CATEGORIES = ['Alimentação', 'Transporte', 'Lazer', 'Compras', 'Outros'];
export const EXPENSE_FIXED_CATEGORIES = ['Aluguel', 'Internet', 'Energia', 'Água', 'Plano de Saúde', 'Streaming', 'Outros'];
