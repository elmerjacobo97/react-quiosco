import React from 'react';
import { AdminSidebar } from '../components';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AdminLayout = () => {
  useAuth({ middleware: 'admin' });

  return (
    <div className="flex flex-col md:flex-row">
      <AdminSidebar />
      <main className="flex-1 h-screen md:overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
};
