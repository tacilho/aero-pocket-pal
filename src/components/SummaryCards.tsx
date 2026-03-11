interface SummaryProps {
  totalIncome: number;
  totalExpenseDaily: number;
  totalExpenseFixed: number;
  remaining: number;
  dailyAverage: number;
  daysLeft: number;
}

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function SummaryCards({
  totalIncome,
  totalExpenseDaily,
  totalExpenseFixed,
  remaining,
  dailyAverage,
  daysLeft,
}: SummaryProps) {
  const items = [
    { label: 'Recebimentos', value: fmt(totalIncome), color: 'text-income' },
    { label: 'Desp. Diárias', value: fmt(totalExpenseDaily), color: 'text-expense-daily' },
    { label: 'Desp. Fixas', value: fmt(totalExpenseFixed), color: 'text-expense-fixed' },
    { label: 'Saldo', value: fmt(remaining), color: remaining >= 0 ? 'text-income' : 'text-destructive' },
    { label: `Média/dia (${daysLeft}d)`, value: fmt(dailyAverage), color: 'text-primary' },
  ];

  return (
    <div className="glass-panel p-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
      {items.map(item => (
        <div key={item.label} className="space-y-0.5">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{item.label}</p>
          <p className={`text-base sm:text-lg font-bold ${item.color}`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
