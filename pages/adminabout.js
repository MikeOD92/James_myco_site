import React, { useRef } from "react";
import { useRouter } from "next/router";
import { MongoClient } from "mongodb";

const AdminAbout = (props) => {
  const p1 = useRef();
  const p2 = useRef();
  const p3 = useRef();

  const router = useRouter();

  const handleTask = async (method, e) => {
    e.preventDefault();

    const aboutData = {
      title: "About",
      p1: p1.current.value,
      p2: p2.current.value,
      p3: p3.current.value,
    };
    const response = await fetch("/api/editAbout", {
      method: method,
      body: JSON.stringify(aboutData),
      headers: {
        "content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.replace("/about");
  };

  // const handlePut = async (e) => {
  //   console.log("correct funciton fires");
  //   e.preventDefault();

  //   const aboutData = {
  //     title: "About",
  //     p1: p1.current.value,
  //     p2: p2.current.value,
  //     p3: p3.current.value,
  //   };
  //   const response = await fetch("/api/editAbout", {
  //     method: "PUT",
  //     body: JSON.stringify(aboutData),
  //     headers: {
  //       "content-Type": "application/json",
  //     },
  //   });

  //   const data = await response.json();

  //   router.replace("/about");
  // };
  return (
    <div className="flex-col px-12 py-12 max-w-3xl mx-auto shadow-xl rounded-2xl">
      <form>
        <input
          type="text"
          // placeholder="paragraph 1"
          defaultValue={props.about.p1}
          ref={p1}
        />
        <input
          type="text"
          // placeholder="paragraph 2"
          ref={p2}
          defaultValue={props.about.p2}
        />
        <input
          type="text"
          // placeholder="paragraph 3"
          ref={p3}
          defaultValue={props.about.p3}
        />
        {props.about ? (
          <button
            className="bg-green-600 p-2"
            onClick={(e) => handleTask("PUT", e)}
          >
            PUT
          </button>
        ) : (
          <button onClick={(e) => handleTask("POST", e)}> POST </button>
        )}
      </form>
    </div>
  );
};

export default AdminAbout;

export async function getStaticProps() {
  const client = await MongoClient.connect(
    `mongodb+srv://modell:${process.env.NEXT_PUBLIC_DB_PASSWORD}@cluster0.ax3qeqy.mongodb.net/?retryWrites=true&w=majority`
  );
  const db = client.db();
  const jamesPages = db.collection("jamesPages");
  const about = await jamesPages.findOne({ title: "About" });
  client.close();

  return {
    props: {
      about: {
        id: about._id.toString(),
        title: about.title,
        p1: about.p1,
        p2: about.p2,
        p3: about.p3,
      },
    },
  };
}
