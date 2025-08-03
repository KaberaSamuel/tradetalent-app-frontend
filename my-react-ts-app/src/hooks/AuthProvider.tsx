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
        if (response.status === 200) {
          setToken(response.data?.access || "");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // login user using form data
  const loginAction = async (formData: LoginFormTypes): Promise<void> => {
    try {
      const response = await loginUser(formData);
      if (response.status === 200) {
        await getToken(formData);
        setUser(response.data.user);
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      setUser(null);
      setToken("");
    }
  };

  // logout and clear token and user variables
  const logOut = () => {
    setUser(null);
    setToken("");
    navigate("/login");
  };

  // get user data on page load (if stored token is valid)
  useEffect(() => {
    if (accessToken) {
      (async () => {
        try {
          const data = await fetchUser(accessToken);
          if (data?.user) {
            setUser(data.user);
            return;
          }
          // clearing token as it is invalid
          setToken("");
        } catch (error) {
          setToken("");
        }
      })();
    }
  }, []);

  // update stored token on the local storage
  useEffect(() => {
    localStorage.setItem("site", accessToken);
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
