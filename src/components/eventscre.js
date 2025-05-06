import React, { useState } from 'react';
import emailjs from 'emailjs-com';

import { db } from './firebase'; 
import { collection, addDoc } from 'firebase/firestore';
//import EventComing from './eventcoming';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    eventName: '',
    date: '',
    time: '',
    venue: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    const recipients = 'gakkshat1198@gmail.com,gautamamayara@gmail.com,ayushiyoyo2233@gmail.com'; 

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
      // Save event details to Firestore
      const docRef = await addDoc(collection(db, 'events'), {
        eventName: formData.eventName,
        date: formData.date,
        time: formData.time,
        venue: formData.venue,
        subject: formData.subject,
        message: formData.message,
        joined:'click to join',
        attendee:[]

      });

      console.log('Event added to Firestore with ID:', docRef.id);

      // Send email using EmailJS
      const result = await emailjs.send('service_9hwrzhg', 'template_uyyiyyl', templateParams, 'SbQSjgcuCt3YQceR0');
      console.log('Email sent successfully:', result.text);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h1 className="text-center mb-4">Create Event</h1>
        <form onSubmit={sendEmail} className="p-4 shadow border rounded bg-white">
  
          {/* Event Name */}
          <div className="mb-3">
            <label htmlFor="eventName" className="form-label">Event Name</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              placeholder="Enter event name"
              value={formData.eventName}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
  
          {/* Date */}
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
  
          {/* Time */}
          <div className="mb-3">
            <label htmlFor="time" className="form-label">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
  
          {/* Venue */}
          <div className="mb-3">
            <label htmlFor="venue" className="form-label">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              placeholder="Enter venue"
              value={formData.venue}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
  
          {/* Subject */}
          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Enter email subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
  
          {/* Message */}
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write your message"
              value={formData.message}
              onChange={handleChange}
              required
              className="form-control"
              rows="4"
            ></textarea>
          </div>
  
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
  </div>
 
  </div>
  );
};

export default EmailForm;
