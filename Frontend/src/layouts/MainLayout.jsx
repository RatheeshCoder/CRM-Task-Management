// File: src/layouts/MainLayout.js
import React from 'react';
import Sidebar from '../components/Sidebar/SIdebar';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
