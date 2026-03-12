import Job from "../models/Job.js";

// Create Job
export const createJob = async (req, res) => {
  try {
    const { companyName, role, jobLink, applicationDate, status } = req.body;

    const job = await Job.create({
      user: req.user,
      companyName,
      role,
      jobLink,
      applicationDate,
      status,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all job(for logged in user)
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user }).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single job
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await job.deleteOne();

    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
