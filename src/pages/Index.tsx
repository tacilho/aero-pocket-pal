import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SummaryCards } from '@/components/SummaryCards';
import { TransactionForm } from '@/components/TransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { useTransactions } from '@/hooks/useTransactions';
import { Wallet } from 'lucide-react';
import aeroBg from '@/assets/aero-bg.jpg';

const Index = () => {
  const { transactions, addTransaction, removeTransaction, summary, getByType } = useTransactions();

  return (
    <div className="min-h-screen relative">
      {/* Aero background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${aeroBg})` }}
      />
      <div className="fixed inset-0 -z-10 bg-background/60 backdrop-blur-sm" />

      <div className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <header className="glass-card-strong p-6 flex items-center gap-4">
          <div className="p-3 rounded-2xl aero-gradient">
            <Wallet className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">Minhas Finanças</h1>
            <p className="text-sm text-muted-foreground">Controle suas entradas e despesas</p>
          </div>
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

        {/* Tabs */}
        <Tabs defaultValue="income" className="space-y-6">
          <TabsList className="glass-card-strong p-1 h-auto gap-1 w-full sm:w-auto">
            <TabsTrigger value="income" className="data-[state=active]:aero-gradient data-[state=active]:text-primary-foreground rounded-xl px-4 py-2.5 font-semibold">
              Entradas
            </TabsTrigger>
            <TabsTrigger value="expense-daily" className="data-[state=active]:aero-gradient-warm data-[state=active]:text-primary-foreground rounded-xl px-4 py-2.5 font-semibold">
              Despesas Diárias
            </TabsTrigger>
            <TabsTrigger value="expense-fixed" className="data-[state=active]:bg-expense-fixed data-[state=active]:text-expense-fixed-foreground rounded-xl px-4 py-2.5 font-semibold">
              Despesas Fixas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="income" className="space-y-4">
            <TransactionForm type="income" onAdd={addTransaction} />
            <TransactionList transactions={getByType('income')} onRemove={removeTransaction} />
          </TabsContent>

          <TabsContent value="expense-daily" className="space-y-4">
            <TransactionForm type="expense-daily" onAdd={addTransaction} />
            <TransactionList transactions={getByType('expense-daily')} onRemove={removeTransaction} />
          </TabsContent>

          <TabsContent value="expense-fixed" className="space-y-4">
            <TransactionForm type="expense-fixed" onAdd={addTransaction} />
            <TransactionList transactions={getByType('expense-fixed')} onRemove={removeTransaction} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
