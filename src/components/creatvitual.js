import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { auth } from './firebase'; // Make sure this is imported
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CollegeMeetingForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [batch, setBatch] = useState('');
  const [stream, setStream] = useState('');
  const [college, setCollege] = useState('');
  const [course, setCourse] = useState('');
  const [loading, setLoading] = useState(false);

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
        } else {
          console.error("User data not found.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserCollege();
  }, []);

  const createDailyRoom = async () => {
    const res = await fetch('https://api.daily.co/v1/rooms', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_DAILY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        properties: {
          exp: Math.floor(Date.now() / 1000) + 3600 * 2,
          enable_screenshare: true,
        }
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create Daily room');
    }

    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !date || !time || !batch || !stream || !college || !course) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const scheduledDate = new Date(`${date}T${time}`);
      const roomUrl = await createDailyRoom();

      await addDoc(collection(db, 'meetings'), {
        title,
        content,
        imageUrl,
        batch,
        stream,
        college,
        course,
        meetingTime: scheduledDate.toISOString(),
        meetingLink: roomUrl,
        createdAt: new Date().toISOString()
      });

      alert('Meeting scheduled!');
      setTitle('');
      setContent('');
      setImageUrl('');
      setDate('');
      setTime('');
      setBatch('');
      setStream('');
      setCollege('');
      setCourse('');
    } catch (err) {
      console.error(err);
      alert('Error creating meeting');
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(12px)',
    borderRadius: '25px',
    padding: '40px',
    width: '100%',
    maxWidth: '720px',
    color: '#fff'
  };

  const inputStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: '#fff'
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none',
    background: 'linear-gradient(135deg, #e0f7fa, #e1bee7)',
    border: '2px solid #6a1b9a',
    borderRadius: '12px',
    padding: '10px 40px 10px 15px',
    fontWeight: '500',
    color: '#4a148c',
    fontSize: '16px',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%234a148c' d='M2 0L0 2h4L2 0zM2 5l2-2H0l2 2z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 10px center',
    backgroundSize: '12px'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: 'center', fontSize: '1.8rem', color: '#fff', fontWeight: '700' }}>🎥 Schedule a Virtual Meetup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" style={inputStyle} placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <label>Meeting Title</label>
          </div>

          <div className="form-floating mb-3">
            <textarea className="form-control" style={{ ...inputStyle, height: '100px' }} placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required />
            <label>Meeting Description</label>
          </div>

          <div className="form-floating mb-3">
            <input type="text" className="form-control" style={inputStyle} placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            <label>Banner Image URL</label>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label style={{ color: '#f1f1f1' }}>Batch</label>
              <select className="form-select" style={selectStyle} value={batch} onChange={e => setBatch(e.target.value)} required>
                <option value="">Select Batch</option>
                <option>Batch 2020</option>
                <option>Batch 2021</option>
                <option>Batch 2022</option>
                <option>Batch 2023</option>
                <option>Batch 2024</option>
                <option>Batch 2025</option>
                <option>All Batch</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label style={{ color: '#f1f1f1' }}>Stream</label>
              <select className="form-select" style={selectStyle} value={stream} onChange={e => setStream(e.target.value)} required>
                <option value="">Select Stream</option>
                <option>Computer Science</option>
                <option>Mechanical</option>
                <option>Electronics</option>
                <option>BioTech</option>
                <option>All</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label style={{ color: '#f1f1f1' }}>Course</label>
              <select className="form-select" style={selectStyle} value={course} onChange={e => setCourse(e.target.value)} required>
                <option value="">Select Course</option>
                <option>B.Tech</option>
                <option>B.Com</option>
                <option>MCA</option>
                <option>MBA</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label style={{ color: '#f1f1f1' }}>Date</label>
              <input type="date" className="form-control" style={inputStyle} value={date} onChange={e => setDate(e.target.value)} required />
            </div>
            <div className="col-md-6">
              <label style={{ color: '#f1f1f1' }}>Time</label>
              <input type="time" className="form-control" style={inputStyle} value={time} onChange={e => setTime(e.target.value)} required />
            </div>
          </div>

          <div className="text-center">
            <button className="btn btn-outline-light px-5 py-2 mt-3" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : '🚀 Create Meeting'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollegeMeetingForm;
