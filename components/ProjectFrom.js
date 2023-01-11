import Image from "next/image";
import React, { useRef, useState } from "react";
import awsUpload from "../pages/api/upload";
import { useRouter } from "next/router";

export default function ProjectFrom(props) {
  const title = useRef();
  const body = useRef();
  const desc = useRef();
  const router = useRouter();

  const [uploaded, setUploaded] = useState(
    props.project.images ? [...props.project.images] : []
  );
  const [uploading, setUploading] = useState(false);
  const [file, setfile] = useState();

  // image uploading handlers
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
  //////////////
  const handleSubmit = async (e) => {
    // check at least one image is uploaded or at least alert if no images are included.
    e.preventDefault();

    const projectData = {
      pageid: props.pageid,
      postType: "project",
      // created: new Date(),
      title: title.current.value,
      body: body.current.value,
      images: uploaded,
      desc: desc.current.value,
    };

    if (!props.project._id) {
      projectData.created = new Date();
      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify(projectData),
          headers: {
            "content-Type": "application/json",
          },
        });

        // console.log(response);
        if (response.status === 201) {
          router.push("/projects");
        } else {
          console.log(response);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        projectData._id = props.project._id;
        projectData.created = props.project.created;
        const response = await fetch("/api/posts", {
          method: "PUT",
          body: JSON.stringify(projectData),
          headers: {
            "content-Type": "application/json",
          },
        });

        console.log(response);
        if (response.status === 200) {
          router.push(`/project/${props.project._id}`);
        }
      } catch (err) {
        console.error(err);
      }
    }
    // console.log(projectData);

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
        <br />
        <input
          className="p-2"
          type="text"
          ref={title}
          defaultValue={props.project.title || ""}
        />
        <br />
        <label className="p-2">Description</label>
        <br />
        <input
          className="p-2"
          type="text"
          ref={desc}
          defaultValue={props.project.desc || ""}
        />
        <br />
        <label className="p-2">Body</label>
        <br />
        <textarea
          className="p-2"
          ref={body}
          cols="50"
          rows="15"
          defaultValue={props.project.body || ""}
        />
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
            className="bg-bruise opacity-1/2 animate-spin h-10 w-10 m-3" // this doesn't look right but does work.
            viewBox="0 0 24 24"
          />
        ) : (
          ""
        )}
        <div className="flex row flex-wrap">
          {uploaded.map((img, i) => {
            // console.log("looping over this is the img val:", img);
            return (
              <div key={`${img}-${i}container`} className="m-1">
                <button className="bg-red-500 p-1 w-5 relative top-8">x</button>
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
        </div>

        <br />
        <input
          className="p-2 bg-green-600"
          type="submit"
          value={!props.project._id ? "POST" : "EDIT"}
        />
      </form>
    </div>
  );
}
