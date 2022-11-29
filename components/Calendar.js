import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import NoSSR from "./NoSSR";
export const Calendar = (props) => {
  const calRef = useRef(null);

  return (
    <NoSSR>
      <FullCalendar
        ref={calRef}
        plugins={[dayGridPlugin]}
        editable
        selectable
        events={props.events}
      />
    </NoSSR>
  );
};
