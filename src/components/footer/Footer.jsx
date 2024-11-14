import React from 'react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-white text-center text-black dark:bg-neutral-700 dark:text-white lg:text-left">
    <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-white/10 lg:justify-between">
      <div className="me-12 hidden lg:block">
        <span>Get connected with us on social networks:</span>
      </div>

      {/* Social network icons */}
      <div className="flex justify-center">
        <a href="https://facebook.com" aria-label="Facebook" className="me-6 text-blue-500 text-xl">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" aria-label="Twitter" className="me-6 text-blue-500 text-xl">
          <FaTwitter />
        </a>
        
      </div>
    </div>

   
    <div className="p-6 text-center">
      <span>© 2024 Company All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;
