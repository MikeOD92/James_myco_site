// import { MongoClient } from "mongodb";

import Page from "../../models/page";
import dbConnect from "../../utils/dbConnect";
import handler from "../../utils/handler";
// import handler from "../../../utils/handler";

handler.get(getPage);
handler.post(createPage);
handler.put(editPage);

async function getPage(req, res) {
  const page = req.body.page;
  dbConnect();
  const doc = await Page.findOne({ title: page }).populate("posts");
  await res.status(200).json(doc);
}

async function createPage(req, res) {
  const data = req.body;

  // const { email, password } = data;

  dbConnect();

  const page = await Page.create(data);
  await page.save();

  res.status(201).json({ message: "Page created!" });
}

async function editPage(req, res) {
  const data = req.body;
  console.log("this is the data", data);
  dbConnect();

  try {
    const doc = await Page.updateOne(
      { title: data.title },
      {
        title: data.title,
        p1: data.p1 || "",
        p2: data.p2 || "",
        p3: data.p3 || "",
        p4: data.p4 || "",
        p5: data.p5 || "",
      }
    );

    const updatedDoc = await Page.find({ title: data.title });
    console.log("weee hooo ////////////", doc, updatedDoc);
    await res.status(200).json(updatedDoc);
  } catch (err) {
    console.error(err);
  }
}
export default handler;

// const MONGODB_URI = process.env.NEXT_PUBLIC_MONGO_DB_URI;

// const handler = async (req, res) => {
//   if (req.method === "POST") {
//     const client = await MongoClient.connect(`${MONGODB_URI}`);
//     const db = client.db();
//     const jamesAbout = db.collection("jamesPages");
//     await jamesAbout.insertOne(req.body);

//     client.close();

//     res.status(201).send({ Message: `Set ${req.body.title}` });
//   }

//   if (req.method === "PUT") {
//     const client = await MongoClient.connect(`${MONGODB_URI}`);
//     const db = client.db();
//     const jamesPages = db.collection("jamesPages");
//     // const about = jamesPages.findOne({ title: "About" });
//     await jamesPages.updateOne({ title: req.body.title }, { $set: req.body });

//     client.close();

//     res.status(200).send({ Message: `${req.body.title} Edited` });
//   }
// };

// export default handler;
