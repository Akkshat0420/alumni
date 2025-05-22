// HelpDesk.js
import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

const HelpDesk = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Help Desk</h2>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>How can I update my profile?</Accordion.Header>
          <Accordion.Body>
            To update your profile, navigate to the 'Profile' section after logging in and click on 'Edit Profile'.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How do I join alumni events?</Accordion.Header>
          <Accordion.Body>
            Visit the 'Events' page to view upcoming events and register for those that interest you.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Who can I contact for support?</Accordion.Header>
          <Accordion.Body>
            For support, please email support@collegealumni.org or use the contact form on the 'Contact Us' page.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default HelpDesk;
