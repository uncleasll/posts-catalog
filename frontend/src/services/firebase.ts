import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAcoB6fTqaFPRE5w0SK_nW66x8mmkTevTM",
  authDomain: "post-catalog-test.firebaseapp.com",
  projectId: "post-catalog-test",
  storageBucket: "post-catalog-test.firebasestorage.app",
  messagingSenderId: "727733318332",
  appId: "1:727733318332:web:0a5f7dfde9c6deca0456b9",
  measurementId: "G-MM7SCZJY88",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
