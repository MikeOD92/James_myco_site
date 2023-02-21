import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import ProjectTile from "../components/ProjectTile";
import post from "../models/post";
import dbConnect from "../utils/dbConnect";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AnimationWrapper from "../components/AnimationWrapper";

const Projects = (props) => {
  const [view, setView] = useState(0);

  const [window, setWindow] = useState();

  useEffect(() => {
    setWindow(Window.innerWidth);
  }, [window]);

  const handleClick = (e, sym) => {
    e.preventDefault();
    switch (sym) {
      case "-":
        if (view > 4) {
          location.assign("#projectTop");
          setView(view - 5);
        }
        break;
      case "+":
        if (view + 5 <= props.projects.length - 1) {
          location.assign("#projectTop");
          setView(view + 5);
        }
        break;
    }
  };

  return (
    <AnimationWrapper>
      <div className="bg-[url('/img/petri_dish.jpg')] bg-contain md:bg-cover bg-top bg-fixed max-w-screen min-h-screen flex justify-evenly items-center">
        <h1> Projects </h1>
      </div>
      <div
        id="projectTop"
        className="bg-zinc-800 flex flex-col md:p-10 mt-10 round-md text-lightmushroom"
      >
        {props.projects?.slice(view, view + 5).map((post) => {
          return (
            <Link
              className="mb-10"
              key={post._id}
              href={`/project/${post._id}`}
            >
              <ProjectTile post={post} />
            </Link>
          );
        })}

        <div className="flex bg-mushroom rounded-md w-100 md:w-1/6 m-5">
          <button
            className=" p-10 md:p-5 bg-mushroom rounded-md w-1/2 hover:bg-lightmushroom hover:text-darkbruise flex justify-center"
            onClick={(e) => handleClick(e, "-")}
          >
            <FaChevronLeft />
          </button>
          <button
            className="p-10 md:p-5 bg-mushroom rounded-md w-1/2 hover:bg-lightmushroom hover:text-darkbruise flex justify-center"
            onClick={(e) => handleClick(e, "+")}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default Projects;

export async function getServerSideProps() {
  dbConnect();

  const data = await post
    .find({ postType: "project" })
    .sort({ created: "desc" })
    .lean();

  for (let item of data) {
    if (item._id !== null) {
      item._id = item._id.toString();
    }
  }

  if (!data) {
    return {
      props: {},
    };
  }
  return {
    props: {
      projects: data,
    },
  };
}
