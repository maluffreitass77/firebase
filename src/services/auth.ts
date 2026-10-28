import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { auth } from './firebase';

let authReadyResolve: (user: User | null) => void;
const authReady = new Promise<User | null>((resolve) => {
  authReadyResolve = resolve;
});

onAuthStateChanged(auth, (user) => authReadyResolve(user));

export const waitForAuthState = () => authReady;
export const register = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);
export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);
export const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);
export const logout = () => signOut(auth);
