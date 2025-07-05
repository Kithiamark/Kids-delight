import React, { useState } from "react";
import UserProgressChart from "./UserProgressChart";
import ActivityHeatmap from "./ActivityHeatmap";
import UserTable from "./UserTable";
import QuizPerformanceChart from "./QuizPerformanceChart";
import LessonManager from "./LessonManager";

const AdminDashboard = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);

    return (
        <div className="admin-dashboard">
            <h1 className="dashboard-title">Admin Dashboard</h1>

            <section className="charts-section">
                <div className="chart-container">
                    <UserProgressChart userId={selectedUserId} />
                </div>
                <div className="chart-container">
                    <QuizPerformanceChart userId={selectedUserId} />
                </div>
            </section>

            <section className="heatmap-section">
                <ActivityHeatmap userId={selectedUserId} />
            </section>

            <section className="lesson-manager-section">
                <LessonManager />
            </section>

            <section className="user-table-section">
                <UserTable onUserSelect={setSelectedUserId} />
            </section>
        </div>
    );
};

export default AdminDashboard;