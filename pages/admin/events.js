import Link from "next/link";
import { MongoClient } from "mongodb";
import Header from "../../components/Header";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
const Events = (props) => {
  const [date, setDate] = useState(new Date());

  const title = useRef();
  const desc = useRef();
  const formDate = useRef();
  const location = useRef();
  const img = useRef();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = {
      title: title.current.value,
      desc: desc.current.value,
      date: formDate.current.value,
      location: location.current.value,
      img: img.current.value,
    };

    const response = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify(eventData),
      headers: {
        "content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.replace("/events");
  };

  return (
    <div>
      <Header />
      <div className="p-20">
        <div className="flex-col px-12 py-12 max-w-3xl mx-auto shadow-xl rounded-2xl">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="title" ref={title} />
            <input type="text" ref={desc} />
            <input type="datetime-local" ref={formDate} />
            <input type="text" ref={location} />
            <input type="text" ref={img} />
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    `${process.env.NEXT_PUBLIC_MONGO_DB_URI}`
  );
  const db = client.db();
  const eventsCollection = db.collection("james_events");

  const data = await eventsCollection.find().toArray();

  client.close();

  const eventList = data.map((item) => ({
    id: item._id.toString(),
    title: item.title,
    desc: item.desc,
    date: item.date,
    location: item.location,
    img: item.img,
  }));

  return {
    props: {
      eventList: JSON.parse(JSON.stringify(eventList)),
    },
  };
}
export default Events;
