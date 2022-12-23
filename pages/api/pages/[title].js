// import { MongoClient } from "mongodb";

import page from "../../../models/page";
import dbConnect from "../../../utils/dbConnect";
import handler from "../../../utils/handler";
import { hasTokenMiddleware } from "../../../utils/checkUser";

handler.get(getPage);
handler.use(hasTokenMiddleware).put(editPage);

/// Read
async function getPage(req, res) {
  const { title } = req.query;
  dbConnect();
  const doc = await page
    .findOne({
      title: title,
    })
    .populate("posts");
  // .sort({ created: "desc" });

  await res.status(200).json(doc);
}

// Edit
async function editPage(req, res) {
  const { title } = req.query;

  dbConnect();

  // const doc = title.charAt(0).toUpperCase() + title.slice(1);

  const data = req.body;

  // console.log("this is the data", data);

  try {
    await Page.updateOne(
      { title: title },
      {
        title: data.title,
        p1: data.p1 || "",
        p2: data.p2 || "",
        p3: data.p3 || "",
        p4: data.p4 || "",
        p5: data.p5 || "",
      }
    );

    const updatedDoc = await page.find({ title: title });
    // console.log("weee hooo ////////////", updatedDoc);
    await res.status(200).json(updatedDoc);
  } catch (err) {
    console.error(err);
  }
}
export default handler;

// create, read, update, destroy
// this holds read and update, create is in ../pages.js and destroy is probably not needed for pages
