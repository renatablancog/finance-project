import React from 'react';
import { Link } from 'react-router';
import ThemeSelector from './ThemeSelector';

function Breadcrumb({ breadcrumbs }) {
  let locationsLevels;
  if (breadcrumbs != '/') {
    locationsLevels = breadcrumbs.split('/');
  } else {
    locationsLevels = [''];
  }

  return (
    <div className='flex justify-between items-center mb-5'>
      <div className='breadcrumbs text-sm '>
        <ul className='capitalize'>
          {locationsLevels.map((level, index) => {
            if (locationsLevels.length - 1 === index) {
              return <li key={index}> {level === '' ? 'Home' : level}</li>;
            } else {
              return (
                <li key={index}>
                  <Link to={level === '' ? '/' : `/${level}`}>
                    {level === '' ? 'Home' : level}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <ThemeSelector />
    </div>
  );
}

export default Breadcrumb;
