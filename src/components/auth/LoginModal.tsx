"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal, signInWithGoogle } = useAuth();

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={closeLoginModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Hola un gusto recibirte</DialogTitle>
          <DialogDescription>
            Inicia sesión para registrar tu pago.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <Button variant="outline" className="w-full" onClick={signInWithGoogle}>
            Iniciar sesión con Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
