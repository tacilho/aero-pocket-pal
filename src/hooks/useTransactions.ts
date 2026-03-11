import { useState, useMemo } from 'react';
import { Transaction, TransactionType } from '@/types/finance';
import { differenceInDays, endOfMonth } from 'date-fns';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [...prev, { ...tx, id: crypto.randomUUID() }]);
  };

  const removeTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const summary = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.value, 0);

    const totalExpenseDaily = transactions
      .filter(t => t.type === 'expense-daily')
      .reduce((sum, t) => sum + t.value, 0);

    const totalExpenseFixed = transactions
      .filter(t => t.type === 'expense-fixed')
      .reduce((sum, t) => sum + t.value, 0);

    const totalExpenses = totalExpenseDaily + totalExpenseFixed;
    const remaining = totalIncome - totalExpenses;

    const today = new Date();
    const monthEnd = endOfMonth(today);
    const daysLeft = Math.max(differenceInDays(monthEnd, today), 1);
    const dailyAverage = remaining > 0 ? remaining / daysLeft : 0;

    // Dentro do hook useTransactions:
const toggleStatus = (id: string) => {
  setTransactions(prev => prev.map(t => 
    t.id === id ? { ...t, completed: !t.completed } : t
  ));
};

const updateTransaction = (id: string, updatedData: Partial<Transaction>) => {
  setTransactions(prev => prev.map(t => 
    t.id === id ? { ...t, ...updatedData } : t
  ));
};

const updateTransaction = (id: string, updatedData: Partial<Transaction>) => {
  setTransactions(prev => prev.map(t => 
    t.id === id ? { ...t, ...updatedData } : t
  ));
};

    return { totalIncome, totalExpenseDaily, totalExpenseFixed, totalExpenses, remaining, dailyAverage, daysLeft };
  }, [transactions]);

  const getByType = (type: TransactionType) => transactions.filter(t => t.type === type);

  return { transactions, addTransaction, removeTransaction, summary, getByType };
}
