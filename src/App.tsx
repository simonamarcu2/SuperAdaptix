import { useState } from 'react';
import './styles/App.css';
import TagsComponent from './components/tags';
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import '@schedule-x/theme-default/dist/index.css';
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createViewMonthGrid, CalendarApp } from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { EventsProvider, events } from './context/TagsContext';

const App = () => {
  const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];
  
  const monthView1 = useState(() => createViewMonthGrid())[0];
  const monthView2 = useState(() => createViewMonthGrid())[0];
  const monthView3 = useState(() => createViewMonthGrid())[0];

  const currentDate = new Date();
  const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  const thirdMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1);

  const calendar1: CalendarApp = useCalendarApp({
    views: [monthView1],
    events: events,
    selectedDate: currentDate.toISOString().split('T')[0],
    plugins: [
      eventsServicePlugin,
      createEventModalPlugin(),
      createDragAndDropPlugin(),
    ],
  });

  const calendar2: CalendarApp = useCalendarApp({
    views: [monthView2],
    events: calendar1.events.getAll(),
    selectedDate: nextMonthDate.toISOString().split('T')[0],
    plugins: [
      eventsServicePlugin,
      createEventModalPlugin(),
      createDragAndDropPlugin(),
    ],
  });

  const calendar3: CalendarApp = useCalendarApp({
    views: [monthView3],
    events: calendar1.events.getAll(),
    selectedDate: thirdMonthDate.toISOString().split('T')[0],
    plugins: [
      eventsServicePlugin,
      createEventModalPlugin(),
      createDragAndDropPlugin(),
    ],
  });
  return (
    <div className="sx-react-calendar-wrapper">
        <div className="calendar-container">
          <TagsComponent />
          <div className="calendar-view">
            <ScheduleXCalendar calendarApp={calendar1} />
          </div>
          <div className="calendar-view">
            <ScheduleXCalendar calendarApp={calendar2} />
          </div>
          <div className="calendar-view">
            <ScheduleXCalendar calendarApp={calendar3} />
          </div>
        </div>
    </div>
  );
}

export default App;
