import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { collection, getDocs, getDoc, doc, where, query } from "firebase/firestore";
import { db, auth } from "../components/firebase";

export default function CollegeDashboard() {
  const stats = {
    Students: 1200,
    Departments: 10,
    Meetups: 25,
    Jobs: 15,
  };

  const [student, setStudentData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [searchName, setSearchName] = useState('');
  const [collegedetail, setCollegeDetail] = useState('');

  useEffect(() => {
    const fetchCollege = async () => {
      const collegeuser = auth.currentUser?.uid;
      if (collegeuser) {
        const data = doc(db, 'college', collegeuser);
        const res = await getDoc(data);
        if (res.exists()) {
          const userlist1 = res.data();
          setCollegeDetail(userlist1.college);
        }
      }
    };
    fetchCollege();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      if (collegedetail) {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('college', '==', collegedetail), where('approved', '==', true));
        const res = await getDocs(q);
        const userlist = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStudentData(userlist);
      }
    };
    fetchStudents();
  }, [collegedetail]);

  const filteredStudents = student.filter((stu) =>
    (selectedBatch === '' || stu.batch === selectedBatch) &&
    (selectedStream === '' || stu.stream === selectedStream) &&
    (selectedCourse === '' || stu.course === selectedCourse) &&
    (searchName === '' || stu.name?.toLowerCase().includes(searchName.toLowerCase()))
  );

  return (
    <div className="container-fluid" style={{ background: "#f4f6f9", minHeight: "100vh", padding: "30px" }}>
      <h2 className="mb-4" style={{ color: "#2c3e50", fontWeight: "bold" }}>{collegedetail} Dashboard</h2>

      {/* Stats */}
      <div className="row mb-5">
        {Object.entries(stats).map(([label, count], i) => (
          <div className="col-md-3 mb-3" key={i}>
            <div className="card shadow-sm" style={{ borderLeft: "5px solid #007bff" }}>
              <div className="card-body text-center">
                <h3 className="card-title" style={{ fontSize: "24px", fontWeight: "bold" }}>{count}</h3>
                <p className="card-text text-muted">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-3">
          <label><strong>Search by Name</strong></label>
          <input
            type="text"
            className="form-control"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div className="col-md-3">
          <label><strong>Batch</strong></label>
          <select className="form-control" value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
            <option value="">All</option>
            <option value="Batch 2021">2021</option>
            <option value="Batch 2022">2022</option>
            <option value="Batch 2023">2023</option>
          </select>
        </div>
        <div className="col-md-3">
          <label><strong>Stream</strong></label>
          <select className="form-control" value={selectedStream} onChange={(e) => setSelectedStream(e.target.value)}>
            <option value="">All</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>
        <div className="col-md-3">
          <label><strong>Course</strong></label>
          <select className="form-control" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            <option value="">All</option>
            <option value="B.Tech">B.Tech</option>
            <option value="MBA">MBA</option>
            <option value="B.Sc">B.Sc</option>
          </select>
        </div>
      </div>

      {/* Student List */}
      <h4 className="mb-3">🎓 Students</h4>
      <div className="row">
        {filteredStudents.map((stu, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <img
                    src={stu.profileImage || "https://via.placeholder.com/60"}
                    alt={stu.name}
                    style={{ width: "60px", height: "60px", borderRadius: "50%", marginRight: "15px", border: "2px solid #ccc" }}
                  />
                  <div>
                    <h5 className="mb-1">{stu.name}</h5>
                    <p className="text-muted mb-0">{stu.batch} | {stu.stream} | {stu.course}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <a href={`mailto:${stu.email}`} className="btn btn-sm btn-primary mr-2">Mail</a>
                  <a href={`https://wa.me/+91${stu.phone}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-success mr-2">WhatsApp</a>
                  <a href={`/alumni/message/${stu.id}`} className="btn btn-sm btn-dark">Message</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Meetups and Jobs */}
      <div className="row mt-5">
        <div className="col-md-6">
          <h5 className="mb-3">📅 Upcoming Meetups</h5>
          <Table bordered hover>
            <thead className="thead-dark">
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>AI Workshop</td>
                <td>Online</td>
                <td>15th March</td>
                <td><button className="btn btn-sm btn-outline-primary">View</button></td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="col-md-6">
          <h5 className="mb-3">💼 Job Listings</h5>
          <Table bordered hover>
            <thead className="thead-dark">
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google</td>
                <td>Software Engineer</td>
                <td>20th March</td>
                <td><button className="btn btn-sm btn-outline-success">Apply</button></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-5">
        <h5 className="mb-3">🚀 Quick Actions</h5>
        <div className="row">
          {[
            { title: "Offline Meet", desc: "Plan an offline alumni meetup event.", color: "#007bff", link: "/events" },
            { title: "Create Online Meet", desc: "Organize a virtual meeting.", color: "#28a745", link: "/virtual" },
            { title: "College Project", desc: "Raise donations from alumni.", color: "#6f42c1", link: "/donation" },
            { title: "Post Job", desc: "Share job openings.", color: "#dc3545", link: "/job" },
          ].map(({ title, desc, color, link }, i) => (
            <div className="col-md-3 mb-4" key={i}>
              <div className="card h-100 shadow-sm" style={{ borderLeft: `4px solid ${color}` }}>
                <div className="card-body">
                  <h6 style={{ color, fontWeight: "bold" }}>{title}</h6>
                  <p className="text-muted small">{desc}</p>
                  <a href={link} className="btn btn-sm btn-outline-secondary">Go →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
