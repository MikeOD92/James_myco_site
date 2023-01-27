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
  desc: {
    type: String,
    required: false,
  },
  ///// Project post fields
  body: {
    type: String,
    required: false,
  },
  ///// Event post fields

  date: {
    type: String,
    required: false,
  },
  location: {
    lat: {
      type: Number,
      required: false
    },
    lng: {
      type:Number,
      required: false
    }
  },
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
