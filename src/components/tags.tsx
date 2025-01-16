import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../styles/tags.css';
import '../styles/color-palette.css';

type Tags = {
  instructor: { name: string, color: string }[];
  course: { name: string, color: string }[];
  status: { name: string, color: string }[];
};

const categoryOptions: { value: keyof Tags, label: string }[] = [
  { value: 'instructor', label: 'Instructor' },
  { value: 'course', label: 'Course' },
  { value: 'status', label: 'Status' }
];

const predefinedTags: Tags = {
  instructor: [
    { name: 'Instructor Dean', color: 'red' },
    { name: 'Professor Rio', color: 'red' },
    { name: 'Beth Boland', color: 'red' }
  ],
  course: [
    { name: 'Python Course', color: 'green' },
    { name: 'JavaScript Course', color: 'green' },
    { name: 'React Course', color: 'green' }
  ],
  status: [
    { name: 'Scheduled', color: 'blue' },
    { name: 'Completed', color: 'blue' },
    { name: 'Cancelled', color: 'blue' }
  ]
};

function TagsComponent() {
  const [tags, setTags] = useState<Tags>(predefinedTags);
  const [selectedCategory, setSelectedCategory] = useState<{ value: keyof Tags, label: string } | null>(categoryOptions[0]);
  const [newTag, setNewTag] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedTags = loadTagsFromLocalStorage();
    if (savedTags) {
      setTags(savedTags);
    }
  }, []);

  const handleAddTag = () => {
    if (selectedCategory) {
      const color = selectedCategory.value === 'instructor' ? 'red' :
                    selectedCategory.value === 'course' ? 'green' : 'blue';
      const updatedTags = {
        ...tags,
        [selectedCategory.value]: [...tags[selectedCategory.value], { name: newTag, color }]
      };
      setTags(updatedTags);
      saveTagsToLocalStorage(updatedTags);
      setNewTag('');
      setIsModalOpen(false);
    }
  };

  const saveTagsToLocalStorage = (tags: Tags) => {
    localStorage.setItem('tags', JSON.stringify(tags));
  };

  const loadTagsFromLocalStorage = (): Tags | null => {
    const savedTags = localStorage.getItem('tags');
    return savedTags ? JSON.parse(savedTags) : null;
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
