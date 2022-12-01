import Link from "next/link";
import Header from "../components/Header";
import { MongoClient } from "mongodb";

const Projects = (props) => {
  return (
    <div>
      <Header />
      <div className="p-20">
        <h1> Projects </h1>
        <h1>{props.projects.p1}</h1>
        {props.projects.posts.map((post) => {
          <h1> Im a Post</h1>;
        })}
        <Link href="/"> Home</Link>
        <Link href="/home"> Home2</Link>
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

  client.close();

  return {
    props: {
      projects: {
        _id: projects._id.toString() || "",
        title: projects.title || "",
        p1: projects.p1 || "",
        p2: projects.p2 || "",
        p3: projects.p3 || "",
        p4: projects.p4 || "",
        posts: projects.posts || [],
      },
    },
  };
}
