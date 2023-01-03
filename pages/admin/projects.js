import Header from "../../components/Header";
import { useRef } from "react";
import { useRouter } from "next/router";
import hasToken from "../../utils/checkUser";
import ProjectFrom from "../../components/ProjectFrom";
import post from "../../models/post";
import page from "../../models/page";
import dbConnect from "../../utils/dbConnect";

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

  return (
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
            <ProjectFrom pageid={props.pageId} />
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

  const doc = await page.findOne({ title: "projects" }).lean();

  if (!data) {
    return {
      props: {},
    };
  }
  return {
    props: {
      pageId: doc._id.toString() || "",
      projects: data,
    },
  };
}
