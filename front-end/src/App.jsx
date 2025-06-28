import PieChart from './components/Charts/PieChart';
import { useEffect, useContext } from 'react';
import { MovementsContext } from './context/movementsContext';
import Title from './components/UI/Title';
import Card from './components/UI/Card';
import TotalMoneyCard from './components/UI/TotalMoneyCard';

function App() {
  const { movements, fetchMovements } = useContext(MovementsContext);

  useEffect(() => {
    fetchMovements();
  }, []);

  const incomes = [];
  const expenses = [];

  movements.forEach((movement) =>
    movement.income ? incomes.push(movement) : expenses.push(movement)
  );

  return (
    <div>
      <Title title='Main Dashboard' icon='📊' />
      <div className='flex gap-4'>
        <TotalMoneyCard />
        <TotalMoneyCard />
        <TotalMoneyCard />
      </div>
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
