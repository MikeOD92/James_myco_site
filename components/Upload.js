import React, { useState } from "react";
import awsUpload from "../pages/api/upload";

export default function Upload(props) {
  const [uploading, setUploading] = useState(false);
  const [file, setfile] = useState([]);

  const handleChange = (e) => {
    setfile(e.target.files);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(file);
    if (!file) return;
    setUploading(true);

    const data = await awsUpload(file);

    props.setUploaded([...props.uploaded, ...data]);
    setUploading(false);
    return data;
  };

  return (
    <div>
      <input
        className="p-2 "
        type="file"
        multiple
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
          className="bg-bruise opacity-1/2 animate-spin h-10 w-10 m-3"
          viewBox="0 0 24 24"
        />
      ) : (
        ""
      )}
    </div>
  );
}
