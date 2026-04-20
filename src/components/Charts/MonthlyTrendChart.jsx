import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

const MonthlyTrendChart = ({ transactions }) => {
  const monthlyData = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      const month = format(parseISO(t.date), 'MMM yyyy');
      const existing = acc.find((item) => item.month === month);
      if (existing) {
        existing.amount += Number(t.amount);
      } else {
        acc.push({ month, amount: Number(t.amount) });
      }
      return acc;
    }, [])
    .sort((a, b) => new Date(a.month) - new Date(b.month));

  if (monthlyData.length === 0) {
    return <div className="chart-empty">No trend data available</div>;
  }

  return (
    <div className="chart-container">
      <h3 className="chart-title">Monthly Spending Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#f44336"
            strokeWidth={3}
            dot={{ r: 5 }}
            name="Expenses"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrendChart;
