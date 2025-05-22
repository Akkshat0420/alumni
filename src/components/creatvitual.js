import React, { useState, useEffect } from 'react';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { auth } from './firebase';
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
          margin-bottom: 25px;
        }

        .form-control,
        .form-select {
          background-color: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: #fff;
          margin-bottom: 15px;
        }

        .form-label {
          color: #f1f1f1;
          margin-bottom: 5px;
        }

        .form-control::placeholder {
          color: #ddd;
        }

        .form-control:focus,
        .form-select:focus {
          background-color: rgba(255, 255, 255, 0.2);
          color: #fff;
        }
      `}</style>

      <div className="meeting-container">
        <div className="glass-card">
          <h2 className="form-heading">🎥 Schedule a Virtual Meetup</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-floating">
              <input type="text" className="form-control" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
              <label>Meeting Title</label>
            </div>

            <div className="form-floating">
              <textarea className="form-control" style={{ height: '100px' }} placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required />
              <label>Meeting Description</label>
            </div>

            <div className="form-floating">
              <input type="text" className="form-control" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
              <label>Banner Image URL</label>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Batch</label>
                <select className="form-select" value={batch} onChange={e => setBatch(e.target.value)} required>
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

              <div className="col-md-6">
                <label className="form-label">Stream</label>
                <select className="form-select" value={stream} onChange={e => setStream(e.target.value)} required>
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
              <div className="col-md-6">
                <label className="form-label">Course</label>
                <select className="form-select" value={course} onChange={e => setCourse(e.target.value)} required>
                  <option value="">Select Course</option>
                  <option>B.Tech</option>
                  <option>B.Com</option>
                  <option>MCA</option>
                  <option>MBA</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Date</label>
                <input type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Time</label>
                <input type="time" className="form-control" value={time} onChange={e => setTime(e.target.value)} required />
              </div>
            </div>

            <div className="text-center">
              <button className="btn btn-outline-light px-5 py-2 mt-4" type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : '🚀 Create Meeting'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CollegeMeetingForm;
