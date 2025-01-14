import {  useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import '@schedule-x/theme-default/dist/index.css'
import '@sx-premium/resource-scheduler/index.css'
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { viewWeek, viewMonthAgenda, createViewMonthGrid, createViewMonthAgenda, CalendarApp } from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'

// const MyCustomDateGridEvent: CustomComponentFn = (wrapperElement, props) => {
//   // Your custom logic here
  
//   wrapperElement.innerHTML = `<div>Custom Date Grid Event: ${props.title}</div>`;
// };

// const MyCustomMonthGridEvent: CustomComponentFn = (wrapperElement, props) => {
//   // Your custom logic here
//   wrapperElement.innerHTML = `<div>Custom Month Grid Event: ${props.title}</div>`;
// };

// const MyCustomMonthAgendaEvent: CustomComponentFn = (wrapperElement, props) => {
//   // Your custom logic here
//   wrapperElement.innerHTML = `<div>Custom Month Agenda Event: ${props.title}</div>`;
// };

// const MyCustomEventModal: CustomComponentFn = (wrapperElement, props) => {
//   console.log('MyCustomEventModal', props)
//   wrapperElement.innerHTML = `<div>Custom Event Modal: ${props.title}</div>`;
// };

// const customComponents: CustomComponentFns = {
//   dateGridEvent: MyCustomDateGridEvent,
//   monthGridEvent: MyCustomMonthGridEvent,
//   monthAgendaEvent: MyCustomMonthAgendaEvent,
//   eventModal: MyCustomEventModal,
// };

function App() {
  const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];
  const monthlyView = useState(() => createViewMonthGrid())[0]
  const monthlyAgendaView = useState(() => createViewMonthAgenda())[0]


  const calendar:CalendarApp = useCalendarApp({
    views: [ viewWeek, monthlyView, monthlyAgendaView, viewMonthAgenda ],
    events: [
      {
        id: uuidv4(),
        title: 'Phyton course',
        start: '2025-01-10 04:00',
        end: '2025-01-15 06:00',
        resourceId: '1',
        description: 'This is a Phyton course'
      },
      {
        id: uuidv4(),

        title: 'Flash Event 2',
        start: '2025-01-10 01:00',
        end: '2025-01-15 12:00',
        resourceId: '2'
      },
      {
        id: uuidv4(),
        title: 'Master Course 1',
        start: '2025-01-10 09:00',
        end: '2025-01-15 11:00',
        resourceId: '1'
      },
      {
        id: uuidv4(),
        title: 'Master Course 2',
        start: '2025-01-10 13:00',
        end: '2025-01-15 15:00',
        resourceId: '2'
      },
      {
        id: uuidv4(),
        title: 'Cybersecurity Course 3',
        start: '2025-01-12 16:00',
        end: '2025-01-15 18:00',
        resourceId: '1'
      }
    ],
    selectedDate: new Date().toISOString().split('T')[0],
    plugins: [
      eventsServicePlugin,
      createEventModalPlugin(),
      createDragAndDropPlugin()
    ]
  })

  return (
    <div className="sx-react-calendar-wrapper">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}


export default App
