import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex w-screen justify-around p-10 bg-black">
      <Link className="navLink" href="/about">
        <div className="w-24 h-24 rounded-full bg-gradient-to-t from-lens-green to-lens-white"></div>
        <p className="text-center p-5">About</p>
      </Link>
      <Link className="navLink" href="/projects">
        <div className="w-24 h-24 rounded-full bg-gradient-to-t from-lens-green to-lens-white"></div>
        <p className="text-center p-5">Projects</p>
      </Link>
      <Link className="navLink" href="/cv">
        <div className="w-24 h-24 rounded-full bg-gradient-to-t from-lens-green to-lens-white"></div>
        <p className="text-center p-5">CV</p>
      </Link>
      <Link className="navLink" href="/events">
        <div className="w-24 h-24 rounded-full bg-gradient-to-t from-lens-green to-lens-white"></div>
        <p className="text-center p-5">Events</p>
      </Link>
    </div>
  );
}
