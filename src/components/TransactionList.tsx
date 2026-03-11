import { Transaction } from '@/types/finance';
import { Trash2, Pencil } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Props {
  transactions: Transaction[];
  onRemove: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onEdit: (tx: Transaction) => void;
}

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function TransactionList({ transactions, onRemove, onToggleStatus, onEdit }: Props) {
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
            <input 
              type="checkbox" 
              checked={tx.completed} 
              onChange={() => onToggleStatus(tx.id)}
              className="h-4 w-4 rounded border-border bg-input text-primary focus:ring-ring cursor-pointer"
            />
            
            <div className="min-w-0">
              <p className={`text-sm font-medium truncate ${tx.completed ? 'line-through text-muted-foreground opacity-50' : 'text-foreground'}`}>
                {tx.description}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="font-semibold text-primary/80">{fmt(tx.value)}</span>
                {tx.category && <span>· {tx.category}</span>}
                {tx.date && (
                  <span>· {format(parseISO(tx.date), "dd MMM yyyy", { locale: ptBR })}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit(tx)} 
              className="p-1.5 hover:bg-primary/10 hover:text-primary rounded-md transition-colors"
              title="Editar"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onRemove(tx.id)} 
              className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors"
              title="Excluir"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
