"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  deleteUser,
  type User,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase.client";
import { isAllowedAdminEmail } from "@/lib/admin";

interface AdminContextValue {
  isAdmin: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextValue | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdminRole = useCallback(async (uid: string): Promise<boolean> => {
    if (!db) return false;
    const userDoc = await getDoc(doc(db, "users", uid));
    const data = userDoc.data();
    return data?.role === "admin";
  }, []);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        setUser(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const emailAllowed = isAllowedAdminEmail(fbUser.email ?? null);
        if (!emailAllowed && auth) {
          await firebaseSignOut(auth);
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        const hasAdminRole = await checkAdminRole(fbUser.uid);
        if (!hasAdminRole && auth) {
          await firebaseSignOut(auth);
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        setUser(fbUser);
        setIsAdmin(true);
      } catch (err) {
        console.error("[AdminContext] Error checking admin:", err);
        setUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [checkAdminRole]);

  const login = useCallback(async (email: string, password: string) => {
    if (!auth) throw new Error("Firebase auth not initialized");
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const logout = useCallback(async () => {
    if (!auth) return;
    await firebaseSignOut(auth);
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, user, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (ctx === undefined) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return ctx;
}

export async function createAdminUser(
  email: string,
  password: string,
  adminEmail: string
): Promise<{ uid: string }> {
  if (!auth || !db) throw new Error("Firebase not initialized");

  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  if (user.email?.toLowerCase().trim() !== adminEmail.toLowerCase().trim()) {
    await deleteUser(user);
    throw new Error("Not authorized");
  }

  return { uid: user.uid };
}
