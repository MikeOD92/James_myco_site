import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [show, setShow] = useState(false);

  //   const handleMenu = () => {
  //     console.log(`show is ${show}`);
  //     setShow(!show);
  //   };
  return (
    <div>
      <div className="bg-[url('/img/asphalt_myco.jpg')] bg-black home bg-cover max-w-screen h-screen">
        <h1 className="text-8xl font-serif home text-yellow-400 absolute bottom-1/2">
          James Oliver
        </h1>
        <div className=" absolute bottom-0 right-0 left-0 bg-mushroom p-3 w-screen">
          <h2 className=" text-6xl text-white font-serif">
            Mycology
            <span className=""> & </span>
            <span className="">Soil Science</span>
          </h2>
        </div>
      </div>
      <div className="w-screen h-14 bg-bruise shadow-md fixed top-0">
        <button
          className="w-10 h-10 text-yellow-400 text-4xl absolute right-7 top-2"
          onClick={() => setShow(!show)}
        >
          {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </button>
        {show ? (
          //desktop <div className="absolute right-0 top-14 h-4/6 w-1/4 bg-mushroom z-40 text-xl">
          //mobile
          <div className="absolute right-0 top-14 h-screen w-screen bg-white z-40 text-7xl link text-mushroom text-center">
            <Link className="p-2" href="/about">
              <p>About</p>
            </Link>
            <Link className="p-2" href="/projects">
              <p>Projects</p>
            </Link>
            <Link className="p-2" href="/cv">
              <p>CV</p>
            </Link>
            <Link className="p-2" href="/events">
              <p>Events</p>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      <div id="extra" className="h-screen w-100 bg-lightmushroom text-black">
        <p>
          {" "}
          In this section we could have an event/news feed like blog posts
          almost{" "}
        </p>
        <div className="flex flex-col">
          <h2 className="text-5xl">
            microscopic photograph of mycorrhizae in plant roots{" "}
          </h2>
          <div className="flex flex-row">
            <Image
              src="/img/mycorrhizae_background.PNG"
              width={500}
              height={500}
              alt="mycorrhizae in microscopic image of plant roots"
            />
            <p className="p-5">
              {" "}
              This image is Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
