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

    setUploaded([...uploaded, ...data]);
    setUploading(false);
    return data;
  };

  const handleImgRemoval = (e, i) => {
    e.preventDefault();
    let arr = uploaded;
    arr.splice(i, 1);
    setUploaded([...arr]);
  };
  //////////////
  const handleSubmit = async (e) => {
    // check at least one image is uploaded or at least alert if no images are included.
    e.preventDefault();

    if (uploaded.length < 1) {
      alert("no images uploaded");
      return;
    }
    const projectData = {
      pageid: props.pageid,
      postType: "project",
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

        // console.log(response);
        if (response.status === 200) {
          router.push(`/project/${props.project._id}`);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  const handleDelete = async (e) => {
    e.preventDefault();

    if (confirm("Are you sure you want to delete this project")) {
      try {
        const response = await fetch("/api/posts", {
          method: "DELETE",
          body: JSON.stringify({ _id: props.project._id }),
          headers: {
            "content-Type": "application/json",
          },
        });
        router.reload();
      } catch (err) {
        console.error(err);
      }
    } else {
      return;
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label className="p-2 text-white">Title</label>
        <br />
        <input
          className="p-2"
          type="text"
          ref={title}
          defaultValue={props.project.title || ""}
        />
        <br />
        <label className="p-2 text-white">Description</label>
        <br />
        <input
          className="p-2"
          type="text"
          ref={desc}
          defaultValue={props.project.desc || ""}
        />
        <br />
        <label className="p-2 text-white">Body</label>
        <br />
        <textarea
          className="p-2"
          ref={body}
          cols="50"
          rows="15"
          defaultValue={props.project.body || ""}
        />
        <label className="p-2 text-white">Image Upload</label>
        <br />
        <input
          className="p-2 "
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
            return (
              <div key={`${img}-${i}container`} className="m-1">
                <button
                  onClick={(e) => handleImgRemoval(e, i)}
                  className="bg-red-600 p-1 w-10 h-10 relative top-10"
                >
                  x
                </button>
                <Image
                  key={img}
                  src={img}
                  alt="uploaded image thumbnail"
                  width={400}
                  height={400}
                />
              </div>
            );
          })}
        </div>

        <br />
        <div className="flex flex-row justify-between">
          <input
            className={`p-2 ${
              uploaded.length < 1
                ? "bg-zinc-400 text-neutral-300"
                : "bg-green-600"
            }`}
            type="submit"
            value={!props.project._id ? "POST" : "EDIT"}
            disabled={uploaded.length < 1 ? true : false}
          />
          {props.project._id ? (
            <button onClick={(e) => handleDelete(e)} className="p-2 bg-red-600">
              DELETE
            </button>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
}
