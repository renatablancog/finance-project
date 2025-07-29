import React from 'react';

function Footer() {
  return (
    <footer className='bottom-0 footer footer-horizontal footer-center bg-neutral text-neutral-content p-10'>
      <aside>
        <p className='font-bold'>
          Made with ❤️ by Ren & Julzz
          <br />
        </p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
}

export default Footer;
