'use client';

import React from 'react';
import AdminSidebar from './AdminSidebar';
import { Toaster } from '@/components/ui/toaster';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen ">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-scroll">
        {children}
        <Toaster />
      </main>
    </div>
  );
};

export default AdminLayout;
