import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase"; // Your Firebase configuration
import { getAuth } from "firebase/auth";

const ProjectListPage = () => {
  const [projects, setProjects] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Fetch projects from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      const projectsRef = collection(db, "projects");
      try {
        const snapshot = await getDocs(projectsRef);
        const projectsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Handle donation
  const handleDonate = async (projectId) => {
    if (!currentUser) {
      alert("Please log in to donate.");
      return;
    }

    const  uid  = currentUser?.uid; // Get the current user's ID
    const userRef = doc(db, "users", uid); // Reference to the user's document
    const projectRef = doc(db, "projects", projectId);
    const donorsCollectionRef = collection(db, "donors");

    try {
      // Fetch the current user's details
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        alert("User details not found.");
        return;
      }

      const userData = userDoc.data();
      const { name, profileImage } = userData;

      // Find the selected project
      const project = projects.find((proj) => proj.id === projectId);

      // Update the project's donors array in Firestore
      await updateDoc(projectRef, {
        donors: arrayUnion({
          donorId: uid,
          donorName: name || "Anonymous",
          donorImage: profileImage || "https://via.placeholder.com/50",
        }),
      });

      // Save donor information in the "donors" collection
      await addDoc(donorsCollectionRef, {
        donorId: uid,
        donorName: name || "Anonymous",
        donorImage: profileImage || "https://via.placeholder.com/50",
        projectName: project.name,
        projectId,
      });

      // Update local state
      setProjects((prevProjects) =>
        prevProjects.map((proj) =>
          proj.id === projectId
            ? {
                ...proj,
                donors: [
                  ...(proj.donors || []), // Ensure donors is an array
                  {
                    donorId: uid,
                    donorName: name || "Anonymous",
                    donorImage: profileImage || "https://via.placeholder.com/50",
                  },
                ],
              }
            : proj
        )
      );

      alert("Thank you for your donation!");
    } catch (error) {
      console.error("Error adding donor:", error);
      alert("Donation failed. Please try again.");
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-center text-primary mb-4">🌟 Support Our Projects</h1>
      <div className="row g-4">
        {projects.map((project) => (
          <div className="col-md-6" key={project.id}>
            <div className="card shadow-lg border-0">
              <div className="card-body" style={{ backgroundColor: "#f9f9f9" }}>
                <h4 className="card-title text-success">{project.name}</h4>
                <p className="card-text text-muted">{project.description}</p>
                <hr />
                <h6 className="text-dark fw-bold">Donors:</h6>
                <ul className="list-group mb-3">
                  {project.donors && project.donors.length > 0 ? (
                    project.donors.map((donor, index) => (
                      <li
                        key={index}
                        className="list-group-item border-0 bg-light text-dark"
                      >
                        <img
                          src={donor.donorImage}
                          alt={donor.donorName}
                          className="me-2 rounded-circle"
                          style={{ width: "50px", height: "30px" }}
                        />
                        {donor.donorName}
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item border-0 bg-light text-secondary">
                      No donors yet.
                    </li>
                  )}
                </ul>

                <button
                  className="btn btn-primary w-30 fw-bold shadow-sm"
                  onClick={() => handleDonate(project.id)}
                >
                  💝 Donate Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectListPage;
