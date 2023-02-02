import React, { useState } from "react";
import gcpUpload from "../pages/api/upload";

export default function Upload(props) {
  // const [uploading, setUploading] = useState(false);
  const [file, setfile] = useState();

  // image uploading handlers
  const handleChange = (e) => {
    setfile(e.target.file);
  };

  const handleUpload = async (e) => {
    const name = encodeURIComponent(file.name);
    const res = await fetch(`/api/upload-url?file=${name}`);
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (upload.ok) {
      console.log("Uploaded");
    } else {
      console.error("Failed.");
    }
  };
  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   if (!file) return;
  //   setUploading(true);

  //   const data = await fetch();

  //   props.setUploaded([...props.uploaded, ...data]);
  //   setUploading(false);
  //   return data;
  // };
  return (
    <div>
      <input
        className="p-2 "
        type="file"
        // multiple
        onChange={(e) => handleChange(e)}
      />
      <button
        className="p-2 bg-green-600 rounded-md"
        onClick={(e) => handleUpload(e)}
      >
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
    </div>
  );
}
