import { createContext, useContext, useState, useEffect } from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

//COMPONENTS
import { auth } from '../firebase';

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  const register = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log('SıgnIn result:', result);
    } catch (error) {
      console.log('signIn error', error);
    }
  };

  const values = {
    authToken,
    setAuthToken,
    register,
  };

  return (
    <FirebaseContext.Provider value={values}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
