import { ReactNode } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';

interface AdminLayoutProps {
  children: ReactNode;
}

const RootAdminLayout = ({ children }: AdminLayoutProps) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default RootAdminLayout;
