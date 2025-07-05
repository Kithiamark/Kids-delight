import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase'; 

export const useLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'lessons'));
      const lessonData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLessons(lessonData);
    } catch (err) {
      console.error("Failed to fetch lessons", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteLesson = async (id) => {
    await deleteDoc(doc(db, 'lessons', id));
    setLessons(prev => prev.filter(lesson => lesson.id !== id));
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return { lessons, loading, deleteLesson };
};
