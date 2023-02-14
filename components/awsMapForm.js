import React, { useEffect, useRef, useState } from "react";
import { createMap } from "maplibre-gl-js-amplify";
import { Amplify } from "aws-amplify";
import { AmplifyGeocoderAPI, drawPoints } from "maplibre-gl-js-amplify";
import awsmobile from "../src/aws-exports";

export default function AwsMapForm(props) {
  Amplify.configure(awsmobile);
  return <div id="map" className="w-100 h-screen bg-zinc-800"></div>;
}
