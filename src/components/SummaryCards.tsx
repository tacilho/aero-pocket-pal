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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="summary-card summary-card-income">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-xl bg-income/20">
            <TrendingUp className="w-5 h-5 text-income" />
          </div>
          <span className="text-sm font-semibold text-muted-foreground">Recebimentos</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{fmt(totalIncome)}</p>
      </div>

      <div className="summary-card summary-card-expense-daily">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-xl bg-expense-daily/20">
            <Receipt className="w-5 h-5 text-expense-daily" />
          </div>
          <span className="text-sm font-semibold text-muted-foreground">Despesas Diárias</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{fmt(totalExpenseDaily)}</p>
      </div>

      <div className="summary-card summary-card-expense-fixed">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-xl bg-expense-fixed/20">
            <TrendingDown className="w-5 h-5 text-expense-fixed" />
          </div>
          <span className="text-sm font-semibold text-muted-foreground">Despesas Fixas</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{fmt(totalExpenseFixed)}</p>
      </div>

      <div className="summary-card summary-card-remaining">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-xl bg-primary/20">
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <span className="text-sm font-semibold text-muted-foreground">Saldo</span>
        </div>
        <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-income' : 'text-destructive'}`}>
          {fmt(remaining)}
        </p>
      </div>

      <div className="summary-card summary-card-average">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-xl bg-secondary/20">
            <CalendarDays className="w-5 h-5 text-secondary" />
          </div>
          <span className="text-sm font-semibold text-muted-foreground">Média/Dia</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{fmt(dailyAverage)}</p>
        <p className="text-xs text-muted-foreground mt-1">{daysLeft} dias restantes</p>
      </div>
    </div>
  );
}
