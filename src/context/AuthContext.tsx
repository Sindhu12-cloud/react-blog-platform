// src/context/AuthContext.tsx
import  { createContext, useState, useEffect } from "react";
import type{ReactNode} from "react";

import type { AuthContextType, User } from "../types/types";

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

const getUsersFromStorage = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsersToStorage = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const saveCurrentUser = (user: User | null) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());

  useEffect(() => {
    saveCurrentUser(currentUser);
  }, [currentUser]);

  const login = (email: string, password: string): boolean => {
    const users = getUsersFromStorage();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (email: string, password: string): boolean => {
    const users = getUsersFromStorage();
    const exists = users.some(u => u.email === email);
    if (exists) return false;

    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
    };
    const updatedUsers = [...users, newUser];
    saveUsersToStorage(updatedUsers);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const resetPassword = (email: string, newPassword: string): boolean => {
    const users = getUsersFromStorage();
    const index = users.findIndex(u => u.email === email);
    if (index !== -1) {
      users[index].password = newPassword;
      saveUsersToStorage(users);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
