import React from "react";
import Image from "next/image";

export default function ProjectTile({ post }) {
  return (
    <div className="md:grid md:grid-cols-2 projectTile">
      <Image
        src={post.images[0]}
        alt={`${post.title} splash image`}
        width={600}
        height={600}
        // className="w-full "
      />
      <div className="relative p-10 md:p-5 md:text-left text-lightmushroom">
        <h2 className="projectTile">{post.title}</h2>
        <p className=" hidden md:block">{post.desc ? post.desc : ""}</p>
      </div>
    </div>
  );
}
