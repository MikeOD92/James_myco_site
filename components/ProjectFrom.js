import Image from "next/image";
import React, { useRef, useState } from "react";
import awsUpload from "../pages/api/upload";

export default function ProjectFrom() {
  const title = useRef();
  const body = useRef();
  const [uploaded, setUploaded] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [file, setfile] = useState();

  const handleChange = (e) => {
    setfile(e.target.files);
    // console.log();
  };

  const handleUpload = async (e) => {
    // console.log("/////////////////////", file);
    e.preventDefault();
    if (!file) return;
    setUploading(true);

    const data = await awsUpload(file);

    setUploaded([data, ...uploaded]);
    setUploading(false);
    return data;
  };

  const handleSubmit = (e) => {
    // check at least one image is uploaded or at least alert if no images are included.
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(e.target[1].value);
    // console.log(body.current.value);
    // console.log(title.current.value);
    // console.log(files.current.files);
    // for (let i in e.target) {
    //   console.log(e.target[i].value);
    // }

    /*// <p style={{ whiteSpace: "pre-wrap" }}> and just making it one big text area input 
     I think this is better its at least more simple. 
     */
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="p-2">Title</label>
        <input className="p-2" type="text" ref={title} />
        <br />
        <label className="p-2">Body</label>
        <textarea className="p-2" ref={body} cols="50" rows="25" />
        <label className="p-2">Image Upload</label>
        <br />
        <input
          className="p-2"
          type="file"
          multiple
          onChange={(e) => handleChange(e)}
        />
        <button className="p-2 bg-green-600" onClick={(e) => handleUpload(e)}>
          Upload
        </button>
        {uploading ? (
          <svg
            className=" bg-blue-800 animate-spin h-10 w-10 m-3" // this doesn't look right but does work.
            viewBox="0 0 24 24"
          />
        ) : (
          ""
        )}
        {uploaded.map((img) => {
          // console.log("looping over this is the img val:", img);
          return <img key={img} src={img} alt="uploaded image thumbnail" />;
          // this needs to be the next/Image tag, and needs to be sized correctly also a remove option would be good.
        })}
        <br />
        <input className="p-2 bg-green-600" type="submit" value="POST" />
      </form>
    </div>
  );
}
