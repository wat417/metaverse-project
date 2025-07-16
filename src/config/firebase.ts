// src/config/firebase.ts
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  // その他の必要項目を記載
};

export const app = initializeApp(firebaseConfig);