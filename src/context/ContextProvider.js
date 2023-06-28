import { useState, createContext } from "react";
export const UserContext = createContext();

export default function AppProvider({ children }) {
  const [user, setUser] = useState("");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
