import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SideNavbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  const navItems = [
    { path: '/diagnostic-hub', icon: 'document_scanner', label: 'Scanner' },
    { path: '/history', icon: 'history', label: 'History' },
    { path: '/wiki', icon: 'library_books', label: 'Wiki' }
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-surface dark:bg-surface-dim border-r border-outline-variant flex-col p-md z-40 pt-[96px]">
      <div className="mb-lg px-xs">
        <div className="flex items-center gap-sm mb-xs">
          <div className="w-12 h-12 rounded-full bg-surface-container-high overflow-hidden flex items-center justify-center text-primary font-bold text-xl">
             {user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="overflow-hidden">
            <h2 className="font-display text-body-md font-bold text-on-surface truncate">{user?.email || 'Guest'}</h2>
            <p className="font-display text-label-mono text-on-surface-variant">Premium Agri-Tech</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-xs">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex items-center gap-sm px-md py-sm rounded-xl transition-all ${isActive ? 'bg-secondary-container text-on-secondary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-display text-body-md">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-md flex flex-col gap-sm">
        {user && (
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-container-high rounded-xl transition-all"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-display text-body-md">Logout</span>
          </button>
        )}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mt-2">
           <h3 className="text-green-800 font-bold text-xs mb-2">Need Help?</h3>
           <button className="w-full bg-[#166534] text-white font-display text-[12px] font-bold py-2 rounded-lg hover:bg-primary transition-colors">
              Get Support
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideNavbar;
