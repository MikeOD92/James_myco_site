import React from "react";

export default function CalanderTile(props) {
  console.log(props);
  // console.log(props.eventList);
  //   console.log(props.eventList[0].date);
  //   const calEvent = props.eventList.find(({ date }) => {
  //     date === props.calDate;
  //   });
  //   console.log(calEvent);
  return (
    <div className="p-10 min-w-25 min-h-25 bg-zinc-400">
      {/* {calEvent ? <p>{calEvent.title}</p> : ""} */}
    </div>
  );
}
