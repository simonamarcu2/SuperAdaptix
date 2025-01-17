import React, { useState } from 'react';
import { Modal, Button, Input, Tag, Select, DatePicker } from 'antd';

const { Option } = Select;

const CourseEvent: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleTagChange = (value: string[]) => {
        setTags(value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleDateChange = (date: any, dateString: string) => {
        setSelectedDate(dateString);
    };

    const addTag = () => {
        if (inputValue && !tags.includes(inputValue)) {
            setTags([...tags, inputValue]);
            setInputValue('');
        }
    };

    return (
        <div>
            <DatePicker onChange={handleDateChange} onClick={showModal} />
            <Modal title="Course Event" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <h3>Tags by Category</h3>
                    <Select mode="tags" style={{ width: '100%' }} placeholder="Tags" value={tags} onChange={handleTagChange}>
                        {tags.map(tag => (
                            <Option key={tag}>{tag}</Option>
                        ))}
                    </Select>
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onPressEnter={addTag}
                        placeholder="Add a tag"
                    />
                    <Button onClick={addTag}>Add Tag</Button>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Button type="primary" onClick={handleOk}>
                        Save
                    </Button>
                    <Button onClick={handleCancel} style={{ marginLeft: '10px' }}>
                        Close
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default CourseEvent;