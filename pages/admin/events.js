import Header from "../../components/Header";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import hasToken from "../../utils/checkUser";
import post from "../../models/post";
import page from "../../models/page";
import dbConnect from "../../utils/dbConnect";
import EventForm from "../../components/EventForm";
import Image from "next/Image";

const Events = (props) => {
  const router = useRouter();
  const [currentEvent, setCurrentEvent] = useState(null);
  //////
  const handlePageCreation = async (e) => {
    e.preventDefault();
    const eventPageData = {
      title: "events",
    };
    try {
      const response = await fetch("/api/pages", {
        method: "POST",
        body: JSON.stringify(eventPageData),
        headers: {
          "content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      router.replace("/admin/events");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute top-14 bg-[url('/img/mycorrhizae_background.PNG')] bg-cover bg-fixed w-full p-10 min-h-full">
        <div className="flex-col px-12 py-12 max-w-3xl mx-auto shadow-xl rounded-2xl bg-zinc-800">
          <div className="bg-lightmushroom p-5">
            {props.eventList ? (
              ""
            ) : (
              <button onClick={handlePageCreation}>create Event page</button>
            )}
            {/* /// */}
            {currentEvent === null && props.eventList ? (
              <div className="flex flex-col">
                <div
                  className="p-5 bg-green-600 m-3 flex rounded-md"
                  onClick={() => setCurrentEvent({})}
                >
                  <h2> Create New Event + </h2>
                </div>
                {props.eventList.map((itm) => {
                  return (
                    <div
                      className="p-5 bg-mushroom m-3 flex rounded-md"
                      key={itm._id}
                      onClick={() => setCurrentEvent(itm)}
                    >
                      <div>
                        <h2 className="text-xl pb-2">{itm.title}</h2>
                        <Image
                          src={
                            itm.images[0]
                              ? itm.images[0]
                              : "/img/sporeprint.jpg"
                          }
                          height={200}
                          width={200}
                          alt="event splash img"
                        />
                      </div>
                      <div className="w-1/2 p-5">
                        <p>{itm.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : currentEvent !== null ? (
              <div className="p-20 bg-lightmushroom">
                <button
                  className="p-3 bg-darkbruise"
                  onClick={() => setCurrentEvent(null)}
                >
                  Back
                </button>
                <EventForm pageid={props.pageId} event={currentEvent} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const token = await hasToken(context.req);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  dbConnect();

  const data = await post
    .find({ postType: "event" })
    .sort({ created: "desc" })
    .lean();

  for (let item of data) {
    if (item._id !== null) {
      item._id = item._id.toString();
    }
  }

  const doc = await page.findOne({ title: "events" }).lean();

  if (!data) {
    return {
      props: {},
    };
  }
  return {
    props: {
      pageId: doc._id.toString() || "",
      eventList: data,
    },
  };
}
export default Events;
