import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../components/firebase";
import "../components/CollegeMeetingForm.css"
const CollegeProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
    coverImage: "",
    eventImage: "",
    singlegroup: "",
    groupPhotos: [],
    videoUrl: "",
    testimonials: [""],
    totalalumni:0,
     events: [{ title: "", image: "" }]
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchCollege = async () => {
      const currentUserId = auth.currentUser.uid;
      const docRef = doc(db, "college", currentUserId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const defaultFields = {
          name: "",
          description: "",
          logo: "",
          coverImage: "",
         events: [{ title: "", image: "" }] ,
          groupPhotos: [],
          videoUrl: "",
          testimonials: [""],
          singlegroup:"",
          totalalumni:0
        };
        setFormData({ ...defaultFields, ...docSnap.data() });
      }
    };
    fetchCollege();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, value, key) => {
    const updated = [...formData[key]];
    updated[index] = value;
    setFormData({ ...formData, [key]: updated });
  };

  const addToArray = (key) => {
    setFormData({ ...formData, [key]: [...formData[key], ""] });
  };

  const handleSave = async () => {
    const currentUserId = auth.currentUser.uid;
    const docRef = doc(db, "college", currentUserId);
    await updateDoc(docRef, formData);
    setEditMode(false);
  };

  const containerStyle = {
    maxWidth: "900px",
    margin: "30px auto",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const labelStyle = {
    fontWeight: "500",
    marginBottom: "6px",
  };

  const blockquoteStyle = {
    backgroundColor: "#fff",
    borderLeft: "4px solid #007bff",
    padding: "10px 15px",
    borderRadius: "6px",
    marginBottom: "12px",
  };

  return (
    <div className="meeting-container">
    <div className="glass-card" >
      {editMode ? (
        <>
          <h2 className="mb-4">Edit College Profile</h2>

          <input name="name" value={formData.name} onChange={handleChange} className="form-control mb-3" placeholder="Short Name (e.g., abeg, dit)" />
          <textarea name="description" value={formData.description} onChange={handleChange} className="form-control mb-3" placeholder="Description" />
          <input name="coverImage" value={formData.coverImage} onChange={handleChange} className="form-control mb-3" placeholder="Cover Image URL" />
           <input name="SingleGroupPhots" value={formData.singlegroup} onChange={handleChange} className="form-control mb-3" placeholder="Single group Image URL" />
          
          <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} className="form-control mb-3" placeholder="Intro Video URL" />
          <input name="totalalumni" value={formData.totalalumni} onChange={handleChange} className="form-control mb-3" placeholder="totalalumni" />
          <div className="mb-4">
  <label style={labelStyle}>Upcoming Events</label>
  {formData.events.map((event, idx) => (
    <div key={idx} className="mb-3">
      <input
        className="form-control mb-2"
        placeholder={`Event ${idx + 1} Title`}
        value={event.title}
        onChange={(e) => {
          const updated = [...formData.events];
          updated[idx].title = e.target.value;
          setFormData({ ...formData, events: updated });
        }}
      />
      <input
        className="form-control mb-2"
        placeholder={`Event ${idx + 1} Image URL`}
        value={event.image}
        onChange={(e) => {
          const updated = [...formData.events];
          updated[idx].image = e.target.value;
          setFormData({ ...formData, events: updated });
        }}
      />
    </div>
  ))}
  <button
    className="btn btn-outline-secondary btn-sm"
    onClick={() => setFormData({ ...formData, events: [...formData.events, { title: "", image: "" }] })}
  >
    + Add Event
  </button>
</div>
          <div className="mb-3">
            <label style={labelStyle}>Group Photos</label>
            {formData.groupPhotos.map((url, idx) => (
              <input key={idx} value={url} onChange={(e) => handleArrayChange(idx, e.target.value, "groupPhotos")} className="form-control mb-2" placeholder={`Photo ${idx + 1}`} />
            ))}
            <button onClick={() => addToArray("groupPhotos")} className="btn btn-outline-secondary btn-sm">+ Add Group Photo</button>
          </div>
          
          <div className="mb-4">
            <label style={labelStyle}>Testimonials</label>
            {formData.testimonials.map((txt, idx) => (
              <textarea key={idx} value={txt} onChange={(e) => handleArrayChange(idx, e.target.value, "testimonials")} className="form-control mb-2" placeholder={`Testimonial ${idx + 1}`} />
            ))}
            <button onClick={() => addToArray("testimonials")} className="btn btn-outline-secondary btn-sm">+ Add Testimonial</button>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={handleSave}>Save</button>
            <button className="btn btn-danger" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="text-center mb-4 position-relative">
            <img src={formData.coverImage} alt="Cover" className="img-fluid w-100 rounded" style={{ height: "250px", objectFit: "cover" }} />
            {formData.logo && (
              <img
                src={formData.logo}
                alt="Logo"
                className="rounded-circle shadow position-absolute top-100 start-50 translate-middle"
                style={{
                  width: "100px",
                  height: "100px",
                  border: "3px solid white",
                  objectFit: "cover",
                  marginTop: "-50px",
                }}
              />
            )}
          </div>

          <div className="text-center mt-5 mb-4">
            <h2>{formData.name}</h2>
            <p className="text-muted">{formData.description}</p>
          </div>

          {formData.eventImage && (
            <div className="mb-4">
              <h5>Upcoming Event</h5>
              <img src={formData.eventImage} alt="Event" className="img-fluid rounded" />
            </div>
          )}

          {formData.groupPhotos.length > 0 && (
            <div className="mb-4">
              <h5>Group Photos</h5>
              <div className="d-flex flex-wrap gap-3">
                {formData.groupPhotos.map((url, i) => (
                  <img key={i} src={url} alt="Group" style={{ width: "150px", height: "100px", objectFit: "cover", borderRadius: "10px" }} />
                ))}
              </div>
            </div>
          )}

          {formData.videoUrl && (
            <div className="mb-4">
              <h5>Intro Video</h5>
              <div className="ratio ratio-16x9">
                <iframe src={formData.videoUrl} title="Intro Video" allowFullScreen></iframe>
              </div>
            </div>
          )}

          {formData.testimonials.length > 0 && (
            <div className="mb-4">
              <h5>Testimonials</h5>
              {formData.testimonials.map((txt, i) => (
                <blockquote key={i} style={blockquoteStyle}>
                  <p className="mb-0">{txt}</p>
                </blockquote>
              ))}
            </div>
          )}

          <div className="text-end">
            <button className="btn btn-outline-primary" onClick={() => setEditMode(true)}>Edit Profile</button>
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default CollegeProfile;
