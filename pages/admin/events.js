import Header from "../../components/Header";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import hasToken from "../../utils/checkUser";

const Events = (props) => {
  const [date, setDate] = useState(new Date());

  const title = useRef();
  const desc = useRef();
  const formDate = useRef();
  const location = useRef();
  const img = useRef();

  const router = useRouter();
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
  //////
  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventPost = {
      pageid: props.eventList._id,
      postType: "Event",
      title: title.current.value,
      desc: desc.current.value,
      dateTime: formDate.current.value,
      location: location.current.value,
      // img: img.current.value,
    };
    console.log("post data:", eventPost);
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(eventPost),
      headers: {
        "content-Type": "application/json",
      },
    });

    const data = await response.json();

    // console.log(data);

    // router.replace("/events");
  };

  return (
    <div>
      <Header />
      <div className="p-20">
        <div className="flex-col px-12 py-12 max-w-3xl mx-auto shadow-xl rounded-2xl">
          {props.eventList ? (
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="title" ref={title} />
              <input type="text" ref={desc} />
              <input type="datetime-local" ref={formDate} />
              <input type="text" ref={location} />
              <input type="text" ref={img} />
              <input type="submit" />
            </form>
          ) : (
            <button onClick={handlePageCreation}>create Event page</button>
          )}
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
        p1: data.p1 || "",
        p2: data.p2 || "",
        p3: data.p3 || "",
        p4: data.p4 || "",
        posts: data.posts || [],
      },
    },
  };
}
export default Events;
