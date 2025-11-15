import {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";


export const UserContext = createContext<{ email: string | null; role: string | null }>({ email: null, role: null });

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);


  useEffect(() => {
    const getUserFromStorage = async () => {
      const user = localStorage.getItem("user");
      setEmail(user ? JSON.parse(user).email : null);
      setRole(user ? JSON.parse(user).role : null);
    }
    getUserFromStorage();
  }, []);
  return <UserContext.Provider value={{ email, role }}>{children}</UserContext.Provider>
};
