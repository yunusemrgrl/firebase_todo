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

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('user'));
    setAuthToken(items);
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((items) => {
      localStorage.setItem('user', JSON.stringify(user.accessToken));
    });
  }, [authToken]);

  const register = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(result.user);
      setAuthToken(result.user.accessToken);
    } catch (error) {
      console.log('signIn error', error);
    }
  };
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      setAuthToken(result.user.accessToken);
    } catch (error) {
      console.log('signIn error', error);
    }
  };

  const values = {
    user,
    authToken,
    setAuthToken,
    register,
    login,
  };

  return (
    <FirebaseContext.Provider value={values}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
