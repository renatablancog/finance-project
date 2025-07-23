import React, { useRef, useState } from 'react';

function ThemeSelector() {
  const refTheme = useRef(null);
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem('finance-app-theme')
  );
  const themes = [
    'nord',
    'retro',
    'synthwave',
    'dark',
    'lemonade',
    'valentine',
    'forest',
    'coffee',
    'pastel',
  ];

  function handleSelectTheme() {
    if (refTheme.current) {
      const theme = refTheme.current.value;
      localStorage.removeItem('finance-app-theme');
      localStorage.setItem('finance-app-theme', theme);
      document.getElementById('theme-html').setAttribute('data-theme', theme);
      setCurrentTheme(theme);
    }
  }

  return (
    <div className='dropdown'>
      <label htmlFor='theme' className='label'>
        Select Theme ☀️
      </label>
      <select
        id='theme'
        className='select mb-2 '
        ref={refTheme}
        onChange={handleSelectTheme}
        value={currentTheme}
      >
        {themes.map((theme) => {
          return (
            <option key={theme} value={theme}>
              {theme}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default ThemeSelector;
