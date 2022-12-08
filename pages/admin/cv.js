import Link from "next/link";
import Header from "../../components/Header";
import react, { useRef } from "react";
import { useRouter } from "next/router";
import hasToken from "../../utils/checkUser";

const CV = (props) => {
  const cvTxt = useRef();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(cvTxt.current.value);
    if (!props.cv) {
      const CvPageData = {
        title: "cv",
        p1: cvTxt.current.value,
      };
      try {
        const response = await fetch("/api/pages", {
          method: "POST",
          body: JSON.stringify(CvPageData),
          headers: {
            "content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        router.replace("/admin/cv");
      } catch (err) {
        console.error(err);
      }
    } else {
      const CvPageData = {
        title: "cv",
        p1: cvTxt.current.value,
      };
      try {
        const response = await fetch("/api/pages/cv", {
          method: "PUT",
          body: JSON.stringify(CvPageData),
          headers: {
            "content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        router.replace("/cv");
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <div>
      <Header />
      <div className="p-20">
        <h1> CV </h1>
        <form>
          <textarea
            defaultValue={props.cv.p1}
            ref={cvTxt}
            rows="50"
            cols="100"
            className="m-3"
          />
        </form>
        <button
          onClick={(e) => handleSubmit(e)}
          className={props.cv ? "p-3 bg-green-500" : "p-3 bg-blue-500"}
        >
          {props.cv ? "Edit" : "Create"}
        </button>
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
  const data = await fetch("http://localhost:3000/api/pages/cv").then((res) =>
    res.json()
  );

  if (!data) {
    console.log("page not found");
    return {
      props: {},
    };
  }
  return {
    props: {
      cv: {
        _id: data._id || "",
        title: data.title || "",
        p1: data.p1 || "",
      },
    },
  };
}

export default CV;
