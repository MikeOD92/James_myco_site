import Image from "next/image";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import MapForm from "./MapForm";
import Upload from "./Upload";

export default function PostForm(props) {
  const title = useRef();
  const desc = useRef();
  const body = useRef();
  const formDate = useRef();

  const [location, setLocation] = useState(() =>
    props.type === "event" && props.event?.location
      ? { lat: props.event.location.lat, lng: props.event.location.lng }
      : { lat: 34, lng: -118.5 }
  );
  const [locationStr, setLocationStr] = useState(() =>
    props.event?.location ? props.event.location.add : ""
  );

  const [uploaded, setUploaded] = useState(
    props.event?.images
      ? [...props.event?.images]
      : props.project?.images
      ? [...props.project?.images]
      : []
  );

  const router = useRouter();

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

    const postData = {
      pageid: props.pageid,
      postType: props.type,
      title: title.current.value,
      desc: desc.current.value,
      date: new Date(formDate.current?.value) || null,
      location:
        { add: locationStr, lat: location.lat, lng: location.lng } || null,
      body: body.current?.value || null,
      images: uploaded,
    };
    if (!props.event?._id && !props.project?._id) {
      postData.created = new Date();
      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify(postData),
          headers: {
            "content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          router.push(`/${props.type}s`);
        } else {
          console.log(response);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        postData._id = props.event ? props.event._id : props.project?._id;
        postData.created = props.event?.created || props.project?.created;

        const response = await fetch("/api/posts", {
          method: "PUT",
          body: JSON.stringify(postData),
          headers: {
            "content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          router.push(
            `/${props.type}/${props.event?._id || props.project?._id}`
          );
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
        const id = props.event ? props.event._id : props.project?._id;

        const response = await fetch("/api/posts", {
          method: "DELETE",
          body: JSON.stringify({ _id: id }),
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
      <label className="text-white">Event Title</label>
      <br />
      <input
        className="p-3"
        type="text"
        placeholder="title"
        ref={title}
        defaultValue={props.event?.title || props.project?.title || ""}
      />
      <br />
      <label className="text-white">Description</label>
      <br />
      <textarea
        className="p-3"
        cols={window.innerWidth > 768 ? 50 : 25}
        rows={8}
        ref={desc}
        defaultValue={props.event?.desc || props.project?.desc || ""}
      />
      <br />
      {props.event ? (
        <>
          <label className="text-white">Date & Time</label>
          <br />
          <input
            className="p-3"
            type="datetime-local"
            ref={formDate}
            defaultValue={props.event.date ? props.event.date.slice(0, 16) : ""}
          />
          <br />
          <label className="text-white">Location</label>
          <br />
          <MapForm
            className="w-1/4 h-1/2 bg-blue-500"
            location={location}
            setLocation={setLocation}
            locationStr={locationStr}
            setLocationStr={setLocationStr}
          />
          <br />
        </>
      ) : props.project ? (
        <>
          <label className="p-2 text-zinc-800">Body</label>
          <br />
          <textarea
            className="p-2"
            ref={body}
            cols={
              window.innerWidth > 1024 ? 100 : window.innerWidth > 768 ? 50 : 25
            }
            rows="15"
            defaultValue={props.project.body || ""}
          />
        </>
      ) : (
        ""
      )}

      <label className="text-white">Image</label>
      <br />
      <Upload setUploaded={setUploaded} uploaded={uploaded} />

      {uploaded.map((img, i) => {
        return (
          <div key={`${img}-${i}container`} className="m-1">
            <button
              onClick={(e) => handleImgRemoval(e, i)}
              className="bg-red-600 p-1 w-10 h-10 relative top-10 rounded-md"
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
          value={!props.event?._id && !props.project?._id ? "POST" : "EDIT"}
          disabled={uploaded.length < 1 ? true : false}
        />
        {props.event?._id || props.project?._id ? (
          <button
            onClick={(e) => handleDelete(e)}
            className="p-2 bg-red-600 rounded-md"
          >
            DELETE
          </button>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}
