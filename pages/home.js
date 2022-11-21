import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <div className={styles.container}>
      <div className="bg-[url('/img/mycorrhizae_background.PNG')] bg-black homeSplash bg-no-repeat bg-center bg-contain min-h-screen">
        <h1 className="p-8 absolute right-20">James Oliver</h1>
        <h2 className="p-8 absolute left-20 top-56">
          Mycology
          <br />
          <span className="absolute left-20">&</span>
          <br />
          <span className="w-full absolute left-20">Soil Science</span>
        </h2>
      </div>

      <Navbar />
    </div>
  );
}
