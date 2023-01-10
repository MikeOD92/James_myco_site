import Header from "../components/Header";
import { useState, useEffect } from "react";
import post from "../models/post";
import dbConnect from "../utils/dbConnect";
import EventTile from "../components/EventTile";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin
import NoSSR from "../components/NoSSR";

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

  const handleClick = (e, sym) => {
    e.preventDefault();
    switch (sym) {
      case "-":
        if (view > 1) {
          setView(view - 2);
          location.assign("#eventTop");
        }
        break;
      case "+":
        if (view < events.length - 1) {
          setView(view + 2);
          location.assign("#eventTop");
        }
        break;
    }
  };
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
          <NoSSR>
            <FullCalendar
              plugins={[dayGridPlugin]}
              eventBackgroundColor="#8C7090"
              className="text-black"
              events={props.eventList}
              height={"85vh"}
            />
          </NoSSR>
        </div>
        <div id="eventTop" className="bg-zinc-900 w-1/2 mt-5 p-10">
          {events.slice(view, view + 2).map((item) => {
            return (
              <div key={item._id}>
                <EventTile post={item} />
              </div>
            );
          })}
          <div className="bg-mushroom rounded-md w-1/6 flex justify-around mt-3">
            <button
              className="p-2 bg-mushroom rounded-md w-1/2 hover:bg-lightmushroom hover:text-darkbruise flex justify-center"
              onClick={(e) => handleClick(e, "-")}
            >
              <FaChevronLeft />
            </button>
            <button
              className="p-2 bg-mushroom rounded-md w-1/2 hover:bg-lightmushroom hover:text-darkbruise flex justify-center"
              onClick={(e) => handleClick(e, "+")}
            >
              <FaChevronRight />
            </button>
          </div>
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
