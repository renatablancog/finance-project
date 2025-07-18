import React from 'react';
import moment from 'moment';
import { MdCalendarMonth } from 'react-icons/md';
import { useContext, useEffect } from 'react';
import { MovementsContext } from '../../context/movementsContext';

function MovementsTable() {
  const { fetchMonthlySummary, monthlySummary } = useContext(MovementsContext);

  useEffect(() => {
    fetchMonthlySummary();
  }, []);

  return (
    <div className='mx-7 my-6 basis-2/4'>
      <div className='text-l font-bold mb-2 flex items-center'>
        <MdCalendarMonth className='mx-2' />
        Monthly Summary
      </div>
      <div className='p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {monthlySummary.map((month, index) => {
          return (
            <div
              className='card card-border bg-base-100 card-xs p-2'
              key={index}
            >
              <div className='card-body'>
                <h2 className='card-title'>
                  {moment(month.YearMonth, 'YYYY-MM').format('MMM-YYYY')}
                </h2>
                <h3>Expenses: {month.TotalExpenses}</h3>
                <h3>Income: {month.TotalIncomes}</h3>
                <h4>Remaining: {month.TotalIncomes - month.TotalExpenses}</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MovementsTable;
