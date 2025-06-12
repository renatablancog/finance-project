import React from 'react';
import { FaMoneyBillTransfer } from 'react-icons/fa6';

export default function MovementItem({ category, concept, amount, income }) {
  const badgeStyles = {
    green: 'badge badge-success',
    red: 'badge badge-error',
  };

  const badgeColor = income ? badgeStyles.green : badgeStyles.red;

  return (
    <>
      <li className='p-4 pb-1 text-xs opacity-60 tracking-wide'>January</li>
      <li className='list-row '>
        <div>
          <FaMoneyBillTransfer />
        </div>
        <div>
          <div className='mb-2'>
            {category} - <span className='italic'>{concept}</span>
          </div>
          <div
            className={`text-xs uppercase font-semibold opacity-60 ${badgeColor}`}>
            {amount}
          </div>
        </div>
      </li>
    </>
  );
}
