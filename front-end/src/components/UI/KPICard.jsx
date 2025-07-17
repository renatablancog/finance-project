import React, { useEffect } from 'react';
import { useContext } from 'react';
import { MovementsContext } from '../../context/movementsContext';

function KPICard({ action }) {
  const {
    fetchSavings,
    savings,
    fetchCategoryWithMostExpenses,
    categoryMostExpenses,
  } = useContext(MovementsContext);

  //KPIS
  const KPIToFetch = {
    totalAvailableMoney: {
      fetch: fetchSavings,
      title: 'Available Money',
      amount: savings,
    },
    categoryMaxExpense: {
      fetch: fetchCategoryWithMostExpenses,
      title: 'Category with Most Expenses',
      amount: 0,
    },
  };

  useEffect(() => {
    KPIToFetch[action].fetch();
  }, []);

  //Special case for card of category with most expenses
  if (
    categoryMostExpenses.length > 0 &&
    action === 'categoryMaxExpense'
  ) {
    KPIToFetch[action].amount =
      categoryMostExpenses[0].categoryTotals;
    KPIToFetch[action].title +=
      ': ' + categoryMostExpenses[0].category;
  }

  const backgroundColor = {
    green: 'bg-success',
    red: 'bg-error',
  };

  const chooseColor =
    savings > 0 ? backgroundColor.green : backgroundColor.red;

  return (
    <div
      className={`card w-60 bg-card-xs shadow-sm mb-6 text-white ${chooseColor}`}
    >
      <div className='card-body'>
        <h2 className='card-title'>{KPIToFetch[action].title}</h2>
        <h3 className='card-title'>${KPIToFetch[action].amount}</h3>
      </div>
    </div>
  );
}

export default KPICard;
