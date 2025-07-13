import { createContext, useState } from 'react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE;

export const MovementsContext = createContext('');

function MovementsProvider({ children }) {
  // const sharedValue = { number: 5 };
  const [movements, setMovements] = useState([]);
  const [incomes, setIncomes] = useState({});
  const [expenses, setExpenses] = useState({});

  const sharedValue = {
    //Esta es la funcion que hace fetch, encapsulada dentro de un objeto, para ponerla a disposición de quien la necesite
    fetchMovements: async function () {
      const { data } = await axios.get(`${BASE_URL}/movements`);
      console.log(data);
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

      const response = await axios.post(`${BASE_URL}/movements`, newMovement);

      if (response.status === 200) {
        await sharedValue.fetchMovements();
      }
    },
    handleDeleteMovement: async function (id) {
      const response = await axios.delete(`${BASE_URL}/movements/${id}`);

      if (response.status === 200) {
        await sharedValue.fetchMovements();
      }
    },
    fetchIncomes: async function () {
      const { data } = await axios.get(`${BASE_URL}/incomes/summary`);
      // console.log(data);
      //3.
      setIncomes(data);
    },
    fetchExpenses: async function () {
      const { data } = await axios.get(`${BASE_URL}/expenses/summary`);
      // console.log(data);
      //3.
      setExpenses(data);
    },
    movements,
    incomes,
    expenses,
  };

  return (
    <MovementsContext.Provider value={sharedValue}>
      {children}
    </MovementsContext.Provider>
  );
}

export default MovementsProvider;
