import { useState, useEffect } from "react";
import post from "../models/post";
import dbConnect from "../utils/dbConnect";
import EventTile from "../components/EventTile";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin
import NoSSR from "../components/NoSSR";
import AnimationWrapper from "../components/AnimationWrapper";
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
        if (view - 3 >= 0) {
          setView(view - 3);
          location.assign("#eventTop");
        }
        break;
      case "+":
        if (view + 3 < events.length) {
          setView(view + 3);
          location.assign("#eventTop");
        }
        break;
    }
  };
  return (
    <AnimationWrapper>
      <div className="bg-[url('/img/lichen.jpg')] bg-fixed bg-top bg-cover max-w-screen min-h-screen flex justify-evenly items-center">
        <div>
          <h1 className="text-8xl text-yellow-400">Events</h1>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="hidden lg:block bg-lightmushroom text-zinc-800 p-20 w-1/2">
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
        <div id="eventTop" className="bg-zinc-900 w-full lg:w-1/2 p-10">
          {events.slice(view, view + 3).map((item) => {
            return (
              <div key={item._id}>
                <EventTile post={item} />
              </div>
            );
          })}
          <div className="bg-mushroom rounded-md w-full lg:w-1/4 flex mt-3">
            <button
              className="p-10 lg:p-5 bg-mushroom rounded-md w-1/2 hover:bg-lightmushroom hover:text-darkbruise flex justify-center"
              onClick={(e) => handleClick(e, "-")}
            >
              <FaChevronLeft />
            </button>
            <button
              className="p-10 lg:p-5 bg-mushroom rounded-md w-1/2 hover:bg-lightmushroom hover:text-darkbruise flex justify-center"
              onClick={(e) => handleClick(e, "+")}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </AnimationWrapper>
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
