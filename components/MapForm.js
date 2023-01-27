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

const Map = ({location}) => {
    const [marker, setmarker] = useState(location.location)

    useEffect(()=>{
        location.setLocation(marker)
    }, [marker])

    return(
        <GoogleMap
            zoom={10}
            center={{ lat: 34, lng: -118 }}
            mapContainerClassName="map-form"
            onClick={(e)=> setmarker({lat: e.latLng.lat(), lng: e.latLng.lng()})} 
    >
            <MarkerF position={marker} />
        </GoogleMap>
    )
   
}