import React from 'react'
import { useState } from 'react'
import '../component/Doctor.css'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

export const Doctor = () => {
    const events = [{ title: "today's event", date: new Date() }];
    return (
        <>
     
        <div className="App">
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={events}
      />
    </div>
        </>
    )
}
