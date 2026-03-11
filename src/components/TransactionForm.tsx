import { useState } from 'react';
import { TransactionType, INCOME_CATEGORIES, EXPENSE_DAILY_CATEGORIES, EXPENSE_FIXED_CATEGORIES } from '@/types/finance';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

interface Props {
  type: TransactionType;
  onAdd: (tx: { type: TransactionType; description: string; value: number; date: string; category: string }) => void;
}

const categoryMap: Record<TransactionType, string[]> = {
  income: INCOME_CATEGORIES,
  'expense-daily': EXPENSE_DAILY_CATEGORIES,
  'expense-fixed': EXPENSE_FIXED_CATEGORIES,
};

const labelMap: Record<TransactionType, { dateLabel: string; title: string }> = {
  income: { dateLabel: 'Previsão de Recebimento', title: 'Nova Entrada' },
  'expense-daily': { dateLabel: 'Data do Pagamento', title: 'Nova Despesa Diária' },
  'expense-fixed': { dateLabel: 'Data do Pagamento', title: 'Nova Despesa Fixa' },
};

export function TransactionForm({ type, onAdd }: Props) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  const categories = categoryMap[type];
  const labels = labelMap[type];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !value || !date || !category) return;

    onAdd({
      type,
      description: description.trim(),
      value: parseFloat(value),
      date,
      category,
    });

    setDescription('');
    setValue('');
    setDate('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-5 space-y-4">
      <h3 className="text-lg font-bold text-foreground">{labels.title}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`desc-${type}`}>Descrição</Label>
          <Input
            id={`desc-${type}`}
            placeholder="Ex: Salário mensal"
            value={description}
            onChange={e => setDescription(e.target.value)}
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`value-${type}`}>Valor (R$)</Label>
          <Input
            id={`value-${type}`}
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0,00"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`date-${type}`}>{labels.dateLabel}</Label>
          <Input
            id={`date-${type}`}
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Categoria</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full sm:w-auto gap-2">
        <Plus className="w-4 h-4" />
        Adicionar
      </Button>
    </form>
  );
}
