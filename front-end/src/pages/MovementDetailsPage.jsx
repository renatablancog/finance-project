import React from 'react';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router';

function MovementDetailsPage() {
  const { movement } = useLoaderData();

  const backgroundColor = {
    green: 'bg-success',
    red: 'bg-error',
  };

  const chooseColor = movement.income
    ? backgroundColor.green
    : backgroundColor.red;

  return (
    <div className='flex flex-col'>
      <div className='breadcrumbs text-sm'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/movements'>Movements</Link>
          </li>
          <li>Movement: {movement.concept}</li>
        </ul>
      </div>
      <div className='mt-8'>
        <h2>
          <span className='font-bold'>Concept:</span> {movement.concept}
        </h2>

        <h5>
          <span className='font-bold'>Movement Date:</span> {movement.dom}
        </h5>
        <h5>
          <span className='font-bold'>Amount</span> ${movement.amount}
        </h5>
        <h4 className={`${chooseColor} badge mt-4`}>
          {movement.income ? 'Income' : 'Expense'}
        </h4>
      </div>
    </div>
  );
}

export default MovementDetailsPage;
