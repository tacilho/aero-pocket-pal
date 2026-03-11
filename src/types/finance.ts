export type TransactionType = 'income' | 'expense-daily' | 'expense-fixed';

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  value: number;
  date?: string;
  category?: string;
  completed: boolean; // Adicionado para suportar o status
}

export const DEFAULT_INCOME_CATEGORIES = ['Salário', 'Bônus', 'Freelance', 'Investimentos'];
export const DEFAULT_EXPENSE_DAILY_CATEGORIES = ['Alimentação', 'Transporte', 'Lazer', 'Compras'];
export const DEFAULT_EXPENSE_FIXED_CATEGORIES = ['Aluguel', 'Internet', 'Energia', 'Água', 'Plano de Saúde', 'Streaming'];
