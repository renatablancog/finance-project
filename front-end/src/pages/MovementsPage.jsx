import { Link } from 'react-router';
import MovementList from '../components/Movements/MovementList';
import MovementForm from '../components/Movements/MovementForm';
import TotalMoneyCard from '../components/UI/TotalMoneyCard';
import Title from '../components/UI/Title';
function MovementsPage() {
  return (
    <>
      <Title title='Movements' icon='🏦' />
      <TotalMoneyCard />
      <div className='flex'>
        <MovementForm />
        <MovementList />
      </div>
    </>
  );
}

export default MovementsPage;
