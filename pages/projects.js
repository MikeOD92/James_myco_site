import Link from "next/link";
import Header from "../components/Header";
import Project from "../components/Project";
// import { MongoClient } from "mongodb";
// import mongoose from "mongoose";

const Projects = (props) => {
  return (
    <div>
      <Header />
      <div className="p-20 bg-[url('/img/petri_dish.jpg')] bg-fixed bg-top bg-cover max-w-screen flex h-screen justify-evenly items-center">
        <h1> Projects </h1>
      </div>
      {/* <h1>{props.projects.p1}</h1> */}
      <div className="flex flex-col p-10 round-md text-lightmushroom">
        {props.projects?.posts.map((post) => {
          return <Project key={post._id} project={post} />;
        })}
      </div>
      {/* 
      {props.projects?.posts.map((proj) => {
        return(
          <div>
            <h1 key={post._id}>
              {post.title}
            </h1>
            <p>{post.body}</p>
          <div>
        );
      })} */}
    </div>
  );
};

export default Projects;

export async function getServerSideProps() {
  const data = await fetch("http://localhost:3000/api/pages/projects").then(
    (res) => res.json()
  );
  if (!data) {
    return {
      props: {},
    };
  }
  return {
    props: {
      projects: {
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
