import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc,where,query } from 'firebase/firestore';
import { db } from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

const CollegeStudentsPage = () => {
  const { collegeName } = useParams();
  const [approved, setApproved] = useState([]);
  const [unapproved, setUnapproved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
     const studentsRef = collection(db, 'students');
const q = query(studentsRef, where('college', '==', collegeName));
const snapshot = await getDocs(q);
const filtered = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApproved(filtered.filter(s => s.approved));
      setUnapproved(filtered.filter(s => !s.approved));
      setLoading(false);
    };

    fetchStudents();
  }, [collegeName]);

  const handleApprove = async (studentId) => {
    const approvedStudent = unapproved.find(s => s.id === studentId);
    if (!approvedStudent) return;

    const studentRef = doc(db, 'students', studentId);
    await updateDoc(studentRef, { approved: true });

    setUnapproved(prev => prev.filter(s => s.id !== studentId));
    setApproved(prev => [...prev, { ...approvedStudent, approved: true }]);

    setSuccessMsg(`${approvedStudent.name} has been approved!`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Students of {collegeName}</h2>

      {successMsg && (
        <div className="alert alert-success text-center" role="alert">
          {successMsg}
        </div>
      )}

      <div className="mb-5">
        <h4>✅ Approved Students</h4>
        {approved.length === 0 ? (
          <p>No approved students yet.</p>
        ) : (
          <ul className="list-group">
            {approved.map(student => (
              <li key={student.id} className="list-group-item">
                {student.name} - {student.email}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h4>⏳ Pending Approval</h4>
        {unapproved.length === 0 ? (
          <p>No students waiting for approval.</p>
        ) : (
          <ul className="list-group">
            {unapproved.map(student => (
              <li key={student.id} className="list-group-item d-flex justify-content-between align-items-center">
                {student.name} - {student.email}
                <button className="btn btn-success btn-sm" onClick={() => handleApprove(student.id)}>
                  Approve
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CollegeStudentsPage;
