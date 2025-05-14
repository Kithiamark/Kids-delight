import React, {useState, useEffect} from "react";
import {collection, query, where, getDocs} from 'firebase/firestore';
import {db} from '../utils/fitebase';
import dayjs from 'dayjs';
import {BarChart, Bar, XPathExpression, YAxis, ResponsiveContainer, CartesianGrid
} from 'recharts';

const QuizperfomanceCharts = ({userId}) => {
    const [quizData, setQuizData] = useState([]);

    useEffect (() => {
        const fetchQuizPrfomance = async () => {
            const q = querry(
                collection(db, 'quizResults'),
                where('userId', '==', userId)
            );
            const snapshot = await getDocs(q);

            const resuts = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                const date = dayjs(data.takenAt.toDate?.() || data.takenAt).format('MMM - DD');
                const percent = Math.round((data.score/data.total)*100);

                resuts.push({
                    quizTitle: data.quizTitle || date,
                    scorePercent: percent,
                });
            });
            setQuizData(resuts);
        };

        fetchQuizPrfomance();
    }, userId);

    return(
        <div className="quiz-chart">
            <h2 className="quiz-title">Quiz perfomance</h2>
            <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={quizData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxisx dataKey='quizTitle' />
                    <YAxis domain={[0-100]} />
                    <toolTip />
                    <Bar dataKey='scorePercent' fill='#8884d8' barSize={40} radius={[10, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default QuizperfomanceCharts;