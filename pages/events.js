import Header from "../components/Header";
import { Calendar } from "../components/Calendar";
import { useState, useEffect } from "react";

const Events = (props) => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {}, [props.eventList]);

  return (
    <div>
      <Header />
      <div className="w-full bg-[url('/img/lichen.jpg')] bg-fixed bg-top bg-cover max-w-screen min-h-screen flex justify-evenly items-center">
        <div>
          <h1 className="text-8xl text-yellow-400">Events</h1>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="bg-lightmushroom text-zinc-800 p-20 w-1/2">
          <Calendar events={props.eventList.posts} />
        </div>
        <div className="bg-zinc-800bg-[url('/img/sporeprint.jpg')]  bg-cover bg-blend-overlay w-1/2 p-10">
          {props.eventList?.posts.map((item) => {
            return (
              // this will be a component
              <div
                key={item._id}
                className="text-black p-5 m-3 rounded-md bg-lightmushroom"
              >
                <h3>{item.title}</h3>
                <p>{item.dateTime}</p>
                <p>{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const data = await fetch("http://localhost:3000/api/pages/events").then(
    (res) => res.json()
  );
  console.log(data);
  if (!data) {
    return {
      props: {},
    };
  }
  return {
    props: {
      eventList: {
        _id: data._id || "",
        title: data.title || "",
        posts: data.posts || [],
      },
    },
  };
}
export default Events;
