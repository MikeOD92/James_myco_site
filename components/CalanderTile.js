import React from "react";

export default function CalanderTile(props) {
  if (props.calEvent) {
    console.log("calander props: ");
    console.log(props);
  }

  return (
    <div className="min-w-25 min-h-25">
      {props.calEvent ? <p>{props.calEvent.title}</p> : ""}
    </div>
  );
}
