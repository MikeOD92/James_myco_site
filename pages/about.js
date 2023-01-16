import Header from "../components/Header";
import Image from "next/image";
import page from "../models/page";
import dbConnect from "../utils/dbConnect";

const About = (props) => {
  // console.log(props);
  return (
    // <div className="bg-lightmushroom">
    <div>
      <Header />
      <div className="absolute top-14 bg-[url('/img/about_bg.PNG')] bg-cover w-full p-10">
        <div className="text-left">
          <h1 className="text-bruise relative top-48 text-left"> About </h1>

          <div className="flex flex-wrap row-reverse">
            <div className="w-full flex flex-row justify-end rounded-md">
              <Image
                src="/img/portrait.JPG"
                width="300"
                height="300"
                alt="portait"
                className="p-5 bg-zinc-300 rounded-md"
              />
            </div>
            <div className="w-full flex flex-row mt-5">
              <div>
                <Image
                  src="/img/mycelium2.jpg"
                  width="300"
                  height="300"
                  alt="mycelium"
                  className="p-5 bg-zinc-300 rounded-md"
                />
              </div>
              <div className="text-right p-10 ml-5 w-5/6 bg-zinc-300 text-black opacity-90 rounded-md">
                {props.about ? (
                  <p style={{ whiteSpace: "pre-wrap" }}>{props.about.p1}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="w-full flex flex-row mt-5">
              <div className="text-left p-10 bg-zinc-300 text-black opacity-90 rounded-md w-5/6">
                {props.about ? (
                  <p style={{ whiteSpace: "pre-wrap" }}>{props.about.p2}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="ml-5">
                <Image
                  src="/img/mycelium.jpg"
                  width="300"
                  height="300"
                  alt="mycelium"
                  className="p-5 bg-zinc-300 rounded-md"
                />
              </div>
            </div>
            <div className="w-full flex flex-row mt-5">
              <div className="text-left p-10 w-full bg-zinc-300 text-black opacity-90 rounded-md">
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
