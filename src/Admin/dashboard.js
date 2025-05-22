import React, { useEffect, useState } from "react";
//import NavLink from "react-bootstrap";
//import { useNavigate } from 'react-router-dom';
//import { Card, CardContent } from "@/components/ui/card";
import { Card } from "react-bootstrap";
//import { Table } from "@/components/ui/table";
//import { Button } from "@/components/ui/button";

//import Button from "react-bootstrap";

//import { Sidebar } from "./idebar";
import { Table } from "react-bootstrap";
import { collection,  getDocs,getDoc, doc,where,query } from "firebase/firestore";
import {  db,auth } from "../components/firebase";
//import { getAuth } from "firebase/auth";

export default function CollegeDashboard() {
  const stats = {
    students: 1200,
    departments: 10,
    meetups: 25,
    jobs: 15,
  };
  const[student,stufentdata]=useState([]);
  const[selectedCourse,setSelectedCourse]=useState('');
  const[selectedBatch,setSelectedBatch]=useState('');
  const[selectedStream,setSelectedStream]=useState('');
  const [searchName, setSearchName] = useState('');
  const[collegedetail,setcollegedetail]=useState('');
  
//  const navigate = useNavigate();
  const departmentData = [
    { name: "CSE", students: 300 },
    { name: "ECE", students: 250 },
    { name: "ME", students: 200 },
    { name: "Civil", students: 150 },
  ];
useEffect(() => {
    
    const fetchcollege = async() => {
      
      const collegeName=auth.currentUser?.uid;
      const data=doc(db,  'college',collegeName);
      const res= await getDoc(data);
      // const userlist=res.docs.map(doc=>({ id:doc.id, ...doc.data()}));
      if(res.exists()){
      const userlist1=res.data();
      setcollegedetail(userlist1.college);
      }
     
     }
   fetchcollege();
  }, []);

  useEffect(() => {
    
    const fetchstudents = async() => {
      
      
       const usersRef = collection(db, 'users');
      const q = query(usersRef, where('college', '==', collegeName), where('approved', '==', true));
      const res = await getDocs(q);
      const userlist=res.docs.map(doc=>({ id:doc.id, ...doc.data()}));
      stufentdata(userlist);
     }
   fetchstudents();
  }, []);
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
  <div className="w-64 p-4 border-r border-gray-300">
    <h2 className="text-xl font-semibold mb-4">Filters</h2>

    {/* Batch Filter */}
    <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="nameSearch">Search by Name</label>
          <input
            id="nameSearch"
            type="text"
            placeholder="Enter name"
            className="w-full border rounded p-2"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1" htmlFor="batch">Batch</label>
      <select
        id="batch"
        className="w-full border rounded p-2"
        value={selectedBatch}
        onChange={(e) => setSelectedBatch(e.target.value)}
      >
        <option value="">All</option>
        <option value="Batch 2021">2021</option>
        <option value="Batch 2022">2022</option>
        <option value="Batch 2023">2023</option>
        {/* Add more as needed */}
      </select>

     
    </div>

    {/* Stream Filter */}
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1" htmlFor="stream">Stream</label>
      <select
        id="stream"
        className="w-full border rounded p-2"
        value={selectedStream}
        onChange={(e) => setSelectedStream(e.target.value)}
      >
        <option value="">All</option>
        <option value="Computer Science">Compuer Science</option>
        <option value="Mechanical">Mechanical</option>
        <option value="Electronics">Electronics</option>
        {/* Add more as needed */}
      </select>
    </div>

    {/* Course Filter */}
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1" htmlFor="course">Course</label>
      <select
        id="course"
        className="w-full border rounded p-2"
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        <option value="">All</option>
        <option value="B.Tech">B.Tech</option>
        <option value="B.Com">B.Com</option>
        <option value="MBA">MBA</option>
        <option value="B.Sc">MCA</option>
        {/* Add more as needed */}
      </select>
    </div>
 

  {/* Main Content */}
 
</div>

      <div className="flex-1 p-6 overflow-auto">
       
        <h1 className="text-2xl font-bold mb-4">{collegedetail}</h1>
        <div className="grid grid-cols-4 gap-4">
          {Object.keys(stats).map((key) => (
            <Card key={key} className="p-4 bg-white shadow-lg rounded-xl">
              <Card>
                <p className="text-xl font-semibold">{stats[key]}</p>
                <p className="text-gray-500 uppercase">{key}</p>
              </Card>
            </Card>
          ))}
        </div>

        {/* Department Statistics */}
        <div className="mt-6">
          <h2 className="text-xl text-blue-700 font-bold mb-2">Department-wise Students</h2>
          {/* <BarChart className="text-blue-700" width={500} height={300} data={departmentData} /> */}
          {filteredStudents.map((stu, index) => (
      <div
        key={index}
        className="flex items-start p-4 border border-gray-300 rounded-2xl shadow-md bg-white"
      >
        <img
          src={stu.profileImage}
          alt={stu.name}
          className="rounded-full w-16 h-16 object-cover mr-4"
        />

        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-800">{stu.name}</p>
          <p className="text-sm text-gray-600 mb-2">
            Batch: {stu.batch} | Stream: {stu.stream} | Course: {stu.course}
          </p>

          <div className="flex flex-wrap gap-2">
            <a
              href={`mailto:${stu.email}`}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
            >
              Send Mail
            </a>

            <a
              href={`https://wa.me/+917054410993`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
            >
              WhatsApp
            </a>

            <a
              href={`/alumni/message/${stu.id}`}
              className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition"
            >
              Message
            </a>
          </div>
        </div>
      </div>
    ))}
        </div>

        {/* Meetup & Job Portal Sections */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Upcoming Meetups</h2>
            <Table>
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
                  <td><button>View</button></td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Job Listings</h2>
            <Table>
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
                  <td><button>Apply</button></td>
                </tr>
              </tbody>
            </Table>
          </div>
        
        </div>
        <div className="container my-4">
  <div className="row g-4">

    {/* Card Template */}
    {[
      {
        title: "Offline Meet",
        desc: "Plan and schedule an offline alumni meetup event.",
        color: "primary",
        link: "/events"
      },
      {
        title: "Create Online Meet",
        desc: "Organize a virtual meeting via Zoom, Meet, or Daily.co.",
        color: "success",
        link: "/virtual"
      },
      {
        title: "College Project",
        desc: "Propose a project and raise donations from alumni.",
        color: "purple", // custom color
        link: "/donation"
      },
      {
        title: "Post Job",
        desc: "Create and share job openings for alumni or students.",
        color: "danger",
        link: "/job"
      }
    ].map(({ title, desc, color, link }) => (
      <div className="col-12 col-md-6 col-lg-3" key={title}>
        <div
          className="card h-100 shadow-sm"
          style={{
            cursor: "pointer",
            borderRadius: "12px",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div className="card-body d-flex flex-column">
            <h5
              className={`card-title fw-bold text-${color === 'purple' ? '' : color}`}
              style={color === "purple" ? { color: "#6f42c1" } : {}}
            >
              {title}
            </h5>
            <p className="card-text text-muted flex-grow-1">{desc}</p>
            <button
               className="rounded-full bg-zinc-700 text-white py-2 px-5 mt-5 hover:bg-zinc-900 duration-200"
              onClick={() =>window.location.href = link}
            >
              Go to Page
            </button>
          </div>
        </div>
      </div>
    ))}

  </div>
</div>

      </div>
     
    </div>
  );
}
