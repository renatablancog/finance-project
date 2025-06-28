import React from 'react';
import { Link } from 'react-router';

function Breadcrumb({ breadcrumbs }) {
  let locationsLevels;
  if (breadcrumbs != '/') {
    locationsLevels = breadcrumbs.split('/');
  } else {
    locationsLevels = [''];
  }

  return (
    <div className='breadcrumbs text-sm'>
      <ul className='capitalize'>
        {locationsLevels.map((level, index) => {
          if (locationsLevels.length - 1 === index) {
            return <li>{level}</li>;
          } else {
            return (
              <li>
                <Link to={level === '' ? '/' : `/${level}`}>
                  {level === '' ? 'Home' : level}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default Breadcrumb;
