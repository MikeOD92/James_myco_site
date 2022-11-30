import Link from "next/link";
import Header from "../../components/Header";

const Projects = () => {
  return (
    <div>
      <Header />
      <div className="p-20">
        <h1> Projects </h1>
        <Link href="/"> Home</Link>
        <Link href="/home"> Home2</Link>
      </div>
    </div>
  );
};

export default Projects;
