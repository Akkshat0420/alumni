import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { db } from "./firebase";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { auth } from "./firebase"; // ensure auth is imported

const EmailForm = () => {
  const [college, setCollege] = useState("");
  const [collegeImage, setCollegeImage] = useState("");

  useEffect(() => {
    const fetchUserCollege = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userRef = doc(db, "college", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setCollege(userData.college || "");
          setCollegeImage(userData.profileImage || ""); // adjust field name as per Firestore
        } else {
          console.error("College data not found.");
        }
      } catch (err) {
        console.error("Error fetching college data:", err);
      }
    };

    fetchUserCollege();
  }, []);

  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    eventName: "",
    date: "",
    time: "",
    venue: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    const recipients = "gakkshat1198@gmail.com,gautamamayara@gmail.com,ayushiyoyo2233@gmail.com";

    const templateParams = {
      subject: formData.subject,
      message: formData.message,
      event_name: formData.eventName,
      event_date: formData.date,
      event_time: formData.time,
      event_venue: formData.venue,
      to_email: recipients,
    };

    try {
      const docRef = await addDoc(collection(db, "events"), {
        ...formData,
        joined: "click to join",
        attendee: [],
        college: college,
        collegeImage: collegeImage,
      });

      console.log("Event added to Firestore with ID:", docRef.id);

      const result = await emailjs.send("service_9hwrzhg", "template_uyyiyyl", templateParams, "SbQSjgcuCt3YQceR0");
      console.log("Email sent successfully:", result.text);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <div className="container mt-4">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Create an Event</h2>
          {college && (
            <div className="d-flex flex-column align-items-center mt-3">
              {collegeImage && (
                <img
                  src={collegeImage}
                  alt="College"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "3px solid #0d6efd",
                    marginBottom: "10px",
                  }}
                />
              )}
              <h5 className="text-secondary">By {college}</h5>
            </div>
          )}
        </div>

        <div
          className="mx-auto shadow p-4 rounded"
          style={{
            maxWidth: "600px",
            background: "#ffffff",
            border: "1px solid #dee2e6",
          }}
        >
          <form onSubmit={sendEmail}>
            {[
              { label: "Event Name", name: "eventName", type: "text", placeholder: "Enter event name" },
              { label: "Date", name: "date", type: "date" },
              { label: "Time", name: "time", type: "time" },
              { label: "Venue", name: "venue", type: "text", placeholder: "Enter venue" },
              { label: "Subject", name: "subject", type: "text", placeholder: "Enter email subject" },
            ].map((field) => (
              <div className="mb-3" key={field.name}>
                <label htmlFor={field.name} className="form-label fw-semibold">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder || ""}
                  className="form-control"
                  required
                />
              </div>
            ))}

            <div className="mb-3">
              <label htmlFor="message" className="form-label fw-semibold">Message</label>
              <textarea
                name="message"
                id="message"
                rows="4"
                className="form-control"
                placeholder="Write your message here"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold">
              Send Event Invitation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
