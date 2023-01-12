import Image from "next/image";
import React, { useRef, useState } from "react";
import awsUpload from "../pages/api/upload";
import { useRouter } from "next/router";

export default function EventForm(props) {
  const [date, setDate] = useState(new Date());

  const title = useRef();
  const desc = useRef();
  const formDate = useRef();
  const location = useRef();
  const [uploaded, setUploaded] = useState(
    props.event.images ? [...props.event.images] : []
  );

  const [uploading, setUploading] = useState(false);
  const [file, setfile] = useState();

  const router = useRouter();
  ////// img upload handlers

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

  const handleImgRemoval = (e, i) => {
    e.preventDefault();
    let arr = uploaded;
    arr.splice(i, 1);
    setUploaded([...arr]);
  };
  //////
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploaded.length < 1) {
      alert("no images uploaded");
      return;
    }

    const eventData = {
      pageid: props.pageid,
      postType: "event",
      title: title.current.value,
      desc: desc.current.value,
      date: new Date(formDate.current.value),
      location: location.current.value,
      images: uploaded,
    };
    if (!props.event._id) {
      eventData.created = new Date();
      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify(eventData),
          headers: {
            "content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          router.push("/events");
        } else {
          console.log(response);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        eventData._id = props.event._id;
        eventData.created = props.event.created;

        const response = await fetch("/api/posts", {
          method: "PUT",
          body: JSON.stringify(eventData),
          headers: {
            "content-Type": "application/json",
          },
        });

        // console.log(response);
        if (response.status === 200) {
          router.push(`/event/${props.event._id}`);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (confirm("Are you sure you want to delete this event")) {
      try {
        const response = await fetch("/api/posts", {
          method: "DELETE",
          body: JSON.stringify({ _id: props.event._id }),
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

  // console.log(props.event.date);
  // console.log(new Date(props.event.date));
  return (
    <form onSubmit={handleSubmit}>
      <label>Event Title</label>
      <br />
      <input
        className="p-3"
        type="text"
        placeholder="title"
        ref={title}
        defaultValue={props.event.title || ""}
      />
      <br />
      <label>Description</label>
      <br />
      <textarea
        className="p-3"
        cols={50}
        rows={8}
        ref={desc}
        defaultValue={props.event.desc || ""}
      />
      <br />
      <label>Date & Time</label>
      <br />
      <input
        className="p-3"
        type="datetime-local"
        ref={formDate}
        defaultValue={props.event.date ? props.event.date.slice(0, 16) : ""}
      />
      <br />
      <label>Location</label>
      <br />
      <input
        className="p-3"
        type="text"
        ref={location}
        defaultValue={props.event.location || ""}
      />
      <br />
      <label>Image</label>
      <br />
      <input className="p-3" type="file" onChange={(e) => handleChange(e)} />
      <button className="p-3 bg-green-600" onClick={handleUpload}>
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
      {uploaded.map((img, i) => {
        // console.log("looping over this is the img val:", img);
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
        // this needs to be the next/Image tag, and needs to be sized correctly also a remove option would be good.
      })}
      <div className="flex flex-row justify-between">
        <input
          className={`p-2 ${
            uploaded.length < 1
              ? "bg-zinc-400 text-neutral-300"
              : "bg-green-600"
          }`}
          type="submit"
          value={!props.event._id ? "POST" : "EDIT"}
          disabled={uploaded.length < 1 ? true : false}
        />
        {props.event._id ? (
          <button onClick={(e) => handleDelete(e)} className="p-2 bg-red-600">
            DELETE
          </button>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}
