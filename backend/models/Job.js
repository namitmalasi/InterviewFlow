import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    jobLink: {
      type: String,
    },

    applicationDate: {
      type: Date,
    },

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
