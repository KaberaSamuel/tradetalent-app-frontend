// AuthProvider.tsx (updated)
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, fetchToken } from "../api";

import type { ReactNode } from "react";
import type { UserTypes, LoginFormTypes } from "../App.types";

interface AuthContextType {
  token: string;
  user: UserTypes | null;
  loginAction: (data: LoginFormTypes) => Promise<void>;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");

  const navigate = useNavigate();

  // Initialize token from localStorage/server on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("site");
    if (storedToken) {
      setToken(storedToken);
    }
    {
      const getToken = async () => {
        const response = await fetchToken();

        if (response.status === 200) {
          setToken(response.data?.access || "");
        }
      };

      getToken();
    }
  }, []);

  const loginAction = async (data: LoginFormTypes): Promise<void> => {
    try {
      // adding auth token to the form data
      if (token) {
        data.token = token;
      }

      const response = await loginUser(data);
      if (response.status === 200) {
        setUser(response.data.user);
        setToken(response.data.token);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      setUser(null);
      setToken("");
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
