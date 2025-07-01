// src/auth.ts
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { firebaseApp } from './firebaseConfig';

const auth = getAuth(firebaseApp);

export const initAuth = (onSuccess: (userId: string) => void) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('✅ Authenticated as:', user.uid);
      onSuccess(user.uid); // 認証済ユーザーIDを通知
    } else {
      signInAnonymously(auth).catch((error) => {
        console.error('❌ Anonymous sign-in failed:', error);
      });
    }
  });
};