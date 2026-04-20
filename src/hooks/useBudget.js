import { useContext, useMemo } from 'react';
import { FinanceContext } from '../context/financeContextDef';

const useBudget = () => {
  const { budget, updateBudget, transactions } = useContext(FinanceContext);

  const currentMonthExpenses = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions
      .filter((t) => {
        const txDate = new Date(t.date);
        return (
          t.type === 'expense' &&
          txDate.getMonth() === currentMonth &&
          txDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactions]);

  const remainingBudget = useMemo(
    () => budget.monthlyBudget - currentMonthExpenses,
    [budget.monthlyBudget, currentMonthExpenses]
  );

  const percentageUsed = useMemo(
    () =>
      budget.monthlyBudget > 0
        ? Math.min((currentMonthExpenses / budget.monthlyBudget) * 100, 100)
        : 0,
    [currentMonthExpenses, budget.monthlyBudget]
  );

  const isOverBudget = remainingBudget < 0;

  return {
    budget,
    updateBudget,
    currentMonthExpenses,
    remainingBudget,
    percentageUsed,
    isOverBudget,
  };
};

export default useBudget;
