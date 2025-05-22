import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from './firebase';
import { auth } from './firebase';
import { doc,getDoc } from 'firebase/firestore';
import './CollegeMeetingForm.css';
const EventsList = () => {
  const [events, setEvents] = useState([]);
  //const [clickedEvents, setClickedEvents] = useState({});
  useEffect(() => {
    const fetchEvents = async () => {
      const db = getFirestore();
      const eventsCollection = collection(db, 'events');
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsList);
    };

    fetchEvents();
  }, []);
  const handleJoinEvent = async (eventId) => {
    const uid = auth.currentUser?.uid; // Get the current user's ID
    if (!uid) {
      alert('User is not logged in.');
      return;
    }
  
    const userRef = doc(db, 'college', uid);
  
    try {
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        alert('User data not found.');
        return;
      }
  
      const userData = userDoc.data();
      const { name, profileImage } = userData;
  
      const eventRef = doc(db, 'events', eventId); // Reference to the specific event
      await updateDoc(eventRef, {
        attendee: arrayUnion({
        joined: 'joined',
        username: name,     // User's name
        profileImage: profileImage,})  // User's profile image
      });
  
      alert('Successfully joined the event!');
    } catch (error) {
      console.error('Error joining event: ', error);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Upcoming Events</h1>
      {events.length === 0 ? (
        <div className="text-center">No events to display.</div>
      ) : (
        <div className="row">
          {events.map((event, index) => (
            <div 
              key={event.id} 
              className={`col-md-6 mb-4 ${index % 2 === 0 ? 'bg-light' : 'bg-white'} p-3 border rounded shadow`}
            >
              <h3 className="text-primary">{event.eventName}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Message:</strong> {event.message}</p>

              <button
  onClick={() => {
    if (event.joined !== 'joined') {
      handleJoinEvent(event.id);
    }
  }}
  className={`btn ${event.joined === 'joined' ? 'btn btn-success disabled' : 'btn-primary'}`}
  disabled={event.joined === 'joined'} // Disable the button if already joined
>
  {event.joined === 'joined' ? 'Joined' : 'Join Event'}
</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsList;
