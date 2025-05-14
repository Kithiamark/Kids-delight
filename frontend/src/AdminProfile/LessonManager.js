import React, {useState} from "react";
import LessonList from "./LessonList";
import LessonForm from "./LessonForm";

const LessonManager = () => {
    const [sellectedLesson, setSelectedLesson] = useState(null);
    const [refreshToggle, setRefreshToggle] = useState(false);

    const handleEdit = (lesson) => {
        setSelectedLesson(lesson);
    };
    const handleSave = () => {
        setSelectedLesson(null);
        setRefreshTogglr(!refreshToggle);
    };

    return (
        <div className="lesson-manager">
            <LessonForm sellectedLesson={sellectedLesson} onSave={handleSave} />
            <LessonList onEdit={handleEdit} key={refreshToggle} />
        </div>
    );
};

export default LessonManager