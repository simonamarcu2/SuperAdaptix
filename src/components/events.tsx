import { v4 as uuidv4 } from 'uuid';

const calendars = {
  personal: {
    colorName: 'personal',
    lightColors: {
      main: '#f9d71c',
      container: '#fff5aa',
      onContainer: '#594800',
    },
    darkColors: {
      main: '#fff5c0',
      onContainer: '#fff5de',
      container: '#a29742',
    },
  },
  work: {
    colorName: 'work',
    lightColors: {
      main: '#f91c45',
      container: '#ffd2dc',
      onContainer: '#59000d',
    },
    darkColors: {
      main: '#ffc0cc',
      onContainer: '#ffdee6',
      container: '#a24258',
    },
  },
  leisure: {
    colorName: 'leisure',
    lightColors: {
      main: '#1cf9b0',
      container: '#dafff0',
      onContainer: '#004d3d',
    },
    darkColors: {
      main: '#c0fff5',
      onContainer: '#e6fff5',
      container: '#42a297',
    },
  },
  school: {
    colorName: 'school',
    lightColors: {
      main: '#1c7df9',
      container: '#d2e7ff',
      onContainer: '#002859',
    },
    darkColors: {
      main: '#c0dfff',
      onContainer: '#dee6ff',
      container: '#426aa2',
    },
  },
};

export const events = [
    {
      id: uuidv4(),
      title: 'Phyton course',
      resourceId: 'Instructor Dean',
      start: '2025-01-13',
      end: '2025-01-17',
      description: 'This is a Phyton course',
      color: calendars.school.lightColors.main,
      calendarId: 'school'
    },
    {
      id: uuidv4(),
      title: 'Flash Event 2',
      resourceId: 'Professor Rio',
      start: '2025-01-13',
      end: '2025-01-24',
      description: 'This is a Flash Event 2',
      color: calendars.work.lightColors.main,
      calendarId: 'work'
    },
    {
      id: uuidv4(),
      title: 'Master Course 1',
      resourceId: 'Beth Boland',
      start: '2025-01-24',
      end: '2025-01-31',
      description: 'This is a Master Course 1',
      color: calendars.school.lightColors.main,
      calendarId: 'school'
    },
    {
      id: uuidv4(),
      title: 'Master Course 2',
      resourceId: 'Professor Rio',
      start: '2025-01-13',
      end: '2025-02-15',
      description: 'This is a Master Course 2',
      color: calendars.work.lightColors.main,
      calendarId: 'work'
    }
  ];
