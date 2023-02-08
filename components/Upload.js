import React, { useState, useRef } from "react";
// import awsUpload from "../pages/api/upload";
// import gcpUpload from "../pages/api/upload";

export default function Upload(props) {
  const [uploading, setUploading] = useState(false);
  // const [file, setfile] = useState(); // was an array
  const fileRef = useRef(null);
  // const [path, setPath] = useState();

  // const handleChange = (e) => {
  //   // setPath(e.target.value);
  //   setfile(e.target.files[0]);
  // };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!fileRef.current?.files?.[0]) return;

    const file = fileRef.current.files[0];
    fileRef.current.value = null;

    setUploading(true);

    const form = new FormData();
    form.append("file", file);

    const data = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    console.log(data);
    props.setUploaded([...props.uploaded, data]);
    setUploading(false);
    // return data;
  };
  return (
    <div>
      <input
        className="p-2 "
        type="file"
        ref={fileRef}
        // multiple
        // onChange={(e) => handleChange(e)}
      />
      <button
        className="p-2 bg-green-600 rounded-md"
        onClick={(e) => handleUpload(e)}
      >
        Upload
      </button>
      {uploading ? (
        <svg
          className="bg-bruise opacity-1/2 animate-spin h-10 w-10 m-3"
          viewBox="0 0 24 24"
        />
      ) : (
        ""
      )}
    </div>
  );
}
