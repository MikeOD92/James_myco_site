import {
  GiHamburgerMenu,
  GiMushrooms,
  GiMushroomsCluster,
} from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
function Header() {
  const [show, setShow] = useState(false);

  return (
    <div className="w-screen h-20 bg-mushroom shadow-md fixed top-0 z-50">
      <Link href="/" className="text-yellow-400 text-4xl absolute top-2 left-7">
        <Image
          src="/img/homebutton.png"
          width="60"
          height="60"
          alt="home button with img of microscopic roots"
        />
        {/* I dont think this is right, too playfull looking doesn't fit the vibe, maybe make custom icon */}
      </Link>
      <button
        className="w-20 h-20 text-yellow-400 text-6xl absolute right-2"
        onClick={() => setShow(!show)}
      >
        {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </button>
      {show ? (
        //desktop
        // <div className="absolute right-0 top-14 h-64 w-1/4 bg-lightmushroom z-40 text-xl">
        //mobile
        <div className="absolute right-0 top-20 h-screen w-screen bg-white z-50 text-7xl link text-mushroom text-center">
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
  );
}

export default Header;
