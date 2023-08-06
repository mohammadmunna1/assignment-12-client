import React from 'react';
import './PopularInstructor.css';
import { useState } from 'react';
const PopularInstructorBox = ({ instructor }) => {
    const [hoveredId, setHoveredId] = useState(null);
    const handleHover = id => {
        setHoveredId(id);
    };

    const handleLeave = () => {
        setHoveredId(null);
    };
    return (
        <div
            className='card mx-auto'
            onMouseEnter={() => handleHover(instructor.id)}
            onMouseLeave={handleLeave}
        >
            <img src={instructor.image} alt='Image' className={`image ${hoveredId === instructor.id ? 'darken' : ''}`} />
            <div className={`text-heading ${hoveredId === instructor.id ? 'visible' : ''}`}>
                {hoveredId === instructor.id && <h2 className='text-xl font-semibold mb-4'>{instructor.name}</h2>}
            </div>
            {hoveredId === instructor.id && (
                <div className='text'>
                    <p className='text-xs text-slate-200'>{instructor.description}</p>
                </div>
            )}
        </div>
    );
};

export default PopularInstructorBox;