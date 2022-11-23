import React, { useRef } from "react";
import { useRouter } from "next/router";
// import { MongoClient } from "mongodb";

const Events = () => {
  const title = useRef();
  const desc = useRef();
  const date = useRef();
  const location = useRef();
  const img = useRef();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = {
      title: title.current.value,
      desc: desc.current.value,
      date: date.current.value,
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
    <div className="flex-col px-12 py-12 max-w-3xl mx-auto shadow-xl rounded-2xl">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="title" ref={title} />
        <input type="text" ref={desc} />
        <input type="datetime-local" ref={date} />
        <input type="text" ref={location} />
        <input type="text" ref={img} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Events;
