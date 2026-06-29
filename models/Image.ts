import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: String,
  category: String,
  type: {
    type: String,
    enum: ["image", "video"],
    default: "image",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Image ||
  mongoose.model("Image", ImageSchema);