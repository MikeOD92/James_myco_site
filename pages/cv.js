import Link from "next/link";
import Header from "../components/Header";

const CV = () => {
  return (
    <div>
      <Header />
      <div className="p-20">
        <h1> CV </h1>
        <Link href="/"> Home</Link>
        <Link href="/home"> Home2</Link>
      </div>
    </div>
  );
};

export default CV;
