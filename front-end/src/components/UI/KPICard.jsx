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

  let category = null;
  let categoryTotals = null;

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
    category = categoryMostExpenses[0].category;
    categoryTotals = categoryMostExpenses[0].categoryTotals;
    KPIToFetch['categoryMaxExpense'].amount = categoryTotals;
  }

  const backgroundColor = {
    green: 'bg-success',
    red: 'bg-error',
  };

  const chooseColor =
    savings > 0 ? backgroundColor.green : backgroundColor.red;

  return (
    <div
      className={`card w-50 bg-card-xs shadow-sm mb-6 text-white ${chooseColor}`}
    >
      <div className='card-body'>
        <h2 className='card-title'>{KPIToFetch[action].title}</h2>
        <h3 className='card-title'>{KPIToFetch[action].amount}</h3>
      </div>
    </div>
  );
}

export default KPICard;
