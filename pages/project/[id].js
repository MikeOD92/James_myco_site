import React from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Project from "../../components/Project";

export default function ReadProject(props) {
  console.log("//////////////");
  console.log(props);
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Header />
      <div className="p-20">
        <Project project={props.post} />
        <h1>Hello is this Page Being ACCESSED</h1>
        <h3>{id}</h3>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  //   console.log("id", id);
  const data = await fetch(`http://localhost:3000/api/posts/${id}`).then(
    (res) => res.json()
  );

  if (!data) {
    return {
      props: {},
    };
  }
  return {
    props: {
      post: {
        title: data.title || "",
        created: data.created || "",
        images: data.images || "",
        desc: data.desc || "",
        body: data.body || "",
      },
    },
  };
}
