import { create } from "zustand";
import api from "../services/api";

const useJobStore = create((set) => ({
  jobs: [],
  loading: false,

  fetchJobs: async () => {
    set({ loading: true });

    try {
      const res = await api.get("/jobs");

      set({ jobs: res.data });
    } catch (error) {
      console.error(error);
    }

    set({ loading: false });
  },

  addJob: async (data) => {
    try {
      const res = await api.post("/jobs", data);

      set((state) => ({
        jobs: [res.data, ...state.jobs],
      }));
    } catch (error) {
      console.error(error);
    }
  },

  deleteJob: async (id) => {
    try {
      await api.delete(`/jobs/${id}`);

      set((state) => ({
        jobs: state.jobs.filter((job) => job._id !== id),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useJobStore;
