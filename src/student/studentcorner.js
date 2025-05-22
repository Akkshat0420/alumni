import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { auth, db } from './firebase';
import { auth,db } from '../components/firebase';
import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentCorner = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const fetchStudentData = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        navigate('/student-signup');
        return;
      }

      const studentRef = doc(db, 'students', uid);
      const studentSnap = await getDoc(studentRef);

      if (!studentSnap.exists()) {
        navigate('/student-signup');
        return;
      }

      const studentData = studentSnap.data();

      if (!studentData.approved) {
        setStudent({ ...studentData, status: 'pending' });
        setLoading(false);
        return;
      }

      setStudent({ ...studentData, status: 'approved' });

      // Fetch applied jobs
      const jobsRef = collection(db, `students/${uid}/appliedJobs`);
      const jobsSnap = await getDocs(jobsRef);
      const jobs = jobsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppliedJobs(jobs);

      // Fetch available jobs (only approved)
      const allJobsRef = collection(db, 'jobs');
      const allJobsSnap = await getDocs(allJobsRef);
      const approvedJobs = allJobsSnap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(job => job.approved === true && job.college === studentData.college);
      setAvailableJobs(approvedJobs);

      setLoading(false);
    };

    fetchStudentData();
  }, [navigate]);

  const openApplicationForm = (job) => {
    setSelectedJob(job);
    setResumeUrl('');
    setShowModal(true);
  };

  const submitApplication = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid || !student || !selectedJob) return;

    try {
      await addDoc(collection(db, `students/${uid}/appliedJobs`), {
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        resumeUrl,
        appliedAt: serverTimestamp(),
      });

      const jobRef = doc(db, "jobs", selectedJob.id);
      await updateDoc(jobRef, {
        applications: arrayUnion({
          userId: uid,
          name: student.name,
          email: student.email,
          resumeUrl,
          appliedAt: serverTimestamp(),
        })
      });

      setShowModal(false);
      alert("Application submitted successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Application failed:", err);
      alert("Failed to apply. Please try again.");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  if (student.status === 'pending') {
    return (
      <div className="container text-center mt-5">
        <h3>Welcome to Student Corner</h3>
        <p className="alert alert-warning">Your account is not approved yet by your college. Please wait for approval.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Student Dashboard</h2>

      <div className="card mb-4 p-3">
        <h4>Profile Details</h4>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Phone:</strong> {student.phone}</p>
        <p><strong>College:</strong> {student.college}</p>
      </div>

      <div className="card p-3 mb-4">
        <h4>Applied Jobs</h4>
        {appliedJobs.length === 0 ? (
          <p>No jobs applied yet.</p>
        ) : (
          <ul className="list-group">
            {appliedJobs.map(job => (
              <li key={job.id} className="list-group-item">
                <strong>{job.jobTitle}</strong><br />
                <a href={job.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a><br />
                <small>Applied on: {new Date(job.appliedAt?.seconds * 1000).toLocaleDateString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card p-3">
        <h4>Available Jobs</h4>
        {availableJobs.length === 0 ? (
          <p>No jobs available right now.</p>
        ) : (
          <div className="row">
            {availableJobs.map(job => (
              <div className="col-md-6 mb-3" key={job.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{job.title}</h5>
                    <p className="card-text">{job.description}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => openApplicationForm(job)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && selectedJob && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Apply for {selectedJob.title}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>College:</strong> {student.college}</p>
                <div className="mb-3">
                  <label htmlFor="resumeUrl" className="form-label">Resume URL</label>
                  <input
                    type="url"
                    className="form-control"
                    id="resumeUrl"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    required
                    placeholder="https://drive.google.com/..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-success" onClick={submitApplication}>Submit Application</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCorner;
