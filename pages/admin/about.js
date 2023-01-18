import Header from "../../components/Header";
import { useRef } from "react";
import { useRouter } from "next/router";
import hasToken from "../../utils/checkUser";
import page from "../../models/page";
import dbConnect from "../../utils/dbConnect";

const About = (props) => {
  const p1 = useRef();
  const p2 = useRef();
  const p3 = useRef();
  const p4 = useRef();

  const router = useRouter();

  const handlePageCreation = async (e) => {
    e.preventDefault();

    const aboutData = {
      title: "about",
      p1: p1.current.value,
      p2: p2.current.value,
      p3: p3.current.value,
      p4: p4.current.value,
      posts: [],
    };

    try {
      const response = await fetch("/api/pages", {
        method: "POST",
        body: JSON.stringify(aboutData),
        headers: {
          "content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      router.replace("/about");
    } catch (err) {
      console.error(err);
    }
  };

  const handlePut = async (e) => {
    e.preventDefault();

    const aboutData = {
      title: "about",
      p1: p1.current.value,
      p2: p2.current.value,
      p3: p3.current.value,
      p4: p4.current.value,
    };
    try {
      const response = await fetch("/api/pages/about", {
        method: "PUT",
        body: JSON.stringify(aboutData),
        headers: {
          "content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);

      router.replace("/about");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute top-14 bg-[url('/img/mycorrhizae_background.PNG')] bg-cover bg-fixed min-h-full w-full p-5 pt-10 md:p-10">
        <div className="flex-col p-5 md:p-12 md:max-w-3xl m-auto shadow-xl rounded-2xl bg-zinc-800">
          <form className="flex flex-col align-top">
            <label className="text-white"> Paragraph 1</label>
            <textarea
              defaultValue={props.about.p1}
              ref={p1}
              rows="4"
              cols="50"
              className="m-3"
            />
            <label className="text-white"> Paragraph 2</label>
            <textarea
              ref={p2}
              defaultValue={props.about.p2}
              rows="4"
              cols="50"
              className="m-3"
            />
            <label className="text-white"> Paragraph 3</label>
            <textarea
              ref={p3}
              defaultValue={props.about.p3}
              rows="4"
              cols="50"
              className="m-3"
            />
            <label className="text-white"> Paragraph 4</label>
            <textarea
              ref={p4}
              defaultValue={props.about.p4}
              rows="4"
              cols="50"
              className="m-3"
            />
            {props.about ? (
              <button
                className="rounded-md bg-green-600 p-2"
                onClick={(e) => handlePut(e)}
              >
                EDIT
              </button>
            ) : (
              <button
                className="rounded-md bg-green-600 p-2"
                onClick={(e) => handlePageCreation(e)}
              >
                {" "}
                POST{" "}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const token = await hasToken(context.req);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  dbConnect();

  const data = await page.findOne({ title: "about" }).lean();

  if (data._id !== null) {
    data._id = data._id.toString();
  }

  if (!data) {
    return {
      props: {},
    };
  }
  return {
    props: {
      about: data,
    },
  };
}

export default About;
