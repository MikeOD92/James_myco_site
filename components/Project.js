import React, { useState } from "react";
import Projects from "../pages/projects";

export default function Project({ project }) {
  const [view, setView] = useState(0);

  const handleButtons = (operator) => {
    if (operator === "-" && view > 0) {
      setView(view - 1);
    } else if (operator === "+" && view < project.images.length - 1) {
      setView(view + 1);
    }
    console.log(view);
  };

  return (
    <div className="flex flex-col items-center w-full mb-20 mt-20">
      <h1 className="text-center">{project.title}</h1>
      <div className="flex flex-row justify-center">
        <button
          className="bg-bruise p-5 m-3 h-3 w-3 self-center"
          onClick={() => handleButtons("-")}
        ></button>
        <div className="inline">
          <img
            src={project.images[view]}
            alt={`${project.title} splash image`}
            width="600"
          />
          <div className="flex flex-row">
            {project.images.map((itm, idx) => {
              return (
                <div
                  key={idx}
                  className={`w-5 h-5 m-2 rounded-full ${
                    idx === view ? "bg-yellow-400" : "bg-mushroom"
                  }`}
                ></div>
              );
            })}
          </div>
        </div>

        <button
          className="bg-bruise p-5 m-3 inline h-3 w-3 self-center"
          onClick={() => handleButtons("+")}
        ></button>
      </div>

      <p style={{ whiteSpace: "pre-wrap" }}>{project.body}</p>
    </div>
  );
}
