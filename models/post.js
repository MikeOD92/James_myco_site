import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
  page_id: {
    type: { type: Schema.Types.ObjectId, ref: "Page" },
    required: [true, "Post must belong to pages"],
  },
  type: {
    type: String,
    required: True,
  },
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
