// Inside CustomNavbar.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Badge } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomNavbar = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

   
 
  const location = useLocation();  // 👈 track current route
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserType(null);
      }
    });
  }, []);

  const isHomePage = location.pathname === "/";  // 👈 check if on home page

 
  
  const navItems = [
    { label: "Home", href: ":shortName-alumni" },
    {
      label: "About",
      href: "/about",
      submenu: [
        { label: "Vision", href: "/about/vision" },
        { label: "Team", href: "/about/team" },
      ],
    },
    {
      label: "Donation's",
      href: "/donation",
      submenu: [
        { label: "How to Donate", href: "/donation" },
        { label: "Donor List", href: "/donation/list" },
      ],
    },
    {
      label: "Student Corner",
      href: "/student-corner",
      submenu: [
        { label: "Resources", href: "/student-corner/resources" },
        { label: "Internships", href: "/student-corner/internships" },
      ],
    },
    {
      label: "Chapter",
      href: "/chapters",
      submenu: [
        { label: "Regional", href: "/chapters/regional" },
        { label: "International", href: "/chapters/international" },
      ],
    },
    {
      label: "Share Achievements",
      href: "/achievements",
      submenu: [
        { label: "Submit Achievement", href: "/post1" },
        { label: "View Achievements", href: "/sharedexp" },
      ],
    },
    {
      label: "Members",
      href: "/members",
      submenu: [
        { label: "Directory", href: "/members/directory" },
        { label: "Top Contributors", href: "/members/top" },
      ],
    },
    {
      label: "More",
      href: "/more",
      submenu: [
        { label: "Newsroom", href: "/newsroom" },
        { label: "Events", href: "/events" },
        { label: "Gallery", href: "/gallery" },
       
        { label: "college-book", href: "/college-book", isNew: true },
       
      {
  label: "Profile",
  href:
    userType === "college"
      ? "/college-profile"
      : userType === "student"
      ? "/alumni-profile"
      : userType === "student0"
      ? "/student-corner"
      : "/profile", // fallback if userType is null
},

         
         { label: "Dashboard", href: "/dashboard" },
        { label: "Share Opportunities", href: "/share-opportunities" },
        { label: "Mobile App", href: "/mobile-app" },
        {label:'Feedback',herf:"/feedback"},
        { label: "Help Desk", href: "/help-desk" },
        { label: "Virtual Meetings", href: "/virtual-meetings" }, // Alumni-specific
        ...(userType === "college"
          ? [{ label: "College Dashboard", href: "/college-dashboard" }]
          : []),
      ],
    },
    {
      label: "Post Job",
      href: "/post-job",
      visible: userType === "college" || userType === "student",
    },
    {
      label: "Contact Us",
      href: "/contact",
      submenu: [
        { label: "Directory", href: "/members/directory" },
        { label: "Top Contributors", href: "/members/top" },
      ],
    },
  ];
  
  

  const handleLogout = () => {
    signOut(auth).then(() => {
      setIsLoggedIn(false);
      navigate("/");
    });
  };

  const handleRegisterLogin = () => {
    const path = location.pathname;

    if (path.includes("student-corner") || path.includes("job")) {
      navigate("/signup-student");
    } else if (path.includes("dashboard")) {
      navigate("/signup1");
    } else {
      navigate("/signup");
    }
  };
  // 🎯 Full Navbar from here onwards...
  return (
     <>
    {location.pathname === "/" ? (
      <Container fluid className="py-3 text-center" style={{ backgroundColor: "#f8fafc" }}>
        <h4 className="text-primary fw-bold mb-0">Welcome to Alumni Portal</h4>
      </Container>
    ) : (
  <div>
      {/* TOP SECTION */}
      <Container fluid className="border-bottom py-3" style={{ backgroundColor: "#fff" }}>
        <Row className="align-items-center px-4">
          <Col xs="auto">
            <img src="https://mnnit.ac.in/images/logo.png" alt="Logo" width={70} height={70} />
          </Col>

          <Col xs="auto" className="pe-3">
            <div style={{ lineHeight: "1" }}>
              <div style={{ fontSize: "32px", color: "#f26924", fontWeight: "bold" }}>KIT</div>
              <div
                style={{
                  fontSize: "13px",
                  textTransform: "uppercase",
                  color: "#666",
                  fontWeight: "500",
                  letterSpacing: "1px",
                }}
              >
                Alumni Association
              </div>
            </div>
          </Col>

          <Col xs="auto" className="px-2">
            <div style={{ borderLeft: "2px solid #aaa", height: "40px" }}></div>
          </Col>

          <Col xs="auto">
            <div style={{ fontSize: "15px", color: "#222", lineHeight: "1.4" }}>
              Kanpur 
              <br />
               Institute Of
              <br />
              Technology, Kanpur
            </div>
          </Col>

          {/* Login/Logout */}
          <Col className="text-end">
            {isLoggedIn ? (
              <div
                onClick={handleLogout}
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#000",
                  cursor: "pointer",
                }}
              >
                LOGOUT
              </div>
            ) : (
              <div
                onClick={handleRegisterLogin}
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#000",
                  cursor: "pointer",
                }}
              >
                REGISTER ::: LOGIN
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* NAV LINKS */}
      <div style={{ backgroundColor: "#fff", borderBottom: "2px solid #f26924" }}>
        <Container>
          <Nav className="mx-auto">
            {navItems
              .filter((item) => item.visible === undefined || item.visible)
              .map(({ label, href, isNew, submenu }) => (
                <Nav.Item
                  key={label}
                  className="position-relative"
                  style={{ margin: "0 3px" }}
                  onMouseEnter={() => setHoveredMenu(label)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <Nav.Link
                    href={href}
                    style={{
                      padding: "12px 16px",
                      color: "#000",
                      fontSize: "12px",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                    {isNew && (
                      <Badge
                        bg="warning"
                        text="dark"
                        style={{
                          fontSize: "10px",
                          verticalAlign: "top",
                          marginLeft: "4px",
                        }}
                      >
                        NEW
                      </Badge>
                    )}
                  </Nav.Link>

                  {/* Submenu */}
                  {submenu && hoveredMenu === label && (
                    <div
                      className="dropdown-menu"
                      style={{
                        display: "block",
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        zIndex: 1000,
                        backgroundColor: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "8px 0",
                        minWidth: "180px",
                      }}
                    >
                      {submenu.map((item) => (
                        <a
                          key={item.label}
                          className="dropdown-item"
                          href={item.href}
                          style={{
                            padding: "8px 20px",
                            fontSize: "14px",
                            color: "#000",
                          }}
                        >
                          {item.label}
                          {item.isNew && (
                            <Badge bg="warning" text="dark" className="ms-2">
                              NEW
                            </Badge>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </Nav.Item>
              ))}
          </Nav>
        </Container>
      </div>
    </div>
      )}
  </>
  );
};

export default CustomNavbar;
