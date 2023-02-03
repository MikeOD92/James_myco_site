import React, { useState } from "react";
// import gcpUpload from "../pages/api/upload";

export default function Upload(props) {
  const [uploading, setUploading] = useState(false);
  const [file, setfile] = useState([]);

  // image uploading handlers
  const handleChange = (e) => {
    setfile(e.target.files);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const filename = encodeURIComponent(file[0].name);
    const res = await fetch(`/api/upload`); //?file=${filename}
    const { url, fields } = await res.json();
    console.log("url", url);
    console.log(fields);
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    // for (let i = 0; i <= file.length - 1; i++) {
    //   formData.append("file", file[i]);
    // }

    console.log(formData);
    // console.log(formData.entries);
    ///// for some reason it seems to be stoping here.
    // still doesn;t seem to go.
    const upload = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "content-Type": "multipart/form-data",
      },
    });

    const response = await upload.json();
    console.log(response);

    // it looks like this may have been the break point before adding fs:none to the config, so my problem probably still persists.
    // im not sure who is possible to make this server side, i seems like any api call would be rendered on the server, so i dont get this.

    // console.log("//////////////////////", upload);

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
          className="bg-bruise opacity-1/2 animate-spin h-10 w-10 m-3" // this doesn't look right but does work.
          viewBox="0 0 24 24"
        />
      ) : (
        ""
      )}
    </div>
  );
}
