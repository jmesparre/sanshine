'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, ShoppingCart, FileText, Users } from 'lucide-react';

const AdminSidebar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/admin/dashboard/orders',
      label: 'Órdenes',
      icon: ShoppingCart,
    },
    {
      href: '/admin/dashboard/services',
      label: 'Servicios',
      icon: FileText,
    },
    {
      href: '/admin/dashboard/users',
      label: 'Usuarios',
      icon: Users,
    },
  ];

  return (
    <aside className="w-64 bg-background shadow-md">
      <nav className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100',
              pathname === item.href && 'bg-accent text-gray-900'
            )}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
