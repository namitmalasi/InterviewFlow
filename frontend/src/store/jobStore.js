import { create } from "zustand";
import api from "../services/api";
import useAuthStore from "./authStore";

const useJobStore = create((set) => ({
  jobs: [],
  rounds: [],
  offers: [],
  loading: false,

  fetchJobs: async () => {
    set({ loading: true });

    try {
      const res = await api.get("/jobs");

      set({ jobs: res.data });
    } catch (error) {
      console.error(error);
      useAuthStore.getState().showToast("Failed to fetch jobs", "error");
    }

    set({ loading: false });
  },

  addJob: async (data) => {
    try {
      const res = await api.post("/jobs", data);

      set((state) => ({
        jobs: [res.data, ...state.jobs],
      }));

      useAuthStore.getState().showToast("Job created successfully", "success");
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Job creation failed. Please try again.";
      console.error(message);
      useAuthStore.getState().showToast(message, "error");
      return null;
    }
  },

  updateJob: async (id, data) => {
    try {
      const res = await api.put(`/jobs/${id}`, data);

      set((state) => ({
        jobs: state.jobs.map((job) => (job._id === id ? res.data : job)),
      }));

      const statusMsg = data.status
        ? `Job status updated to ${data.status}`
        : "Job updated successfully";
      useAuthStore.getState().showToast(statusMsg, "success");
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Job update failed. Please try again.";
      console.error(message);
      useAuthStore.getState().showToast(message, "error");
      return null;
    }
  },

  deleteJob: async (id) => {
    try {
      await api.delete(`/jobs/${id}`);

      set((state) => ({
        jobs: state.jobs.filter((job) => job._id !== id),
      }));

      useAuthStore.getState().showToast("Job deleted successfully", "success");
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message || "Job delete failed. Please try again.";
      console.error(message);
      useAuthStore.getState().showToast(message, "error");
      return false;
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

  fetchOffers: async (jobId) => {
    try {
      const res = await api.get(`/offers/${jobId}`);
      set({ offers: res.data });
    } catch (error) {
      console.error(error);
      useAuthStore.getState().showToast("Failed to fetch offers", "error");
    }
  },

  addOffer: async (jobId, data) => {
    try {
      const res = await api.post(`/offers/${jobId}`, data);
      const { offer, job: updatedJob } = res.data;

      set((state) => ({
        offers: [...state.offers, offer],
        jobs: updatedJob
          ? state.jobs.map((job) =>
              job._id === updatedJob._id ? updatedJob : job,
            )
          : state.jobs,
      }));

      useAuthStore.getState().showToast("Offer created successfully", "success");
      return offer;
    } catch (error) {
      const message =
        error.response?.data?.message || "Offer creation failed. Please try again.";
      console.error(message);
      useAuthStore.getState().showToast(message, "error");
      return null;
    }
  },

  updateOffer: async (offerId, data) => {
    try {
      const res = await api.put(`/offers/${offerId}`, data);
      const { offer: updatedOffer, job: updatedJob } = res.data;

      set((state) => ({
        offers: state.offers.map((offer) =>
          offer._id === offerId ? updatedOffer : offer,
        ),
        jobs: updatedJob
          ? state.jobs.map((job) =>
              job._id === updatedJob._id ? updatedJob : job,
            )
          : state.jobs,
      }));

      const statusMsg = data.status
        ? `Offer status updated to ${data.status}`
        : "Offer updated successfully";
      useAuthStore.getState().showToast(statusMsg, "success");
      return updatedOffer;
    } catch (error) {
      const message =
        error.response?.data?.message || "Offer update failed. Please try again.";
      console.error(message);
      useAuthStore.getState().showToast(message, "error");
      return null;
    }
  },

  addRound: async (jobId, data) => {
    try {
      const res = await api.post(`/rounds/${jobId}`, data);
      const { round, job: updatedJob } = res.data;

      set((state) => ({
        rounds: [...state.rounds, round],
        jobs: updatedJob
          ? state.jobs.map((job) =>
              job._id === updatedJob._id ? updatedJob : job,
            )
          : state.jobs,
      }));

      useAuthStore.getState().showToast("Round added successfully", "success");
      return round;
    } catch (error) {
      const message =
        error.response?.data?.message || "Round creation failed. Please try again.";
      console.error(message);
      useAuthStore.getState().showToast(message, "error");
      return null;
    }
  },

  updateRound: async (roundId, data) => {
    try {
      const res = await api.put(`/rounds/${roundId}`, data);
      const { round: updatedRound, job: updatedJob } = res.data;

      set((state) => ({
        rounds: state.rounds.map((round) =>
          round._id === roundId ? updatedRound : round,
        ),
        jobs: updatedJob
          ? state.jobs.map((job) =>
              job._id === updatedJob._id ? updatedJob : job,
            )
          : state.jobs,
      }));

      const statusMsg = data.result
        ? `Round result updated to ${data.result}`
        : "Round updated successfully";
      useAuthStore.getState().showToast(statusMsg, "success");
      return updatedRound;
    } catch (error) {
      const message =
        error.response?.data?.message || "Round update failed. Please try again.";
      console.error(message);
      useAuthStore.getState().showToast(message, "error");
      return null;
    }
  },

  deleteRound: async (roundId) => {
    try {
      await api.delete(`/rounds/${roundId}`);

      set((state) => ({
        rounds: state.rounds.filter((r) => r._id !== roundId),
      }));

      useAuthStore.getState().showToast("Round deleted successfully", "success");
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message || "Round delete failed. Please try again.";
      console.error(message);
      useAuthStore.getState().showToast(message, "error");
      return false;
    }
  },
}));

export default useJobStore;
