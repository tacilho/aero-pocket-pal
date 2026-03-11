import { Transaction, TransactionType } from '@/types/finance';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Props {
  transactions: Transaction[];
  onRemove: (id: string) => void;
}

const typeColors: Record<TransactionType, string> = {
  income: 'bg-income/10 text-income',
  'expense-daily': 'bg-expense-daily/10 text-expense-daily',
  'expense-fixed': 'bg-expense-fixed/10 text-expense-fixed',
};

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function TransactionList({ transactions, onRemove }: Props) {
  if (transactions.length === 0) {
    return (
      <div className="glass-card p-8 text-center text-muted-foreground">
        <p>Nenhum lançamento ainda. Adicione acima!</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="divide-y divide-border">
        {transactions.map(tx => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${typeColors[tx.type]}`}>
                {tx.category}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-foreground truncate">{tx.description}</p>
                <p className="text-xs text-muted-foreground">
                  {format(parseISO(tx.date), "dd 'de' MMM, yyyy", { locale: ptBR })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className={`font-bold ${tx.type === 'income' ? 'text-income' : 'text-destructive'}`}>
                {tx.type === 'income' ? '+' : '-'} {fmt(tx.value)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(tx.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
