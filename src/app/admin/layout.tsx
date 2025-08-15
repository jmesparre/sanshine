'use client';

import { ReactNode } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminLayoutProps {
  children: ReactNode;
}

const RootAdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading || user?.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
    return <div>Loading...</div>;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

export default RootAdminLayout;
