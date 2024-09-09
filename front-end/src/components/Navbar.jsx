import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const logoUrl =
    'https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/459012995_122096685164521775_8635025157072592808_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=rYhXHhOGJDQQ7kNvgGTxA2N&_nc_ht=scontent-lga3-1.xx&_nc_gid=AdbMt1w0OGiZUNGlaODpxcy&oh=00_AYCl7mHD3fxZDZc-THqYVEki3Pl4wVe_5xGHwastZSnYLQ&oe=66E45BC3';

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start flex items-center">
        <Link to="/" className="flex items-center">
          <img
            src={logoUrl}
            alt="SunVolt Logo"
            className="h-15 w-auto max-w-[180px] object-contain"
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/" className="link-3d">Home</Link></li>
          <li><Link to="/solarInfos" className="link-3d">Solar Infos</Link></li>
          <li><Link to="/about" className="link-3d">About</Link></li>
          <li><Link to="/contact" className="link-3d">Contact Us</Link></li>
        </ul>
      </div>
      <div className="navbar-end flex items-center">
        <ThemeToggle />
        <Link to="/login" className="btn btn-3d">Login</Link>
        <Link to="/signup" className="btn btn-primary btn-3d ml-2">Sign Up</Link>
      </div>
    </div>
  );
};

export default Navbar;
