import React, { useEffect, useRef, useState } from "react";
import {
    GoogleMap,
    useLoadScript,
    MarkerF,
    Autocomplete,
    StandaloneSearchBox,
    LoadScript
  } from "@react-google-maps/api";

export default function MapForm(props){
    // right now im looking at geocoding,
    // but i wonder if we could choose on a map at event creation,
    // and just get that data inside of the event object model
    // only need to do it once.
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
        libraries : ["places"],
        mapIds: ["1c8383b3cc2af0bc"],
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
    const searchBar = useRef();

    useEffect(()=>{
        location.setLocation(marker)
    }, [marker])

    const onClick = (e) => {
        setmarker({lat: e.latLng.lat(), lng: e.latLng.lng()});
        };

    const onIdle = () => {
        console.log("onIdle");
        setCenter(marker)
        // setZoom(10);
    };

    // const onLoad = ref => this.searchBox = ref;
    // THIS IS coming along, what we want to do is use the searchbar.current.value, the text address
    // to find and set the coords for the marker,
    // from here we can save all of this info in the actual post
    const onPlacesChanged = async() => {
        try{
            const data = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchBar.current.value}&key=${ process.env.NEXT_PUBLIC_MAP_API_KEY}`)
            const response = await data.json();
            setmarker(response.results[0].geometry.location)
            setZoom(15)
        }catch(err){
            console.error(err)
        }
    };   

    return(
        <GoogleMap
            zoom={zoom}
            center={center}
            mapContainerClassName="map-form"
            onClick={(e)=> onClick(e)} 
            onIdle={onIdle}
            > 
            <StandaloneSearchBox
            onPlacesChanged={onPlacesChanged}>
                <input
                    ref={searchBar}
                    type="text"
                    placeholder="Customized your placeholder"
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
        // </LoadScript>
      
    )
   
}