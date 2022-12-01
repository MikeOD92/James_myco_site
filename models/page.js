import { ObjectId } from "mongodb";
import mongoose from "mongoose";

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
  // posts: {
  //     type:ObjectId
  // }
});

export default mongoose.models.Page || mongoose.model("Page", pageSchema);
