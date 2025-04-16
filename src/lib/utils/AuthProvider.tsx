"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
} from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Credentials } from "@/lib/schemas/loginSchema";
import { AdminCredentials } from "@/lib/schemas/newAdminSchema";
import { ChangePassword } from "@/lib/schemas/changePasswordSchema";
import { Stats, User } from "@/lib/types/dashboard";

type AuthContextType = {
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  getStats: () => Promise<Stats>;
  getAdmins: () => Promise<User[]>;
  createAdmin: (credentials: AdminCredentials) => Promise<void>;
  deleteAdmin: (id: string) => Promise<void>;
  changePassword: (credentials: ChangePassword) => Promise<void>;
  getUser: () => Promise<User>;
  uploadAvatar: (file: File) => Promise<void>;
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
      if (axios.isAxiosError(error) && error.response?.status === 401) {
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

  // initial auth check - only run once
  useEffect(() => {
    if (!initialAuthCheckDone.current) {
      checkAuth();
    }
  }, []);

  // handling token refresh
  useLayoutEffect(() => {
    // flag to track if a refresh is currently in progress
    let isRefreshing = false;
    // store original requests that failed due to 401
    let failedQueue: {
      resolve: (value?: unknown) => void;
      reject: (error: AxiosError | unknown) => void;
    }[] = [];

    // process failed queue - either resolve or reject based on refreshSuccess
    const processQueue = (error: unknown, refreshSuccess = true) => {
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

        // if the error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            // if refresh is in progress, add this request to queue
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

            // mark refresh as successful and process queue
            processQueue(null, true);
            return axios(originalRequest);
          } catch (refreshError) {
            setIsAuthenticated(false);
            // mark refresh as failed and process queue
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

  const login = async (credentials: Credentials) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
        credentials,
      );
      setIsAuthenticated(true);

      const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
      const mustChangeCookie = cookies.find((c) =>
        c.startsWith("mustChangePassword="),
      );

      if (mustChangeCookie) {
        const value = mustChangeCookie.split("=")[1];
        setMustChangePassword(value === "true");
      }

      return res.data;
    } catch (error) {
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

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const uploadAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/upload-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    } catch (error) {
      throw error;
    }
  };

  const getStats = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats`,
      );
      return response.data;
    } catch (error) {
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
      throw error;
    }
  };
  const createAdmin = async (credentials: AdminCredentials) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/create-admin`,
        credentials,
      );
      router.refresh();
      return res.data;
    } catch (error) {
      throw error;
    }
  };
  const deleteAdmin = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/delete-admin/${id}`,
      );
      router.refresh();
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (credentials: ChangePassword) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`,
        credentials,
      );
      return res.data;
    } catch (error) {
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
        deleteAdmin,
        changePassword,
        getUser,
        uploadAvatar,
        isAuthenticated,
        mustChangePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
