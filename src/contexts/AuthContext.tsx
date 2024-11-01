import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {storage} from '../utils/storageUtils';
import {useTranslation} from 'react-i18next';

interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => string;
  logout: () => void;
  signup: (username: string, email: string, password: string) => string;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const AUTH_KEY = 'auth-user';
const USERS_KEY = 'users';

const isLoggedInUser = () => {
  return !!storage.getString(AUTH_KEY);
};

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {t} = useTranslation();

  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInUser);

  useEffect(() => {
    // if user is already logged in
    const storedUser = storage.getString(AUTH_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const signup = (
    username: string,
    email: string,
    password: string,
  ): string => {
    try {
      // if user already exists
      const users = JSON.parse(storage.getString(USERS_KEY) || '{}');
      if (users[email]) {
        return t('User already exists');
      }

      // Store new user
      users[email] = {username, email, password};
      storage.set(USERS_KEY, JSON.stringify(users));

      // Log in the new user
      setUser({username, email});
      setIsLoggedIn(true);
      storage.set(AUTH_KEY, JSON.stringify({username, email}));

      return '';
    } catch (error) {
      return t('An unexpected error occurred. Please try again.');
    }
  };

  const login = (email: string, password: string): string => {
    try {
      const users = JSON.parse(storage.getString(USERS_KEY) || '{}');
      const user = users[email];

      if (user && user.password === password) {
        setUser({username: user.username, email: user.email});
        setIsLoggedIn(true);
        storage.set(
          AUTH_KEY,
          JSON.stringify({username: user.username, email: user.email}),
        );
        return '';
      } else {
        return t('Invalid credentials');
      }
    } catch (error) {
      return t('An unexpected error occurred. Please try again.');
    }
  };

  const logout = () => {
    storage.delete(AUTH_KEY);
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{user, isLoggedIn, login, logout, signup}}>
      {children}
    </AuthContext.Provider>
  );
};
