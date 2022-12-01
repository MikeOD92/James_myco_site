import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGO_DB_URI;

const handler = async (req, res) => {
  if (req.method === "POST") {
    const client = await MongoClient.connect(`${MONGODB_URI}`);
    const db = client.db();
    const james_events = db.collection("james_events");
    await james_events.insertOne(req.body);

    client.close();

    res.status(201).send({ Message: "Created Event" });
  }
};
export default handler;
