import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { MovementsContext } from '../../context/movementsContext';

function KPICard({ action, period }) {
  const { fetchSavings, savings, fetchCategoryWithMostExpenses } =
    useContext(MovementsContext);

  const [categoryMostExpenses, setCategoryMostExpenses] = useState('');
  const [categoryTotals, setCategoryTotals] = useState(0);

  //KPIS;
  const KPIToFetch = {
    totalAvailableMoney: {
      fetch: fetchSavings,
      title: 'Available Money',
      amount: savings,
    },
    categoryMaxExpense: {
      fetch: () => fetchCategoryWithMostExpenses(period),
      title: 'Category with Most Expenses',
      amount: 0,
    },
  };

  useEffect(() => {
    if (action !== 'totalAvailableMoney') {
      async function fetchKPIData() {
        const { category, categoryTotals } = await KPIToFetch[action].fetch();
        setCategoryMostExpenses(category);
        setCategoryTotals(categoryTotals);
      }
      fetchKPIData();
    } else {
      KPIToFetch[action].fetch();
    }
  }, []);

  // Special case for card of category with most expenses
  if (categoryMostExpenses.length > 0 && action === 'categoryMaxExpense') {
    KPIToFetch[action].amount = categoryTotals;
    KPIToFetch[action].title +=
      ' in the ' +
      period.charAt(0).toUpperCase() +
      period.slice(1) +
      ': ' +
      categoryMostExpenses;
  }

  const backgroundColor = {
    green: 'bg-success',
    red: 'bg-error',
  };

  const chooseColor = savings > 0 ? backgroundColor.green : backgroundColor.red;

  return (
    <div
      className={`card w-80 bg-card-xs shadow-sm mb-6 text-white ${chooseColor}`}
    >
      <div className='card-body'>
        <h2 className='card-title'>{KPIToFetch[action].title}</h2>
        <h3 className='card-title'>${KPIToFetch[action].amount}</h3>
      </div>
    </div>
  );
}

export default KPICard;
