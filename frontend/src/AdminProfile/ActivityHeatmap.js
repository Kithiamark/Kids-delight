import { useDebugValue, useEffect, useState } from "react";
import React, {useEffect, useState} from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import {collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../utils/firebase";
import dayjs from "dayjs";

const ActivityHeatmap = ({userId}) => {
    const [heatmapData, setHeatmapData] = useState([]);

    useEffect(() => {
        const fetchActivity = async () => {
            const q = query(
                collection(db, 'userActivity'),
                where('userId', '==', userId)
            );
            const snapshot = await getDocs(q);

            const dateMap = {};

            snapshot.forEach(doc => {
                const data = doc.data();
                const date = dayjs(data.timestamp.toDate?.()|| data.timestamp).format('YYYY-MM-DD');

                if (!dateMap[date]) dateMap[date] = 0;
                dateMap[date]++ ;
            });
            const chartData = Object.entries(dateMap).map(([date, count]) => ({
                date, 
                count
            }));
            setHeatmapData(chartData);
        };
        fetchActivity();
    }, userId);

    const today = dayjs().format('YYYY-MM-DD');
    const oneYearAgo = dayjs().subtract(12, 'month').format('YYYY-MM-DD');

    return (
        <div className="activity heatmap">
            <h2 className="activity-title">Activity Heatmap</h2>
            <CalendarHeatmap
                startDate={oneYearAgo}
                endDate={today}
                values={heatmapData}
                classForValue={value => {
                    if(!value) return 'color-empty';
                    if (value.count <= 1) return 'color-scale-1';
                    if (value.count <=3) return 'color-scale-2';
                    if (value.count <= 5) return 'color-scale-3';
                    return 'color-scale-4';
                }}
                tooltipDataAttrs={value => ({
                    'data-tip': `${value.date}: ${value.count || 0} activities`
                })}
                showWeekdayLabels
                />
        </div>
    )
}

export default ActivityHeatmap;