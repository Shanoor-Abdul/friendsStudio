import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "done"],
    default: "pending",
  },
});

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);