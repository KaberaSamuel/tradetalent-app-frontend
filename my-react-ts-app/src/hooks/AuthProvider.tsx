import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, fetchAcessToken, fetchNewToken, fetchUser } from "../api";

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
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("site") || ""
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh") || ""
  );

  const navigate = useNavigate();

  // get userdata and update variables on page load
  const getDataOnLoad = async () => {
    if (accessToken) {
      try {
        const response = await fetchUser(accessToken);
        setUser(response.data.user);
      } catch (error) {
        console.log("Error fetchin access token:", error);
        // Try to refresh token if available
        if (refreshToken) {
          try {
            const newTokenResponse = await fetchNewToken(refreshToken);
            setAccessToken(newTokenResponse.data.access);
          } catch (refreshError) {
            console.log("Error refreshing token:", refreshError);
            // Clear tokens since they are invalid
            setAccessToken("");
            setRefreshToken("");
            localStorage.removeItem("site");
            localStorage.removeItem("refresh");
          }
        } else {
          // Clear tokens since they are invalid
          setAccessToken("");
          setRefreshToken("");
          localStorage.removeItem("site");
          localStorage.removeItem("refresh");
        }
      }
    }
  };

  // get access token after login
  const getAccessToken = async (formData: LoginFormTypes) => {
    try {
      if (!formData || !formData?.email || !formData?.password) {
        return;
      }
      const response = await fetchAcessToken(formData);
      setAccessToken(response.data.access);
      setRefreshToken(response.data.refresh);
    } catch (error) {
      console.log("Error getting access token:", error);
    }
  };

  // login user using form data
  const loginAction = async (formData: LoginFormTypes): Promise<void> => {
    try {
      const response = await loginUser(formData);
      if (response.status === 200) {
        await getAccessToken(formData);
        setUser(response.data.user);
        navigate("/");
      }
    } catch (error: any) {
      console.log("Login error:", error);
      setUser(null);
      setAccessToken("");
    }
  };

  // logout and clear token and user variables
  const logOut = () => {
    setUser(null);
    setAccessToken("");
    setRefreshToken("");
    localStorage.removeItem("site");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  // get user data on page load (if stored tokens are valid)
  useEffect(() => {
    getDataOnLoad();
  }, [accessToken]);

  // update stored tokens on the local storage
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("site", accessToken);
    }
    if (refreshToken) {
      localStorage.setItem("refresh", refreshToken);
    }
  }, [accessToken, refreshToken]);

  return (
    <AuthContext.Provider value={{ accessToken, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
