import React from 'react';
import MovementItem from './MovementItem';
import { useContext, useEffect } from 'react';
import { MovementsContext } from '../context/movementsContext';

function MovementList() {
  const { fetchMovements, movements, handleDeleteMovement } =
    useContext(MovementsContext);
  // Use Effect permite ejecutar código durante un punto específico del ciclo de vida de un componente lo que especifica en que momento del ciclo de vida, son los corchetes, si no hay corchetes va a ser siempre que se muestre el componente, si son vacíos los corchetes solo va a ser la primera vez que el componente se muestre, si hay variables dentro de los corchetes se va a ejecutar cada vez que el valor de esas variables cambie

  useEffect(() => {
    fetchMovements();
  }, []);

  return (
    <div className='flex flex-col mx-7 my-6'>
      <div className='text-l font-bold mb-2 '>Daily Movements</div>
      <ul className='w-63 list bg-base-100 rounded-box shadow-md'>
        {movements.map((movement) => {
          return (
            <li key={movement.id}>
              <MovementItem
                id={movement.id}
                date={movement.dom}
                category={movement.category}
                concept={movement.concept}
                amount={movement.amount}
                income={movement.income}
                handleDeleteMovement={handleDeleteMovement}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MovementList;
