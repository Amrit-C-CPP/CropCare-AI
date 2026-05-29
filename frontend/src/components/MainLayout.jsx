import React from 'react';
import TopNavbar from './TopNavbar';
import BottomNavBar from './BottomNavBar';

const MainLayout = ({ children }) => {
  return (
    <div className="bg-background text-on-background min-h-screen font-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      <TopNavbar />
      <main className="pt-16 pb-24 md:pb-8 min-h-screen">
        {children}
      </main>
      <BottomNavBar />
    </div>
  );
};

export default MainLayout;
