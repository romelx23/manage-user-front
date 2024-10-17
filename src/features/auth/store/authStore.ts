import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { usersApi } from "../../../config/usersApi";
import {
  IUser,
  ResponseLogin,
  ResponseRegister,
  ResponseRenew,
} from "../types/register.type";
// interface ResponseLogin

interface AuthStore {
  isAuthenticated: boolean;
  user: IUser | null;
  loading: boolean;
  error: boolean | null;
  login: (email: string, password: string) => void;
  register: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => void;
  revalidate: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    isAuthenticated: false,
    loading: false,
    error: null,
    user: null,
    login: async (email, password) => {
      try {
        // Clear any existing token
        localStorage.removeItem("x-token");

        const data = {
          email,
          password,
        };

        set({ loading: true });

        const resp = await usersApi
          .post<ResponseLogin>("/api/users/login", data)
          .then((data) => {
            console.log("Login");
            set({ loading: false });
            return data;
          })
          .catch((error) => {
            console.log("Error");
            set({
              error: true,
              loading: false,
            });
            return error;
          });

        console.log({ resp });

        localStorage.setItem("x-token", resp.data.token);

        set({
          isAuthenticated: true,
          user: resp.data.user,
          error: false,
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle form submission errors (e.g., display error messages)
        set({
          isAuthenticated: false,
          user: null,
          error: true,
        });
      }
    },
    register: async (name, email, password, role) => {
      try {
        // Clear any existing token
        localStorage.removeItem("x-token");

        const data = {
          name,
          email,
          password,
          role,
        };

        set({ loading: true });

        const resp = await usersApi
          .post<ResponseRegister>("/api/users/register", data)
          .then((data) => {
            console.log("Register");
            set({ loading: false });
            return data;
          })
          .catch((error) => {
            console.log("Error");
            set({
              error: true,
              loading: false,
            });
            return error;
          });

        console.log({ resp });

        localStorage.setItem("x-token", resp.data.token);

        set({
          isAuthenticated: true,
          user: resp.data.user,
          error: false,
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle form submission errors (e.g., display error messages)
        set({
          isAuthenticated: false,
          user: null,
          error: true,
        });
      }
    },
    revalidate: async () => {
      try {
        const token = localStorage.getItem("x-token");
        if (token) {
          const resp = await usersApi.post<ResponseRenew>(
            "/api/users/refresh-token",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log({ resp });
          localStorage.setItem("x-token", resp.data.refreshedToken);
          set({ isAuthenticated: true, user: resp.data.user });
          // set({ isAuthenticated: true });
        } else {
          set({ isAuthenticated: false, user: null });
        }
      } catch (error) {
        console.error("Error revalidating token:", error);
        set({ isAuthenticated: false, user: null });
      }
    },
    logout: () => {
      localStorage.removeItem("x-token");
      set({ isAuthenticated: false, user: null });
    },
  }))
);
