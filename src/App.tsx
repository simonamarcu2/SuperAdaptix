import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'

import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import '@schedule-x/theme-default/dist/index.css'
import '@sx-premium/resource-scheduler/index.css'
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createDailyView, createConfig } from '@sx-premium/resource-scheduler';
import { CustomComponentFn, createViewMonthGrid } from '@schedule-x/calendar';

function App() {
  const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];
  const resourceViewConfig = useState(() => createConfig())[0]

  const dailyView = useState(() => createDailyView(resourceViewConfig))[0]
  const monthlyView = useState(() => createViewMonthGrid())[0]

  useEffect(() => {
    resourceViewConfig.resources.value = [
      {
        label: 'Instructor Dean',
        id: '1'
      },
      {
        labelHTML: '<span>Insctuctor <strong>Dean</strong></span>',
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
    views: [dailyView, monthlyView],
    events: [
      {
        id: uuidv4(),
        title: 'Phyton course',
        start: '2025-01-10 04:00',
        end: '2025-01-15 06:00',
        resourceId: '1'
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
        end: '2025-01-12 18:00',
        resourceId: '1'
      }
    ],
    selectedDate: new Date().toISOString().split('T')[0],
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
