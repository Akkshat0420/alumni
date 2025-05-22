import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query, where, updateDoc, arrayUnion, doc, getDoc } from 'firebase/firestore';
import { auth } from './firebase';
import { db } from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CollegeMeetingForm.css';

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null); // 'college' or 'user'

  useEffect(() => {
    const fetchUserAndEvents = async () => {
      const user = auth.currentUser;
      if (!user) {
        alert('Please log in.');
        return;
      }

      try {
        // Check if user is a college admin
        const collegeRef = doc(db, 'colleges', user.uid);
        const collegeSnap = await getDoc(collegeRef);

        let userCollege = '';

        if (collegeSnap.exists()) {
          // Logged in as college admin
          setUserType('college');
          userCollege = collegeSnap.data().college;
        } else {
          // Check users collection
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            alert('User data not found.');
            return;
          }

          setUserType('user');
          userCollege = userSnap.data().college;
        }

        // Fetch events for that college
        const eventsQuery = query(
          collection(db, 'events'),
          where('college', '==', userCollege)
        );

        const snapshot = await getDocs(eventsQuery);
        const filteredEvents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndEvents();
  }, []);

  const handleJoinEvent = async (eventId) => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      alert('User is not logged in.');
      return;
    }

    if (userType === 'college') {
      alert("Colleges can't join events.");
      return;
    }

    const userRef = doc(db, 'users', uid);
    try {
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        alert('User data not found.');
        return;
      }

      const { name, profileImage } = userDoc.data();
      const eventRef = doc(db, 'events', eventId);

      await updateDoc(eventRef, {
        attendee: arrayUnion({
          joined: 'joined',
          username: name,
          profileImage: profileImage || '',
        }),
      });

      alert('Successfully joined the event!');
    } catch (error) {
      console.error('Error joining event: ', error);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Events for Your College</h1>
      {loading ? (
        <div className="text-center">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="text-center">No events to display for your college.</div>
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

              {userType === 'user' && (
                <button
                  onClick={() => handleJoinEvent(event.id)}
                  className="btn btn-primary"
                >
                  Join Event
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsList;
