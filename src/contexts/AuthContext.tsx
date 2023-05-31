import React, {createContext, FC, useContext, useState, useEffect, ReactElement} from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

interface User {
  email: string;
}

//type User = { currentUser: User | null | undefined; signup: (auth: any, email: string, password: string) => Promise<UserCredential>; }' is not assignable to type '{ currentUser: User; signup: (auth: any, email: string, password: string) => void; },

const AuthContext = createContext({
  currentUser: {} as User,
  signup: (auth: any, email: string, password: string) => {}
});

export function useAuth() {
  return useContext(AuthContext);
}

// TODO types for auth and currentUser
const AuthProvider: FC<{children: ReactElement}> = ({children}) => {
  const [currentUser, setCurrentUser] = useState<any>({});
  const [loading, setLoading] = useState(true);

  function signup(auth: any, email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
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
    signup
  }


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
