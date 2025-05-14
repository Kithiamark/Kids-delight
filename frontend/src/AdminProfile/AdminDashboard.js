import React from "react";
import UserProgressChart from "./UserProgressChart";
import ActivityHeatmap from "./ActivityHeatmap";
import ActivityHeatmap from "./ActivityHeatmap";
import UserTable from "./UserTable";
import QuizperfomanceCharts from "./QuizPerfomanceChart";
import LessonManager from "./LessonManager";

const AdminDashboard = () => {
    return (
        <div className="admmin-dashboard">
            <h1 className="dashboard-title"></h1>

            <section className="charts-section">
                <div className="chart-container">
                    <UserProgressChart />
                </div>
                <div className="chart-container">
                    <QuizperfomanceCharts />
                </div>
            </section>
            <section className="heatmap">
                <ActivityHeatmap />
            </section>
            <section className="lesson-manager">
                <LessonManager />
            </section>
            <section className="user-table">
                <UserTable />
            </section>

        </div>
    )
}

export default AdminDashboard;
// The AdminDashboard component serves as the main dashboard for the admin profile,