import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomeTile({ post }) {
  return (
    <div className="p-10 flex flex-col items-center">
      <h1 className="text-6xl p-5 text-bruise">{post.title}</h1>
      <Image
        src={post.images[0]}
        alt={`${post.title} splash image`}
        width={700}
        height={500}
        className="p-5"
      />
      <div className="flex flex-col w-2/3">
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
