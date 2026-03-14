import { create } from "zustand";
import api from "../services/api";

const useJobStore = create((set) => ({
  jobs: [],
  rounds: [],
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

  updateJob: async (id, data) => {
    try {
      const res = await api.put(`/jobs/${id}`, data);

      set((state) => ({
        jobs: state.jobs.map((job) => (job._id === id ? res.data : job)),
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

  fetchRounds: async (jobId) => {
    try {
      const res = await api.get(`/rounds/${jobId}`);

      set({ rounds: res.data });
    } catch (error) {
      console.error(error);
    }
  },

  addRound: async (jobId, data) => {
    try {
      const res = await api.post(`/rounds/${jobId}`, data);

      set((state) => ({
        rounds: [...state.rounds, res.data],
      }));
    } catch (error) {
      console.error(error);
    }
  },

  deleteRound: async (roundId) => {
    try {
      await api.delete(`/rounds/${roundId}`);

      set((state) => ({
        rounds: state.rounds.filter((r) => r._id !== roundId),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useJobStore;
