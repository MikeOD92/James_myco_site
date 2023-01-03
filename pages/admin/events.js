import Header from "../../components/Header";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import hasToken from "../../utils/checkUser";
import awsUpload from "../api/upload";
import Image from "next/image";
import post from "../../models/post";
import page from "../../models/page";
import dbConnect from "../../utils/dbConnect";

const Events = (props) => {
  const [date, setDate] = useState(new Date());

  const title = useRef();
  const desc = useRef();
  const formDate = useRef();
  const location = useRef();

  const [uploaded, setUploaded] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [file, setfile] = useState();

  const router = useRouter();
  //////
  const handlePageCreation = async (e) => {
    e.preventDefault();
    const eventPageData = {
      title: "events",
    };
    try {
      const response = await fetch("/api/pages", {
        method: "POST",
        body: JSON.stringify(eventPageData),
        headers: {
          "content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      router.replace("/admin/events");
    } catch (err) {
      console.error(err);
    }
  };
  //////
  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventPost = {
      pageid: props.pageId,
      created: new Date(),
      postType: "event",
      title: title.current.value,
      desc: desc.current.value,
      date: new Date(formDate.current.value),
      location: location.current.value,
      images: uploaded,
    };
    // console.log("post data:", eventPost);
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(eventPost),
      headers: {
        "content-Type": "application/json",
      },
    });

    const data = await response.json();

    // console.log(data);

    // router.replace("/events");
  };

  const handleChange = (e) => {
    setfile(e.target.files);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);

    const data = await awsUpload(file);

    setUploaded([...data, ...uploaded]);
    setUploading(false);
    return data;
  };

  /// this was made just to use in development dont use
  // const clearPostDB = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch("/api/posts", {
  //     method: "DELETE",
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // };
  return (
    <div>
      <Header />
      <div className="absolute top-14 bg-[url('/img/mycorrhizae_background.PNG')] bg-cover bg-fixed w-full p-10 min-h-full">
        <div className="flex-col px-12 py-12 max-w-3xl mx-auto shadow-xl rounded-2xl bg-zinc-800">
          <div className="bg-lightmushroom p-5">
            {props.eventList ? (
              <form onSubmit={handleSubmit}>
                <label>Event Title</label>
                <br />
                <input
                  className="p-3"
                  type="text"
                  placeholder="title"
                  ref={title}
                />
                <br />
                <label>Description</label>
                <br />
                <textarea className="p-3" cols={50} rows={8} ref={desc} />
                <br />
                <label>Date & Time</label>
                <br />
                <input className="p-3" type="datetime-local" ref={formDate} />
                <br />
                <label>Location</label>
                <br />
                <input className="p-3" type="text" ref={location} />
                <br />
                <label>Image</label>
                <br />
                <input
                  className="p-3"
                  type="file"
                  onChange={(e) => handleChange(e)}
                />
                <button className="p-3 bg-green-400" onClick={handleUpload}>
                  Upload
                </button>
                {uploading ? (
                  <svg
                    className="bg-bruise opacity-1/2 animate-spin h-10 w-10 m-3" // this doesn't look right but does work.
                    viewBox="0 0 24 24"
                  />
                ) : (
                  ""
                )}
                <button className="p-3 bg-green-400 ml-3" type="submit">
                  {" "}
                  POST
                </button>
                {uploaded.map((img, i) => {
                  // console.log("looping over this is the img val:", img);
                  return (
                    <div key={`${img}-${i}container`} className="m-1">
                      <button className="bg-red-500 p-1 w-5 relative top-8">
                        x
                      </button>
                      <Image
                        key={img}
                        src={img}
                        alt="uploaded image thumbnail"
                        // fill
                        width={400}
                        height={400}
                      />
                    </div>
                  );
                  // this needs to be the next/Image tag, and needs to be sized correctly also a remove option would be good.
                })}
              </form>
            ) : (
              <button onClick={handlePageCreation}>create Event page</button>
            )}
          </div>
        </div>
      </div>
      <button className="p-3 bg-red-500" onClick={(e) => clearPostDB(e)}>
        {" "}
        DELETE ALL{" "}
      </button>
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

  const data = await post
    .find({ postType: "event" })
    .sort({ created: "desc" })
    .lean();

  for (let item of data) {
    if (item._id !== null) {
      item._id = item._id.toString();
    }
  }

  const doc = await page.findOne({ title: "events" }).lean();

  if (!data) {
    return {
      props: {},
    };
  }
  return {
    props: {
      pageId: doc._id.toString() || "",
      eventList: data,
    },
  };
}
export default Events;
