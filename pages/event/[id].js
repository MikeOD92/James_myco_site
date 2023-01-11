import React, { useState } from "react";
import Header from "../../components/Header";
import post from "../../models/post";
import dbConnect from "../../utils/dbConnect";

import Image from "next/image";
import Link from "next/link";

export default function ReadEvent({ post }) {
  return (
    <div>
      <Header />
      <div className="p-20">
        <div>
          <h1 className="p-5">{post.title}</h1>
          <div className="flex flex-row">
            <Image
              src={post.images[0] ? post.images[0] : "/img/sporeprint.jpg"}
              alt={`${post.title} splash image`}
              width={400}
              height={400}
            />
            <div className="p-10">
              <p style={{ whiteSpace: "pre-wrap" }}>
                {new Date(post.date).toLocaleString()}
              </p>
              <p className="mt-5">{post.desc}</p>
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-3xl">Location</h3>
            <p>{post.location}</p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Link
          className="p-10 text-bruise hover:text-lightmushroom"
          href="/events"
        >
          Back to Events
        </Link>
      </div>
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
        date: data.date || "",
        location: data.location || "",
      },
    },
  };
}
