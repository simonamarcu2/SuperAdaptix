import React, { useState } from 'react';
import Select from 'react-select';
import '../styles/tags.css';
import '../styles/color-palette.css';

type Tags = {
  instructor: string[];
  course: string[];
  status: string[];
};

const categoryOptions: { value: keyof Tags, label: string }[] = [
  { value: 'instructor', label: 'Instructor' },
  { value: 'course', label: 'Course' },
  { value: 'status', label: 'Status' }
];

const predefinedTags: Tags = {
  instructor: ['Instructor Dean', 'Professor Rio', 'Beth Boland'],
  course: ['Python Course', 'JavaScript Course', 'React Course'],
  status: ['Scheduled', 'Completed', 'Cancelled']
};

function TagsComponent() {
  const [tags, setTags] = useState<Tags>(predefinedTags);
  const [selectedCategory, setSelectedCategory] = useState<{ value: keyof Tags, label: string } | null>(categoryOptions[0]);
  const [newTag, setNewTag] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddTag = () => {
    if (selectedCategory) {
      setTags(prevTags => ({
        ...prevTags,
        [selectedCategory.value]: [...prevTags[selectedCategory.value], newTag]
      }));
      setNewTag('');
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <button className='add-tag-btn' onClick={() => setIsModalOpen(true)}>Add Tag</button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-wrapper">
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>x</button>
            <div className="modal-content">
              <h2>Add New Tag</h2>
              <input
                type="text"
                className='tag-input'
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder='Enter tag name'
              />
              <Select
                placeholder='Select category'
                className='tag-select'
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={categoryOptions}
              />
              <button className="save-tag" onClick={handleAddTag}>Save Tag</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TagsComponent;

