import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase"; // Your Firebase configuration
import { collection, addDoc } from "firebase/firestore";

const DonationPage = () => {
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  const handleAddProject = async () => {
    if (newProject.name.trim() && newProject.description.trim()) {
      try {
        const projectsRef = collection(db, "projects");
        await addDoc(projectsRef, {
          name: newProject.name,
          description: newProject.description,
          donors: [], // Initially empty
        });
        setNewProject({ name: "", description: "" });
        alert("Project created successfully!");
      } catch (error) {
        console.error("Error adding project:", error);
        alert("Failed to create the project. Please try again.");
      }
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="container my-5">
  <h1 className="text-center text-success mb-5">
    <i className="bi bi-heart-fill"></i> Create a Donation Project
  </h1>

  {/* Create New Project Section */}
  <div className="p-4 bg-light rounded shadow-lg">
    <h3 className="text-primary mb-4">Create a New Project</h3>
    <div className="row g-3">
      <div className="col-md-6">
        <label htmlFor="projectName" className="form-label">
          Project Name
        </label>
        <input
          type="text"
          id="projectName"
          className="form-control shadow-sm"
          placeholder="Enter project name"
          value={newProject.name}
          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="projectDescription" className="form-label">
          Project Description
        </label>
        <textarea
          id="projectDescription"
          className="form-control shadow-sm"
          rows="3"
          placeholder="Describe your project in detail"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        ></textarea>
      </div>
      <div className="col-12 text-center">
        <button className="btn btn-success px-4 py-2 shadow-sm me-3" onClick={handleAddProject}>
          <i className="bi bi-plus-circle"></i> Add Project
        </button>
        <button
          className="btn btn-primary px-4 py-2 shadow-sm"
          onClick={() => navigate("/projects")}
        >
          <i className="bi bi-list-ul"></i> View Projects
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default DonationPage;
