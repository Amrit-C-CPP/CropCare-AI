import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavBar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/diagnostic-hub', icon: 'document_scanner', label: 'Scanner' },
    { path: '/history', icon: 'history', label: 'History' },
    { path: '/wiki', icon: 'library_books', label: 'Wiki' },
    { path: '/auth', icon: 'person', label: 'Profile' }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-margin-mobile py-sm bg-white/90 backdrop-blur-lg dark:bg-surface-container-highest/90 rounded-t-xl border-t border-outline-variant shadow-lg pb-[env(safe-area-inset-bottom)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link 
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center rounded-full px-4 py-1 active:scale-90 transition-transform ${isActive ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant active:bg-surface-variant'}`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-display text-label-mono mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;
