import Link from "next/link";
import Header from "../../components/Header";
import { MongoClient } from "mongodb";
import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/router";

const About = (props) => {
  const p1 = useRef();
  const p2 = useRef();
  const p3 = useRef();
  const p4 = useRef();

  const router = useRouter();

  const handleTask = async (method, e) => {
    e.preventDefault();

    const aboutData = {
      title: "About",
      p1: p1.current.value,
      p2: p2.current.value,
      p3: p3.current.value,
      p4: p4.current.value,
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
  // console.log(props);
  return (
    // <div className="bg-lightmushroom">
    <div>
      <Header />
      <div className="absolute top-14 bg-[url('/img/mycorrhizae_background.PNG')] bg-cover bg-fixed w-full p-10">
        <div className="flex-col px-12 py-12 max-w-3xl mx-auto shadow-xl rounded-2xl bg-zinc-800">
          <form className="flex flex-col align-top">
            <label> Paragraph 1</label>
            <textarea
              // type="text"
              // placeholder="paragraph 1"
              defaultValue={props.about.p1}
              ref={p1}
              rows="4"
              cols="50"
              className="m-3"
            />
            <label> Paragraph 2</label>
            <textarea
              // placeholder="paragraph 2"
              ref={p2}
              defaultValue={props.about.p2}
              rows="4"
              cols="50"
              className="m-3"
            />
            <label> Paragraph 3</label>
            <textarea
              ref={p3}
              defaultValue={props.about.p3}
              rows="4"
              cols="50"
              className="m-3"
            />
            <label> Paragraph 4</label>
            <textarea
              ref={p4}
              defaultValue={props.about.p4}
              rows="4"
              cols="50"
              className="m-3"
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
      </div>
    </div>
  );
};

export default About;

export async function getStaticProps() {
  const client = await MongoClient.connect(
    `${process.env.NEXT_PUBLIC_MONGO_DB_URI}`
  );
  const db = client.db();
  const jamesPages = db.collection("jamesPages");
  // console.log(jamesPages);
  const about = await jamesPages.findOne({ title: "About" });
  // console.log(about);

  client.close();

  return {
    props: {
      about: {
        id: about._id.toString(),
        title: about.title,
        p1: about.p1,
        p2: about.p2,
        p3: about.p3,
        p4: about.p4,
      },
    },
  };
}
