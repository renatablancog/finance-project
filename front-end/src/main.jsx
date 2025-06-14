import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import MovementsProvider from './context/movementsContext.jsx';

createRoot(document.getElementById('root')).render(
  <MovementsProvider>
    <App />
  </MovementsProvider>
);
