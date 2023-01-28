import React, { useEffect, useRef, useState } from "react";
import {
    GoogleMap,
    useLoadScript,
    MarkerF,
    StyledMapType,
  } from "@react-google-maps/api";

export default function MapForm(props){
    // right now im looking at geocoding,
    // but i wonder if we could choose on a map at event creation,
    // and just get that data inside of the event object model
    // only need to do it once.
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
      });
    return (   
        <div>
            {isLoaded ? <Map location={props}/>:<div> L O A D I N G . . .</div>}
        </div>
    )
    };

const Map = ({ children, style,location, ...options}) => {
    const [marker, setmarker] = useState(location.location)
    const [center, setCenter] = useState({ lat: 34, lng: -118 });
    const [zoom, setZoom] = useState(10);
    useEffect(()=>{
        location.setLocation(marker)
    }, [marker])

    const onClick = (e) => {
  // avoid directly mutating state
  setmarker({lat: e.latLng.lat(), lng: e.latLng.lng()});
};

    const onIdle = () => {
    console.log("onIdle");
    setCenter(marker)
    setZoom(10);
    // setCenter(e.getCenter().toJSON());
    };

    return(
        <GoogleMap
            zoom={zoom}
            center={center}
            mapContainerClassName="map-form"
            onClick={(e)=> onClick(e)} 
            onIdle={onIdle}>   
            <MarkerF position={marker} />
        </GoogleMap>
    )
   
}