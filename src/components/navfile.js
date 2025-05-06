import React from "react";
import { Navbar, Nav, Button, Offcanvas, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';

const CustomNavbar = () => {
  const offcanvasStyle = {
    background: 'linear-gradient(145deg, #1E293B, #3B82F6, #22C55E)', // Modern gradient theme
    color: '#fff',
    borderRadius:'3%'
     // White text
  };

  const headerStyle = {
    color: '#22C55E', // Tailwind green for header text
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '1.5rem',
    fontFamily: 'Poppins, sans-serif',
  };

  const navLinkStyle = {
    color: '#FFFFFF', // White text for nav links
    padding: '0.8rem 1.2rem',
    borderRadius: '8px',
    transition: 'background 0.3s ease',
    textDecoration: 'none',
  };

  const navLinkHoverStyle = {
    backgroundColor: '#2563EB', 
  };

  const badgeStyle = {
    backgroundColor: '#F87171',
    fontSize: '0.8rem',
    marginLeft: '0.5rem',
  };

  const navbarStyle = {
    backgroundColor: '#1E293B', 
    padding: '15px 0',
    height: '70px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', 
  };

  const brandStyle = {
    color: '#22C55E',
    fontWeight: 'bold',
    fontSize: '24px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontFamily: 'Poppins, sans-serif',
    display: 'flex',
    alignItems: 'center',
  };

  const buttonStyle = {
    backgroundColor: '#14B8A6', 
    borderColor: '#3B82F6',
    color: '#fff',
  };

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar expand="lg" style={navbarStyle}>
        <Container fluid>
          {/* Offcanvas toggle button */}
          <Button
            variant="outline-light"
            onClick={handleShow}
            className="me-2"
            style={buttonStyle}
          >
            &#9776;
          </Button>

          {/* Brand */}
          <Navbar.Brand href="/" className="mx-auto" style={brandStyle}>
            <img
              src="https://www.kit.ac.in/wp-content/uploads/2022/03/KIT-Autonomous-full-name.jpg"
              alt="Logo"
              style={{ width: '90px', height: '50px', marginRight: '20px' }}
            />
            Alumni Association
          </Navbar.Brand>

          {/* Right-side nav links */}
          <div className="d-none d-lg-flex align-items-center">
            <Nav.Link href="/" style={navLinkStyle} className="hover:bg-blue-600 rounded">
              🏠 Home
            </Nav.Link>
            <Nav.Link href="/profile" style={navLinkStyle} className="hover:bg-blue-600 rounded">
              👤 Profile
            </Nav.Link>
            <Nav.Link href="/post" style={navLinkStyle} className="hover:bg-blue-600 rounded">
              📝 Post
            </Nav.Link>
            <Nav.Link href="/donation" style={navLinkStyle} className="hover:bg-blue-600 rounded">
              💰 Donation
            </Nav.Link>
            <Nav.Link href="/events" style={navLinkStyle} className="hover:bg-blue-600 rounded">
              Events
            </Nav.Link>
            <Nav.Link href="/eventslist" style={navLinkStyle} className="hover:bg-blue-600 rounded">
              Eventslist
            </Nav.Link>
          </div>
        </Container>
      </Navbar>

      {/* Offcanvas Menu */}
      <Offcanvas show={show} onHide={handleClose} placement="start" style={offcanvasStyle}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={headerStyle}>Alumni Association</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link
              href="/"
              style={navLinkStyle}
              className="nav-link hover:bg-blue-600"
              onMouseEnter={(e) => (e.target.style.backgroundColor = navLinkHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              Home
            </Nav.Link>

            <Nav.Link
              href="/post"
              style={navLinkStyle}
              className="nav-link hover:bg-blue-600"
              onMouseEnter={(e) => (e.target.style.backgroundColor = navLinkHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              Create Post
            </Nav.Link>

            <Nav.Link
              href="/projects"
              style={navLinkStyle}
              className="nav-link hover:bg-blue-600"
              onMouseEnter={(e) => (e.target.style.backgroundColor = navLinkHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              Projects
            </Nav.Link>

            <Nav.Link
              href="donation"
              style={navLinkStyle}
              className="nav-link hover:bg-blue-600"
              onMouseEnter={(e) => (e.target.style.backgroundColor = navLinkHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
             Donation
            </Nav.Link>

            <Nav.Link
              href="/profile"
              style={navLinkStyle}
              className="nav-link hover:bg-blue-600"
              onMouseEnter={(e) => (e.target.style.backgroundColor = navLinkHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              My Profile
              <span style={badgeStyle} className="badge">New </span>
            </Nav.Link>
            <Nav.Link
              href="events"
              style={navLinkStyle}
              className="nav-link hover:bg-blue-600"
              onMouseEnter={(e) => (e.target.style.backgroundColor = navLinkHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              Event
              <span style={badgeStyle} className="badge">New </span>
            </Nav.Link>
            <Nav.Link
              href="/eventlist"
              style={navLinkStyle}
              className="nav-link hover:bg-blue-600"
              onMouseEnter={(e) => (e.target.style.backgroundColor = navLinkHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              Eventslist
              <span style={badgeStyle} className="badge">New </span>
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CustomNavbar;
