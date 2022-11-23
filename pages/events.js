import Link from "next/link";

const Events = (props) => {
  return (
    <div>
      <h1> Events </h1>
      <Link href="/"> Home</Link>
      <Link href="/home"> Home2</Link>
    </div>
  );
};

export default Events;

export async function getStaticProps() {
  const client = await MongoClient.connect(
    `mongodb+srv://modell:${process.env.NEXT_PUBLIC_DB_PASSWORD}@cluster0.ax3qeqy.mongodb.net/?retryWrites=true&w=majority`
  );
  const db = client.db();
  const james_events = db.collection("james_events");
  const data = james_events.find().toArray();

  client.close();

  console.log(data);

  return {
    props: {
      events: [
        {
          id: data._id.toString(),
          title: data.title,
          date: data.date,
          location: data.location,
          desc: data.desc,
          //image
          image: data.image,
        },
      ],
    },
  };
}
