import React from 'react';
import { useContext } from 'react';
import { MovementsContext } from '../../context/movementsContext';

function TotalMoneyCard() {
  const { movements } = useContext(MovementsContext);
  console.log(movements);
  const total = movements.reduce(
    (acc, curr) => (curr.income ? (acc += curr.amount) : (acc -= curr.amount)),
    0
  );

  const backgroundColor = {
    green: 'bg-success',
    red: 'bg-error',
  };

  const chooseColor = total > 0 ? backgroundColor.green : backgroundColor.red;

  return (
    <div
      className={`card w-50 mx-7 bg-card-xs shadow-sm mb-6 text-white ${chooseColor}`}>
      <div className='card-body'>
        <h2 className='card-title'>Available Money</h2>
        <h3 className='card-title'>{total}</h3>
      </div>
    </div>
  );
}

export default TotalMoneyCard;
