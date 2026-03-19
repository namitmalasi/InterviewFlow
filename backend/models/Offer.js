import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    amount: {
      type: String,
    },
    deadline: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true },
);

const Offer = mongoose.model("Offer", offerSchema);
export default Offer;
