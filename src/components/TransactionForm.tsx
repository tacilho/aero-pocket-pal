import { useState } from 'react';
import { TransactionType } from '@/types/finance';
import { Plus } from 'lucide-react';

interface Props {
  type: TransactionType;
  categories: string[];
  onAdd: (tx: { type: TransactionType; description: string; value: number; date?: string; category?: string }) => void;
}

const labelMap: Record<TransactionType, { dateLabel: string; title: string }> = {
  income: { dateLabel: 'Previsão de Recebimento', title: 'Nova Entrada' },
  'expense-daily': { dateLabel: 'Data do Pagamento', title: 'Nova Despesa Diária' },
  'expense-fixed': { dateLabel: 'Data do Pagamento', title: 'Nova Despesa Fixa' },
};

export function TransactionForm({ type, categories, onAdd }: Props) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const labels = labelMap[type];

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
    <form onSubmit={handleSubmit} className="aero-glass p-4 space-y-3">
      <h3 className="relative z-10 text-sm font-bold text-foreground">{labels.title}</h3>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">
            Descrição <span className="text-destructive">*</span>
          </label>
          <input
            className="aero-input w-full h-9 px-3 text-sm"
            placeholder="Ex: Salário mensal"
            value={description}
            onChange={e => setDescription(e.target.value)}
            maxLength={100}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">
            Valor (R$) <span className="text-destructive">*</span>
          </label>
          <input
            className="aero-input w-full h-9 px-3 text-sm"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0,00"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">{labels.dateLabel}</label>
          <input
            className="aero-input w-full h-9 px-3 text-sm"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-muted-foreground">Categoria</label>
          <select
            className="aero-input w-full h-9 px-3 text-sm"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">Sem categoria</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="relative z-10 win7-btn rounded-md h-9 px-4 text-sm flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Adicionar
      </button>
    </form>
  );
}
