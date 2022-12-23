import React, { useState } from "react";
import Projects from "../pages/projects";
import Image from "next/image";

export default function Project({ project }) {
  const [view, setView] = useState(0);
  const [secondSrc, setSecondSrc] = useState(1);
  const [thirdSrc, setThird] = useState(2);

  const handleButtons = (operator) => {
    if (operator === "-" && view > 0) {
      setView(view - 3);
      setSecondSrc(secondSrc - 3);
      setThird(thirdSrc - 3);
    } else if (operator === "+" && view < project.images.length - 1) {
      setView(view + 3);
      setSecondSrc(secondSrc + 3);
      setThird(thirdSrc + 3);
    }
    // console.log(view);
  };

  return (
    <div className="flex flex-col items-left w-full mb-20 mt-10">
      <div>
        {/* // <div className="flex flex-row items-center w-full mb-20 mt-20"> */}
        <h1>{project.title || "HAMb"}</h1>
        {/* <h1 className="text-left col-span-3">{project.title}</h1> */}
      </div>

      <div className="grid grid-cols-2 ">
        <div>
          <div className="flex flex-row justify-center">
            <button
              className="bg-bruise p-3 self-center"
              onClick={() => handleButtons("-")}
            ></button>
            <div className="inline">
              <div className="grid grid-cols-3 grid-rows-2 grid-flow-dense">
                {/*<div className="bg-yellow-500 w-600 h-600" />
                <div className="bg-blue-500 w-600 h-600" /> */}
                <div className="col-span-2 row-span-2">
                  <Image
                    src={project.images[view]}
                    alt={`${project.title} splash image`}
                    width={400}
                    height={400}
                    // className="align-center"
                  />
                </div>
                <div>
                  <Image
                    src={project.images[view + 1]}
                    alt={`${project.title} splash image`}
                    width={200}
                    height={200}
                    // className="max-h-1/3"
                  />
                </div>
                <div>
                  <Image
                    src={project.images[view + 2]}
                    alt={`${project.title} splash image`}
                    width={200}
                    height={200}
                    // className="max-h-1/3"
                  />
                </div>
              </div>
              <div></div>
            </div>
            <button
              className="bg-bruise p-3 self-center"
              onClick={() => handleButtons("+")}
            ></button>
          </div>
          <div className="flex flex-row content-center">
            {/* <div> */}
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
        <div className="p-10 scroll h-5/6 overflow-scroll">
          <p className="text-lightmushroom" style={{ whiteSpace: "pre-wrap" }}>
            {project.body}
          </p>
        </div>
      </div>
    </div>
  );
}
