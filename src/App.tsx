import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import '@schedule-x/theme-default/dist/index.css';
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createViewMonthGrid, CalendarApp } from '@schedule-x/calendar';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';

function App() {
  const eventsServicePlugin = useState(() => createEventsServicePlugin())[0];
  const monthView1 = useState(() => createViewMonthGrid())[0];
  const monthView2 = useState(() => createViewMonthGrid())[0];
  const monthView3 = useState(() => createViewMonthGrid())[0];

  const currentDate = new Date();
  const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
  const thirdMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1);

  const calendar1: CalendarApp = useCalendarApp({
    views: [monthView1],
    events: [
      {
        id: uuidv4(),
        resourceId: '1',
        title: 'Phyton course',
        start: '2025-01-10 04:00',
        end: '2025-01-15 06:00',
        description: 'This is a Phyton course'
      },
      {
        id: uuidv4(),
        resourceId: '2',
        title: 'Flash Event 2',
        start: '2025-01-10 01:00',
        end: '2025-01-15 12:00',
        description: 'This is a Flash Event 2'
      },
      {
        id: uuidv4(),
        resourceId: '1',
        title: 'Master Course 1',
        start: '2025-01-10 09:00',
        end: '2025-01-15 11:00',
      },
      {
        id: uuidv4(),
        resourceId: '2',
        title: 'Master Course 2',
        start: '2025-01-10 13:00',
        end: '2025-01-15 15:00',
      },
      {
        id: uuidv4(),
        resourceId: '1',
        title: 'Cybersecurity Course 3',
        start: '2025-01-12 16:00',
        end: '2025-01-15 18:00',
      }
    ],
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

  const [tags, setTags] = useState({
    instructor: [],
    course: [],
    status: []
  });

  const [newTag, setNewTag] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('instructor');

  const handleAddTag = () => {
    setTags(prevTags => ({
      ...prevTags,
      [selectedCategory]: [...prevTags[selectedCategory], newTag]
    }));
    setNewTag('');
  };

  return (
    <div className="sx-react-calendar-wrapper">
      <div className="calendar-container">
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
      <div className="tag-creation">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="instructor">Instructor</option>
          <option value="course">Course</option>
          <option value="status">Status</option>
        </select>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Enter new tag"
        />
        <button onClick={handleAddTag}>Add Tag</button>
      </div>
    </div>
  );
}

export default App;
