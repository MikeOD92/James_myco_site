import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomeTile({ post }) {
  return (
    <div className="m-5 p-10 flex flex-col items-center bg-lightmushroom w-2/3 rounded-lg">
      <h1 className="text-6xl p-5 text-zinc-900">{post.title}</h1>
      <Image
        src={post.images[0] ? post.images[0] : "/img/sporeprint.jpg"}
        alt={
          post.images[0]
            ? `${post.title} splash image`
            : "default splash image of mushroom caps on paper to make spore print"
        }
        width={600}
        height={500}
        // className="border-2 border-darkbruise"
      />
      <div className="flex flex-col w-2/3 text-black text-lg">
        <p className="p-10">{post.desc}</p>
        <br />
        <Link
          className="self-end"
          href={
            post.postType === "project"
              ? `/project/${post._id}`
              : `/event/${post._id}`
          }
        >
          {" "}
          Read More
        </Link>
      </div>
    </div>
  );
}
