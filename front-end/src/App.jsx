import PieChart from './components/Charts/PieChart';
import { useEffect, useContext } from 'react';
import { MovementsContext } from './context/movementsContext';
import Title from './components/UI/Title';
import Card from './components/UI/Card';
import { useState } from 'react';

function App() {
  const { fetchIncomes, fetchExpenses, incomes, expenses } =
    useContext(MovementsContext);

  // useEffect(() => {
  //   fetchIncomes();
  // }, []);

  // useEffect(() => {
  //   fetchExpenses();
  // }, []);

  console.log('incomes:', incomes);
  return (
    <div>
      <Title title='Main Dashboard' icon='📊' />
      <div className='grid grid-cols-3 gap-4'>
        <Card title='Income Tracking'>
          <PieChart movements={incomes} />
        </Card>
        <Card title='Expenses Tracking'>
          <PieChart movements={expenses} />
        </Card>
      </div>
    </div>
  );
}

export default App;
