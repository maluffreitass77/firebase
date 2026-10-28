import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from './firebase';

export interface Profile {
  fullName: string;
  birthDate: string;
  nickname: string;
  photoUrl: string;
}

export async function getProfile(uid: string): Promise<Profile | null> {
  const snapshot = await getDoc(doc(db, 'profiles', uid));
  return snapshot.exists() ? (snapshot.data() as Profile) : null;
}

export async function saveProfile(uid: string, profile: Profile): Promise<void> {
  await setDoc(doc(db, 'profiles', uid), { ...profile, updatedAt: serverTimestamp() }, { merge: true });
}

export async function uploadProfilePhoto(uid: string, file: File): Promise<string> {
  const imageRef = ref(storage, `profile-photos/${uid}/avatar`);
  await uploadBytes(imageRef, file, { contentType: file.type });
  return getDownloadURL(imageRef);
}
