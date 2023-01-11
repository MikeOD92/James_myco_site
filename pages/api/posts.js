import Post from "../../models/post";
import dbConnect from "../../utils/dbConnect";
import handler from "../../utils/handler";
import Page from "../../models/page";
import { hasTokenMiddleware } from "../../utils/checkUser";
import S3 from "aws-sdk/clients/s3";

// handler.get(getPosts);
handler.use(hasTokenMiddleware).post(createPosts);
handler.use(hasTokenMiddleware).put(editPosts);
handler.use(hasTokenMiddleware).delete(deletePost);

// async function getPosts(req, res) {
//   // edit this to also be able to find a post by id for single event pages and project pages
//   dbConnect();
//   const doc = await Post.find().sort({ created: "desc" });
//   await res.status(200).json(doc);
// }
/////////////
async function createPosts(req, res) {
  try {
    const {
      postType,
      created,
      body,
      images,
      title,
      desc,
      date,
      location,
      img,
      pageid,
    } = req.body;

    dbConnect();

    const post = await Post.create({
      pageid,
      created,
      postType,
      body: body || null,
      images: images || [],
      title: title || null,
      desc: desc || null,
      date: date || null,
      location: location || null,
      // img: img || null,
    });

    await post.save();

    const foundPage = await Page.findById(pageid);
    const pagePosts = foundPage.posts;
    const updatePage = await Page.findByIdAndUpdate(pageid, {
      posts: [post._id, ...pagePosts],
    });

    updatePage.save();

    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

//////////
async function editPosts(req, res) {
  const data = req.body;
  dbConnect();

  try {
    const doc = await Post.updateOne(
      { _id: data._id },
      {
        title: data.title || null,
        body: data.body || null,
        images: data.images || [],
        desc: data.desc || null,
        date: data.date || null,
        location: data.location || null,
      }
    );

    const updatedDoc = await Post.find({ _id: data._id });
    await res.status(200).json(updatedDoc);
  } catch (err) {
    console.error(err);
  }
}

async function deletePost(req, res) {
  dbConnect();
  // const post = await Post.find({ _id: req.body._id });
  try {
    await Post.deleteOne({ _id: req.body._id });
  } catch (err) {
    console.error(err);
    await res.status(400).json({});
  }
  await res.status(204).json({ message: "post deleted" });
}
export default handler;
