import React, { useState } from 'react';
import TagsComponent from './tags';
import '../styles/EventModal.css';

const EventModal = ({ isOpen, onClose, event, onSave }) => {
  const [title, setTitle] = useState(event?.title || '');
  const [startDate, setStartDate] = useState(event?.start || '');
  const [endDate, setEndDate] = useState(event?.end || '');
  const [allDay, setAllDay] = useState(event?.allDay || false);

  const handleSave = () => {
    const updatedEvent = {
      ...event,
      title,
      start: startDate,
      end: endDate,
      allDay,
    };
    onSave(updatedEvent);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <button className="modal-close" onClick={onClose}>x</button>
        <div className="modal-content">
          <div className="tab-content">
            <div className="tab-pane">
              <h2>Course creation/h2>
              <label>
                Title:
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                Start Date:
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
              <label>
                End Date:
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
              <label>
                All Day:
                <input
                  type="checkbox"
                  checked={allDay}
                  onChange={(e) => setAllDay(e.target.checked)}
                />
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button className="save-button" onClick={handleSave}>Save</button>
            <button className="close-button" onClick={onClose}>Close</button>
          </div>
      </div>
    </div>
  );
};

export default EventModal;
