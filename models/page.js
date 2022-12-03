import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import post from "./post";

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is a Required feild"],
    unique: [true, "Page already exists"],
  },
  p1: {
    type: String,
    required: [false, ""],
  },
  p2: {
    type: String,
    required: [false, ""],
  },
  p3: {
    type: String,
    required: [false, ""],
  },
  p4: {
    type: String,
    required: [false, ""],
  },
  p5: {
    type: String,
    required: [false, ""],
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

export default mongoose.models.Page || mongoose.model("Page", pageSchema);
