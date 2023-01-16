import {
  GiHamburgerMenu,
  GiMushrooms,
  GiMushroomsCluster,
} from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut, signIn, signUp } from "next-auth/react";

function Header() {
  const [show, setShow] = useState(false);
  const { data: session } = useSession();
  const [view, setView] = useState(1);
  const handleMouseEvent = (e, view) => {
    e.preventDefault();
    setView(view);
  };
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
      {show && session?.user ? (
        <div
          className={`absolute right-0 top-20 h-76 p-5 w-1/4 z-50 text-4xl ${
            view === 1
              ? "bg-darkbruise text-lightmushroom"
              : "bg-lightmushroom text-mushroom"
          }`}
          onMouseLeave={() => setShow(!show)}
        >
          <div>
            <div className="flex">
              <div
                className="p-4 bg-darkbruise text-lightmushroom"
                onMouseEnter={(e) => handleMouseEvent(e, 1)}
              >
                <p>Admin</p>
              </div>
              <div
                className="p-4 bg-lightmushroom text-mushroom"
                onMouseEnter={(e) => handleMouseEvent(e, 0)}
              >
                <p>User</p>
              </div>
            </div>
          </div>
          {view === 1 ? (
            <div>
              <Link
                className="bg-darkmushroom p-2 hover:text-zinc-800"
                href="/admin/about"
              >
                <p>About</p>
              </Link>
              <Link className="p-2 hover:text-zinc-800" href="/admin/projects">
                <p>Projects</p>
              </Link>
              <Link className="p-2 hover:text-zinc-800" href="/admin/events">
                <p>Events</p>
              </Link>
              <Link className="p-2 hover:text-zinc-800" href="/admin/cv">
                <p>CV</p>
              </Link>
              <button
                className="p-2 float-right hover:text-zinc-800"
                onClick={signOut}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div>
              <Link className="p-2 hover:text-darkbruise" href="/about">
                <p>About</p>
              </Link>
              <Link className="p-2 hover:text-darkbruise" href="/projects">
                <p>Projects</p>
              </Link>
              <Link className="p-2 hover:text-darkbruise" href="/events">
                <p>Events</p>
              </Link>
              <Link className="p-2 hover:text-darkbruise" href="/cv">
                <p>CV</p>
              </Link>
            </div>
          )}
        </div>
      ) : show ? (
        //desktop
        <div
          className="absolute right-0 top-20 h-76 p-5 w-1/4 bg-darkbruise z-50 text-4xl text-lightmushroom"
          onMouseLeave={() => setShow(!show)}
        >
          {/* //mobile */}
          {/* // <div className="absolute right-0 top-20 h-screen w-screen bg-white z-50 text-7xl link text-mushroom text-center"> */}
          <Link className="p-2 hover:text-yellow-400" href="/about">
            <p>About</p>
          </Link>
          <Link className="p-2 hover:text-yellow-400" href="/projects">
            <p>Projects</p>
          </Link>
          <Link className="p-2 hover:text-yellow-400" href="/events">
            <p>Events</p>
          </Link>
          <Link className="p-2 hover:text-yellow-400" href="/cv">
            <p>CV</p>
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Header;
