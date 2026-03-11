import { useState } from 'react';
import {
  TransactionType,
  DEFAULT_INCOME_CATEGORIES,
  DEFAULT_EXPENSE_DAILY_CATEGORIES,
  DEFAULT_EXPENSE_FIXED_CATEGORIES,
} from '@/types/finance';

const defaultMap: Record<TransactionType, string[]> = {
  income: DEFAULT_INCOME_CATEGORIES,
  'expense-daily': DEFAULT_EXPENSE_DAILY_CATEGORIES,
  'expense-fixed': DEFAULT_EXPENSE_FIXED_CATEGORIES,
};

export function useCategories() {
  const [categories, setCategories] = useState<Record<TransactionType, string[]>>({
    income: [...defaultMap.income],
    'expense-daily': [...defaultMap['expense-daily']],
    'expense-fixed': [...defaultMap['expense-fixed']],
  });

  const addCategory = (type: TransactionType, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCategories(prev => {
      if (prev[type].includes(trimmed)) return prev;
      return { ...prev, [type]: [...prev[type], trimmed] };
    });
  };

  const removeCategory = (type: TransactionType, name: string) => {
    setCategories(prev => ({
      ...prev,
      [type]: prev[type].filter(c => c !== name),
    }));
  };

  return { categories, addCategory, removeCategory };
}
