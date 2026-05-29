import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TopNavbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth', { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  const linkBase = 'flex items-center h-full px-3 text-sm font-semibold transition-all duration-200 border-b-2';
  const activeLink = `${linkBase} text-primary border-primary`;
  const inactiveLink = `${linkBase} text-on-surface-variant border-transparent hover:text-primary hover:border-primary/40`;

  return (
    <header className="fixed top-0 left-0 right-0 w-full h-16 bg-white/85 backdrop-blur-xl border-b border-outline-variant/40 shadow-sm z-50 flex items-center justify-between px-4 md:px-8">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-3xl">psychiatry</span>
        <span className="font-headline-md text-headline-md font-bold text-primary">CropCare AI</span>
      </Link>

      {/* Center Nav Links */}
      <nav className="hidden md:flex items-center h-full gap-1">
        <Link to="/diagnostic-hub" className={isActive('/diagnostic-hub') ? activeLink : inactiveLink}>
          Scanner
        </Link>
        <Link to="/history" className={isActive('/history') ? activeLink : inactiveLink}>
          History
        </Link>
        <Link to="/wiki" className={isActive('/wiki') ? activeLink : inactiveLink}>
          Wiki
        </Link>
      </nav>

      {/* Right: User / Auth */}
      <div className="flex items-center gap-2 shrink-0">
        {user ? (
          <>
            <Link to="/profile" className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm border border-outline-variant/30 hover:opacity-80 transition-opacity cursor-pointer">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </Link>
            <button
              onClick={handleSignOut}
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-surface-container"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span>Sign Out</span>
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="bg-primary text-on-primary text-sm font-bold py-1.5 px-4 rounded-full hover:opacity-90 transition-opacity"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default TopNavbar;
