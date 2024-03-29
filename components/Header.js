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
      </Link>
      <button
        className="w-20 h-20 text-yellow-400 text-7xl lg:text-6xl absolute right-2"
        onClick={() => setShow(!show)}
      >
        {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </button>
      {show && session?.user ? (
        <div
          className={`absolute right-0 top-20 h-screen p-5 w-screen lg:w-1/4 z-50 text-3xl lg:text-4xl ${
            view === 1
              ? "bg-darkbruise text-lightmushroom"
              : "bg-lightmushroom text-mushroom"
          }`}
          onMouseLeave={() => setShow(!show)}
        >
          <div>
            <div className="flex justify-center lg:justify-start">
              <div
                className="p-4 bg-darkbruise text-lightmushroom"
                onMouseEnter={(e) => handleMouseEvent(e, 1)}
                onClick={(e) => handleMouseEvent(e, 1)}
              >
                <p>Admin</p>
              </div>
              <div
                className="p-4 bg-lightmushroom text-mushroom"
                onMouseEnter={(e) => handleMouseEvent(e, 0)}
                onClick={(e) => handleMouseEvent(e, 0)}
              >
                <p>User</p>
              </div>
            </div>
          </div>
          {view === 1 ? (
            <div className="text-center h-screen lg:text-left">
              <Link
                className="bg-darkmushroom p-2 hover:text-yellow-400"
                href="/admin/about"
                onClick={() => setShow(false)}
              >
                <p>About</p>
              </Link>
              <Link
                className="p-2 hover:text-yellow-400"
                href="/admin/projects"
                onClick={() => setShow(false)}
              >
                <p>Projects</p>
              </Link>
              <Link
                className="p-2 hover:text-yellow-400"
                href="/admin/events"
                onClick={() => setShow(false)}
              >
                <p>Events</p>
              </Link>
              <Link
                className="p-2 hover:text-yellow-400"
                href="/admin/cv"
                onClick={() => setShow(false)}
              >
                <p>CV</p>
              </Link>
              <Link
                className="bg-darkmushroom p-2 hover:text-yellow-400"
                href="/admin/users"
                onClick={() => setShow(false)}
              >
                <p>Users</p>
              </Link>
              <button
                className="p-2 float-right hover:text-yellow-400"
                onClick={signOut}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="text-center lg:text-left">
              <Link
                className="p-2 hover:text-darkbruise"
                href="/about"
                onClick={() => setShow(false)}
              >
                <p>About</p>
              </Link>
              <Link
                className="p-2 hover:text-darkbruise"
                href="/projects"
                onClick={() => setShow(false)}
              >
                <p>Projects</p>
              </Link>
              <Link
                className="p-2 hover:text-darkbruise"
                href="/events"
                onClick={() => setShow(false)}
              >
                <p>Events</p>
              </Link>
              <Link
                className="p-2 hover:text-darkbruise"
                href="/cv"
                onClick={() => setShow(false)}
              >
                <p>CV</p>
              </Link>
            </div>
          )}
        </div>
      ) : show ? (
        <div
          className="absolute right-0 top-20 h-screen lg:h-fit p-5 w-screen lg:w-1/4 z-50 text-5xl lg:text-4xl bg-darkbruise text-lightmushroom"
          onMouseLeave={() => setShow(!show)}
        >
          <Link
            className="p-2 hover:text-yellow-400"
            href="/about"
            onClick={() => setShow(false)}
          >
            <p>About</p>
          </Link>
          <Link
            className="p-2 hover:text-yellow-400"
            href="/projects"
            onClick={() => setShow(false)}
          >
            <p>Projects</p>
          </Link>
          <Link
            className="p-2 hover:text-yellow-400"
            href="/events"
            onClick={() => setShow(false)}
          >
            <p>Events</p>
          </Link>
          <Link
            className="p-2 hover:text-yellow-400"
            href="/cv"
            onClick={() => setShow(false)}
          >
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
