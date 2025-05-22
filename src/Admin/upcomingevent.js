import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const UpcomingEvents = ({ data }) => {
  const defaultEvents = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSHyddMvgDJzvG0wjmU4Ei-feu8M6npnV6oA&s",
      title: "Tech Fest 2025",
    },
    {
      image:
        "https://hritacademy.edu.np/wp-content/uploads/2023/06/Almuni-Meet-Up-Vertical.jpg",
      title: "Alumni Meetup",
    },
    {
      image:
        "https://calendarmedia.blob.core.windows.net/assets/b309f57e-6c03-439b-8f2e-11c2090217c7.jpeg",
      title: "Cultural Night",
    },
  ];

  const eventsToShow =
    data?.events && data.events.length > 0 ? data.events : defaultEvents;

  return (
    <section className="py-5" style={{ backgroundColor: "#f0f8ff" }}>
      <Container>
        <h3 className="text-center mb-5" style={{ fontSize: 32, fontWeight: "bold" }}>
          Upcoming Events
        </h3>
        <Row className="g-4 justify-content-center">
          {eventsToShow.slice(0, 3).map((event, index) => (
            <Col key={index} xs={12} sm={6} md={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={event.image}
                  alt={event.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column justify-content-end">
                  <Card.Title className="text-center">{event.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default UpcomingEvents;
