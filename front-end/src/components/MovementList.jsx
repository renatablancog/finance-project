import React from 'react';
import MovementItem from './MovementItem';

function MovementList({ movements, handleDeleteMovement }) {
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
