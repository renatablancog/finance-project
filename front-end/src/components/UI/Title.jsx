import React from 'react';

function Title({ icon, title }) {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = dd + '/' + mm + '/' + yyyy;

  return (
    <div>
      <div className='text-7xl mb-5'>{icon}</div>
      <div className='card-title text-3xl font-bold'>{title}</div>
      <div className='divider divider-default text-xs'>
        Today: {formattedToday} 🙂
      </div>
    </div>
  );
}

export default Title;
