import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
  // page_id: {
  //   type: { type: String, ref: "Page" },
  // },
  postType: {
    type: String,
    required: true,
  },
  value: {
    type: [String],
    required: true,
  },
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
