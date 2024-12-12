import React, { useState, useEffect } from "react";
import { doc, getDoc,updateDoc} from "firebase/firestore";
//import { useParams } from "react-router-dom";
//import ProfileUploader from "./profileuload";
//import ProfilePage1 from "./test";
import { getAuth } from "firebase/auth";
import { useParams } from "react-router-dom";
import FileUpload from "./test";
//import { FaEdit, FaTrashAlt,FaPlus } from "react-icons/fa";
import ExperiencePage from "./experience";
//import { storage } from "./firebase";
import { db } from "./firebase";
import EducationPage from "./education";
//import PostPage from "./post";
//import HomePage1 from "./home";


const ProfilePage = () => {
 

  const [batch, setBatch] = useState("");
  const [course, setCourse] = useState("");
  const [stream, setStream] = useState("");
  const { userId } = useParams();
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;
  const[userdata,setUserdata]=useState(null);
  const[image,setimage]=useState(null);
  
  
  useEffect(() => {
    
    const fetchUserData = async () => {
      const auth = getAuth();
      const currentUserId = auth.currentUser?.uid;
      console.log("It is userId",currentUserId);
      //if (!userId) { console.error('User ID is undefined or null'); return; }
      try {
        const userref=doc(db,"users",currentUserId);
        const userSnapshot = await getDoc(userref);
        if (userSnapshot.exists()) {
          const data = userSnapshot.data();
          setUserdata(data.name);
          setimage(data.profileImage);
          setBatch(data.batch || "");
          setCourse(data.course || "");
          setStream(data.stream || "");
          console.log("Fetched user data:", data.name);
        
        } else {
          console.log("User not found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdateField = async (field, value) => {
    const updatedData = { [field]: value };
    await updateDoc(doc(db, "users", currentUserId), updatedData);
    if (field === "batch") setBatch(value);
    if (field === "course") setCourse(value);
    if (field === "stream") setStream(value);
  };
  const [isBatchDropdownVisible, setIsBatchDropdownVisible] = useState(false);
  const [isCourseDropdownVisible, setIsCourseDropdownVisible] = useState(false);
  const [isStreamDropdownVisible, setIsStreamDropdownVisible] = useState(false);

  // Example lists of options for batch, course, and stream
  const batchOptions = ["Batch 2023", "Batch 2024", "Batch 2025"];
  const courseOptions = ["BTech",
    "MCA",
    "BCA",
    "MBA",
    "PhD"];
  const streamOptions = ["Computer Science", "Mechanical", "Electrical", "Civil", "Biotech", "Chemical", "Electronics", "Aerospace"];
  const toggleDropdown = (field) => {
    if (field === "batch") setIsBatchDropdownVisible(!isBatchDropdownVisible);
    if (field === "course") setIsCourseDropdownVisible(!isCourseDropdownVisible);
    if (field === "stream") setIsStreamDropdownVisible(!isStreamDropdownVisible);
  };

  return (
   
    <div className="container mt-3">
    <div
      style={{
        background: "linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(0, 0, 0, 0.1))",
        padding: "40px 30px",
        borderRadius: "12px",
        boxShadow: "0 16px 50px rgba(0, 0, 0, 0.2)", // Slightly enhanced shadow for a more elevated look
        maxWidth: "800px",
        width: "100%",
        height: "80%",
        textAlign: "center",
        zIndex: 2,
        border: "1px solid #e0e0e0",
      }}
    >
      {/* Circle Avatar for Profile Picture */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src={image || "https://via.placeholder.com/150"}
          alt="Profile"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            border: "5px solid #4CAF50", // Green border for a professional touch
          }}
        />
      </div>

      {/* User Information */}
      <h2 style={{ color: "#3f51b5", fontWeight: "bold" }}>Hello, {userdata || "User"}!</h2>
      <div style={{ marginTop: "15px", fontSize: "18px", lineHeight: "1.6", color: "#333" }}>
          <p>
            <strong style={{ color: "#4CAF50" }}>Batch:</strong> {batch || "N/A"}{" "}
            {batch === "" && (
              <>
                <button
                  onClick={() => toggleDropdown("batch")}
                  style={{ marginLeft: "10px" }}
                >
                  Add
                </button>
                {isBatchDropdownVisible && (
                  <ul style={{ listStyle: "none", paddingLeft: "0", backgroundColor: "#f0f0f0", borderRadius: "5px", marginTop: "10px" }}>
                    {batchOptions.map((option, index) => (
                      <li key={index} onClick={() => { handleUpdateField("batch", option); toggleDropdown("batch"); }}>
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </p>
          <p>
            <strong style={{ color: "#4CAF50" }}>Course:</strong> {course || "N/A"}{" "}
            {course === "" && (
              <>
                <button
                  onClick={() => toggleDropdown("course")}
                  style={{ marginLeft: "10px" }}
                >
                  Add
                </button>
                {isCourseDropdownVisible && (
                  <ul style={{ listStyle: "none", paddingLeft: "0", backgroundColor: "#f0f0f0", borderRadius: "5px", marginTop: "10px" }}>
                    {courseOptions.map((option, index) => (
                      <li key={index} onClick={() => { handleUpdateField("course", option); toggleDropdown("course"); }}>
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </p>
          <p>
            <strong style={{ color: "#4CAF50" }}>Stream:</strong> {stream || "N/A"}{" "}
            {stream === "" && (
              <>
                <button
                  onClick={() => toggleDropdown("stream")}
                  style={{ marginLeft: "10px" }}
                >
                  Add
                </button>
                {isStreamDropdownVisible && (
                  <ul style={{ listStyle: "none", paddingLeft: "0", backgroundColor: "#f0f0f0", borderRadius: "5px", marginTop: "10px" }}>
                    {streamOptions.map((option, index) => (
                      <li key={index} onClick={() => { handleUpdateField("stream", option); toggleDropdown("stream"); }}>
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </p>
        </div>

      {/* Add File Upload Section */}
      <div style={{ marginTop: "20px", backgroundColor: "#f5f5f5", padding: "15px", borderRadius: "8px", boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }}>
        <FileUpload />
      </div>
    </div>
  
      
      

      {/* Experiences Section */}
      <div style={{
        background: "linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0.1))",
        padding: "40px 30px",
        borderRadius: "12px",
        boxShadow: "0 16px 50px rgba(0, 0, 0, 0.3)", // Increased shadow
        maxWidth: "800px",
        width: "100%",
        height:"80%",
        textAlign: "center",
        zIndex: 2,
      }}>
     
      <ExperiencePage/>
      </div>
     

      {/* Save Button */}
      <div style={{
        background: "linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0.1))",
        padding: "40px 30px",
        borderRadius: "12px",
        boxShadow: "0 16px 50px rgba(0, 0, 0, 0.3)", // Increased shadow
        maxWidth: "800px",
        width: "100%",
        height:"80%",
        textAlign: "center",
        zIndex: 2,
        marginTop:'10px'
      }}>
     
      <EducationPage/>
      </div>
     
    
   
    </div>
  );
  
};

export default ProfilePage;
