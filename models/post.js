import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  pageid: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    required: true,
  },
  postType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: false,
  },
  ///// Project post fields
  body: {
    type: String,
    required: false,
  },
  ///// Event post fields

  desc: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
