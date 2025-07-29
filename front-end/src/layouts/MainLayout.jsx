import React from 'react';
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import Breadcrumb from '../components/UI/Breadcrumb';
import Footer from '../components/UI/Footer';

const routeItems = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Movements',
    path: '/movements',
  },
];

export default function MainLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let location = useLocation();
  let styleActive = '';
  function toggleDrawer() {
    setIsDrawerOpen(!isDrawerOpen);
  }

  return (
    <div className='drawer'>
      <input
        id='my-drawer'
        type='checkbox'
        className='drawer-toggle relative'
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      <label
        htmlFor='my-drawer'
        className='m-2 btn btn-square btn-ghost drawer-button absolute'
        // onClick={toggleDrawer}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          className='inline-block h-7 w-7 stroke-current'
        >
          {' '}
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M4 6h16M4 12h16M4 18h16'
          ></path>{' '}
        </svg>
      </label>
      <div className='drawer-content'>
        {/* Page content here */}
        <div className='mx-18 my-10 min-h-screen'>
          <Breadcrumb breadcrumbs={location.pathname} />
          <Outlet />
        </div>{' '}
        <Footer />
      </div>
      <div className='drawer-side'>
        <label
          htmlFor='my-drawer'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <ul className='menu bg-base-200 text-base-content min-h-full w-50 p-4 '>
          {/* Sidebar content here */}
          {routeItems.map((item, i) => {
            styleActive =
              location.pathname === item.path ? 'font-bold underline' : '';

            return (
              <Link
                className={`mb-2 text-lg ${styleActive}`}
                onClick={toggleDrawer}
                to={`${item.path}`}
                key={i}
              >
                {item.title}
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
/**
 * cuando estemos en '/' subrayar el Link correspondiente
 *
 */
