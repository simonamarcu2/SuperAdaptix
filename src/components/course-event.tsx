import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, InputLabel, FormControl, TextFieldProps } from '@mui/material';
import {  DatePicker } from '@mui/lab';

interface EventDialogProps {
    open: boolean;
    onClose: () => void;
    instructors: string[];
    courses: string[];
}

const EventDialog: React.FC<EventDialogProps> = ({ open, onClose, instructors, courses }) => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [status, setStatus] = useState('');

    const handleSave = () => {
        // Handle save logic here
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Event</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    renderInput={(params: TextFieldProps) => <TextField {...params} fullWidth margin="normal" />}
                />
                <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(date: Date | null) => setEndDate(date)}
                    renderInput={(params: TextFieldProps) => <TextField {...params} fullWidth margin="normal" />}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Tags</InputLabel>
                    <Select
                        multiple
                        value={tags}
                        onChange={(e) => setTags(e.target.value as string[])}
                    >
                        {instructors.map((instructor) => (
                            <MenuItem key={instructor} value={instructor}>
                                {instructor}
                            </MenuItem>
                        ))}
                        {courses.map((course) => (
                            <MenuItem key={course} value={course}>
                                {course}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <MenuItem value="Planned">Planned</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

const CourseEvent: React.FC = () => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDayClick = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const instructors = ['Instructor 1', 'Instructor 2', 'Instructor 3'];
    const courses = ['Course 1', 'Course 2', 'Course 3'];

    return (
        <div>
            <Button onClick={handleDayClick}>Click a day to create an event</Button>
            <EventDialog
                open={dialogOpen}
                onClose={handleClose}
                instructors={instructors}
                courses={courses}
            />
        </div>
    );
};

export default CourseEvent;