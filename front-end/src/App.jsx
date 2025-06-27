import PieChart from './components/PieChart';
import { useEffect, useContext } from 'react';
import { MovementsContext } from './context/movementsContext';

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
      <h1 className='text-2xl mb-6'> Main Dashboard</h1>
      <div className='grid grid-cols-3 gap-4'>
        <div className='card w-full bg-base-100 shadow-sm'>
          <div className='card-body'>
            <span className='text-center'>Income Tracking</span>{' '}
            <PieChart movements={incomes} />
          </div>
        </div>
        <div className='card w-full bg-base-100 shadow-sm'>
          <div className='card-body'>
            <span className='text-center '>Expenses Tracking</span>{' '}
            <PieChart movements={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
