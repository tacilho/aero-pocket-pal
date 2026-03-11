import { Transaction, TransactionType } from '@/types/finance';
import { Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Props {
  transactions: Transaction[];
  onRemove: (id: string) => void;
}

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function TransactionList({ transactions, onRemove }: Props) {
  if (transactions.length === 0) {
    return (
      <div className="glass-panel p-8 text-center">
        <p className="text-sm text-muted-foreground">Nenhum lançamento.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel divide-y divide-border/40">
      {transactions.map(tx => (
        <div
          key={tx.id}
          className="flex items-center justify-between px-4 py-2.5 hover:bg-muted/30 transition-colors group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                {tx.category && <span>{tx.category}</span>}
                {tx.category && tx.date && <span>·</span>}
                {tx.date && (
                  <span>{format(parseISO(tx.date), "dd MMM yyyy", { locale: ptBR })}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className={`text-sm font-bold tabular-nums ${tx.type === 'income' ? 'text-income' : 'text-destructive'}`}>
              {tx.type === 'income' ? '+' : '−'} {fmt(tx.value)}
            </span>
            <button
              onClick={() => onRemove(tx.id)}
              className="p-1 rounded text-muted-foreground/0 group-hover:text-muted-foreground hover:!text-destructive transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
