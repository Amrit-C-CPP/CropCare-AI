import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TopNavbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="hidden md:flex fixed top-0 w-full h-[72px] bg-white/80 backdrop-blur-md dark:bg-surface-container/80 border-b border-outline-variant shadow-sm z-50 justify-between items-center px-gutter max-w-container-max mx-auto">
      <div className="flex items-center gap-md">
        <Link to="/" className="font-display text-headline-md font-bold text-primary dark:text-primary-fixed">
          🌿 CropCare AI
        </Link>
      </div>

      <div className="flex items-center gap-lg">
        <Link 
          to="/diagnostic-hub" 
          className={`font-display text-body-md font-bold transition-colors duration-200 ${isActive('/diagnostic-hub') ? 'text-primary dark:text-primary-fixed border-b-2 border-primary pb-1' : 'text-on-surface-variant dark:text-on-surface-variant hover:text-primary'}`}
        >
          Scanner
        </Link>
        <Link 
          to="/history" 
          className={`font-display text-body-md font-bold transition-colors duration-200 ${isActive('/history') ? 'text-primary dark:text-primary-fixed border-b-2 border-primary pb-1' : 'text-on-surface-variant dark:text-on-surface-variant hover:text-primary'}`}
        >
          History
        </Link>
        <Link 
          to="/wiki" 
          className={`font-display text-body-md font-bold transition-colors duration-200 ${isActive('/wiki') ? 'text-primary dark:text-primary-fixed border-b-2 border-primary pb-1' : 'text-on-surface-variant dark:text-on-surface-variant hover:text-primary'}`}
        >
          Wiki
        </Link>
      </div>

      <div className="flex items-center gap-sm">
        {user ? (
          <>
            <button onClick={handleSignOut} className="bg-surface-container hover:bg-surface-variant text-on-surface font-bold py-xs px-md rounded-full transition-all text-sm">
              Sign Out
            </button>
            <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant flex items-center justify-center font-bold text-primary">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
          </>
        ) : (
          <Link to="/auth" className="bg-[#166534] hover:bg-[#15803d] text-white font-bold py-xs px-md rounded-full transition-all">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default TopNavbar;
