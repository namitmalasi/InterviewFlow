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

    let updatedJob = await Job.findById(req.params.jobId);
    if (updatedJob) {
      if (round.result === "Fail") {
        updatedJob.status = "Rejected";
      } else if (
        updatedJob.status === "Applied" ||
        updatedJob.status === "OA"
      ) {
        updatedJob.status = "Interview";
      }

      await updatedJob.save();
    }

    res.status(201).json({ round, job: updatedJob });
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

    const job = await Job.findById(updatedRound.job);
    if (job) {
      if (updatedRound.result === "Fail") {
        job.status = "Rejected";
      } else if (job.status === "Applied" || job.status === "OA") {
        job.status = "Interview";
      }

      await job.save();
    }

    res.json({ round: updatedRound, job });
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
