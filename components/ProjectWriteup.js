import React from "react";
import Image from "next/image";

export default function projectWriteup({ body, images }) {
  let img = 0;
  return (
    <div className="flex flex-col text-zinc-800 bg-lightmushroom rounded-lg">
      {body.map((item, i) => {
        if (i % 2 === 0) {
          img++;
          return (
            <div
              className="flex flex-col md:flex-row md:p-10 justify-between"
              key={`paragraph${img - 1}`}
            >
              {images[img - 1] ? (
                <Image
                  src={images[img - 1]}
                  width="400"
                  height="400"
                  alt="uploaded image related to article"
                  className={`border-4 border-mushroom w-full`}
                />
              ) : (
                ""
              )}
              <div>
                <p className="p-5" style={{ whiteSpace: "pre-wrap" }}>
                  {item}
                </p>
              </div>
            </div>
          );
        } else if (i % 3 === 0) {
          img++;
          return (
            <div
              className="flex flex-col md:flex-row justify-between"
              key={`paragraph${i}`}
            >
              <div>
                <p className="p-5" style={{ whiteSpace: "pre-wrap" }}>
                  {item}
                </p>
              </div>
              {images[img - 1] ? (
                <Image
                  src={images[img - 1]}
                  width="400"
                  height="400"
                  alt="uploaded image related to article"
                  className="border-4 border-mushroom"
                />
              ) : (
                ""
              )}
            </div>
          );
        } else {
          return (
            <div
              className="flex flex-col md:flex-row md:p-10 justify-between"
              key={`paragraph${i}`}
            >
              <div>
                <p className="p-5" style={{ whiteSpace: "pre-wrap" }}>
                  {item}
                </p>
              </div>
            </div>
          );
        }
      })}
      <div
        className="flex flex-col md:flex-row md:p-10 justify-evenly"
        key="extraimages"
      >
        {images.slice(img).map((image, i) => {
          return (
            <div key={`extraimg${i}`} className="p-5">
              <Image
                src={image}
                width="400"
                height="400"
                alt="uploaded image related to article"
                className="border-4 border-mushroom"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
