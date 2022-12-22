import React from "react";
import Image from "next/Image";

export default function ProjectTile({ project }) {
  return (
    <div className="grid grid-cols-2 projectTile mb-2">
      {/* <div className="col-span-2 row-span-2"> */}
      <div>
        <Image
          src={project.images[0]}
          alt={`${project.title} splash image`}
          width={600}
          height={600}
        />
      </div>
      <div className="p-5 text-left border-2 border-transparent border-b-mushroom">
        <h2 className="projectTile">{project.title}</h2>
        <p>{project.desc ? project.desc : ""}</p>
      </div>
    </div>
  );
}
