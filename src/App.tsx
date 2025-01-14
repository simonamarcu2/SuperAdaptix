import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import '@schedule-x/theme-default/dist/index.css'
import '@sx-premium/resource-scheduler/index.css'
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createDailyView, createConfig } from '@sx-premium/resource-scheduler';
import { viewWeek, viewMonthAgenda, createViewMonthGrid, createViewMonthAgenda, CustomComponentFn, CalendarApp } from '@schedule-x/calendar';
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
  const resourceViewConfig = useState(() => createConfig())[0]

  const dailyView = useState(() => createDailyView(resourceViewConfig))[0]
  const monthlyView = useState(() => createViewMonthGrid())[0]
  const monthlyAgendaView = useState(() => createViewMonthAgenda())[0]

  useEffect(() => {
    resourceViewConfig.resources.value = [
      {
        label: 'Instructor Dean',
        id: '1'
      },
      // {
      //   labelHTML: '<span>Instructor <strong>Dean</strong></span>',
      //   id: '2',
      //   colorName: 'room-101',
      //   lightColors: {
      //     main: '#1c7df9',
      //     container: '#d2e7ff',
      //     onContainer: '#002859'
      //   },
      //   darkColors: {
      //     main: '#c0dfff',
      //     onContainer: '#dee6ff',
      //     container: '#426aa2'
      //   }
      // },
      {
        label: 'Professor Rio',
        id: '2'
      },
      {
        label: 'Beth Boland',
        id: '2'
      },
      // {
      //   labelHTML: '<span>Professor <strong>Rio</strong></span>',
      //   id: '4',
      //   colorName: 'room-102',
      //   lightColors: {
      //     main: '#1c7dd6',
      //     container: '#d2e7ee',
      //     onContainer: '#002823'
      //   },
      //   darkColors: {
      //     main: '#c0dfee',
      //     onContainer: '#dee6fd2',
      //     container: '#426am9'
      //   }
      // }
    ]
  }, []);

  const calendar:CalendarApp = useCalendarApp({
    views: [ dailyView, viewWeek, monthlyView, monthlyAgendaView, viewMonthAgenda ],
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
