import { useState } from 'react';
import './styles/App.css';
import TagsComponent from './components/tags';
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import '@schedule-x/theme-default/dist/index.css';
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createViewMonthGrid, createViewWeek, CalendarApp, viewWeek, viewMonthGrid, CalendarEventExternal } from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createdEvents } from './components/events';

const App = () => {
  const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];
  const eventModalPlugin = useState(() => createEventModalPlugin())[0];
  const dragAndDropPlugin = useState(() => createDragAndDropPlugin())[0];

  const monthView1 = useState(() => createViewMonthGrid())[0];
  const weekView1 = useState(() => createViewWeek())[0];
  const monthView2 = useState(() => createViewMonthGrid())[0];
  const weekView2 = useState(() => createViewWeek())[0];
  const monthView3 = useState(() => createViewMonthGrid())[0];
  const weekView3 = useState(() => createViewWeek())[0];

  const currentDate = new Date();
  const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  const thirdMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1);

  const calendar1 = useCalendarApp({
    views: [monthView1, weekView1, viewWeek, viewMonthGrid],
    defaultView: viewMonthGrid.name,
    events: createdEvents,
    selectedDate: currentDate.toISOString().split('T')[0],
    isDark: true,
    dayBoundaries: {
      start: '06:00',
      end: '18:00',
    },
    minDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0],
    weekOptions: {
      gridHeight:500,
      nDays:5,
      eventWidth: 20,
    },
    monthGridOptions: {
      nEventsPerDay: 8,
    },
    plugins: [
      eventsServicePlugin,
      eventModalPlugin,
      dragAndDropPlugin,
    ],
    callbacks: {
      onEventUpdate(updatedEvent) {
        console.log('onEventUpdate', updatedEvent)
      },
      onBeforeEventUpdate(oldEvent, newEvent, $app) {
        // run your validation or side effects
        return false
      },
      onEventClick(calendarEvent) {
        console.log('onEventClick', calendarEvent)
      },
      onDoubleClickEvent(calendarEvent) {
        console.log('onDoubleClickEvent', calendarEvent)
      },
      onClickPlusEvents(date) {
        date = new Date(date).toISOString().split('T')[0]
        console.log('onClickPlusEvents', date) // e.g. 2024-01-01
        setIsModalOpen(true)
        setHiddenEvents(calendar1.events.getAll().filter(event => event.start.startsWith(date)))
      },
    },
    
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hiddenEvents, setHiddenEvents] = useState<CalendarEventExternal[]>([]);

  const onClickPlusEvents = (date: string) => {
    date = new Date(date).toISOString().split('T')[0];
    console.log('onClickPlusEvents', date); // e.g. 2024-01-01

    // Find hidden events for the given date
    const eventsForDate = calendar1.events.getAll().filter(event => event.start.startsWith(date));
    setHiddenEvents(eventsForDate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setHiddenEvents([]);
  };
  const calendar2: CalendarApp = useCalendarApp({
    views: [monthView2, weekView2],
    defaultView: 'month',
    events: createdEvents,
    selectedDate: nextMonthDate.toISOString().split('T')[0],
    plugins: [
      eventsServicePlugin,
      eventModalPlugin,
      dragAndDropPlugin,
    ],
  });

  const calendar3: CalendarApp = useCalendarApp({
    views: [monthView3, weekView3],
    defaultView: 'month',
    events: createdEvents,
    selectedDate: thirdMonthDate.toISOString().split('T')[0],
    plugins: [
      eventsServicePlugin,
      eventModalPlugin,
      dragAndDropPlugin,
    ],
  });

  // // Add event listener to open modal on calendar click
  // const handleCalendarClick = (event: MouseEvent) => {
  //   eventModalPlugin.openModal();
  // };

  return (
    <div className="sx-react-calendar-wrapper" >
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
