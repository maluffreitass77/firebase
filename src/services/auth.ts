import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User,
  type UserCredential,
} from 'firebase/auth';

import { auth } from './firebase';

let authReadyResolve: (user: User | null) => void;
const authReady = new Promise<User | null>((resolve) => {
  authReadyResolve = resolve;
});

onAuthStateChanged(auth, (user) => authReadyResolve(user));

export const waitForAuthState = (): Promise<User | null> => authReady;
export const register = (email: string, password: string): Promise<UserCredential> =>
  createUserWithEmailAndPassword(auth, email, password);
export const login = (email: string, password: string): Promise<UserCredential> =>
  signInWithEmailAndPassword(auth, email, password);
export const resetPassword = (email: string): Promise<void> => sendPasswordResetEmail(auth, email);
export const logout = (): Promise<void> => signOut(auth);
