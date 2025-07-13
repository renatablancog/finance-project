import React, { useEffect } from 'react';
import { useContext } from 'react';
import { MovementsContext } from '../../context/movementsContext';

function TotalMoneyCard() {
  const { fetchSavings, savings } = useContext(MovementsContext);

  useEffect(() => {
    fetchSavings();
  }, []);

  const backgroundColor = {
    green: 'bg-success',
    red: 'bg-error',
  };

  const chooseColor = savings > 0 ? backgroundColor.green : backgroundColor.red;

  return (
    <div
      className={`card w-50 mx-7 bg-card-xs shadow-sm mb-6 text-white ${chooseColor}`}>
      <div className='card-body'>
        <h2 className='card-title'>Available Money</h2>
        <h3 className='card-title'>{savings}</h3>
      </div>
    </div>
  );
}

export default TotalMoneyCard;
