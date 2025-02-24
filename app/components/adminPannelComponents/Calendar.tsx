"use client"
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; 
const CalendarComponent = () => {
  const [events, setEvents] = useState([
    { title: 'Event 1', date: '2025-01-10' },
    { title: 'Event 2', date: '2025-01-15' },
    { title: 'Event 3', date: '2025-01-20' },
  ]);
  const handleDateClick = (arg: DateClickArg) => {
    const newEvent = { title: 'New Event', date: arg.dateStr };
    setEvents([...events, newEvent]);
  };
  return (
    <div className="calendar-container bg-gray-900 text-gray-100 p-4 rounded-lg shadow-md h-screen"> 
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        height="100vh" 
        contentHeight="auto" 
      />
    </div>
  );
};
export default CalendarComponent;
