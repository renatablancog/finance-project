import MovementList from '../components/Movements/MovementList';
import MovementForm from '../components/Movements/MovementForm';
import KPICard from '../components/UI/KPICard';
import Title from '../components/UI/Title';
function MovementsPage() {
  return (
    <>
      <Title title='Movements' icon='🏦' />
      <div className='mx-7'>
        <KPICard action='totalAvailableMoney' />
        <KPICard action='categoryMaxExpense' />
      </div>
      <div className='flex'>
        <MovementForm />
        <MovementList />
      </div>
    </>
  );
}

export default MovementsPage;
