import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

//COMPONENTS
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
