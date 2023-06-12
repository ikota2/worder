import React, {createContext, FC, useContext, useState, useEffect, ReactElement} from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  Auth,
} from "firebase/auth";

interface User {
  email: string;
  uid?: string;
}

const AuthContext = createContext({
  currentUser: {} as User,
  signup: (auth: Auth, email: string, password: string) => {},
  login: (auth: Auth, email: string, password: string) => {},
  logout: (auth: Auth) => {},
  resetPassword: (auth: Auth, email: string) => {},
  changeEmail: (auth: any, email: string) => {},
  changePassword: (auth: any, password: string) => {}
});

export function useAuth() {
  return useContext(AuthContext);
}

// TODO types for auth and currentUser
const AuthProvider: FC<{children: ReactElement}> = ({children}) => {
  const [currentUser, setCurrentUser] = useState<any>({});
  const [loading, setLoading] = useState(true);

  function signup(auth: Auth, email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(auth: Auth, email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout(auth: Auth) {
    return signOut(auth);
  }

  function resetPassword(auth: Auth, email: string) {
    return sendPasswordResetEmail(auth, email)
  }

  function changeEmail(user: any, email: string) {
    return updateEmail(user, email);
  }
  function changePassword(user: any, password: string) {
    return updatePassword(user, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user as unknown as User);
      setLoading(false);
    });

    return unsubscribe;
  }, [])


  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    changeEmail,
    changePassword
  }


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
