import { useEffect, useState } from 'react';
import axios from 'axios';
import MovementList from './components/MovementList';
import MovementForm from './components/MovementForm';
import Drawer from './components/Drawer';

function App() {
  /***
   * Fetch the movements data from backend
   * 1. Definir un estado para los movements
   * 2. Hacer fetch al backend
   * 3. Vaciar informacion en el estado
   * 4. Renderizar el estado
   */

  //1.
  const [movements, setMovements] = useState([]);
  const date = new Date().getFullYear();

  //2. ejecutar código durante un punto específico del ciclo de vida de un componente lo que especifica en que momento del ciclo de vida, son los corchetes, si no hay corchetes va a ser siempre que se muestre el componente, si son vacíos los corchetes solo va a ser la primera vez que el componente se muestre, si hay variables dentro de los corchetes se va a ejecutar cada vez que el valor de esas variables cambie

  useEffect(() => {
    fetchMovements();
  }, []);

  async function fetchMovements() {
    const { data } = await axios.get('http://localhost:3001/movements');
    // console.log(data);
    //3.
    setMovements(data.movements);
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
        <MovementList movements={movements} />
      </div>
    </div>
  );
}

export default App;
