import React, {useState, useEffect} from 'react';

const LessonCard = ({ageGroup, onAgeGroupclick })=> {
    const [lesson, setLesson] = useState(null);
    const [error, setError] = useState(null);
    // Fetching lesson data 
        const fetchLesson = async () => {
            try {
                const response = await fetch();

                if (!Response.ok) {
                    throw new Error('Lesson not found');
                }

                const data = await response.json();
                setLesson(data);
            } catch (err) {
                console.error('Error fetching lesson:', err);
                setError(err,message);
            }
        };

        useEffect(() => {
            fetchLesson();
        }, [ageGroup]);
        if (error) return <p className='error-message'>{error}</p>
        if (!lesson) return <p>Loading lesson...</p>

    return (
        <div className='lesson-card'>
            <div className='age-bubble' onClick={onAgeGroupclick}>
                {ageGroup}
            </div>
            <div className='lesson-card-content'>
                <h1 className='lesson-title'>{tittle}</h1>
                <img src={image} alt={title} className='lesson-image'/>
                <p className='lesson-text'>{text}</p>
                <div className='lesson-buttons'>
                    <button className='next-button'>next</button>
                    <button className='start-button'>start</button>
                    <button className='prev-button'>prev</button>
                </div>
            </div>
        </div>
    )
}
export default LessonCard;
// The lessonCard component displays a card version of the lesson.