import React from "react";
import Image from "next/image";

export default function ProjectTile({ post }) {
  return (
    <div className="grid grid-cols-2 projectTile mb-2">
      {/* <div className="col-span-2 row-span-2"> */}
      <div>
        <Image
          src={post.images[0]}
          alt={`${post.title} splash image`}
          width={600}
          height={600}
        />
      </div>
      <div className="p-5 text-left border-2 border-transparent border-b-mushroom">
        <h2 className="projectTile">{post.title}</h2>
        <p>{post.desc ? post.desc : ""}</p>
      </div>
    </div>
  );
}
