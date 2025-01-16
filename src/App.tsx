import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './styles/App.css';
import TagsComponent from './components/tags';
import EventModal from './components/EventModal';
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import '@schedule-x/theme-default/dist/index.css';
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createViewMonthGrid, CalendarApp } from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';

const App = () => {
  const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];
  const monthView1 = useState(() => createViewMonthGrid())[0];
  const monthView2 = useState(() => createViewMonthGrid())[0];
  const monthView3 = useState(() => createViewMonthGrid())[0];

  const currentDate = new Date();
  const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  const thirdMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateClick = (date) => {
    setSelectedEvent({
      start: date,
      end: date,
      title: '',
      allDay: false,
    });
    setIsModalOpen(true);
  };

  const handleSaveEvent = (event) => {
    // Save event logic here
    setIsModalOpen(false);
  };

  const calendar1: CalendarApp = useCalendarApp({
    views: [monthView1],
    events: [
      {
        id: uuidv4(),
        resourceId: '1',
        title: 'Phyton course',
        start: '2025-01-13',
        end: '2025-01-17',
        description: 'This is a Phyton course'
      },
      {
        id: uuidv4(),
        resourceId: '2',
        title: 'Flash Event 2',
        start: '2025-01-13',
        end: '2025-01-24',
        description: 'This is a Flash Event 2'
      },
      {
        id: uuidv4(),
        resourceId: '1',
        title: 'Master Course 1',
        start: '2025-01-24',
        end: '2025-01-31',
      },
      {
        id: uuidv4(),
        resourceId: '2',
        title: 'Master Course 2',
        start: '2025-01-13',
        end: '2025-02-15',
      },
      {
        id: uuidv4(),
        resourceId: '1',
        title: 'Cybersecurity Course 3',
        start: '2025-01-12',
        end: '2025-03-22',
      }
    ],
    selectedDate: currentDate.toISOString().split('T')[0],
    plugins: [
      eventsServicePlugin,
      createEventModalPlugin({
        onDateClick: handleDateClick,
      }),
      createDragAndDropPlugin(),
    ],
  });

  const calendar2: CalendarApp = useCalendarApp({
    views: [monthView2],
    events: calendar1.events.getAll(),
    selectedDate: nextMonthDate.toISOString().split('T')[0],
    plugins: [
      eventsServicePlugin,
      createEventModalPlugin({
        onDateClick: handleDateClick,
      }),
      createDragAndDropPlugin(),
    ],
  });

  const calendar3: CalendarApp = useCalendarApp({
    views: [monthView3],
    events: calendar1.events.getAll(),
    selectedDate: thirdMonthDate.toISOString().split('T')[0],
    plugins: [
      eventsServicePlugin,
      createEventModalPlugin({
        onDateClick: handleDateClick,
      }),
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
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        onSave={handleSaveEvent}
      />
    </div>
  );
}

export default App;
