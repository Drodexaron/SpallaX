import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCsurYBZqQnPRNCfoYLxOBc3VacOk9O-4Q",
  authDomain: "taskforge-amelie.firebaseapp.com",
  projectId: "taskforge-amelie",
  storageBucket: "taskforge-amelie.appspot.com",
  messagingSenderId: "694317972667",
  appId: "1:694317972667:web:7d5f12c1c6f0338a437d9e",
  measurementId: "G-TBJML4BMT3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;