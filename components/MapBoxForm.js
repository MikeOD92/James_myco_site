import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
// import { SearchBox } from "@mapbox/search-js-react";
// import "mapbox-gl/dist/mapbox-gl.css";

export default function MapBoxForm() {
  const mapRef = useRef(null);
  const map = useRef(null);
  const search = useRef(null);

  const [center, setCenter] = useState([-118, 34]);

  useEffect(() => {
    if (map.current) return;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPGL_TOKEN;
    map.current = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/modell92/cle4pqaqw000t01peons7ahmv",
      center: center,
      zoom: 12,
    });
  });
  const locationSearch = async (e) => {
    e.preventDefault();
    const data = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${search.current.value}.json?access_token=${process.env.NEXT_PUBLIC_MAPGL_TOKEN}`
    );
    console.log(data.features[0]);
  };
  return (
    <div className="w-full h-full">
      <input type="text" className="p-2 my-5" ref={search} />
      <button onClick={(e) => locationSearch(e)}>Search</button>
      <div id="map" className="mapContainer" ref={mapRef} />
    </div>
  );
}
