import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle'; 

const Navbar = () => {
  
  const logoUrl = 'https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/458934602_122096408642521775_3750370131260775868_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=p8CZowXAcyoQ7kNvgFu958c&_nc_ht=scontent-lga3-1.xx&oh=00_AYAKR2RuXgDaRoXqg5jRjzXWk1Vwm119DZg99pCzWG-YIw&oe=66E3E93B';

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/solarInfos">Solar Infos</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li> {/* Added Sign Up link */}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost">
          <img src={logoUrl} alt="SunVolt Logo" className="h-12" /> {/* Use image URL */}
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/solarInfos">Solar Infos</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>
      <div className="navbar-end flex items-center">
        <ThemeToggle /> {/* Add ThemeToggle component here */}
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn btn-primary ml-2">Sign Up</Link> {/* Added Sign Up button */}
      </div>
    </div>
  );
};

export default Navbar;
