import React, { useState } from "react";
import post from "../../models/post";
import dbConnect from "../../utils/dbConnect";
import AnimationWrapper from "../../components/AnimationWrapper";
import Image from "next/image";
import Link from "next/link";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
} from "@react-google-maps/api";

export default function ReadEvent({ post }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
  });

  const formattedDate = new Date(post.date).toLocaleString();

  return (
    <AnimationWrapper>
      <div className=" mt-20 md:mt-0 md:p-20">
        <div>
          <h1 className="p-5 serif text-lightmushroom">{post.title}</h1>
          <div className="flex flex-col lg:flex-row">
            <Image
              className="rounded-lg self-center p-5 w-full lg:w-fit md:bg-mushroom"
              src={post.images[0] ? post.images[0] : "/img/sporeprint.jpg"}
              alt={`${post.title} splash image`}
              width={400}
              height={400}
            />
            <div className=" m-5 lg:m-0 lg:ml-3 p-10 bg-lightmushroom rounded-lg lg:w-full text-zinc-800">
              <p className="text-2xl">{formattedDate}</p>
              <p style={{ whiteSpace: "pre-wrap" }} className="mt-5">
                {post.desc}
              </p>
            </div>
          </div>
          <div className="p-5 text-lightmushroom mt-10">
            <h3 className="text-3xl mb-10">Location</h3>
            <p className="mb-10">{post.location}</p>
            {!isLoaded ? <p>.....Loading</p> : <Map location={post.location}/>}
          </div>
        </div>

        <div className="mt-5">
          <Link
            className="p-3 bg-darkbruise text-bruise hover:text-lightmushroom rounded-md"
            href="/events"
          >
            Back to Events
          </Link>
        </div>
      </div>
    </AnimationWrapper>
  );
}

const Map = ({location}) => {
  const data = JSON.parse(location);
  return (
    <GoogleMap
      zoom={15}
      center={data}
      mapContainerClassName="map-container"
    >
      <MarkerF position={data} clickable/>
    </GoogleMap>
  );
};
export async function getServerSideProps(context) {
  const { id } = context.params;

  dbConnect();

  const data = await post.findOne({ _id: id }).lean();

  if (data._id !== null) {
    data._id = data._id.toString();
  }

  if (!data) {
    return {
      props: {},
    };
  }
  return {
    props: {
      post: {
        title: data.title || "",
        created: data.created || "",
        images: data.images || "",
        desc: data.desc || "",
        body: data.body || "",
        date: data.date || "",
        location: data.location || "",
      },
    },
  };
}
