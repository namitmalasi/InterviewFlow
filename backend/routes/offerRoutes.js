import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createOffer, getOffers, updateOffer } from "../controllers/offerController.js";

const router = express.Router();

router.post("/:jobId", protect, createOffer);
router.get("/:jobId", protect, getOffers);
router.put("/:id", protect, updateOffer);

export default router;
