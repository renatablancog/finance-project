import MovementList from '../components/Movements/MovementList';
import MovementForm from '../components/Movements/MovementForm';
import KPICard from '../components/UI/KPICard';
import Title from '../components/UI/Title';
import MovementsTable from '../components/Movements/MovementsTable';
function MovementsPage() {
  return (
    <>
      <Title title='Movements' icon='🏦' />
      <div className='mx-7 flex gap-4'>
        <KPICard action='totalAvailableMoney' />
        <KPICard action='categoryMaxExpense' period='year' />
        <KPICard action='categoryMaxExpense' period='month' />
        <KPICard action='categoryMaxExpense' period='week' />
      </div>
      <div className='flex'>
        <MovementForm />
        <MovementList />
        <MovementsTable />
      </div>
    </>
  );
}

export default MovementsPage;
