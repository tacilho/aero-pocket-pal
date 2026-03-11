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
<div className="flex items-center gap-3">
  <input 
    type="checkbox" 
    checked={tx.completed} 
    onChange={() => onToggleStatus(tx.id)}
    className="h-4 w-4 rounded border-border bg-input text-primary focus:ring-ring"
  />
  <span className={`flex-1 ${tx.completed ? 'line-through text-muted-foreground' : ''}`}>
    {tx.description}
  </span>
  <button onClick={() => onEdit(tx)} className="p-1 hover:bg-muted rounded">
    <Pencil className="w-4 h-4" />
  </button>
  {/* Botão de remover existente */}
</div>
        </div>
      ))}
    </div>
  );
}
