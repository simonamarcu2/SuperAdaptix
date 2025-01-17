import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Event = {
    id: string;
    title: string;
    start: string;
    end: string;
    description: string;
    color: string;
};

type EventsByColor = {
    red: Event[];
    green: Event[];
    blue: Event[];
    [key: string]: Event[];
};

const predefinedEvents: EventsByColor = {
    red: [],
    green: [],
    blue: [],
};

type EventsContextType = {
    events: EventsByColor;
    addEvent: (event: Event) => void;
};

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider = ({ children }: { children: ReactNode }) => {
    const [events, setEvents] = useState<EventsByColor>(predefinedEvents);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:3000/events');
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const addEvent = (event: Event) => {
        setEvents((prevEvents) => ({
            ...prevEvents,
            [event.color]: [...prevEvents[event.color], event],
        }));
    };

    return (
        <EventsContext.Provider value={{ events, addEvent }}>
            {children}
        </EventsContext.Provider>
    );
};

const instructorColors: { [key: string]: string } = {
    'Instructor Dean': '#DAFFED',
    'Professor Rio': '#9BF3F0',
    'Beth Boland': '#5171A5',
    'Instructor Smith': '#4A0D67',
    'Professor Jane': '#ADFC92'
};
export const events = [
    {
        id: uuidv4(),
        resourceId: 'Instructor Dean',
        title: 'Phyton course',
        start: '2025-01-13',
        end: '2025-01-17',
        description: 'This is a Phyton course',
        color: instructorColors['Instructor Dean']
    },
    {
        id: uuidv4(),
        resourceId: 'Professor Rio',
        title: 'Flash Event 2',
        start: '2025-01-13',
        end: '2025-01-24',
        description: 'This is a Flash Event 2',
        color: instructorColors['Professor Rio']
    },
    {
        id: uuidv4(),
        resourceId: 'Beth Boland',
        title: 'Master Course 1',
        start: '2025-01-24',
        end: '2025-01-31',
        description: 'This is a Master Course 1',
        color: instructorColors['Beth Boland']
    },
    {
        id: uuidv4(),
        resourceId: 'Professor Rio',
        title: 'Master Course 2',
        start: '2025-01-13',
        end: '2025-02-15',
        description: 'This is a Master Course 2',
        color: instructorColors['Professor Rio']
    }
];