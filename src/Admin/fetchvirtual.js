import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { auth, db } from "./firebase";
import { collection, getDocs, query, where, getDoc, doc } from "firebase/firestore";

export default function CollegeMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collegeName, setCollegeName] = useState("");
  const [error, setError] = useState("");

  const fetchCollege = async (uid) => {
    try {
      const collegeDoc = await getDoc(doc(db, "college", uid));
      if (collegeDoc.exists()) return collegeDoc.data().college;

      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists() && userDoc.data().approved === true)
        return userDoc.data().college;

      throw new Error("College not found for the user");
    } catch (err) {
      console.error("Error fetching college:", err);
      setError("Could not find college information.");
      return null;
    }
  };

  const fetchMeetings = async (college) => {
    try {
      const q = query(collection(db, "meetings"), where("college", "==", college));
      const snapshot = await getDocs(q);
      const fetchedMeetings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMeetings(fetchedMeetings);
    } catch (err) {
      console.error("Error fetching meetings:", err);
      setError("Failed to fetch meetings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    const init = async () => {
      const college = await fetchCollege(uid);
      if (college) {
        setCollegeName(college);
        fetchMeetings(college);
      } else {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5" style={{ background: "linear-gradient(to bottom, #f5f7fa, #c3cfe2)", padding: "30px", borderRadius: "12px" }}>
      <h3 style={{ color: "#2c3e50", fontWeight: "bold", textAlign: "center", marginBottom: "30px", textShadow: "1px 1px #dcdde1" }}>
        📅 Meetings for {collegeName}
      </h3>
      <Row>
        {meetings.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555" }}>No meetings found for this college.</p>
        ) : (
          meetings.map((meeting) => (
            <Col md={6} lg={4} key={meeting.id} className="mb-4">
              <Card
                style={{
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  borderRadius: "15px",
                  overflow: "hidden",
                  backgroundColor: "#ffffff",
                  transition: "transform 0.2s ease-in-out",
                }}
              >
                {meeting.imageUrl && (
                  <Card.Img
                    variant="top"
                    src={meeting.imageUrl}
                    alt={meeting.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title style={{ color: "#2980b9", fontWeight: "bold", fontSize: "20px" }}>
                    {meeting.title || "Untitled Meeting"}
                  </Card.Title>
                  <Card.Text style={{ fontSize: "14px", color: "#333" }}>
                    <strong style={{ color: "#e67e22" }}>Content:</strong> {meeting.content || "N/A"} <br />
                    <strong style={{ color: "#16a085" }}>Batch:</strong> {meeting.batch || "N/A"} <br />
                    <strong style={{ color: "#8e44ad" }}>Stream:</strong> {meeting.stream || "N/A"} <br />
                    <strong style={{ color: "#c0392b" }}>Course:</strong> {meeting.course || "N/A"} <br />
                    <strong style={{ color: "#2c3e50" }}>Time:</strong>{" "}
                    {meeting.meetingTime
                      ? new Date(meeting.meetingTime).toLocaleString()
                      : "N/A"}
                  </Card.Text>
                  <Button
                    href={meeting.meetingLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: "#27ae60",
                      borderColor: "#27ae60",
                      width: "100%",
                      fontWeight: "bold",
                      boxShadow: "0 4px 10px rgba(39, 174, 96, 0.3)",
                    }}
                  >
                    🔗 Join Meeting
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}
