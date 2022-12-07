import Link from "next/link";
import Header from "../components/Header";
// import { MongoClient } from "mongodb";
// import mongoose from "mongoose";

const Projects = (props) => {
  return (
    <div>
      <Header />
      <div className="p-20">
        <h1> Projects </h1>
        {/* <h1>{props.projects.p1}</h1> */}

        {props.projects?.posts
          ? props.projects.posts.map((post) => {
              return (
                <h1 key={post._id}>
                  {post.value[0]} {post.value[1]}
                </h1>
              );
            })
          : ""}
        {/* <Link href="/"> Home</Link>
        <Link href="/home"> Home2</Link> */}
      </div>
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
