import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../components/firebase";

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
    totalalumni: 0,
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
          events: [{ title: "", image: "" }],
          groupPhotos: [],
          videoUrl: "",
          testimonials: [""],
          singlegroup: "",
          totalalumni: 0
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

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(to right, #1f4037, #99f2c8);
        }

        .meeting-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 30px;
          width: 100%;
          max-width: 750px;
          color: #fff;
        }

        .form-heading {
          text-align: center;
          font-size: 1.8rem;
          color: #fff;
          font-weight: 700;
        }

        .form-control,
        .form-select {
          background-color: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: #fff;
          margin-bottom: 15px;
        }

        .form-control::placeholder,
        .form-select {
          color: #eee;
        }

        .form-control:focus,
        .form-select:focus {
          background-color: rgba(255, 255, 255, 0.2);
          border-color: #fff;
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
        }

        label {
          color: #fff;
          font-weight: 500;
        }

        .btn-outline-secondary {
          color: #fff;
          border: 1px solid #ccc;
        }

        .btn-outline-secondary:hover {
          background-color: #fff;
          color: #333;
        }

        .btn-success,
        .btn-danger {
          min-width: 100px;
        }

        .img-fluid {
          border-radius: 8px;
        }

        h5 {
          color: #fff;
          font-weight: 600;
        }

        blockquote {
          background-color: #fff;
          border-left: 4px solid #007bff;
          padding: 10px 15px;
          border-radius: 6px;
          margin-bottom: 12px;
          color: #000;
        }
      `}</style>

      <div className="meeting-container">
        <div className="glass-card">
          {editMode ? (
            <>
              <h2 className="form-heading mb-4">Edit College Profile</h2>

              <input name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Short Name (e.g., abeg, dit)" />
              <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" placeholder="Description" />
              <input name="coverImage" value={formData.coverImage} onChange={handleChange} className="form-control" placeholder="Cover Image URL" />
              <input name="singlegroup" value={formData.singlegroup} onChange={handleChange} className="form-control" placeholder="Single Group Image URL" />
              <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} className="form-control" placeholder="Intro Video URL" />
              <input name="totalalumni" value={formData.totalalumni} onChange={handleChange} className="form-control" placeholder="Total Alumni" />

              <div>
                <label>Upcoming Events</label>
                {formData.events.map((event, idx) => (
                  <div key={idx}>
                    <input className="form-control" placeholder={`Event ${idx + 1} Title`} value={event.title} onChange={(e) => {
                      const updated = [...formData.events];
                      updated[idx].title = e.target.value;
                      setFormData({ ...formData, events: updated });
                    }} />
                    <input className="form-control" placeholder={`Event ${idx + 1} Image URL`} value={event.image} onChange={(e) => {
                      const updated = [...formData.events];
                      updated[idx].image = e.target.value;
                      setFormData({ ...formData, events: updated });
                    }} />
                  </div>
                ))}
                <button className="btn btn-outline-secondary btn-sm" onClick={() => setFormData({ ...formData, events: [...formData.events, { title: "", image: "" }] })}>+ Add Event</button>
              </div>

              <div>
                <label>Group Photos</label>
                {formData.groupPhotos.map((url, idx) => (
                  <input key={idx} value={url} onChange={(e) => handleArrayChange(idx, e.target.value, "groupPhotos")} className="form-control" placeholder={`Photo ${idx + 1}`} />
                ))}
                <button onClick={() => addToArray("groupPhotos")} className="btn btn-outline-secondary btn-sm">+ Add Group Photo</button>
              </div>

              <div>
                <label>Testimonials</label>
                {formData.testimonials.map((txt, idx) => (
                  <textarea key={idx} value={txt} onChange={(e) => handleArrayChange(idx, e.target.value, "testimonials")} className="form-control" placeholder={`Testimonial ${idx + 1}`} />
                ))}
                <button onClick={() => addToArray("testimonials")} className="btn btn-outline-secondary btn-sm">+ Add Testimonial</button>
              </div>

              <div className="d-flex gap-2 mt-3">
                <button className="btn btn-success" onClick={handleSave}>Save</button>
                <button className="btn btn-danger" onClick={() => setEditMode(false)}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-4 position-relative">
                <img src={formData.coverImage} alt="Cover" className="img-fluid w-100" style={{ height: "250px", objectFit: "cover" }} />
                {formData.logo && (
                  <img src={formData.logo} alt="Logo" className="rounded-circle shadow position-absolute top-100 start-50 translate-middle" style={{ width: "100px", height: "100px", border: "3px solid white", objectFit: "cover", marginTop: "-50px" }} />
                )}
              </div>

              <div className="text-center mt-5 mb-4">
                <h2>{formData.name}</h2>
                <p>{formData.description}</p>
              </div>

              {formData.events.length > 0 && (
                <div className="mb-4">
                  <h5>Upcoming Events</h5>
                  <div className="d-flex flex-wrap gap-3">
                    {formData.events.map((event, i) => (
                      <div key={i}>
                        <strong>{event.title}</strong>
                        <img src={event.image} alt="Event" className="img-fluid mt-2" style={{ maxWidth: "200px" }} />
                      </div>
                    ))}
                  </div>
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
                    <blockquote key={i}><p className="mb-0">{txt}</p></blockquote>
                  ))}
                </div>
              )}

              <div className="text-end">
                <button className="btn btn-outline-light" onClick={() => setEditMode(true)}>Edit Profile</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CollegeProfile;
