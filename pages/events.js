import Link from "next/link";
import { MongoClient } from "mongodb";
import Header from "../components/Header";
import CalanderTile from "../components/CalanderTile";
import Calendar from "react-calendar";
import { useState } from "react";
import "../styles/Calendar.module.css";

const Events = (props) => {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <Header />
      <div className="w-full bg-[url('/img/sporeprint.jpg')] bg-cover max-w-screen h-screen flex justify-evenly items-center">
        <div>
          <h1 className="text-8xl text-yellow-400">Events</h1>
        </div>
        <div className="bg-bruise p-10 w-1/2 h-2/3 rounded-md overflow-y-scroll align-left">
          {/* change overflow to overflow-auto or y-auto */}
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={({ date }) =>
              date.getDate() === new Date().getDate() ? "today" : null
            }
            tileContent={({ date }) => {
              // console.log(date.toLocaleDateString());
              // let calEvent = null;
              let calEvent = props.eventList.filter((item) => {
                const eventDate = new Date(item.date);
                if (
                  eventDate.toLocaleDateString() === date.toLocaleDateString()
                ) {
                  console.log(
                    "/////////////////////\n" +
                      eventDate.toLocaleDateString() +
                      " - - - " +
                      date.toLocaleDateString() +
                      "\n////////////////////"
                  );
                }
              });

              if (calEvent.length > 0) {
                console.log(calEvent);
                return <CalanderTile calEvent={calEvent} key={date} />;
              }
              return <CalanderTile key={date} />;
            }}
            // <CalanderTile />: null}
            showNeighboringMonth={false}
            view="month"
            showNavigation={false}
          />
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
    `mongodb+srv://modell:${process.env.NEXT_PUBLIC_DB_PASSWORD}@cluster0.ax3qeqy.mongodb.net/?retryWrites=true&w=majority`
  );
  const db = client.db();
  const eventsCollection = db.collection("james_events");

  const data = await eventsCollection.find().toArray();

  client.close();

  const eventList = data.map((item) => ({
    id: item._id.toString(),
    title: item.title,
    desc: item.desc,
    date: new Date(item.date),
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
