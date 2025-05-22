import React, { useState } from 'react';
//import axios from 'axios';
//import { Form } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { auth, db } from '../components/firebase';
//import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const universities = {
  "Dr. A.P.J. Abdul Kalam Technical University (AKTU)": [
    "Institute of Engineering and Technology (IET)",
    "KIET Group of Institutions",
    "Galgotias College of Engineering and Technology",
    "Kanpur Institute of Technology"
  ],
  "Banaras Hindu University (BHU)": [
    "Institute of Science",
    "Institute of Medical Sciences",
    "Faculty of Law"
  ],
  "Aligarh Muslim University (AMU)": [
    "Zakir Husain College of Engineering & Technology",
    "Jawaharlal Nehru Medical College",
    "Faculty of Management Studies"
  ],
  "University of Lucknow": [
    "Faculty of Arts",
    "Institute of Management Sciences",
    "Faculty of Commerce"
  ],
};

const CollegeSignup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "", university: "",
    college: ""});
  const [isLogin, setIsLogin] = useState(true);
  const [usePhone, setUsePhone] = useState(false); // Toggle for phone authentication
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false); // To track OTP sent
  const [otp, setOtp] = useState(""); // For OTP input
 const navigate = useNavigate();
   const [image, setImage] = useState(null);
  // Initialize reCAPTCHA for phone authentication
  
  const handleImageUpload = async () => {
    if (!image) return null;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "qcyqeq7z");
    formData.append("cloud_name", "dphtfwnx4");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dphtfwnx4/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };


  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA verified");
        },
      },
      auth
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {  phone, email, password,university,college}=formData;

    try {
        const imageUrl = await handleImageUpload();
      if (usePhone) {
        if (!otpSent) {
          // Send OTP
          setupRecaptcha();
          const appVerifier = window.recaptchaVerifier;
          await signInWithPhoneNumber(auth, phone, appVerifier);
          alert("OTP sent to your phone number.");
          setOtpSent(true);

        } else {
          // Verify OTP
          const confirmationResult = window.confirmationResult;
          await confirmationResult.confirm(otp);
          alert("Phone number verified successfully!");
         // Redirect after successful verification
         navigate("/dashboard");
        }
      } else {
        if (isLogin) {
          // Login with email/password
          const userCred = await signInWithEmailAndPassword(auth, email, password);
          alert("Login successful");
          const userId=userCred.user.uid;
          console.log("This is userId:",userId);
          navigate("/dashboard");
        } else {
          // Sign up with email/password
          const userCredential = await createUserWithEmailAndPassword(auth, email, password,university,college);
          const user = userCredential.user;
          await setDoc(doc(db, "college", user.uid), {
           
            email,
            headline: "",
            
            profileImage: imageUrl,
            location: "",
            university:university,
            college:college,
             type:"college"
          });
          alert("Account created successfully!");
          navigate("/dashboard");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <div
    style={{
      height: "100vh",
      background: "linear-gradient(to bottom right, #a0c3ff, #e4eaff)",
      
      

      position: "relative",
      overflow: "hidden",
      fontFamily: "'Poppins', sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {/* Floating Decorative Icons */}
    <div
      style={{
        position: "absolute",
        top: "5%",
        left: "5%",
        opacity: 0.2,
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="icon"
        style={{
          width: "100px",
          transform: "rotate(10deg)",
        }}
      />
    </div>

    <div
      style={{
        position: "absolute",
        top: "20%",
        right: "10%",
        opacity: 0.3,
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
        alt="icon"
        style={{
          width: "110px",
          transform: "rotate(-15deg)",
        }}
      />
    </div>

    <div
      style={{
        position: "absolute",
        bottom: "10%",
        left: "15%",
        opacity: 0.25,
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
        alt="icon"
        style={{
          width: "90px",
          transform: "rotate(20deg)",
        }}
      />
    </div>

    <div
      style={{
        position: "absolute",
        bottom: "5%",
        right: "15%",
        opacity: 0.2,
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/3048/3048122.png"
        alt="icon"
        style={{
          width: "80px",
          transform: "rotate(-10deg)",
        }}
      />
    </div>

    {/* Main Form Card */}
    <div
      style={{
        background: "linear-gradient(to right, rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0.1))",
        padding: "40px 30px",
        borderRadius: "12px",
        boxShadow: "0 16px 50px rgba(0, 0, 0, 0.3)", // Increased shadow
        maxWidth: "400px",
        width: "100%",
        height:"85%",
        textAlign: "center",
        zIndex: 2,
        overflowY:'auto'
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "1rem",
          fontWeight: "700",
          color: "#3b5998",
        }}
      >
        Alumni Association
      </h1>
      <p
        style={{
          fontSize: "1rem",
          marginBottom: "1.5rem",
          color: "#555",
        }}
      >
        Give strength to your roots.
      </p>

      {/* Signup Form */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
         
         {!isLogin && (
          <>
            {/* University Selection */}
            <div style={{ marginBottom: "1rem" }}>
              <select
                name="university"
                value={formData.university}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Select University</option>
                {Object.keys(universities).map((university) => (
                  <option key={university} value={university}>
                    {university}
                  </option>
                ))}
              </select>
            </div>

            {/* College Selection (Filtered Based on University) */}
            <div style={{ marginBottom: "1rem" }}>
              <select
                name="college"
                value={formData.college}
                onChange={handleChange}
                disabled={!formData.university}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Select College</option>
                {formData.university &&
                  universities[formData.university].map((college) => (
                    <option key={college} value={college}>
                      {college}
                    </option>
                  ))}
              </select>
            </div>
            <div style={{ marginBottom: "1rem" }}>
  <input
    type="tel"
    name="phone"
    placeholder="+91 9876543210"
    value={formData.phone}
    onChange={(e) => {
      const cleaned = e.target.value.replace(/[^\d+]/g, ""); 
      if (cleaned.length <= 13) {
        handleChange({ target: { name: "phone", value: cleaned } });
      }
    }}
    pattern="^\+91\d{10}$"
    title="Phone number should start with +91 followed by 10 digits"
    required
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
    }}
  />
</div>
 <Form.Group controlId="postImage" className="mb-3">
                  <Form.Label>Upload College Logo</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Form.Group>
          </>
        )}
          {usePhone ? (
            <>
             
              {otpSent && (
                <div style={{ marginBottom: "1rem" }}>
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                  />
                </div>
              )}
              <div id="recaptcha-container"></div>
            </>
          ) : (
            <>
              <div style={{ marginBottom: "1rem" }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              background: "#003366",
              color: "#fff",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            {isLogin ? "Login" : usePhone && !otpSent ? "Send OTP" : "Sign Up"}
          </button>
        </form>

        <p style={{ marginTop: "1rem" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setUsePhone(false);
              setError("");
            }}
            style={{ color: "#003366", cursor: "pointer", textDecoration: "underline" }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

        <p style={{ marginTop: "1rem" }}>
          {usePhone ? "Switch to Email/Password" : "Use Phone Number"}?{" "}
          <span
            onClick={() => {
              setUsePhone(!usePhone);
              setError("");
            }}
            style={{ color: "#003366", cursor: "pointer", textDecoration: "underline" }}
          >
            Click Here
          </span>
        </p>
      </div>
  </div>
  );
};

export default CollegeSignup;
