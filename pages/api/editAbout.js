import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const client = await MongoClient.connect(
      `mongodb+srv://modell:${process.env.NEXT_PUBLIC_DB_PASSWORD}@cluster0.ax3qeqy.mongodb.net/?retryWrites=true&w=majority`
    );
    const db = client.db();
    const jamesAbout = db.collection("jamesPages");
    await jamesAbout.insertOne(req.body);

    client.close();

    res.status(201).send({ Message: "Set About" });
  }

  if (req.method === "PUT") {
    const client = await MongoClient.connect(
      `mongodb+srv://modell:${process.env.NEXT_PUBLIC_DB_PASSWORD}@cluster0.ax3qeqy.mongodb.net/?retryWrites=true&w=majority`
    );
    const db = client.db();
    const jamesPages = db.collection("jamesPages");
    // const about = jamesPages.findOne({ title: "About" });
    await jamesPages.updateOne({ title: "About" }, { $set: req.body });

    client.close();

    res.status(200).send({ Message: "About Edited" });
  }
};

export default handler;
