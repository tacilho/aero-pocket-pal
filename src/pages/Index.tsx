import { useState } from 'react';
import { SummaryCards } from '@/components/SummaryCards';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { CategoryManager } from '@/components/CategoryManager';
import { useTransactions } from '@/hooks/useTransactions';
import { useCategories } from '@/hooks/useCategories';
import { Wallet, ChevronDown } from 'lucide-react';

type TabValue = 'income' | 'expense-daily' | 'expense-fixed';

const tabs: { value: TabValue; label: string }[] = [
  { value: 'income', label: 'Entradas' },
  { value: 'expense-daily', label: 'Diárias' },
  { value: 'expense-fixed', label: 'Fixas' },
];

const Index = () => {
  const { addTransaction, removeTransaction, toggleStatus, summary, getByType } = useTransactions();
  const { categories, addCategory, removeCategory } = useCategories();
  const [activeTab, setActiveTab] = useState<TabValue>('income');
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10 space-y-5">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Wallet className="w-5 h-5 text-primary" />
            <h1 className="text-sm font-bold tracking-wide uppercase">Finanças</h1>
          </div>
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            Categorias
            <ChevronDown className={`w-3 h-3 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
          </button>
        </header>

        <SummaryCards
          totalIncome={summary.totalIncome}
          totalExpenseDaily={summary.totalExpenseDaily}
          totalExpenseFixed={summary.totalExpenseFixed}
          remaining={summary.remaining}
          dailyAverage={summary.dailyAverage}
          daysLeft={summary.daysLeft}
        />

        {showCategories && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {tabs.map(tab => (
              <CategoryManager
                key={tab.value}
                type={tab.value}
                categories={categories[tab.value]}
                onAdd={(name) => addCategory(tab.value, name)}
                onRemove={(name) => removeCategory(tab.value, name)}
              />
            ))}
          </div>
        )}

        <div className="space-y-3">
          <div className="flex gap-1">
            {tabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`text-xs font-semibold px-4 py-2 rounded-md transition-all ${
                  activeTab === tab.value
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <TransactionForm
            type={activeTab}
            categories={categories[activeTab]}
            onAdd={addTransaction}
          />
          
          <TransactionList
            transactions={getByType(activeTab)}
            onRemove={removeTransaction}
            onToggleStatus={toggleStatus}
            onEdit={(tx) => console.log("Editar:", tx)}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
