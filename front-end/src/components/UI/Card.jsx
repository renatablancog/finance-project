import React from 'react';

function Card({ title, children }) {
  return (
    <div className='card w-full bg-base-100 shadow-sm'>
      <div className='card-body'>
        <span className='text-center'>{title}</span>
        {children}
      </div>
    </div>
  );
}

export default Card;
