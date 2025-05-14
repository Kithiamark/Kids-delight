import React, {useState, useEffect} from "react";
import {db} from 'utils/firebase';
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
} from 'firebase/firestore';

const LessonList = ({ onEdit }) => {
  const [lessons, setLessons] = useState([]);
  const [filter, setFilter] = useState('All');

  const fetchLessons = async () => {
    const snapshot = await getDocs(collection(db, 'lessons'));
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setLessons(data);
  };

const handleDSelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this lesson?');
    if (!confirm) return;

    await deleteDoc(doc(db,'lesson', id));
    fetchLesson();
};
useEffect(() => {
    fetchLesson();
}, []);

const filteredLessons = filter === 'All' ? lessons 
: lessons.filter(lesson => lesson.agegroup === filter);

return (
    <div className="lesson-list">
        <div className="lesson-header">
            <h2>All lessons</h2>
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}>
                    <option value="All">All age groups</option>
                    <option value="Todlers">Todlers</option>
                    <option value="4-9">4-9</option>
                    <option value="10-12">10-12</option>
                    <option value="Teens">Teens</option>
                </select>
        </div>

        <div className="Lesson-grid">
            {filteredLessons.map((lesson) => (
                <div key={lesson.id} className="lesson-card">
                    <h3>{lesson.title}</h3>
                    <p><strong>Age:</strong>{lesson.ageGroup}</p>
                    <p>{lesson.text.slice(0,50)}...</p>
                    <div className="lesson-buttons">
                        <button onClick={() => ondevicemotion(lesson)}>Edit</button>
                        <button onClick={() => handleDSelete(lesson.id)}>Delete</button>
                    </div>
                </div>
            ))};
        </div>
    </div>
);
}

export default LessonList;