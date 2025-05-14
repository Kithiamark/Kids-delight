import React, {useState, useEffect} from "react";
import {db} from 'utils/firebase';
import { collection, getDocs } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import dayjs from "dayjs";

const UserProgressChart = ({userId}) => {
    const [progressData, setProgressData] = useState([]);

    useEffect (() => {
        const fetchProgress = async () => {
            const q = query(
                collection(db, 'userProgress'),
                where('userId', '==', userId)
            );
            const snapshot = await getDocs(q);

            constgroupedByDate = {};
            snapshot.forEach(doc => {
                const data = doc.data();
                const date = dayjs(data.completedAt.toDate?.() || data.completedAt).formart('YYYY-MM-DD');

                if (!groupedByDate[date]) groupedByDate[date] =0
                groupedByDate[date]++
            });
            const chartData = Object.entries(groupedByDate).map(([date, count]) => ({
                date, 
                lessonCompleted:count
            }));
            setProgressData(chartData);
        };
        fetchProgress();
    }, [userId]);

    return (
        <div className="progress-chart">
            <h2 className="progress-title">Lesson progress</h2>
            <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='date' />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <line type="monotone" dataKey="lessonCompleted" stroke="#8884d8" strokeWidth={3} dot={{r: 5}} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserProgressChart