import { useEffect, useState, useContext } from 'react';
import { MovementsContext } from './context/movementsContext';
import MovementList from './components/MovementList';
import MovementForm from './components/MovementForm';
import Drawer from './components/Drawer';

function App() {
  //Prueba de contexto
  // const { number } = useContext(MovementsContext);

  const date = new Date().getFullYear();

  return (
    <div className='mx-18 my-10'>
      <div className='text-7xl mb-5'>🏦</div>
      <div className='card-title text-3xl font-bold'>
        Dashboard Finanzas Personales (Presupuestos, Reportes y Control de
        Gastos)
      </div>
      <div className='divider divider-default'>{date}</div>
      <div className='flex'>
        <MovementForm />
        <MovementList />
      </div>
    </div>
  );
}

export default App;
