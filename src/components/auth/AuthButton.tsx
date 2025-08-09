"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const AuthButton = () => {
  const { user, loading, logOut, promptLogin } = useAuth();

  if (loading) {
    return <Button variant="outline" disabled>Cargando...</Button>;
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm capitalize">{user.displayName}</span>
        <button onClick={logOut} className="text-sm text-gray-600 hover:text-gray-900">
          Log out
        </button>
      </div>
    );
  }

  return (
    <Button variant="outline" className="font-light hover:font-normal border-gray-600" onClick={() => promptLogin()}>
      Iniciar Sesión
    </Button>
  );
};

export default AuthButton;
