import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import post from "../../models/post";
import dbConnect from "../../utils/dbConnect";

import Image from "next/image";

export default function ReadProject({ post }) {
  // const router = useRouter();
  // const { id } = router.query;

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
              <h1>{post.title || ""}</h1>
            </div>

            <div className="grid grid-cols-2 ">
              <div>
                <div className="flex flex-row justify-center">
                  <button
                    className="bg-bruise p-3 self-center"
                    onClick={() => handleButtons("-")}
                  ></button>
                  <div className="inline">
                    <div className="grid grid-cols-3 grid-rows-2 grid-flow-dense">
                      {/*<div className="bg-yellow-500 w-600 h-600" />
                <div className="bg-blue-500 w-600 h-600" /> */}
                      <div className="col-span-2 row-span-2">
                        <Image
                          src={post.images[view]}
                          alt={`${post.title} splash image`}
                          width={400}
                          height={400}
                        />
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
                <button
                  className="bg-bruise p-3 self-center"
                  onClick={() => handleButtons("+")}
                ></button>
              </div>
              <div className="flex flex-row content-center"></div>
            </div>
            <div className="p-10 scroll h-5/6 overflow-scroll">
              <p
                className="text-lightmushroom"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {post ? post.body : ""}
              </p>
            </div>
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
