import { useState } from 'react';
import { TransactionType } from '@/types/finance';
import { Plus, X, Tag } from 'lucide-react';

interface Props {
  type: TransactionType;
  categories: string[];
  onAdd: (name: string) => void;
  onRemove: (name: string) => void;
}

const typeLabel: Record<TransactionType, string> = {
  income: 'Entradas',
  'expense-daily': 'Despesas Diárias',
  'expense-fixed': 'Despesas Fixas',
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
    <div className="aero-glass p-4 space-y-3">
      <div className="relative z-10 flex items-center gap-2">
        <Tag className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-bold text-foreground">Categorias — {typeLabel[type]}</h3>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2">
        {categories.map(cat => (
          <span
            key={cat}
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/15 text-primary"
          >
            {cat}
            <button
              onClick={() => onRemove(cat)}
              className="hover:text-destructive transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {categories.length === 0 && (
          <span className="text-xs text-muted-foreground">Nenhuma categoria.</span>
        )}
      </div>

      <div className="relative z-10 flex gap-2">
        <input
          className="aero-input h-8 px-3 text-sm flex-1"
          placeholder="Nova categoria..."
          value={newCat}
          onChange={e => setNewCat(e.target.value)}
          maxLength={30}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="win7-btn rounded-md h-8 px-3 text-xs flex items-center gap-1"
        >
          <Plus className="w-3 h-3" />
          Adicionar
        </button>
      </div>
    </div>
  );
}
