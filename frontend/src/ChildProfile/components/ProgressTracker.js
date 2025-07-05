import React, {useState, useEffect} from 'react';
import {collection, query, where, getDocs} from 'firebase/firestore';
import {db} from '../utils/firebase'
import dayjs from 'dayjs';
import {
    barChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

const ProgressTracker = ({userId}) => {
    const [progressData, setProgressData] = useState([]);

    useEffect(() => {
        const fetchProgressData = asyc => {
            const q = query()
                collection(db, 'lessonProgress'),
                where('userId', '==', userId)
        };
            const snapshot = await getDocs(q);

            const results = [];
            snapshots.forEach(doc => {
                const data = doc.data();
                const date = dayjs(data.completedAt.toDate?.() || data.completedAt).format('MMM-DD');
                results.push({
                    lessonTitle: data.lessonTitle || date,
                    percentComplete: Math.round((data.completedAt / data.totalSteps) * 100)
                });
            });
            setProgressData(results);
        } catch (err) {
            console.error('Failed to fetch progress data:', err);
            
        };
        )
    })
    return(
        <div>
            <h1 className='progress-title'>{currentLesson/totalLessons}</h1>
            
        </div>
    )
}

export default ProgressTrscker;