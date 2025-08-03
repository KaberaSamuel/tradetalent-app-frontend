// AuthProvider.tsx (updated)
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, fetchToken, fetchUser } from "../api";

import type { ReactNode } from "react";
import type { UserTypes, LoginFormTypes } from "../App.types";

interface AuthContextType {
  accessToken: string;
  user: UserTypes | null;
  loginAction: (data: LoginFormTypes) => Promise<void>;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserTypes | null>(null);
  const [accessToken, setToken] = useState(localStorage.getItem("site") || "");

  const navigate = useNavigate();

  // get access token after login
  const getToken = async (formData: LoginFormTypes) => {
    try {
      if (!formData || !formData?.email || !formData?.password) {
        return;
      } else {
        const response = await fetchToken(formData);
        if (response.status != 400) {
          setToken(response.data?.access || "");

          // fetching user data with token
          const data = await fetchUser(response.data.access);
          console.log(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginAction = async (formData: LoginFormTypes): Promise<void> => {
    try {
      const response = await loginUser(formData);
      if (response.status === 200) {
        setUser(response.data.user);
        await getToken(formData);
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

  // updated stored token on the local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("site");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
