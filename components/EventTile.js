import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function EventTile({ post }) {
  return (
    <div className="text-black p-3 mt-3 rounded-md bg-lightmushroom flex flex-col">
      <div className="flex flex-row justify-between">
        <h2 className="home text-2xl ">{post.title}</h2>
        <h3 className="text-xl">{new Date(post.date).toLocaleString()}</h3>
      </div>

      <div className="pt-5 flex flex-row">
        <Image
          src={post.images[0] ? post.images[0] : "/img/sporeprint.jpg"}
          alt={
            post.images[0]
              ? `${post.title} splash image`
              : "default splash image of mushroom caps on paper to make spore print"
          }
          width={200}
          height={200}
          className="rounded-md"
        />
        <p className="p-5">{post.desc}</p>
      </div>
      <Link className="relative left-3/4 w-1/4" href={`/event/${post._id}`}>
        View Event
      </Link>
    </div>
  );
}
