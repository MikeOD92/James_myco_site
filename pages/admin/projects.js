import Link from "next/link";
import Header from "../../components/Header";
import { MongoClient } from "mongodb";
import { useRef } from "react";
import { useRouter } from "next/router";

const Projects = (props) => {
  const p1 = useRef();
  const p2 = useRef();
  const p3 = useRef();
  const p4 = useRef();
  // const postType = useRef();
  const router = useRouter();

  const handleTask = async (method, e) => {
    e.preventDefault();

    const projectData = {
      title: "Projects",
      p1: p1.current.value,
      p2: p2.current.value,
      p3: p3.current.value,
      p4: p4.current.value,
      // posts: [],
    };

    const response = await fetch("/api/pages", {
      method: method,
      body: JSON.stringify(projectData),
      headers: {
        "content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    // router.replace("/about");
  };
  const addProject = async (e) => {
    e.preventDefault();

    const post = {
      pageId: props.projects._id,
      postType: "Project",
      value: ["hello", "World"],
    };

    // console.log(post);

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "content-Type": "application/json",
      },
    });
    const data = await response.json();
    // console.log(data);
  };

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
              // defaultValue={props.projects.p1 }
              ref={p1}
              rows="4"
              cols="50"
              className="m-3"
            />
            <label> Paragraph 2</label>
            <textarea
              // placeholder="paragraph 2"
              ref={p2}
              // defaultValue={props.projects.p2}
              rows="4"
              cols="50"
              className="m-3"
            />
            <label> Paragraph 3</label>
            <textarea
              ref={p3}
              // defaultValue={props.projects.p3}
              rows="4"
              cols="50"
              className="m-3"
            />
            <label> Paragraph 4</label>
            <textarea
              ref={p4}
              // defaultValue={props.projects.p4}
              rows="4"
              cols="50"
              className="m-3"
            />
            {props.projects ? (
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
        <div className="p-20 bg-lightmushroom">
          {/* <form>
            <input type="String" label="type" ref={postType} /> */}
          <button onClick={(e) => addProject(e)}> Add Project </button>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default Projects;

export async function getStaticProps() {
  const client = await MongoClient.connect(
    `${process.env.NEXT_PUBLIC_MONGO_DB_URI}`
  );
  const db = client.db();
  const jamesPages = db.collection("pages");
  // console.log(jamesPages);
  const projects = await jamesPages.findOne({ title: "Projects" });
  // console.log(about);
  for (let i in projects.posts) {
    console.log(projects.posts[i]);
  }
  client.close();

  return {
    props: {
      projects: {
        _id: projects._id.toString(),
        title: projects.title,
        p1: projects.p1,
        p2: projects.p2,
        p3: projects.p3,
        p4: projects.p4,
        // posts: projects.post || [],
        // posts: lean(projects.posts),
        posts:
          projects.posts.forEach((post) =>
            JSON.parse(
              JSON.stringify({
                _id: post._id.toString(),
                type: post.type,
                value: post.value,
              })
            )
          ) || [],
      },
    },
  };
}
