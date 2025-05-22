// Feedback.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Feedback = () => {
  const [formData, setFormData] = useState({ name: '', email: '', feedback: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission logic here
    setSubmitted(true);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Feedback</h2>
          {submitted && <Alert variant="success">Thank you for your feedback!</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="feedbackName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="feedbackEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="feedbackMessage" className="mb-3">
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                as="textarea"
                name="feedback"
                rows={5}
                placeholder="Your feedback"
                value={formData.feedback}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Submit Feedback
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Feedback;
