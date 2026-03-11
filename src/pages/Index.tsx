import { useState } from 'react';
import { SummaryCards } from '@/components/SummaryCards';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { CategoryManager } from '@/components/CategoryManager';
import { useTransactions } from '@/hooks/useTransactions';
import { useCategories } from '@/hooks/useCategories';
import { TransactionType } from '@/types/finance';
import { Wallet, Settings } from 'lucide-react';
import win7Bg from '@/assets/win7-bg.jpg';

type TabValue = 'income' | 'expense-daily' | 'expense-fixed';

const tabs: { value: TabValue; label: string }[] = [
  { value: 'income', label: 'Entradas' },
  { value: 'expense-daily', label: 'Despesas Diárias' },
  { value: 'expense-fixed', label: 'Despesas Fixas' },
];

const Index = () => {
  const { addTransaction, removeTransaction, summary, getByType } = useTransactions();
  const { categories, addCategory, removeCategory } = useCategories();
  const [activeTab, setActiveTab] = useState<TabValue>('income');
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Win7 background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${win7Bg})` }}
      />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6">
        {/* Header — Aero titlebar style */}
        <header className="aero-titlebar px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/30">
              <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-foreground">Minhas Finanças</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Controle de entradas e despesas</p>
            </div>
          </div>
          <button
            onClick={() => setShowCategories(!showCategories)}
            className={`win7-btn rounded-md h-8 px-3 text-xs flex items-center gap-1.5 ${showCategories ? 'ring-1 ring-primary' : ''}`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Categorias</span>
          </button>
        </header>

        {/* Summary */}
        <SummaryCards
          totalIncome={summary.totalIncome}
          totalExpenseDaily={summary.totalExpenseDaily}
          totalExpenseFixed={summary.totalExpenseFixed}
          remaining={summary.remaining}
          dailyAverage={summary.dailyAverage}
          daysLeft={summary.daysLeft}
        />

        {/* Category Manager */}
        {showCategories && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

        {/* Tabs */}
        <div className="space-y-0">
          <div className="flex gap-0.5 px-1">
            {tabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`aero-tab text-xs sm:text-sm ${activeTab === tab.value ? 'aero-tab-active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <TransactionForm
              type={activeTab}
              categories={categories[activeTab]}
              onAdd={addTransaction}
            />
            <TransactionList
              transactions={getByType(activeTab)}
              onRemove={removeTransaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
