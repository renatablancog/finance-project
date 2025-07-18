import PieChart from './components/Charts/PieChart';
import { useEffect, useContext } from 'react';
import { MovementsContext } from './context/movementsContext';
import Title from './components/UI/Title';
import Card from './components/UI/Card';
import KPICard from './components/UI/KPICard';

function App() {
  const { fetchIncomes, fetchExpenses, incomes, expenses } =
    useContext(MovementsContext);

  useEffect(() => {
    fetchIncomes();
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <Title title='Main Dashboard' icon='📊' />
      <div className='flex gap-4'>
        <KPICard action='totalAvailableMoney' />
        <KPICard action='categoryMaxExpense' period='year' />
        <KPICard action='categoryMaxExpense' period='month' />
        <KPICard action='categoryMaxExpense' period='week' />
      </div>

      <div className='grid grid-cols-2 grid-rows-1 gap-4'>
        <Card title='Yearly Income Tracking'>
          <PieChart movements={incomes} />
        </Card>
        <Card title='Yearly Expenses Tracking'>
          <PieChart movements={expenses} />
        </Card>
      </div>
    </div>
  );
}

export default App;
