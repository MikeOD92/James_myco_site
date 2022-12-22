import Post from "../../../models/Post";
import dbConnect from "../../../utils/dbConnect";
import handler from "../../../utils/handler";
import { hasTokenMiddleware } from "../../../utils/checkUser";

handler.get(getProject);

async function getProject(req, res) {
  const { id } = req.query;
  dbConnect();
  const doc = await Post.findOne({ _id: id });

  await res.status(200).json(doc);
}

export default handler;
