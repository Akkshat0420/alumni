import React, { useState, useEffect } from 'react';
import { db } from './firebase'; 
import { collection } from 'firebase/firestore'; // Firebase configuration

const EventComing = ({ eventId }) => {
  const [eventDetails, setEventDetails] = useState(null);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    // Fetch event details and attendees from Firestore
    const fetchEventDetails = async () => {
      try {
        const eventRef = collection(db,'eventcoming');
        const eventDoc = await eventRef.get();
        
        if (eventDoc.exists) {
          setEventDetails(eventDoc.data().eventDetails);
          setAttendees(eventDoc.data().users || []);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  

  return (
    <div className="container my-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3>{eventDetails.name}</h3>
        </div>
        <div className="card-body">
          <p>{eventDetails.description}</p>
          <h5 className="mt-4">Attendees:</h5>
          <div className="row">
            {attendees.length === 0 ? (
              <p>No one has joined yet.</p>
            ) : (
              attendees.map((attendee, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="card">
                    <img
                      src={attendee.profileImage}
                      className="card-img-top"
                      alt={`${attendee.name}'s profile`}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{attendee.name}</h5>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventComing;
