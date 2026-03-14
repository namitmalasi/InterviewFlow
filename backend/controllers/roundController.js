import InterviewRound from "../models/InterviewRound.js";
import Job from "../models/Job.js";

// Add round
export const addRound = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const round = await InterviewRound.create({
      job: req.params.jobId,
      ...req.body,
    });

    res.status(201).json(round);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all rounds for a job
export const getRounds = async (req, res) => {
  try {
    const rounds = await InterviewRound.find({ job: req.params.jobId }).sort({
      createdAt: 1,
    });

    res.json(rounds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update round
export const updateRound = async (req, res) => {
  try {
    const round = await InterviewRound.findById(req.params.id);

    if (!round) {
      return res.status(404).json({ message: "Round not found" });
    }

    const updatedRound = await InterviewRound.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.json(updatedRound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete round
export const deleteRound = async (req, res) => {
  try {
    const round = await InterviewRound.findById(req.params.id);

    if (!round) {
      return res.status(404).json({ message: "Round not found" });
    }

    await round.deleteOne();

    res.json({ message: "Round deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
