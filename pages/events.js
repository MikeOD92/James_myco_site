import Header from "../components/Header";
import { Calendar } from "../components/Calendar";
import { useState, useEffect } from "react";
import post from "../models/post";
import dbConnect from "../utils/dbConnect";
import EventTile from "../components/EventTile";

const Events = (props) => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(0);
  useEffect(() => {
    setEvents(
      props.eventList.filter((item) => {
        if (new Date(item.date) >= new Date()) {
          return item;
        }
      })
    );
  }, [props.eventList]);

  return (
    <div className="max-w-screen">
      <Header />
      <div className="bg-[url('/img/lichen.jpg')] bg-fixed bg-top bg-cover max-w-screen min-h-screen flex justify-evenly items-center">
        <div>
          <h1 className="text-8xl text-yellow-400">Events</h1>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="bg-lightmushroom text-zinc-800 p-20 w-1/2">
          <Calendar events={props.eventList} />
        </div>
        <div className="bg-zinc-900 bg-cover bg-blend-overlay w-1/2 p-10">
          {events.slice(view, view + 2).map((item) => {
            return (
              <div key={item._id}>
                <EventTile post={item} />
              </div>
            );
          })}
          <button onClick={() => setView(view + 2)}> {">"} </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  dbConnect();

  const data = await post
    .find({ postType: "event" })
    .sort({ created: "asc" })
    .lean();

  for (let item of data) {
    if (item._id !== null) {
      item._id = item._id.toString();
    }
  }

  if (!data) {
    return {
      props: {},
    };
  }
  return {
    props: {
      eventList: data,
    },
  };
}
export default Events;
