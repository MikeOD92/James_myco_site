import Header from "../../components/Header";
import { useRef } from "react";
import { useRouter } from "next/router";
import hasToken from "../../utils/checkUser";

const Projects = (props) => {
  const p1 = useRef();
  const p2 = useRef();
  const p3 = useRef();
  const p4 = useRef();
  const router = useRouter();

  const handleCreation = async (e) => {
    e.preventDefault();

    const projectData = {
      title: "projects",
      p1: p1.current.value,
      p2: p2.current.value,
      p3: p3.current.value,
      p4: p4.current.value,
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

  const handlePut = async (e) => {
    e.preventDefault();

    const projectData = {
      title: "projects",
      p1: p1.current.value,
      p2: p2.current.value,
      p3: p3.current.value,
      p4: p4.current.value,
    };
    try {
      const response = await fetch("/api/pages/projects", {
        method: "PUT",
        body: JSON.stringify(projectData),
        headers: {
          "content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      router.replace("/projects");
    } catch (err) {
      console.error(err);
    }
  };

  const addProject = async (e) => {
    e.preventDefault();

    const post = {
      pageid: props.projects._id,
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
      <div className="absolute top-14 bg-[url('/img/mycorrhizae_background.PNG')] bg-cover bg-fixed w-full p-10">
        <div className="flex-col px-12 py-12 max-w-3xl mx-auto shadow-xl rounded-2xl bg-zinc-800">
          <form className="flex flex-col align-top">
            <label> Paragraph 1</label>
            <textarea
              // type="text"
              // placeholder="paragraph 1"
              defaultValue={props.projects.p1}
              ref={p1}
              rows="4"
              cols="50"
              className="m-3"
            />
            <label> Paragraph 2</label>
            <textarea
              // placeholder="paragraph 2"
              ref={p2}
              defaultValue={props.projects.p2}
              rows="4"
              cols="50"
              className="m-3"
            />
            <label> Paragraph 3</label>
            <textarea
              ref={p3}
              defaultValue={props.projects.p3}
              rows="4"
              cols="50"
              className="m-3"
            />
            <label> Paragraph 4</label>
            <textarea
              ref={p4}
              defaultValue={props.projects.p4}
              rows="4"
              cols="50"
              className="m-3"
            />
            {props.projects ? (
              <button
                className="bg-green-600 p-2"
                onClick={(e) => handlePut(e)}
              >
                PUT
              </button>
            ) : (
              <button onClick={(e) => handleCreation(e)}> POST </button>
            )}
          </form>
        </div>
        <div className="p-20 bg-lightmushroom">
          {/* <form>
            <input type="String" label="type" ref={postType} /> */}
          {/* this should probably be a seprate component maybe even a just a post compoent that takes a project or event prop */}
          <button onClick={(e) => addProject(e)}> Add Project </button>
          {/* </form> */}
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
