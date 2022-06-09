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
  const [error, setError] = useState('');

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('user'));
    setAuthToken(items);
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(authToken));
  }, [authToken]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;
        const userData = { uid, email };
        setUser(userData);
      } else {
        setUser(null);
      }
    });
  }, [setUser]);

  // (async () => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const { uid, email } = user;
  //       const userData = { uid, email };
  //       setUser(userData);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  // })();

  const register = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      setUser(result.user);
      setAuthToken(result.user.accessToken);
      setError('');
    } catch (e) {
      setError(e.message);
      console.log('register error', error);
    }
  };
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      setAuthToken(result.user.accessToken);
      setError('');
    } catch (e) {
      setError(e.message);
      console.log('login error', error);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setAuthToken(null);
    } catch (error) {
      console.log('logout error', error);
    }
  };
  const values = {
    user,
    authToken,
    setAuthToken,
    register,
    login,
    setUser,
    logout,
  };
  return (
    <FirebaseContext.Provider value={values}>
      {children}
    </FirebaseContext.Provider>
  );
};
export const useFirebase = () => useContext(FirebaseContext);
