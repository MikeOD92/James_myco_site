import React, { useState } from "react";
import post from "../../models/post";
import dbConnect from "../../utils/dbConnect";
import AnimationWrapper from "../../components/AnimationWrapper";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ProjectWriteup from "../../components/ProjectWriteup";

export default function ReadProject({ post }) {
  const [view, setView] = useState(0);
  const [body, setBody] = useState(post.body.split(/\r?\n/).filter(Boolean));

  const handleButtons = (operator) => {
    if (operator === "-" && view > 0) {
      setView(view - 1);
      console.log(body);
    } else if (operator === "+" && view < post.images.length - 1) {
      setView(view + 1);
    }
  };

  return (
    <AnimationWrapper>
      {post ? (
        <div className="p-5 lg:p-20">
          <div className="flex flex-col items-left w-full mb-20 mt-10">
            <div>
              <h1 className="p-5 serif text-lightmushroom text-7xl mb-5">
                {post.title || ""}
              </h1>
            </div>

            <div>
              <div className="flex flex-row lg:justify-center">
                {post.images.length > 1 ? (
                  <button
                    className="bg-bruise p-5 lg:p-3 mr-2 lg:mr-5 self-center hover:bg-darkbruise rounded-full"
                    onClick={() => handleButtons("-")}
                  ></button>
                ) : (
                  ""
                )}
                <div>
                  <Image
                    className="rounded-lg p-5 bg-mushroom"
                    src={post.images[view]}
                    alt={`${post.title} splash image`}
                    width={600}
                    height={600}
                  />
                </div>
                {post.images.length > 1 ? (
                  <button
                    className="bg-bruise p-5 lg:p-3 ml-2 lg:ml-5 self-center hover:bg-darkbruise rounded-full"
                    onClick={() => handleButtons("+")}
                  ></button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <ProjectWriteup body={body} images={post.images} />
          <div className="mt-20">
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
    </AnimationWrapper>
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
