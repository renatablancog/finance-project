import React from 'react';

function Title({ icon, title }) {
  const date = new Date().getFullYear();
  return (
    <div>
      <div className='text-7xl mb-5'>{icon}</div>
      <div className='card-title text-3xl font-bold'>{title}</div>
      <div className='divider divider-default'>{date}</div>
    </div>
  );
}

export default Title;
