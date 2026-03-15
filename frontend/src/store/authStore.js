import { create } from "zustand";
import api from "../services/api";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  authLoading: true,

  toast: null,
  showToast: (message, type = "success") => set({ toast: { message, type } }),
  clearToast: () => set({ toast: null }),

  checkAuth: async () => {
    try {
      const res = await api.get("/auth/me");

      set({
        user: res.data,
        authLoading: false,
      });
    } catch {
      set({
        user: null,
        authLoading: false,
      });
    }
  },

  register: async (data) => {
    set({ loading: true });

    try {
      const res = await api.post("/auth/register", data);

      set({ user: res.data });
      set({ toast: { message: "Registration successful!", type: "success" } });

      return true;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      set({ toast: { message, type: "error" } });
      console.error(message);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  login: async (data) => {
    set({ loading: true });

    try {
      const res = await api.post("/auth/login", data);

      set({ user: res.data });
      set({ toast: { message: "Login successful!", type: "success" } });
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      set({ toast: { message, type: "error" } });
      console.error(message);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await api.post("/auth/logout");
    set({ user: null });
    set({
      toast: { message: "Logged out successfully!", type: "success" },
    });
  },
}));

export default useAuthStore;
