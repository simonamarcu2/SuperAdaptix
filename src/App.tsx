import {useEffect, useState} from 'react'
import './App.css'
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import { v4 as uuidv4 } from 'uuid';
import { createDailyView, createHourlyView, createConfig } from '@sx-premium/resource-scheduler'

import '@schedule-x/theme-default/dist/index.css'
import '@sx-premium/resource-scheduler/index.css'
import {createEventsServicePlugin} from "@schedule-x/events-service";

function App() {
  const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];

  const resourceViewConfig = useState(() => createConfig())[0]
  const hourlyView = useState(() => createHourlyView(resourceViewConfig))[0]
  const dailyView = useState(() => createDailyView(resourceViewConfig))[0]

  useEffect(() => {
    resourceViewConfig.resources.value = [
      {
        label: 'Course Phyton',
        id: '1'
      },
      {
        labelHTML: '<span>Course <strong>Phyton</strong></span>',
        id: '2',
        colorName: 'room-101',
        lightColors: {
          main: '#1c7df9',
          container: '#d2e7ff',
          onContainer: '#002859'
        },
        darkColors: {
          main: '#c0dfff',
          onContainer: '#dee6ff',
          container: '#426aa2'
        }
      }
    ]
  }, []);

  const calendar = useCalendarApp({
    views: [
      hourlyView,
      dailyView
    ],
    events: [
      {
        id: uuidv4(),
        title: 'Course 1',
        start: '2025-01-10 04:00',
        end: '2025-01-10 06:00',
        resourceId: '1'
      },
      {
        id: uuidv4(),
        title: 'flash Event 2',
        start: '2025-01-10 01:00',
        end: '2025-01-10 12:00',
        resourceId: '2'
      },
      {
        id: uuidv4(),
        title: 'Master Course 1',
        start: '2025-01-12 09:00',
        end: '2025-01-12 11:00',
        resourceId: '1'
      },
      {
        id: uuidv4(),
        title: 'Master Course 2',
        start: '2025-01-12 13:00',
        end: '2025-01-12 15:00',
        resourceId: '2'
      },
      {
        id: uuidv4(),
        title: 'Cybersecurity Course 3',
        start: '2025-01-12 16:00',
        end: '2025-01-12 18:00',
        resourceId: '1'
      }
    ],
    selectedDate: '2025-01-10',
    plugins: [
      eventsServicePlugin,
    ]
  })

  return (
    <div className="sx-react-calendar-wrapper">
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default App
