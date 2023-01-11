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
          <h1>{post.title}</h1>
          <Image
            src={post.images[0] ? post.images[0] : "/img/sporeprint.jpg"}
            alt={`${post.title} splash image`}
            width={600}
            height={600}
          />
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
