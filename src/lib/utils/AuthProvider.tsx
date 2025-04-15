"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type AuthContextType = {
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  getStats: () => Promise<any>;
  getAdmins: () => Promise<any>;
  createAdmin: (credentials: any) => Promise<void>;
  changePassword: (credentials: any) => Promise<void>;
  isAuthenticated: boolean;
  mustChangePassword: boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mustChangePassword, setMustChangePassword] = useState(false);
  // track if auth check is in progress
  const authCheckInProgress = useRef(false);
  // track if initial auth check has happened
  const initialAuthCheckDone = useRef(false);
  const router = useRouter();

  const checkAuth = async () => {
    // prevent concurrent auth checks
    if (authCheckInProgress.current) {
      return false;
    }

    try {
      authCheckInProgress.current = true;
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`);
      setIsAuthenticated(true);
      initialAuthCheckDone.current = true;
      return true;
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          // Try to refresh the token
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
          );

          // Check if refresh worked by calling me endpoint again
          await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`);
          setIsAuthenticated(true);
          initialAuthCheckDone.current = true;
          return true;
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          setIsAuthenticated(false);
          initialAuthCheckDone.current = true;
          return false;
        }
      } else {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        initialAuthCheckDone.current = true;
        return false;
      }
    } finally {
      authCheckInProgress.current = false;
    }
  };

  // Initial auth check - only run once
  useEffect(() => {
    if (!initialAuthCheckDone.current) {
      checkAuth();
    }
  }, []);

  // Axios interceptor for handling token refresh
  useLayoutEffect(() => {
    // Flag to track if a refresh is currently in progress
    let isRefreshing = false;
    // Store original requests that failed due to 401
    let failedQueue = [];

    // Process failed queue - either resolve or reject based on refreshSuccess
    const processQueue = (error, refreshSuccess = true) => {
      failedQueue.forEach((promise) => {
        if (refreshSuccess) {
          promise.resolve();
        } else {
          promise.reject(error);
        }
      });

      failedQueue = [];
    };

    const refreshInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            // If refresh is in progress, add this request to queue
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then(() => {
                return axios(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
            );

            // Mark refresh as successful and process queue
            processQueue(null, true);
            return axios(originalRequest);
          } catch (refreshError) {
            setIsAuthenticated(false);
            // Mark refresh as failed and process queue
            processQueue(refreshError, false);
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
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
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
        credentials,
      );
      console.log("Logged user:", res.data);
      setIsAuthenticated(true);

      const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
      const mustChangeCookie = cookies.find((c) =>
        c.startsWith("mustChangePassword="),
      );
      if (mustChangeCookie) {
        const value = mustChangeCookie.split("=")[1];
        setMustChangePassword(value === "true");
      }

      console.log("mustChangeCookie:", mustChangeCookie);

      return res.data;
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signout`);
      router.refresh();
    } finally {
      setIsAuthenticated(false);
    }
  };

  const getStats = async () => {
    try {
      // Just make the request - the interceptor will handle auth issues
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching stats:", error);
      throw error;
    }
  };

  const getAdmins = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/admins`,
      );
      return response.data.admins;
    } catch (error) {
      console.error("Error fetching admins:", error);
      throw error;
    }
  };
  const createAdmin = async (credentials) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/create-admin`,
        credentials,
      );
      console.log("Created admin:", res.data);
      return res.data;
    } catch (error) {
      console.error("New admin failed:", error);
      throw error;
    }
  };

  const changePassword = async (credentials) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`,
        credentials,
      );
      return res.data;
    } catch (error) {
      console.error("Change password failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        getStats,
        getAdmins,
        createAdmin,
        changePassword,
        isAuthenticated,
        mustChangePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
