import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { db } from './firebase';

export interface Profile {
  fullName: string;
  birthDate: string;
  nickname: string;
  photoUrl: string;
}

export async function getProfile(uid: string): Promise<Profile | null> {
  const [profileSnapshot, imageSnapshot] = await Promise.all([
    getDoc(doc(db, 'profiles', uid)),
    getDoc(doc(db, 'images', uid)),
  ]);
  if (!profileSnapshot.exists()) return null;
  const profile = profileSnapshot.data() as Profile;
  const image = imageSnapshot.data()?.image;
  return { ...profile, photoUrl: typeof image === 'string' ? image : '' };
}

export async function saveProfile(uid: string, profile: Profile): Promise<void> {
  const { photoUrl, ...profileData } = profile;
  await Promise.all([
    setDoc(doc(db, 'profiles', uid), { ...profileData, updatedAt: serverTimestamp() }, { merge: true }),
    setDoc(doc(db, 'images', uid), { image: photoUrl, updatedAt: serverTimestamp() }, { merge: true }),
  ]);
}

export function readImageAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Não foi possível converter a imagem.'));
        return;
      }
      if (reader.result.length > 900_000) {
        reject(new Error('A imagem é muito grande. Escolha uma imagem menor.'));
        return;
      }
      resolve(reader.result);
    };
    reader.onerror = () => reject(new Error('Não foi possível ler a imagem.'));
    reader.readAsDataURL(file);
  });
}
