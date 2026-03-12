import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    companyName: String,

    role: String,

    jobLink: String,

    applicationDate: Date,

    status: {
      type: String,
      enum: ["Applied", "OA", "Interview", "Rejected", "Offer"],
      default: "Applied",
    },
  },
  { timestamps: true },
);

const job = mongoose.model("Job", jobSchema);

export default job;
