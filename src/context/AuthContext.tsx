"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoginModalOpen: boolean;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  promptLogin: (onSuccess?: () => void) => void;
  closeLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const provider = new GoogleAuthProvider();

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [postLoginAction, setPostLoginAction] = useState<(() => void) | null>(
    null
  );

  const promptLogin = (onSuccess?: () => void) => {
    console.log("promptLogin called");
    if (onSuccess) {
      setPostLoginAction(() => onSuccess);
    }
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        closeLoginModal();
        if (postLoginAction) {
          postLoginAction();
          setPostLoginAction(null);
        }
      }
    } catch (error) {
      console.error("Error during sign in with Google:", error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      Cookies.remove('token');
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        Cookies.set('token', token, { expires: 1 }); // Expires in 1 day
        setUser(currentUser);

        // Create or update user document in Firestore
        const userRef = doc(db, "users", currentUser.uid);
        setDoc(userRef, {
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          lastLogin: serverTimestamp(),
        }, { merge: true });

      } else {
        Cookies.remove('token');
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoginModalOpen,
        signInWithGoogle,
        logOut,
        promptLogin,
        closeLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
