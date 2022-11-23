import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const client = await MongoClient.connect(
      `mongodb+srv://modell:${process.env.NEXT_PUBLIC_DB_PASSWORD}@cluster0.ax3qeqy.mongodb.net/?retryWrites=true&w=majority`
    );
    const db = client.db();
    const james_events = db.collection("james_events");
    await james_events.insertOne(req.body);

    client.close();

    res.status(201).send({ Message: "Created Event" });
  }
};
export default handler;
