import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectTile({ post }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ type: "easeIn", duration: 1.3 }}
      className="md:grid md:grid-cols-2 projectTile"
    >
      <Image
        src={post.images[0]}
        alt={`${post.title} splash image`}
        width={600}
        height={600}
        // className="w-full "
      />
      <div className="relative p-10 md:p-5 md:text-left text-lightmushroom">
        <h2 className="projectTile text-4xl md:text-6xl">{post.title}</h2>
        <h4 className="hidden md:block md:text-2xl md:mt-2 serif">
          {post.desc ? post.desc : ""}
        </h4>
      </div>
    </motion.div>
  );
}
