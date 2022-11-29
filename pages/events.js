import Link from "next/link";
import { MongoClient } from "mongodb";
import Header from "../components/Header";
import { Calendar } from "../components/Calendar";
import { useState, useEffect } from "react";

const Events = (props) => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {}, [props.eventList]);

  return (
    <div>
      <Header />
      <div className="w-full bg-[url('/img/sporeprint.jpg')] bg-cover max-w-screen h-screen flex justify-evenly items-center">
        <div>
          <h1 className="text-8xl text-yellow-400">Events</h1>
        </div>
        <div className="bg-bruise p-24 w-1/2 h-full rounded-md overflow-y-scroll align-left">
          {/* change overflow to overflow-auto or y-auto */}
          <Calendar events={props.eventList} />
          {props.eventList.map((item) => {
            return (
              <div
                key={item._id}
                className="text-black p-5 m-3 rounded-md bg-lightmushroom opacity-100"
              >
                <h3>{item.title}</h3>
                <p>{item.date}</p>
                <p>{item.desc}</p>
              </div>
            );
          })}
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
