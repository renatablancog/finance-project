import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import MovementsProvider from './context/movementsContext.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MovementsPage from './pages/MovementsPage.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import MovementDetailsPage from './pages/MovementDetailsPage.jsx';
import axios from 'axios';
import NotFound from './pages/NotFound.jsx';

const router = createBrowserRouter([
  {
    Component: MainLayout,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        Component: App,
      },
      {
        path: 'movements',
        children: [
          { index: true, Component: MovementsPage },
          {
            path: ':id',
            loader: async ({ params }) => {
              // params are available in loaders/actions
              let { data } = await axios.get(
                `http://localhost:3001/movements/${params.id}`
              );
              return { movement: data };
            },
            Component: MovementDetailsPage,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <MovementsProvider>
    <RouterProvider router={router} />
  </MovementsProvider>
);
