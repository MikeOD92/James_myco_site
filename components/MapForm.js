import React, { useEffect, useRef, useState } from "react";
import {
    GoogleMap,
    useLoadScript,
    MarkerF,
    StandaloneSearchBox,
  } from "@react-google-maps/api";

export default function MapForm(props){
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
        libraries : ["places"],
      });
    return (   
        <div>
            {isLoaded ? <Map location={props}/>:<div> L O A D I N G . . .</div>}
        </div>
    )
    };

const Map = ({ children, style,location, ...options}) => {
    const [marker, setmarker] = useState({lat:location.location.lat, lng: location.location.lng} || { lat: 34, lng: -118.5 })
    // const [center, setCenter] = useState({lat:location.location.lat, lng: location.location.lng} || { lat: 34, lng: -118.5 });
    const [zoom, setZoom] = useState(12);
    const searchBar = useRef();

    useEffect(()=>{
        location.setLocation({lat:marker.lat, lng:marker.lng})
    }, [marker])

    // const onIdle = () => {
    //     setCenter(marker)
    // };

    const onPlacesChanged = async() => {
        try{
            const data = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchBar.current.value}&key=${ process.env.NEXT_PUBLIC_MAP_API_KEY}`)
            const response = await data.json();
            setmarker(response.results[0].geometry.location)
            location.setLocationStr(searchBar.current.value)
            setZoom(15)
        }catch(err){
            console.error(err)
        }
    };   

    return(
        <GoogleMap
            zoom={zoom}
            center={marker}
            mapContainerClassName="map-form"
            > 
            <StandaloneSearchBox
            onPlacesChanged={onPlacesChanged}>
                <input
                    ref={searchBar}
                    type="text"
                    placeholder="search"
                    defaultValue={location.locationStr? location.locationStr : ""}
                    style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-120px"
                    }}
                />
    </StandaloneSearchBox>
            <MarkerF position={marker} />
        </GoogleMap>
    )
   
}