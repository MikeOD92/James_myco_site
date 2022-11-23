import Link from "next/link";
import Header from "../components/Header";
import { MongoClient } from "mongodb";

const About = (props) => {
  // console.log(props);
  return (
    // <div className="bg-lightmushroom">
    <div>
      <Header />
      <div className="absolute top-14 bg-[url('/img/sporeprint.jpg')] bg-cover h-1/3 w-full">
        <h2 className="text-red-400 text-16">
          {" "}
          I dont think this background works
        </h2>
        <h1 className="text-yellow-300"> About </h1>
        {props.about ? <p>{props.about.p1}</p> : ""}
        {props.about ? <p>{props.about.p2}</p> : ""}
        {props.about ? <p>{props.about.p3}</p> : ""}
        <Link href="/"> Home</Link>
        <Link href="/home"> Home2</Link>
      </div>
    </div>
  );
};

export default About;

export async function getStaticProps() {
  const client = await MongoClient.connect(
    `mongodb+srv://modell:${process.env.NEXT_PUBLIC_DB_PASSWORD}@cluster0.ax3qeqy.mongodb.net/?retryWrites=true&w=majority`
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
      },
    },
  };
}
