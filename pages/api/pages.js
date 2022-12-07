import Page from "../../models/page";
import dbConnect from "../../utils/dbConnect";
import handler from "../../utils/handler";

handler.post(createPage);

async function createPage(req, res) {
  const data = req.body;

  dbConnect();

  const page = await Page.create(data);
  await page.save();

  res.status(201).json({ message: "Page created!" });
}

export default handler;
