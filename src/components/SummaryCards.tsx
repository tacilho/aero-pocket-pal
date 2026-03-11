import { TrendingUp, TrendingDown, Wallet, CalendarDays, Receipt } from 'lucide-react';

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
  const cards = [
    {
      label: 'Recebimentos',
      value: fmt(totalIncome),
      icon: TrendingUp,
      colorClass: 'text-income',
      bgClass: 'bg-income/20',
      cardClass: 'summary-card-income',
    },
    {
      label: 'Despesas Diárias',
      value: fmt(totalExpenseDaily),
      icon: Receipt,
      colorClass: 'text-expense-daily',
      bgClass: 'bg-expense-daily/20',
      cardClass: 'summary-card-expense-daily',
    },
    {
      label: 'Despesas Fixas',
      value: fmt(totalExpenseFixed),
      icon: TrendingDown,
      colorClass: 'text-expense-fixed',
      bgClass: 'bg-expense-fixed/20',
      cardClass: 'summary-card-expense-fixed',
    },
    {
      label: 'Saldo',
      value: fmt(remaining),
      icon: Wallet,
      colorClass: remaining >= 0 ? 'text-income' : 'text-destructive',
      bgClass: 'bg-primary/20',
      cardClass: 'summary-card-remaining',
    },
    {
      label: 'Média/Dia',
      value: fmt(dailyAverage),
      icon: CalendarDays,
      colorClass: 'text-accent',
      bgClass: 'bg-accent/20',
      cardClass: 'summary-card-average',
      subtitle: `${daysLeft} dias restantes`,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      {cards.map(c => (
        <div key={c.label} className={`summary-card ${c.cardClass}`}>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded-lg ${c.bgClass}`}>
                <c.icon className={`w-4 h-4 ${c.colorClass}`} />
              </div>
              <span className="text-xs font-semibold text-muted-foreground">{c.label}</span>
            </div>
            <p className={`text-lg lg:text-xl font-bold ${c.colorClass}`}>{c.value}</p>
            {c.subtitle && (
              <p className="text-[10px] text-muted-foreground mt-0.5">{c.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
