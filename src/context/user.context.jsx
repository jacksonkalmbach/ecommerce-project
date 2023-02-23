import { createContext, useState } from "react";

// the actual value we want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

// this provider allows any of its children to access the values within its state
export const UserProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);

  const value = {
    currentUser,
    setCurrentUser
  }

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
    
};