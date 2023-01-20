import React, { Children } from "react";
import { motion } from "framer-motion";

export default function AnimationWrapper({ children }) {
  return (
    <motion.main
      variants={{
        hidden: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 0 },
      }}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "easeOut", duration: 1 }}
      className="bg-zinc-800 "
    >
      {children}
    </motion.main>
  );
}
