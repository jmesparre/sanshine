'use client';

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'users'), orderBy('displayName', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const usersData: User[] = [];
        querySnapshot.forEach((doc) => {
          usersData.push({ uid: doc.id, ...doc.data() } as User);
        });
        setUsers(usersData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching users: ', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filteredUsers = users.filter((user) =>
    (user.displayName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className='m-auto text-center pt-10'>Cargando usuarios...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Input
              type="text"
              placeholder="Buscar por nombre o email..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre Completo</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Servicios Comprados</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.uid} className="cursor-pointer" onClick={() => window.location.href = `/admin/dashboard/users/${user.uid}`}>
                  <TableCell>{user.displayName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">Ver detalles</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
