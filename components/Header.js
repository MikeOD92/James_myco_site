import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";

function Header() {
  const [show, setShow] = useState(false);

  return (
    <div className="w-screen h-14 bg-bruise shadow-md fixed top-0 z-50">
      <button
        className="w-10 h-10 text-yellow-400 text-4xl absolute right-7 top-2"
        onClick={() => setShow(!show)}
      >
        {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </button>
      {show ? (
        //desktop
        // <div className="absolute right-0 top-14 h-64 w-1/4 bg-lightmushroom z-40 text-xl">
        //mobile
        <div className="absolute right-0 top-14 h-screen w-screen bg-white z-50 text-7xl link text-mushroom text-center">
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
