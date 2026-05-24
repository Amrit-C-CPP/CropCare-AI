import React from 'react';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';
import BottomNavBar from './BottomNavBar';
import { useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  const isLandingPage = location.pathname === '/';

  // Auth and Landing have their own special layouts (Landing has footer, Auth has split view).
  if (isAuthPage || isLandingPage) {
    return (
      <div className="bg-surface text-on-surface min-h-screen font-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary">
        {!isAuthPage && <TopNavbar />}
        {children}
      </div>
    );
  }

  // Dashboard / App Layout
  return (
    <div className="bg-surface text-on-surface min-h-screen font-body-md antialiased overflow-x-hidden">
      <TopNavbar />
      <SideNavbar />
      <main className="pt-[24px] md:pt-[96px] pb-[100px] lg:pl-[280px] min-h-screen flex justify-center">
        {children}
      </main>
      <BottomNavBar />
    </div>
  );
};

export default MainLayout;
