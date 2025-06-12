import React from 'react';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { RiDeleteBinLine } from 'react-icons/ri';

export default function MovementItem({
  id,
  date,
  category,
  concept,
  amount,
  income,
  handleDeleteMovement,
}) {
  const badgeStyles = {
    green: 'badge badge-success',
    red: 'badge badge-error',
  };

  const badgeColor = income ? badgeStyles.green : badgeStyles.red;

  return (
    <>
      <span className='p-4 pb-1 text-xs opacity-60 tracking-wide'>{date}</span>
      <span className='list-row '>
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
        <div
          className='cursor-pointer'
          onClick={() => handleDeleteMovement(id)}>
          <RiDeleteBinLine />
        </div>
      </span>
    </>
  );
}
