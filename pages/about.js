import Link from "next/link";

const About = () => {
  return (
    <div>
      <h1> About </h1>
      <Link href="/"> Home</Link>
      <Link href="/home"> Home2</Link>
    </div>
  );
};

export default About;
