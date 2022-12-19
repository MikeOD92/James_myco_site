import Header from "../../components/Header";
import { useRef } from "react";
import { useRouter } from "next/router";
import hasToken from "../../utils/checkUser";
import ProjectFrom from "../../components/ProjectFrom";

const Projects = (props) => {
  const router = useRouter();

  const handleCreation = async (e) => {
    e.preventDefault();

    const projectData = {
      title: "projects",
    };
    try {
      const response = await fetch("/api/pages", {
        method: "POST",
        body: JSON.stringify(projectData),
        headers: {
          "content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      router.replace("/admin/projects");
    } catch (err) {
      console.error(err);
    }
  };

  const addProject = async (e) => {
    e.preventDefault();

    const post = {
      pageid: props.projects._id,
      created: new Date(),
      postType: "project",
      value: ["hello", "World"],
    };

    // console.log("logging in admin/projects before POST", post);

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "content-Type": "application/json",
      },
    });
    // console.log("request body", JSON.stringify(post));

    const data = await response.json();
    // console.log("logging response data in admin/projects", data);
  };

  return (
    // <div className="bg-lightmushroom">
    <div>
      <Header />
      <div className="absolute top-14 bg-[url('/img/mycorrhizae_background.PNG')] bg-cover bg-fixed w-full p-10 min-h-full">
        <div className="flex-col px-12 py-12 max-w-3xl mx-auto shadow-xl rounded-2xl bg-zinc-800">
          {props.projects ? (
            ""
          ) : (
            <button
              className="p-3 bg-green-600 border-double border-2 border-white m-3"
              onClick={(e) => handleCreation(e)}
            >
              Create Projects Page
            </button>
          )}
          <div className="p-20 bg-lightmushroom">
            <ProjectFrom pageid={props.projects._id} />
            {/* <form>
            <input type="String" label="type" ref={postType} /> */}
            {/* this should probably be a seprate component maybe even a just a post compoent that takes a project or event prop */}
            {/* <button onClick={(e) => addProject(e)}> Add Project </button> */}
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

export async function getServerSideProps(context) {
  const token = await hasToken(context.req);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const data = await fetch("http://localhost:3000/api/pages/projects").then(
    (res) => res.json()
  );
  if (!data) {
    console.log("did not find page");
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
