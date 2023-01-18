import Header from "../../components/Header";
import react, { useRef } from "react";
import { useRouter } from "next/router";
import hasToken from "../../utils/checkUser";
import page from "../../models/page";
import dbConnect from "../../utils/dbConnect";

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
        router.replace("/cv");
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <div>
      <Header />
      <div className=" pt-20 md:p-20 ">
        <h1> CV </h1>
        <form className="flex flex-col">
          <textarea
            defaultValue={props.cv.p1}
            ref={cvTxt}
            rows="50"
            cols="100"
            className="m-5"
          />
        </form>
        <button
          onClick={(e) => handleSubmit(e)}
          className={`m-5 rounded-md ${
            props.cv ? "p-3 bg-green-500" : "p-3 bg-blue-500"
          }`}
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
  dbConnect();

  const data = await page.findOne({ title: "cv" }).lean();

  if (data._id !== null) {
    data._id = data._id.toString();
  }

  if (!data) {
    console.log("page not found");
    return {
      props: {},
    };
  }
  return {
    props: {
      cv: data,
    },
  };
}

export default CV;
