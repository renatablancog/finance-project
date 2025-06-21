import { Link } from 'react-router';
import MovementList from '../components/MovementList';
import MovementForm from '../components/MovementForm';
import TotalMoneyCard from '../components/TotalMoneyCard';

function MovementsPage() {
  const date = new Date().getFullYear();

  return (
    <>
      <div className='text-7xl mb-5'>🏦</div>
      <div className='card-title text-3xl font-bold'>Movements</div>
      <div className='divider divider-default'>{date}</div>
      <TotalMoneyCard />
      <div className='flex'>
        <MovementForm />
        <MovementList />
      </div>
    </>
  );
}

export default MovementsPage;
