import React, { useState } from "react";
import { FaUpload } from "react-icons/fa"; // Import the upload icon from react-icons
import { getFirestore, doc, updateDoc } from "firebase/firestore"; // Firebase Firestore functions
import { getAuth } from "firebase/auth"; // Firebase Authentication (to get the current user's ID)

const FileUpload = () => {
  const [image, setImageUrl] = useState(null);
  const [profileImage, setProfileImage] = useState(""); // To store the profile image URL
  const [preview, setPreview] = useState(""); // To display the image preview

  // Firebase Firestore reference
  const db = getFirestore();
  const auth = getAuth(); // Get the authenticated user

  // Handle the file upload and Firestore update
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!image) return; // Ensure there is a file selected

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "qcyqeq7z");
    data.append("cloud_name", "dphtfwnx4");

    try {
      // Upload the image to Cloudinary
      const res = await fetch("https://api.cloudinary.com/v1_1/dphtfwnx4/image/upload", {
        method: "POST",
        body: data,
      });
      const dataResponse = await res.json();

      // Get the secure URL from Cloudinary
      const uploadedImageUrl = dataResponse.secure_url;
      setProfileImage(uploadedImageUrl); // Set preview to show the uploaded image
      setPreview(uploadedImageUrl);

      // Get the current user's ID from Firebase Auth
      const userId = auth.currentUser.uid;

      // Update the profileImage field in Firestore users collection
      const userRef = doc(db, "users", userId); // Get the user's document reference
      await updateDoc(userRef, {
        profileImage: uploadedImageUrl,
      });

      console.log("Profile image URL uploaded and Firestore updated:", uploadedImageUrl);
    } catch (err) {
      console.log("Error uploading file or updating Firestore: ", err);
    }
  };

  return (
    <div className="container mt-3">
      <div
        style={{
          background: "linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(0, 0, 0, 0.1))",
          padding: "40px 30px",
          borderRadius: "12px",
          boxShadow: "0 16px 50px rgba(0, 0, 0, 0.2)",
          maxWidth: "600px",
          width: "100%",
          height: "auto",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#4CAF50" }}>Upload a Profile Picture</h2>

        {/* Image preview */}
        {preview && (
          <div style={{ marginBottom: "15px" }}>
            <img
              src={preview}
              alt="Profile Preview"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                border: "5px solid #4CAF50",
              }}
            />
          </div>
        )}

        {/* File input */}
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImageUrl(e.target.files[0])}
            accept="image/*"
          />
        </div>

        {/* Upload button with Bootstrap and upload icon */}
        <button
          onClick={handleSubmit}
          className="btn btn-success d-flex align-items-center justify-content-center"
        >
          <FaUpload style={{ marginRight: "8px" }} />
          Upload
        </button>

        {/* Display the uploaded image URL */}
        {profileImage && (
          <div style={{ marginTop: "15px", color: "#333", fontSize: "14px" }}>
            <p><strong>Profile Image URL:</strong></p>
            <a href={profileImage} target="_blank" rel="noopener noreferrer">
              {profileImage}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
