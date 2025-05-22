import React, { useState } from "react";
import { Form, Container, Alert, Row, Col, Button } from "react-bootstrap";
import { collection, addDoc, serverTimestamp, getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { auth } from "./firebase"; // Make sure this is imported

export default function JobPostForm() {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full-time",
    description: "",
    eligibility: "",
    deadline: "",
    applyLink: "",
    googleFormLink: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error("User not authenticated");

      let collegeName = null;

      const collegeDoc = await getDoc(doc(db, "college", uid));
      if (collegeDoc.exists()) {
        collegeName = collegeDoc.data().college;
      } else {
        const alumniDoc = await getDoc(doc(db, "users", uid));
        if (alumniDoc.exists() && alumniDoc.data().approved === true) {
          collegeName = alumniDoc.data().college;
        }
      }

      if (!collegeName) throw new Error("College not found for this user");

      await addDoc(collection(db, "jobs"), {
        ...jobData,
        createdAt: serverTimestamp(),
        college: collegeName,
        postedBy: uid,
        applications: [],
      });

      setSuccess(true);
      setJobData({
        title: "",
        company: "",
        location: "",
        jobType: "Full-time",
        description: "",
        eligibility: "",
        deadline: "",
        applyLink: "",
        googleFormLink: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to post the job. Try again.");
    }
  };

  return (
    <Container style={{ maxWidth: "800px", marginTop: "30px" }}>
      <div
        style={{
          background: "#e6f0ff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 123, 255, 0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#0056b3",
          }}
        >
          Post a Job Opportunity
        </h2>

        {success && <Alert variant="success">Job posted successfully!</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="title" className="mb-3">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Software Engineer"
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="company" className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Google"
                  name="company"
                  value={jobData.company}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="location" className="mb-3">
                <Form.Label>Job Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Remote / New York"
                  name="location"
                  value={jobData.location}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="jobType" className="mb-3">
                <Form.Label>Job Type</Form.Label>
                <Form.Select name="jobType" value={jobData.jobType} onChange={handleChange}>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Remote</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Job Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={jobData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="eligibility" className="mb-3">
            <Form.Label>Eligibility Criteria</Form.Label>
            <Form.Control
              type="text"
              name="eligibility"
              placeholder="e.g. B.Tech, MCA, MBA"
              value={jobData.eligibility}
              onChange={handleChange}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="deadline" className="mb-3">
                <Form.Label>Application Deadline</Form.Label>
                <Form.Control
                  type="date"
                  name="deadline"
                  value={jobData.deadline}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="applyLink" className="mb-3">
                <Form.Label>Application Email / Link</Form.Label>
                <Form.Control
                  type="text"
                  name="applyLink"
                  placeholder="e.g. https://company.com/careers or hr@company.com"
                  value={jobData.applyLink}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="googleFormLink" className="mb-4">
            <Form.Label>Google Form Link (Optional)</Form.Label>
            <Form.Control
              type="text"
              name="googleFormLink"
              placeholder="https://forms.gle/..."
              value={jobData.googleFormLink}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="text-center">
            <Button
              type="submit"
              style={{
                backgroundColor: "#007bff",
                borderColor: "#007bff",
                padding: "10px 30px",
                fontWeight: "bold",
                borderRadius: "8px",
              }}
            >
              Post Job
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
