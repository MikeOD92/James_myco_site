import Header from "../components/Header";

const CV = (props) => {
  return (
    <div>
      <Header />
      <div className="p-20">
        <h1> CV </h1>
        <div>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {props.cv ? props.cv.p1 : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
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
