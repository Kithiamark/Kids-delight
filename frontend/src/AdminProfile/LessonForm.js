import React, { useEffect, useState } from "react";
import {db} from 'utils/firebase';
import{
    addDoc,
    collection,
    doc,
    updateDoc
} from 'firebase/firestore';

const ageGroups = [ 'todlers', '4-9', '10-12', 'Teens'];
const LessonForm = () => {
    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');
    const [ageGroup, setAgeGroup] = React.useState('');
    const [image, setImage] = React.useState('');
}
useEffect(() => {
    if(sellectedLesson){
        setTitle(sellectedLesson.title);
        setText(sellectedLesson.text);
        setAgeGroup(sellectedLesson.ageGroup);
        setImage(sellectedLesson.image || '');
    }
}, [sellectedLesson]);
const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!title || !text || !ageGroup) {
        alert('please fill in required fields');
        return;
    }

    try {
        const lessonData = {
            title,
            text,
            ageGroup,
            image,
            createdAt: new Date(),
        };
        if (sellectedLesson) {
            const lessonRef = doc(db, 'lessons', sellectedLesson.id);
            await updateDoc(lessonRef, lessonData);
            alert('lesson updated successfully')
        }
        setTitle('');
        setText('');
        setAgeGroup('');
        setImage('');
        if (onSave) onSave();
    } catch (err) {
        console.error('Error saving lesson:', err);
        alert('Error saving lesson. Please try again.');
    }
};

return (
    <form className="lesson-form" onSubmit={handleSubmit}>
        <h2>{sellectedLesson ? 'Edit' : 'Add new'} Lesson</h2>
        <label>Title*</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
        required />
        <label>Lesson Text*</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)}
        required />
        <label>Age Group*</label>
        <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}
        required>
            <option value="">Select age group</option>
            {ageGroup.map((age) => (
                <option key={age} value={age}>
                    {age}
                </option>
            ))}
        </select>
        <label>Image URL</label>
        <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">{sellectedLesson ? 'Save' : 'Add'}</button>
    </form>
)

export default LessonForm;
// This is a react component thst renders the form to add or edit a lesson.