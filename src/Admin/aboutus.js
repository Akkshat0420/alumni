// About.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">About Us</h2>
      <Row className="mb-4">
        <Col>
          <p>
            Our college is committed to providing quality education and fostering a community of lifelong learners. We strive to empower students with knowledge, skills, and values to excel in their chosen fields.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Our Mission</Card.Title>
              <Card.Text>
                To deliver exceptional education and promote research and innovation for the betterment of society.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Our Vision</Card.Title>
              <Card.Text>
                To be a leading institution recognized for excellence in teaching, learning, and community engagement.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Our Team</Card.Title>
              <Card.Text>
                A dedicated group of educators, administrators, and staff committed to student success and institutional growth.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
