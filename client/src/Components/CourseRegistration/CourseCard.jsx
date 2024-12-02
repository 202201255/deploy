import React from 'react';
import courseCardGif from '../../Images/value.gif';

const CourseCard = ({ course, onClick, isSelected }) => {
  return (
    <div className={`course-card ${isSelected ? 'selected' : ''}`} onClick={() => onClick(course)}>
      <div className="course-icon-container">
        <img src={courseCardGif} alt="Course Icon" style={{ width: '40px', height: '40px' }} />
        {isSelected && <div className="selected-overlay">Selected</div>}
      </div>
      <h2>{course.course_name}</h2>
    </div>
  );
};

export default CourseCard;
