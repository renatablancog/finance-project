import { createContext, useState } from 'react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE;

export const MovementsContext = createContext('');

function MovementsProvider({ children }) {
  // const sharedValue = { number: 5 };
  const [movements, setMovements] = useState([]);

  const sharedValue = {
    //Esta es la funcion que hace fetch, encapsulada dentro de un objeto, para ponerla a disposición de quien la necesite
    fetchMovements: async function () {
      const { data } = await axios.get(`${BASE_URL}/movements`);
      // console.log(data);
      //3.
      setMovements(data.movements);
    },

    movements,
  };

  return (
    <MovementsContext.Provider value={sharedValue}>
      {children}
    </MovementsContext.Provider>
  );
}

export default MovementsProvider;
