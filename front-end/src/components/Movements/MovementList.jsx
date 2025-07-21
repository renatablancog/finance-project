import React from 'react';
import MovementItem from './MovementItem';
import { useContext, useEffect, useState } from 'react';
import { MovementsContext } from '../../context/movementsContext';
import { LuReceipt } from 'react-icons/lu';

function MovementList() {
  const [currentPage, setCurrentPage] = useState(0);
  const { fetchMovements, movements, handleDeleteMovement, totalPages } =
    useContext(MovementsContext);
  const limit = 3;

  // Use Effect permite ejecutar código durante un punto específico del ciclo de vida de un componente lo que especifica en que momento del ciclo de vida, son los corchetes, si no hay corchetes va a ser siempre que se muestre el componente, si son vacíos los corchetes solo va a ser la primera vez que el componente se muestre, si hay variables dentro de los corchetes se va a ejecutar cada vez que el valor de esas variables cambie
  useEffect(() => {
    const offset = limit * currentPage;
    fetchMovements(limit, offset);
  }, [currentPage]);

  function handlePrevPage() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className='flex flex-col mx-7 my-6'>
      <div className='text-l font-bold mb-2 flex items-center'>
        <LuReceipt className='mx-2' />
        Last 3 Movements
      </div>
      {/* pagination */}
      <div className='join grid grid-cols-2 mb-2'>
        <button
          className='join-item btn text-primary text-xs btn-xs'
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          className='join-item btn text-primary text-xs btn-xs'
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
      {/*movements list */}
      <ul className='w-63 list bg-base-100 rounded-box shadow-md'>
        {movements.map((movement) => {
          return (
            <li key={movement.id}>
              <MovementItem
                id={movement.id}
                date={movement.date}
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
