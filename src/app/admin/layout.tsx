'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Una vez que la carga ha terminado, verificamos el estado del usuario.
      const adminUid = process.env.NEXT_PUBLIC_ADMIN_UID;

      if (!user) {
        // Si no hay usuario, redirigir al inicio.
        router.push('/');
      } else if (user.uid !== adminUid) {
        // Si el usuario no es el admin, redirigir al inicio.
        router.push('/');
      }
    }
  }, [user, loading, router]);

  // Mientras se verifica el usuario, se puede mostrar un estado de carga.
  if (loading || !user || user.uid !== process.env.NEXT_PUBLIC_ADMIN_UID) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando y verificando permisos...</p>
      </div>
    );
  }

  // Si el usuario es el administrador, mostrar el contenido de la página.
  return <div>{children}</div>;
};

export default AdminLayout;
