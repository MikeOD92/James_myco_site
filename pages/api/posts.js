import Post from "../../models/post";
import dbConnect from "../../utils/dbConnect";
import handler from "../../utils/handler";
// import handler from "../../../utils/handler";
import Page from "../../models/page";

handler.get(getPosts);
handler.post(createPosts);
handler.put(editPosts);

async function getPosts(req, res) {
  // needs to be find many and will not need the above line?
  dbConnect();
  const doc = await Post.find();
  await res.status(200).json(doc);
}
/////////////
async function createPosts(req, res) {
  try {
    const { postType, value, pageId } = req.body;

    dbConnect();
    const post = await Post.create({
      postType,
      value,
    });

    await post.save();
    console.log(post);
    const foundPage = await Page.findById(pageId);
    const pagePosts = foundPage.posts;
    const updatePage = await Page.findByIdAndUpdate(pageId, {
      posts: [...pagePosts, post._id.toString()],
    });

    updatePage.save();

    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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
