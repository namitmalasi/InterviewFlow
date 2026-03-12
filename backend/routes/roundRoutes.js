import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  addRound,
  getRounds,
  updateRound,
  deleteRound,
} from "../controllers/roundController.js";

const router = express.Router();

router.post("/:jobId", protect, addRound);

router.get("/:jobId", protect, getRounds);

router.put("/:id", protect, updateRound);

router.delete("/:id", protect, deleteRound);

export default router;
