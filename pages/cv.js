import page from "../models/page";
import dbConnect from "../utils/dbConnect";
import AnimationWrapper from "../components/AnimationWrapper";

const CV = (props) => {
  return (
    <AnimationWrapper>
      <div className="pt-20 p-5 md:p-20">
        <h1> CV </h1>
        <div>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {props.cv ? props.cv.p1 : ""}
          </p>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export async function getServerSideProps() {
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
