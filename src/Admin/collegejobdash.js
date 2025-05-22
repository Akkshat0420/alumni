import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore';

const CollegeJobsDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collegeName, setCollegeName] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        const userDoc = await getDoc(doc(db, 'college', uid)); // or 'admin', depending on your setup
        const userData = userDoc.data();
        const college = userData.college;
        setCollegeName(college);

        const jobQuery = query(collection(db, 'jobs'), where('college', '==', college));
        const jobSnap = await getDocs(jobQuery);

        const jobList = await Promise.all(
          jobSnap.docs.map(async jobDoc => {
            const jobData = jobDoc.data();
            const jobId = jobDoc.id;

            const appSnap = await getDocs(collection(db, `jobs/${jobId}/applications`));
            const applicants = await Promise.all(
              appSnap.docs.map(async appDoc => {
                const appData = appDoc.data();
                const studentRef = doc(db, 'students', appData.studentId);
                const studentSnap = await getDoc(studentRef);
                const student = studentSnap.exists() ? studentSnap.data() : {};
                return {
                  id: appDoc.id,
                  resumeUrl: appData.resumeUrl,
                  appliedAt: appData.appliedAt,
                  ...student,
                };
              })
            );

            return {
              id: jobId,
              ...jobData,
              applicants,
            };
          })
        );

        setJobs(jobList);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const toggleApplicants = (jobId) => {
    setExpandedJobId(prev => (prev === jobId ? null : jobId));
  };

  if (loading) return <div className="text-center mt-5">Loading jobs...</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Jobs Posted for {collegeName}</h2>
      <div className="row">
        {jobs.map(job => (
          <div className="col-md-6 mb-4" key={job.id}>
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <p className="card-text">{job.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => toggleApplicants(job.id)}
                >
                  {expandedJobId === job.id ? "Hide Applicants" : "View Applicants"}
                </button>

                {expandedJobId === job.id && (
                  <div className="mt-3">
                    <h6>Applicants:</h6>
                    {job.applicants.length === 0 ? (
                      <p className="text-muted">No applicants yet.</p>
                    ) : (
                      <ul className="list-group">
                        {job.applicants.map(applicant => (
                          <li className="list-group-item d-flex align-items-center" key={applicant.id}>
                            <img
                              src={applicant.profileImage || 'https://via.placeholder.com/40'}
                              alt="Profile"
                              className="rounded-circle me-3"
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                            <div className="flex-grow-1">
                              <strong>{applicant.name || 'Unnamed'}</strong><br />
                              <a
                                href={applicant.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Resume
                              </a>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollegeJobsDashboard;
