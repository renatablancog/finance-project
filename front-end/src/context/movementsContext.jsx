import { createContext, useState } from 'react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE;

export const MovementsContext = createContext('');

function MovementsProvider({ children }) {
  // const sharedValue = { number: 5 };
  const [movements, setMovements] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [savings, setSavings] = useState(0);
  const [categoryMostExpenses, setCategoryMostExpenses] = useState(
    []
  );

  const sharedValue = {
    //Esta es la funcion que hace fetch, encapsulada dentro de un objeto, para ponerla a disposición de quien la necesite
    fetchMovements: async function (limit = 3, offset = 0) {
      const { data } = await axios.get(
        `${BASE_URL}/movements?limit=${limit}&offset=${offset}`
      );

      //3.
      setMovements(data);
    },
    handleMovementFormSubmit: async function (
      categoryValue,
      conceptValue,
      amountValue,
      isIncomeValue
    ) {
      // console.log(categoryValue);

      //to-do: validacion de datos

      const newMovement = {
        category: categoryValue,
        concept: conceptValue,
        amount: amountValue,
        income: isIncomeValue,
      };

      const response = await axios.post(
        `${BASE_URL}/movements`,
        newMovement
      );

      if (response.status === 200) {
        await sharedValue.fetchMovements();
        await sharedValue.fetchSavings();
      }
    },
    handleDeleteMovement: async function (id) {
      const response = await axios.delete(
        `${BASE_URL}/movements/${id}`
      );

      if (response.status === 200) {
        await sharedValue.fetchMovements();
        await sharedValue.fetchSavings();
      }
    },
    fetchIncomes: async function () {
      const { data } = await axios.get(`${BASE_URL}/incomes/summary`);

      setIncomes(data);
    },
    fetchExpenses: async function () {
      const { data } = await axios.get(
        `${BASE_URL}/expenses/summary`
      );

      setExpenses(data);
    },
    fetchSavings: async function () {
      const { data } = await axios.get(
        `${BASE_URL}/movements/savings`
      );
      setSavings(data.savings);
    },
    fetchCategoryWithMostExpenses: async function () {
      const { data } = await axios.get(
        `${BASE_URL}/expenses/category-most-expenses`
      );

      setCategoryMostExpenses(data);
    },
    movements,
    incomes,
    expenses,
    savings,
    categoryMostExpenses,
  };

  return (
    <MovementsContext.Provider value={sharedValue}>
      {children}
    </MovementsContext.Provider>
  );
}

export default MovementsProvider;
