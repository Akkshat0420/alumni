import React, { useState, useEffect } from "react";
//import { db, doc, getDoc, updateDoc } from "./firebase"; 
import { doc,getDoc } from "firebase/firestore";// Import Firebase methods
import { FaEdit, FaTrash, FaTimes, FaPlus } from "react-icons/fa";
import { updateDoc } from "firebase/firestore";
import { db } from "./firebase";
//import {getAuth } from "firebase/auth"
import { getAuth } from "firebase/auth";
const EducationPage = () => {
  const [experience, setExperience] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newExperience, setNewExperience] = useState({
    institution: "",
    degree: "",
    startDate: "",
    endDate: "",
   
  });
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    const fetchExperience = async () => {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        setExperience(userDoc.data().education || []);
      }
    };
    fetchExperience();
  }, []);

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditingIndex(index);
    setNewExperience(
      index !== null
        ? experience[index]
        : {  institution: "", degree: "", startDate: "", endDate: ""}
    );
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingIndex(null);
    setNewExperience({  institution: "", degree: "", startDate: "", endDate: "" });
  };

  const handleSave = async () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    const updatedExperience = [...experience];
    if (editingIndex !== null) {
      updatedExperience[editingIndex] = newExperience;
    } else {
      updatedExperience.push(newExperience);
    }

    await updateDoc(doc(db, "users", userId), { education: updatedExperience });
    setExperience(updatedExperience);
    handleCancelEdit();
  };
  const addEducation = () => {
    setExperience([
      ...experience,
      { institution: "", degree: "", startDate: "", endDate: "" },
    ]);
  };

  const handleDelete = async (index) => {
    const updatedExperience = experience.filter((_, i) => i !== index);
    await updateDoc(doc(db, "users", userId), { education: updatedExperience });
    setExperience(updatedExperience);
  };

  return (
    <div className="container mt-4">
      <h2>Education</h2>

      {isEditing ? (
        <div className="mb-3">
          <h4>{editingIndex !== null ? "Edit Education" : "Add Education"}</h4>
          <div className="form-group">
            <label>Institute</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Institute"
              value={newExperience.institution}
              onChange={(e) => setNewExperience({ ...newExperience, institution: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Degree</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Degree"
              value={newExperience.degree}
              onChange={(e) => setNewExperience({ ...newExperience, degree: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              className="form-control mb-2"
              value={newExperience.startDate}
              onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              className="form-control mb-2"
              value={newExperience.endDate}
              onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
            />
          </div>
         
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary ms-2" onClick={handleCancelEdit}>
            <FaTimes /> Cancel
          </button>
        </div>
      ) : (
        <div>
          {experience.length > 0 ? (
            experience.map((exp, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center border p-3 mb-2"
              >
                <div>
                  <h5>{exp.institution}</h5>
                  <p>
                    {exp.degree} | {exp.startDate} - {exp.endDate}
                  </p>
                 
                </div>
                <div>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(index)}>
                    <FaEdit /> Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-4">
              <p>No Education added yet.</p>
              <button className="btn btn-primary" onClick={() => handleEdit(null)}>
                <FaEdit /> Add Education
              </button>
            </div>
          )}
        </div>
      )}
      
    <FaPlus onClick={addEducation} /> Add Education
             
    </div>
  );
};

export default EducationPage;
