import Post from "../../models/post";
import dbConnect from "../../utils/dbConnect";
import handler from "../../utils/handler";
// import handler from "../../../utils/handler";

handler.get(getPosts);
handler.post(createPosts);
handler.put(editPosts);

async function getPosts(req, res) {
  const post = req.body.post;
  // needs to be find many and will not need the above line?
  dbConnect();
  const doc = await Post.findOne({ title: Post });
  await res.status(200).json(doc);
}
/////////////
async function createPosts(req, res) {
  const data = req.body;

  // const { email, password } = data;

  dbConnect();

  const post = await Post.create(data);
  await post.save();

  res.status(201).json({ message: "Post created!" });
}

async function editPosts(req, res) {
  const data = req.body;
  console.log("this is the data", data);
  dbConnect();

  try {
    const doc = await Post.updateOne(
      { _id: data._id },
      {
        type: data.type,
      }
    );

    const updatedDoc = await Post.find({ _id: data._id });
    console.log("weee hooo ////////////", doc, updatedDoc);
    await res.status(200).json(updatedDoc);
  } catch (err) {
    console.error(err);
  }
}
export default handler;
