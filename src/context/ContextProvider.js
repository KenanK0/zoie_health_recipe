import { useState, createContext } from "react";
export const UserContext = createContext();
export const apiKey='343179a1455a44d5ac94af2e345fe8bd'
export default function AppProvider({ children }) {
  const [user, setUser] = useState("");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
