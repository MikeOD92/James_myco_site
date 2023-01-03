import Header from "../components/Header";
import post from "../models/post";
import dbConnect from "../utils/dbConnect";
import HomeTile from "../components/HomeTile";

function Home(props) {
  return (
    <div>
      <Header />
      <div className="bg-[url('/img/asphalt_myco.jpg')] bg-fixed bg-black home bg-cover max-w-screen h-screen">
        <h1 className="text-8xl home text-yellow-400 absolute bottom-1/2 left-10">
          James Oliver
        </h1>
        <h2 className="home text-6xl text-zinc-800 bg-lightmushroom opacity-70 absolute bottom-0 right-0 left-0 w-full p-3">
          Mycology
          <span className=""> & </span>
          <span className="">Soil Science</span>
        </h2>
      </div>
      <div className="min-h-screen w-100 pt-20 bg-zinc-800 text-white">
        {props.posts.map((item, idx) => {
          if (idx < 3) {
            return (
              <>
                <HomeTile post={item} />
              </>
            );
          }
        })}
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  dbConnect();

  const data = await post.find().sort({ created: "desc" }).lean();

  for (let item of data) {
    if (item._id !== null) {
      item._id = item._id.toString();
    }
  }

  if (!data) {
    console.log("no posts found");

    return {
      props: {},
    };
  }
  return {
    props: {
      posts: data,
    },
  };
}
export default Home;
