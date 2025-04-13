"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import axios from "axios";

type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  getStats: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("No auth context.");
  }

  return authContext;
};

axios.defaults.withCredentials = true;

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
        );
        setToken(response.data.token);
      } catch {
        setToken(null);
      }
    };

    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;
      return config;
    });

    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          error.response?.data?.message === "Unauthorized"
        ) {
          try {
            const response = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}api/auth/refresh`,
            );

            setToken(response.data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            originalRequest._retry = true;

            return axios(originalRequest);
          } catch {
            setToken(null);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  const login = async (credentials) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
      credentials,
    );
    setToken(response.data.accessToken);
  };

  const logout = () => {
    setToken(null);
  };

  const getStats = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats`,
    );
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout, getStats }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
