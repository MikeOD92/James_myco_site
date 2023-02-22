import Image from "next/image";
import page from "../models/page";
import dbConnect from "../utils/dbConnect";
import AnimationWrapper from "../components/AnimationWrapper";
import { motion } from "framer-motion";
const About = (props) => {
  return (
    <AnimationWrapper>
      <div className="absolute top-14 bg-[url('/img/about_bg.PNG')] bg-cover max-w-full pt-10 md:p-10">
        <div className="w-full flex flex-col md:flex-row md:justify-between rounded-md">
          <h1 className="text-bruise w-screen md:relative md:top-24 md:right-10 lg:top-48 lg:right-0 md:text-left">
            About
          </h1>
          <Image
            src="/img/portrait.JPG"
            width="250"
            height="250"
            alt="portait"
            className="p-5 bg-zinc-300 rounded-md self-center w-full md:w-1/3"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ type: "easeIn", duration: 0.6 }}
          className="w-full flex flex-col md:flex-row md:justify-between rounded-md mt-5"
          //className="w-full flex flex-col items-center md:items-stretch md:flex-row mt-5"
        >
          <div>
            <Image
              src="/img/mycelium2.jpg"
              width="300"
              height="300"
              alt="mycelium"
              className="p-5 bg-zinc-300 rounded-md self-center w-full"
            />
          </div>
          <div className="text-right p-5 md:p-10 mt-5 md:mt-0 md:ml-5 w-full bg-zinc-300 text-black opacity-90 rounded-md">
            {props.about ? (
              <p style={{ whiteSpace: "pre-wrap" }}>{props.about.p1}</p>
            ) : (
              ""
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ type: "easeIn", duration: 0.6 }}
          className="w-full flex flex-col md:flex-row md:justify-between rounded-md mt-5"
          // className="w-full flex flex-col items-center md:items-stretch md:flex-row mt-5"
        >
          <div className="text-left p-5 md:p-10 mb-5 md:mb-0 md:mr-5 w-full bg-zinc-300 text-black opacity-90 rounded-md">
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
              className="p-5 bg-zinc-300 rounded-md self-center w-full"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ type: "easeIn", duration: 0.6 }}
          className="w-full flex flex-col items-center md:items-stretch md:flex-row mt-5"
        >
          <div className="text-right p-5 md:p-10 mb-5 md:mb-0 w-full bg-zinc-300 text-black opacity-90 rounded-md">
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
        </motion.div>
      </div>
    </AnimationWrapper>
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
