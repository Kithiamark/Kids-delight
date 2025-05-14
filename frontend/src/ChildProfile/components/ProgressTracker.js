import React from 'react';

const ProgressTracker = ({currentLesson, totalLessons}) => {
    return(
        <div>
            <h1 className='progress-title'>{currentLesson/totalLessons}</h1>
            
        </div>
    )
}

export default ProgressTrscker;