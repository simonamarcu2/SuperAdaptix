Short description
Scheduler adaptations depending on situation. Create multi-variants flawlessly and find the supreme planner.
README
Scheduler adaptations depending on situation. Create multi-variants flawlessly and find the supreme planner.

Project Brief

The goal of this project is to develop a custom scheduling application tailored for course administrators and managers. The system will enable them to book courses in advance, assign instructors, and make adjustments such as rescheduling courses or shifting instructors. This is why drag-and-drop functionality and real-time edibility are crucial to the design.

Unlike student-facing systems, this scheduler is exclusively for administrative use and will not be accessible to students. Administrators will benefit from tools like conflict detection to prevent overlapping schedules for instructors while allowing certain exceptions (e.g., double bookings for separate cohorts).

The scheduler will feature:
1. Course Scheduling:
• Book courses with details such as dates, titles, descriptions, type, duration, and flexibility.
• Easily reschedule and update courses as needed.
2. Instructor Management:
• Assign instructors to courses and adjust their schedules based on availability.
• Create and manage instructor profiles, including names, roles, availability, and assigned courses.
3. Conflict Detection:
• Detect potential conflicts in instructor availability or course schedules, while allowing exceptions for specific scenarios.
4. Drag-and-Drop Interface:
• A user-friendly interface to rearrange courses and instructors with drag-and-drop functionality.
5. Editable Schedule:
• Allow administrators to make real-time adjustments to schedules, such as reassigning instructors or shifting course times when unforeseen circumstances (e.g., instructor illness) arise.
6. Secure Authentication and Deployment:
• Only authorized users can access the system.
• The application will be hosted online, making it accessible to administrators from multiple locations.

By addressing these needs, the system will simplify the scheduling process, reduce manual errors, and improve operational efficiency for course administrators.

Add Google Calendar and ICS File Import Functionality

Priority:
Medium (Nice-to-have but valuable for usability)

Enable administrators to import course schedules from Google Calendar or ICS (iCalendar) files. This feature will streamline the setup process by allowing bulk imports of existing events.

Tasks:
• Research and integrate Google Calendar API for importing events.
• Implement ICS (.ics) file upload and parsing.
• Map imported event data to course fields (title, date, duration, instructor).
• Add an import button to the UI with feedback on successful or failed imports.
• Handle authentication and permissions for Google Calendar integration.
