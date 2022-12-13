import React, { useRef, useState } from "react";
import awsUpload from "../pages/api/upload";

export default function ProjectFrom() {
  const title = useRef();
  const body = useRef();
  const files = useRef();
  const [uploading, setUploading] = useState(false);
  const [file, setfile] = useState();
  const [progress, setProgress] = useState();

  const handleChange = (e) => {
    setfile(e.target.files[0]);
    console.log(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);

    const data = await awsUpload(file);
    console.log(data);
    // will need to set the response/ asset url to a state[] so it can be included in the post
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
        {uploading && <p>{progress}</p>}
        <input
          className="p-2"
          type="file"
          ref={files}
          onChange={(e) => handleChange(e)}
        />
        <button className="p-2 bg-green-600" onClick={(e) => handleUpload(e)}>
          Upload
        </button>
        <br />
        <input className="p-2 bg-green-600" type="submit" value="POST" />
      </form>
    </div>
  );
}
