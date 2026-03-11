import { useState } from 'react';
import { TransactionType } from '@/types/finance';
import { Plus } from 'lucide-react';

interface Props {
  type: TransactionType;
  categories: string[];
  onAdd: (tx: { type: TransactionType; description: string; value: number; date?: string; category?: string }) => void;
}

export function TransactionForm({ type, categories, onAdd }: Props) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !value) return;
    onAdd({
      type,
      description: description.trim(),
      value: parseFloat(value),
      date: date || undefined,
      category: category || undefined,
    });
    setDescription('');
    setValue('');
    setDate('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-4">
      <div className="grid grid-cols-2 sm:grid-cols-[1fr_auto_auto_auto_auto] gap-2 items-end">
        <input
          className="col-span-2 sm:col-span-1 h-9 px-3 text-sm bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="Descrição *"
          value={description}
          onChange={e => setDescription(e.target.value)}
          maxLength={100}
        />
        <input
          className="h-9 px-3 text-sm bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring w-28"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="R$ 0,00 *"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <input
          className="h-9 px-3 text-sm bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <select
          className="h-9 px-3 text-sm bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">Categoria</option>
          {(categories || []).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button
          type="submit"
          className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Adicionar</span>
        </button>
      </div>
    </form>
  );
}
