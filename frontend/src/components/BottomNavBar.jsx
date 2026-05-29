import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavBar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/diagnostic-hub', icon: 'document_scanner', label: 'Scanner' },
    { path: '/history', icon: 'history', label: 'History' },
    { path: '/wiki', icon: 'library_books', label: 'Wiki' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full z-50 flex justify-around items-center h-16 bg-white/90 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,0px)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs font-semibold transition-all duration-200 ${
              isActive
                ? 'text-primary'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl transition-all duration-200 ${
                isActive ? 'icon-fill scale-110' : ''
              }`}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
            {isActive && (
              <span className="absolute top-0 w-8 h-0.5 bg-primary rounded-b-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;
