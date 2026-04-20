import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

const IncomeExpenseChart = ({ transactions }) => {
  const monthlyData = transactions.reduce((acc, t) => {
    const month = format(parseISO(t.date), 'MMM yyyy');
    const existing = acc.find((item) => item.month === month);
    if (existing) {
      if (t.type === 'income') existing.income += Number(t.amount);
      else existing.expense += Number(t.amount);
    } else {
      acc.push({
        month,
        income: t.type === 'income' ? Number(t.amount) : 0,
        expense: t.type === 'expense' ? Number(t.amount) : 0,
      });
    }
    return acc;
  }, []);

  if (monthlyData.length === 0) {
    return <div className="chart-empty">No data available</div>;
  }

  return (
    <div className="chart-container">
      <h3 className="chart-title">Income vs Expense</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
          <Legend />
          <Bar dataKey="income" fill="#4caf50" name="Income" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" fill="#f44336" name="Expense" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseChart;
