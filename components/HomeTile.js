import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomeTile({ post }) {
  return (
    <div className="m-3 p-10 flex flex-col items-center bg-lightmushroom w-2/3 rounded-lg">
      <h1 className="text-6xl pt-5 pb-10 text-zinc-700 serif">{post.title}</h1>

      <div className="flex flex-row w-full">
        <Image
          src={post.images[0] ? post.images[0] : "/img/sporeprint.jpg"}
          alt={
            post.images[0]
              ? `${post.title} splash image`
              : "default splash image of mushroom caps on paper to make spore print"
          }
          width={500}
          height={400}
          // className="border-2 border-darkbruise"
        />
        <div className="flex flex-col w-full text-black text-lg">
          <p className="p-10">{post.desc}</p>
          <br />
          <Link
            className="self-end hover:text-darkbruise"
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
    </div>
  );
}
