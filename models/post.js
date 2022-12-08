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
  ///// Project post fields
  value: {
    type: [String],
    required: false,
  },
  // images: {
  //   type: [File],
  //   required: false,
  // },

  ///// Event post fields
  title: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: false,
  },
  dateTime: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  // img: {
  //   type: File,
  //   required: false,
  // },
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
