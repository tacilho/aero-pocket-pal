import { Transaction, TransactionType } from '@/types/finance';
import { Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Props {
  transactions: Transaction[];
  onRemove: (id: string) => void;
}

const typeColors: Record<TransactionType, string> = {
  income: 'bg-income/15 text-income',
  'expense-daily': 'bg-expense-daily/15 text-expense-daily',
  'expense-fixed': 'bg-expense-fixed/15 text-expense-fixed',
};

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function TransactionList({ transactions, onRemove }: Props) {
  if (transactions.length === 0) {
    return (
      <div className="aero-glass p-6 text-center text-muted-foreground relative">
        <p className="relative z-10 text-sm">Nenhum lançamento ainda.</p>
      </div>
    );
  }

  return (
    <div className="aero-glass overflow-hidden">
      <div className="relative z-10 divide-y divide-border/50">
        {transactions.map(tx => (
          <div
            key={tx.id}
            className="flex items-center justify-between px-4 py-3 hover:bg-primary/5 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              {tx.category && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${typeColors[tx.type]}`}>
                  {tx.category}
                </span>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{tx.description}</p>
                {tx.date && (
                  <p className="text-[10px] text-muted-foreground">
                    {format(parseISO(tx.date), "dd 'de' MMM, yyyy", { locale: ptBR })}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-sm font-bold ${tx.type === 'income' ? 'text-income' : 'text-destructive'}`}>
                {tx.type === 'income' ? '+' : '-'} {fmt(tx.value)}
              </span>
              <button
                onClick={() => onRemove(tx.id)}
                className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
