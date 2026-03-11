import { useState } from 'react';
import { TransactionType } from '@/types/finance';
import { Plus, X } from 'lucide-react';

interface Props {
  type: TransactionType;
  categories: string[];
  onAdd: (name: string) => void;
  onRemove: (name: string) => void;
}

const typeLabel: Record<TransactionType, string> = {
  income: 'Entradas',
  'expense-daily': 'Diárias',
  'expense-fixed': 'Fixas',
};

export function CategoryManager({ type, categories, onAdd, onRemove }: Props) {
  const [newCat, setNewCat] = useState('');

  const handleAdd = () => {
    if (newCat.trim()) {
      onAdd(newCat.trim());
      setNewCat('');
    }
  };

  return (
    <div className="glass-panel p-3 space-y-2">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{typeLabel[type]}</p>

      <div className="flex flex-wrap gap-1.5">
        {categories.map(cat => (
          <span
            key={cat}
            className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-muted text-foreground"
          >
            {cat}
            <button onClick={() => onRemove(cat)} className="hover:text-destructive transition-colors">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {categories.length === 0 && (
          <span className="text-xs text-muted-foreground">Nenhuma.</span>
        )}
      </div>

      <div className="flex gap-1.5">
        <input
          className="h-7 px-2 text-xs bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring flex-1"
          placeholder="Nova categoria..."
          value={newCat}
          onChange={e => setNewCat(e.target.value)}
          maxLength={30}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="h-7 px-2 rounded-md bg-primary/20 text-primary text-xs hover:bg-primary/30 transition-colors"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
