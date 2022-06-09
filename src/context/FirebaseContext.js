import { createContext, useContext, useState, useEffect } from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { toast } from 'react-toastify';

//COMPONENTS
import { auth } from '../firebase';

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const registerError = () => toast('auth/email already in use!');
  const loginError = () => toast('auth/email not found!');

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
      registerError();
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
      loginError();
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
    error,
    setError,
  };
  return (
    <FirebaseContext.Provider value={values}>
      {children}
    </FirebaseContext.Provider>
  );
};
export const useFirebase = () => useContext(FirebaseContext);
