import React from 'react';
import MovementItem from './MovementItem';

function MovementList({ movements }) {
  return (
    <div className='flex flex-col mx-7 my-6'>
      <div className='text-l font-bold mb-2 '>Daily Movements</div>
      <ul className='w-63 list bg-base-100 rounded-box shadow-md'>
        {movements.map((movement) => {
          return (
            <MovementItem
              key={movement.id}
              category={movement.category}
              concept={movement.concept}
              amount={movement.amount}
              income={movement.income}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default MovementList;
