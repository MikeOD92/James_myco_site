import Link from "next/link";
import Header from "../components/Header";
import { MongoClient } from "mongodb";
import Image from "next/image";
const About = (props) => {
  // console.log(props);
  return (
    // <div className="bg-lightmushroom">
    <div>
      <Header />
      <div className="absolute top-14 bg-[url('/img/about_bg.PNG')] bg-cover w-full p-10">
        <div className="text-left">
          <h1 className="text-bruise"> About </h1>

          <div className="flex flex-wrap row-reverse">
            <div className="p-5 w-full flex flex-row justify-end rounded-md">
              <Image
                src="/img/portrait.JPG"
                width="300"
                height="300"
                alt="portait"
                className="p-5 bg-zinc-200 rounded-md"
              />
            </div>
            <div className="p-5">
              <Image
                src="/../public/img/mycelium2.jpg"
                width="300"
                height="300"
                alt="mycelium"
                className="p-5 bg-zinc-200 rounded-md"
              />
            </div>
            <div className="text-left p-10 m-5 bg-zinc-300 text-black opacity-90 rounded-md w-2/3 flex flex-row justify-end">
              {props.about ? <p>{props.about.p1}</p> : ""}
            </div>
            <div className="text-left p-10 m-5 bg-zinc-300 text-black opacity-90 rounded-md w-2/3">
              {props.about ? <p>{props.about.p2}</p> : ""}
            </div>
            <div className="p-5">
              <Image
                src="/img/mycelium.jpg"
                width="300"
                height="300"
                alt="mycelium"
                className="p-5 bg-zinc-200 rounded-md"
              />
            </div>

            <div className="text-left p-10 m-5 bg-zinc-300 text-black opacity-90 rounded-md">
              {props.about ? <p>{props.about.p3}</p> : ""}
              <br />
              {props.about ? <p>{props.about.p4}</p> : ""}
            </div>
          </div>
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
