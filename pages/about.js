import Header from "../components/Header";
import Image from "next/image";
import page from "../models/page";
import dbConnect from "../utils/dbConnect";

const About = (props) => {
  return (
    <div>
      <Header />
      <div className="absolute top-14 bg-[url('/img/about_bg.PNG')] bg-cover w-full p-10">
        <div className="w-full flex flex-col md:flex-row md:justify-between rounded-md">
          <h1 className="text-yellow-400 md:text-bruise bg-zinc-800/75 md:bg-[rgba(0,0,0,0)] h-full w-screen mb-10 md:relative md:top-48 md:text-left">
            About
          </h1>
          <Image
            src="/img/portrait.JPG"
            width="300"
            height="300"
            alt="portait"
            className="p-5 bg-zinc-300 rounded-md self-center"
          />
        </div>
        <div className="w-full flex flex-col items-center md:items-stretch md:flex-row mt-5">
          <div>
            <Image
              src="/img/mycelium2.jpg"
              width="300"
              height="300"
              alt="mycelium"
              className="p-5 bg-zinc-300 rounded-md"
            />
          </div>
          <div className="text-right p-10 mt-5 md:mt-0 md:ml-5 w-5/6 bg-zinc-300 text-black opacity-90 rounded-md">
            {props.about ? (
              <p style={{ whiteSpace: "pre-wrap" }}>{props.about.p1}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="w-full flex flex-col items-center md:items-stretch md:flex-row mt-5">
          <div className="text-left p-10 mb-5 md:mb-0 md:mr-5 w-5/6 bg-zinc-300 text-black opacity-90 rounded-md">
            {props.about ? (
              <p style={{ whiteSpace: "pre-wrap" }}>{props.about.p2}</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <Image
              src="/img/mycelium.jpg"
              width="300"
              height="300"
              alt="mycelium"
              className="p-5 bg-zinc-300 rounded-md"
            />
          </div>
        </div>
        <div className="w-full flex flex-col items-center md:items-stretch md:flex-row mt-5">
          <div className="text-right p-10 mb-5 md:mb-0 w-full bg-zinc-300 text-black opacity-90 rounded-md">
            {props.about ? (
              <p style={{ whiteSpace: "pre-wrap" }}>{props.about.p3}</p>
            ) : (
              ""
            )}
            <br />
            {props.about ? (
              <p style={{ whiteSpace: "pre-wrap" }}>{props.about.p4}</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

export async function getServerSideProps() {
  dbConnect();

  const data = await page.findOne({ title: "about" }).lean();

  if (data._id !== null) {
    data._id = data._id.toString();
  }

  if (!data) {
    return {
      props: {},
    };
  }
  return {
    props: {
      about: data,
    },
  };
}
