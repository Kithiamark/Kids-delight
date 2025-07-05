import React, {useState, useEffect} from "react";

const QuizCard = ({ageGroup, onAgeGroupClick}) => {
    const [quiz, setQuiz] = useState(null);
    const [error, setError] =useState(null);

    //fetching quiz data
    const fetchQuiz = async () => {
        try{
            const response = await fetch()
            
            if (!response.ok) {
                throw new Error('quiz not found');
            }

            const data = await response.json();
            setQuiz(data);
        }catch(err) {
            console.error('Error fetching quizes:', err);
            setError(err.message);
        }
    }
    useEffect(() => {
        fetchQuiz();
    }, [ageGroup]);

    if (error) return <p className="error-message">{error}</p>
    if (!quiz) return <p>Loading quizes...</p>

    return (
        <div className="quiz-card">
            <div className="age-bubble" onClick={onAgeGroupClick}>
                {ageGroup}
            </div>
            <div className="quiz-card-content">
                <h1 className="quiz-title">{title}</h1>
                <img src={image} alt={title} className="quiz-image"/>
                <p className="quiz-text">{text}</p>
                <div className="quiz-buttons">
                    <button className="next-button">next</button>
                    <button className="start-button">start</button>
                    <button className="prev-button">prev</button>
                </div>
            </div>
        </div>
    )
}

export default QuizCard;
