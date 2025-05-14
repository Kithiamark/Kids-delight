import React from 'react';
import LessonCard from '../components/LessonCard';
import ProgressTracker from '../components/ProgressTracker';
import QuizCard from '../components/QuizCard';
import '../styles';

const KidsDashboard = () => {
    return (
        <div className='kids-dashboard'>
            <h1 className='dashboard-title'>Welcome back, [childName]</h1>

            <div className='dashboard-sections'>
                <LessonCard />
                <ProgressTracker />
                <QuizCard />
            </div>
        </div>
    )
}

export default KidsDashboard;
// Displays the kids content on their dashboard.