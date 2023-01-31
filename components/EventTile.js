import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EventTile({ post }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ type: "easeIn", duration: 1 }}
      className="text-black p-3 mt-3 rounded-md bg-lightmushroom hover:outline hover:outline-4 hover:outline-mushroom flex flex-col"
    >
      <Link href={`/event/${post._id}`}>
        <div className="flex flex-col justify-between">
          <h2 className="text-3xl serif pb-2">{post.title}</h2>
          <h3 className="text-lg">{new Date(post.date).toLocaleString()}</h3>
        </div>

        <div className="pt-5 flex flex-col lg:flex-row ">
          <Image
            src={post.images[0] ? post.images[0] : "/img/sporeprint.jpg"}
            alt={
              post.images[0]
                ? `${post.title} splash image`
                : "default splash image of mushroom caps on paper to make spore print"
            }
            width={200}
            height={200}
            className="rounded-md w-full lg:w-full"
          />
          <p className="p-5 lg:hidden">{post.desc}</p>
        </div>

        {/* View Event */}
      </Link>
    </motion.div>
  );
}
