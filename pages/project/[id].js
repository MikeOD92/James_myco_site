import React, { useState } from "react";
import Header from "../../components/Header";
import post from "../../models/post";
import dbConnect from "../../utils/dbConnect";

import Image from "next/image";
import Link from "next/link";

export default function ReadProject({ post }) {
  const [view, setView] = useState(0);

  const handleButtons = (operator) => {
    if (operator === "-" && view > 0) {
      setView(view - 1);
    } else if (operator === "+" && view < post.images.length - 1) {
      setView(view + 1);
    }
  };

  return (
    <div>
      <Header />
      {post ? (
        <div className="p-20">
          <div className="flex flex-col items-left w-full mb-20 mt-10">
            <div>
              <h1 className="p-5">{post.title || ""}</h1>
            </div>

            <div>
              <div className="flex flex-row justify-center">
                {post.images.length > 1 ? (
                  <button
                    className="bg-bruise p-3 mr-5 self-center hover:bg-darkbruise rounded-full"
                    onClick={() => handleButtons("-")}
                  ></button>
                ) : (
                  ""
                )}
                <div>
                  <Image
                    src={post.images[view]}
                    alt={`${post.title} splash image`}
                    width={600}
                    height={600}
                  />
                </div>
                {post.images.length > 1 ? (
                  <button
                    className="bg-bruise p-3 ml-5 self-center hover:bg-darkbruise rounded-full"
                    onClick={() => handleButtons("+")}
                  ></button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex flex-row content-center"></div>
          </div>

          <p className="text-lightmushroom" style={{ whiteSpace: "pre-wrap" }}>
            {post ? post.body : ""}
          </p>
          <div className="mt-5">
            <Link
              className="p-3 bg-darkbruise text-bruise hover:text-lightmushroom rounded-md"
              href="/projects"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      ) : (
        <p className="p-20"> Project not found </p>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  dbConnect();

  const data = await post.findOne({ _id: id }).lean();

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
