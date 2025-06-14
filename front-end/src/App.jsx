import { useEffect, useState, useContext } from 'react';
import { MovementsContext } from './context/movementsContext';
import MovementList from './components/MovementList';
import MovementForm from './components/MovementForm';
import Drawer from './components/Drawer';

function App() {
  //Prueba de contexto
  // const { number } = useContext(MovementsContext);
  const { fetchMovements, movements } = useContext(MovementsContext);

  const date = new Date().getFullYear();

  // Use Effect permite ejecutar código durante un punto específico del ciclo de vida de un componente lo que especifica en que momento del ciclo de vida, son los corchetes, si no hay corchetes va a ser siempre que se muestre el componente, si son vacíos los corchetes solo va a ser la primera vez que el componente se muestre, si hay variables dentro de los corchetes se va a ejecutar cada vez que el valor de esas variables cambie

  useEffect(() => {
    fetchMovements();
  }, []);

  async function handleDeleteMovement(id) {
    const { data } = await axios.delete(`${BASE_URL}/movements/${id}`);

    if (data) {
      setMovements(data.movements);
    }
  }

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
        <MovementList
          movements={movements}
          handleDeleteMovement={handleDeleteMovement}
        />
      </div>
    </div>
  );
}

export default App;
