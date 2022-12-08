import Header from "../components/Header";
import Image from "next/image";
const About = (props) => {
  // console.log(props);
  return (
    // <div className="bg-lightmushroom">
    <div>
      <Header />
      <div className="absolute top-14 bg-[url('/img/about_bg.PNG')] bg-cover w-full p-10">
        <div className="text-left">
          <h1 className="text-bruise"> About </h1>

          <div className="flex flex-wrap row-reverse">
            <div className="p-5 w-full flex flex-row justify-end rounded-md">
              <Image
                src="/img/portrait.JPG"
                width="300"
                height="300"
                alt="portait"
                className="p-5 bg-zinc-200 rounded-md"
              />
            </div>
            <div className="p-5">
              <Image
                src="/../public/img/mycelium2.jpg"
                width="300"
                height="300"
                alt="mycelium"
                className="p-5 bg-zinc-200 rounded-md"
              />
            </div>
            <div className="text-left p-10 m-5 bg-zinc-300 text-black opacity-90 rounded-md w-2/3 flex flex-row justify-end">
              {props.about ? <p>{props.about.p1}</p> : ""}
            </div>
            <div className="text-left p-10 m-5 bg-zinc-300 text-black opacity-90 rounded-md w-2/3">
              {props.about ? <p>{props.about.p2}</p> : ""}
            </div>
            <div className="p-5">
              <Image
                src="/img/mycelium.jpg"
                width="300"
                height="300"
                alt="mycelium"
                className="p-5 bg-zinc-200 rounded-md"
              />
            </div>

            <div className="text-left p-10 m-5 bg-zinc-300 text-black opacity-90 rounded-md">
              {props.about ? <p>{props.about.p3}</p> : ""}
              <br />
              {props.about ? <p>{props.about.p4}</p> : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

export async function getServerSideProps() {
  const data = await fetch("http://localhost:3000/api/pages/about").then(
    (res) => res.json()
  );
  console.log(data);
  if (!data) {
    return {
      props: {},
    };
  }
  return {
    props: {
      about: {
        id: data._id.toString() || "",
        title: data.title || "",
        p1: data.p1 || "",
        p2: data.p2 || "",
        p3: data.p3 || "",
        p4: data.p4 || "",
      },
    },
  };
}
