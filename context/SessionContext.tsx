"use client"

import { createContext, useContext, useState } from 'react';

const SessionContext = createContext({
    user: {
        address: "", 
        firstName: "", 
        lastName: "",
        companyName: "",
        role: ""
    },
    login: (userData: any) => {},
    logout: () => {},
});

export const SessionProvider = ({ children } : {children: any}) => {
  const [user, setUser] = useState({
    address: "", 
    firstName: "", 
    lastName: "",
    companyName: "",
    role: ""
});

  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = () => {
    setUser({
        address: "", 
        firstName: "", 
        lastName: "",
        companyName: "",
        role: ""
    });
  };

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
