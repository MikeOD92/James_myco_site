import React, { useRef, useState } from "react";

export default function ProjectFrom() {
  const title = useRef();
  const body = useRef();
  const files = useRef();
  const [uploadStatus, setUploadStatus] = useState(false);
  const [uploadFileList, setUploadFileList] = useState([]);
  const [progress, setProgress] = useState();

  const handleChange = (e) => {
    setUploadFileList(e.target.files[0]);
    console.log(uploadFileList);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFileList) return;

    const formData = new FormData();
    formData.append("file", uploadFileList);
    formData.append("fileName", uploadFileList.name);
    console.log(formData);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      onUploadProgress: (progress) => {
        const percent = Math.round(progress.loaded * 100) / progress.total;
      },
    };
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: formData,
        config,
      });
    } catch (err) {
      console.error(err);
    }
    // setUploadStatus(true);
    // e.preventDefault();

    // console.log("files Value");
    // console.log(files.current.value);
    // console.log("files files");
    // console.log(files.current.files);

    // const response = await fetch("/api/upload", {
    //   method: "POST",
    //   body: {
    //     images: [...files.current.files],
    //   },
    //   headers: {
    //     "content-Type": "application/json",
    //   },
    // });
    // await console.log(response);
    // setUploadStatus(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(e.target[1].value);
    // console.log(body.current.value);
    // console.log(title.current.value);
    // console.log(files.current.files);
    // for (let i in e.target) {
    //   console.log(e.target[i].value);
    // }

    /*// this if we want to use, the values as an array of text, might want to use a package like formik.
     i think I also need to think about how to layout and show the projects. 
     this would make it easier for a variable number of paragraphs per project but, 
     what about just using      <p style={{ whiteSpace: "pre-wrap" }}> and just making it one big text area input 
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
