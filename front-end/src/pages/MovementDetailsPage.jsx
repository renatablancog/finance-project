import React from 'react';
import { useLoaderData } from 'react-router';
import { Link } from 'react-router';
import Title from '../components/UI/Title';

function MovementDetailsPage() {
  const { movement } = useLoaderData();
  console.log('movementPage:', movement);

  const backgroundColor = {
    green: 'bg-success',
    red: 'bg-error',
  };

  const chooseColor = movement.income
    ? backgroundColor.green
    : backgroundColor.red;

  return (
    <div className='flex flex-col'>
      <Title title='Movement Details' icon='🕵🏽‍♀️' />
      <div>
        <h2>
          <span className='font-bold'>Concept:</span>{' '}
          {movement.concept}
        </h2>

        <h5>
          <span className='font-bold'>Movement Date:</span>{' '}
          {movement.dom}
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
