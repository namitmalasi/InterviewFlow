import mongoose from "mongoose";
const interviewRoundSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    roundName: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
    },

    result: {
      type: String,
      enum: ["Pending", "Pass", "Fail"],
      default: "Pending",
    },

    notes: {
      type: String,
    },
  },
  { timestamps: true },
);

const InterviewRound = mongoose.model("InterviewRound", interviewRoundSchema);
export default InterviewRound;
