import { create } from "zustand";
import api from "../services/api";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  register: async (data) => {
    set({ loading: true });

    try {
      const res = await api.post("/auth/register", data);

      set({ user: res.data });

      return true;
    } catch (error) {
      console.error(error.response?.data?.message);
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
      return true;
    } catch (error) {
      console.error(error.response?.data?.message);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await api.post("/auth/logout");

    set({ user: null });
  },
}));

export default useAuthStore;
