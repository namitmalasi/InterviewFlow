import Offer from "../models/Offer.js";
import Job from "../models/Job.js";

export const createOffer = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.user.toString() !== req.user)
      return res.status(401).json({ message: "Not authorized" });

    const offerPayload = {
      job: req.params.jobId,
      status: req.body.status || "Pending",
      amount: req.body.amount,
      deadline: req.body.deadline,
      notes: req.body.notes,
    };

    const offer = await Offer.create(offerPayload);

    // Keep job status in sync when offer is created
    job.status = "Offer";
    await job.save();

    res.status(201).json({ offer, job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ job: req.params.jobId }).sort({
      createdAt: 1,
    });

    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    const job = await Job.findById(offer.job);
    if (job && job.user.toString() !== req.user)
      return res.status(401).json({ message: "Not authorized" });

    const updatedOffer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (job) {
      if (updatedOffer.status === "Accepted") {
        job.status = "Offer";
      } else if (updatedOffer.status === "Rejected") {
        job.status = "Rejected";
      }
      await job.save();
    }

    res.json({ offer: updatedOffer, job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
