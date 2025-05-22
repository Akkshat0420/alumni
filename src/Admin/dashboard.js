import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { collection, getDocs, getDoc, doc, where, query } from "firebase/firestore";
import { db, auth } from "../components/firebase";

export default function CollegeDashboard() {
  const stats = {
    students: 1200,
    departments: 10,
    meetups: 25,
    jobs: 15,
  };

  const [student, stufentdata] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedStream, setSelectedStream] = useState('');
  const [searchName, setSearchName] = useState('');
  const [collegedetail, setcollegedetail] = useState('');

  useEffect(() => {
    const fetchCollege = async () => {
      const collegeuser = auth.currentUser?.uid;
      if (collegeuser) {
        const data = doc(db, 'college', collegeuser);
        const res = await getDoc(data);
        if (res.exists()) {
          const userlist1 = res.data();
          setcollegedetail(userlist1.college);
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
        stufentdata(userlist);
      }
    };
    fetchStudents();
  }, [collegedetail]);

  const filteredStudents = student.filter((stu) => {
    return (
      (selectedBatch === '' || stu.batch === selectedBatch) &&
      (selectedStream === '' || stu.stream === selectedStream) &&
      (selectedCourse === '' || stu.course === selectedCourse) &&
      (searchName === '' || stu.name.toLowerCase().includes(searchName.toLowerCase()))
    );
  });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Filters */}
      <div className="w-64 p-4 border-r border-gray-300 bg-white">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Search by Name</label>
          <input
            type="text"
            placeholder="Enter name"
            className="w-full border rounded p-2"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Batch</label>
          <select className="w-full border rounded p-2" value={selectedBatch} onChange={(e) => setSelectedBatch(e.target.value)}>
            <option value="">All</option>
            <option value="Batch 2021">2021</option>
            <option value="Batch 2022">2022</option>
            <option value="Batch 2023">2023</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Stream</label>
          <select className="w-full border rounded p-2" value={selectedStream} onChange={(e) => setSelectedStream(e.target.value)}>
            <option value="">All</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Course</label>
          <select className="w-full border rounded p-2" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            <option value="">All</option>
            <option value="B.Tech">B.Tech</option>
            <option value="B.Com">B.Com</option>
            <option value="MBA">MBA</option>
            <option value="B.Sc">B.Sc</option>
            <option value="MCA">MCA</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">{collegedetail}</h1>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {Object.keys(stats).map((key) => (
            <Card key={key} className="p-4 shadow-lg rounded-xl">
              <div>
                <p className="text-xl font-semibold">{stats[key]}</p>
                <p className="text-gray-500 uppercase">{key}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <h2 className="text-xl text-blue-700 font-bold mb-4">Filtered Students</h2>
          {filteredStudents.map((stu, index) => (
            <div key={index} className="flex items-start p-4 mb-4 border border-gray-300 rounded-2xl shadow bg-white">
              <img src={stu.profileImage} alt={stu.name} className="rounded-full w-16 h-16 object-cover mr-4" />
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800">{stu.name}</p>
                <p className="text-sm text-gray-600 mb-2">
                  Batch: {stu.batch} | Stream: {stu.stream} | Course: {stu.course}
                </p>
                <div className="flex flex-wrap gap-2">
                  <a href={`mailto:${stu.email}`} className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">Send Mail</a>
                  <a href={`https://wa.me/+917054410993`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">WhatsApp</a>
                  <a href={`/alumni/message/${stu.id}`} className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700">Message</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Meetups and Jobs */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Upcoming Meetups</h2>
            <Table striped bordered hover>
              <thead>
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
                  <td><button className="btn btn-primary btn-sm">View</button></td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Job Listings</h2>
            <Table striped bordered hover>
              <thead>
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
                  <td><button className="btn btn-success btn-sm">Apply</button></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { title: "Offline Meet", desc: "Plan and schedule an offline alumni meetup event.", color: "primary", link: "/events" },
            { title: "Create Online Meet", desc: "Organize a virtual meeting via Zoom, Meet, or Daily.co.", color: "success", link: "/virtual" },
            { title: "College Project", desc: "Propose a project and raise donations from alumni.", color: "purple", link: "/donation" },
            { title: "Post Job", desc: "Create and share job openings for alumni or students.", color: "danger", link: "/job" },
          ].map(({ title, desc, color, link }) => (
            <div key={title} className={`p-4 bg-${color}-100 border border-${color}-400 rounded-lg shadow hover:shadow-lg transition cursor-pointer`}>
              <h5 className="font-bold mb-1">{title}</h5>
              <p className="text-sm">{desc}</p>
              <a href={link} className={`mt-2 inline-block text-${color}-800 font-medium`}>Go →</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
