import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { where,query } from "firebase/firestore";
import { db } from "../components/firebase";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import AlumniTestimonials from "./alumnitestmonial";
import UpcomingEvents from "./upcomingevent";
import GroupPage from "./groupsingle";
import { useParams,useLocation } from "react-router-dom";
import SliderSection from "./slidersection";
import FeaturesSection from "./featuresection";
const CollegeView = () => {
  const [data, setData] = useState(null);
   //const { shortName } = useParams();
  const location = useLocation();
  const collegeData = location.state;
  useEffect(() => {
   const fetchCollegeData = async () => {
  if (!collegeData?.name) return;

  const q = query(
    collection(db, "college"),
    where("college", "==", collegeData.name)
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docSnap = querySnapshot.docs[0];
    const defaultData = {
      name: "Unnamed College",
      description: "No description available.",
      logo: "https://via.placeholder.com/100",
      coverImage: "https://via.placeholder.com/900x250",
      events: [{ title: "", image: "" }],
      groupPhotos: [],
      videoUrl: "",
      testimonials: [],
      totalAlumni: 0,
    };
    setData({ ...defaultData, ...docSnap.data() });
  } else {
    console.error("No college found with name:", collegeData.name);
  }
};
    fetchCollegeData();
  }, []);
   const defaultEvents = [
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSHyddMvgDJzvG0wjmU4Ei-feu8M6npnV6oA&s",
      title: "Tech Fest 2025",
    },
    {
      image: "https://hritacademy.edu.np/wp-content/uploads/2023/06/Almuni-Meet-Up-Vertical.jpg",
      title: "Alumni Meetup",
    },
    {
      image: "https://calendarmedia.blob.core.windows.net/assets/b309f57e-6c03-439b-8f2e-11c2090217c7.jpeg",
      title: "Cultural Night",
    },
  ];

  const eventsToRender = Array.isArray(data?.events) && data.events.length > 0
    ? data.events
    : defaultEvents;

  if (!data) return <p style={{ textAlign: "center", marginTop: 50 }}>Loading college data...</p>;

  return (
    <div style={{width:"100%", margin: "auto", padding: "4px", fontFamily: "sans-serif" }}>
      {/* Header Section */}
      <div style={{ position: "relative", textAlign: "center", marginBottom: 40 }}>
        <img src={data.coverImage||"https://via.placeholder.com/100"} alt="Cover" style={{ width: "100%", height: 250, objectFit: "cover", borderRadius: 10 }} />
        <img
          src={data.collegelogo || "https://via.placeholder.com/100"}
          alt="Logo"
          style={{ width: 100, height: 100, borderRadius: "50%", position: "absolute", top: 200, left: "50%", transform: "translateX(-50%)", border: "3px solid white" }}
        />
        <h2 style={{ marginTop: 60 }}>{data.college}</h2>
        <p style={{ fontSize: 16, color: "#555" }}>{data.description}</p>
      </div>
      <GroupPage data={{data}}/>
      {/* Alumni Stats */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h3 style={{ fontSize: 24 }}>Total Alumni</h3>
        <p style={{ fontSize: 32, fontWeight: "bold", color: "#007bff" }}>{data.totalAlumni || "000"}+</p>
        <button style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: 5 }}>
          Share Your Experience
        </button>
      </div>

      {/* Testimonials Section */}
     <AlumniTestimonials data={{data}}/>

      {/* Event Section */}
    <UpcomingEvents data={{data}} />

    

      {/* Video Section */}
      <div style={{ position: "relative", marginBottom: 40 }}>
  <div style={{ position: "relative", height: "60vh", overflow: "hidden" }}>
    <iframe
      src={data.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ "}
      title="Background Video"
      allowFullScreen
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 1,
        border: "none",
      }}
    ></iframe>
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
        color: "white",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: 32, fontWeight: "bold" }}>
        Online, around the world, <br />
        People connect to celebrate!
      </h2>
      <button
        style={{
          marginTop: 20,
          padding: "10px 20px",
          backgroundColor: "#f57c00",
          border: "none",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Connect
      </button>
    </div>
  </div>

  {/* Optional second video */}
  
</div>

 <div style={{ fontFamily: "sans-serif", color: "white" }}>
      {/* Top Section: Connect / Volunteer / Give */}
      <div style={{ display: "flex", textAlign: "center", height: "80vh" }}>
        {/* Connect */}
        <div
          style={{
            flex: 1,
            background: `url('https://alumni.princeton.edu/sites/default/files/styles/1_1__525x525/public/2021-03/web-Maclean-House.jpg') center/cover no-repeat`,
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontSize: "2em", margin: 0 }}>Connect</h2>
            <a
              href="/"
              style={{ marginTop: "10px", color: "white", textDecoration: "underline" }}
            >
              Connect With Alumni
            </a>
          </div>
        </div>

        {/* Volunteer */}
        <div
          style={{
            flex: 1,
            background: `url('https://alumni.princeton.edu/sites/default/files/styles/1_1__525x525/public/2021-02/pu_010528_2013-2-8_jrp1303_0187.jpg') center/cover no-repeat`,
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontSize: "2em", margin: 0 }}>Volunteer</h2>
            <a
              href="/"
              style={{ marginTop: "10px", color: "white", textDecoration: "underline" }}
            >
              Get Involved
            </a>
          </div>
        </div>

        {/* Give */}
        <div
          style={{
            flex: 1,
            background: `url('https://alumni.princeton.edu/sites/default/files/styles/1_1__525x525/public/2020-10/AGBootcamp_0.jpg') center/cover no-repeat`,
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontSize: "2em", margin: 0 }}>Give</h2>
            <a
              href="/"
              style={{ marginTop: "10px", color: "white", textDecoration: "underline" }}
            >
              Make an Impact
            </a>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div style={{ backgroundColor: "#000", padding: "40px 20px" }}>
        {/* Logo and Links Row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "20px",
            borderBottom: "1px solid #FFA500",
            paddingBottom: "20px",
          }}
        >
          {/* Left: Logo */}
          <div style={{ flex: 1, minWidth: "200px" }}>
            <h2 style={{ margin: 0 }}>
              UNIVERSITY
              <br />
              PORTAL
              <br />
              <span style={{ color: "#FFA500" }}>ALUMNI</span>
            </h2>
          </div>

          {/* Right: Links */}
          <div
            style={{
              flex: 2,
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p>Contact</p>
            </div>
            <div>
              <p>Events</p>
            </div>
            <div>
              <p>Make a Gift</p>
            </div>
            <div>
              <p>About</p>
            </div>
            <div>
              <p>Alumni Services</p>
            </div>
            
          </div>
        </div>

        {/* Bottom: Legal and Social */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Legal Links */}
          <div style={{ fontSize: "12px", color: "#aaa" }}>
            <p>Copyright © 2025 The Trustees of Princeton University</p>
            <p>
              <a
                href="/"
                style={{
                  color: "#aaa",
                  textDecoration: "underline",
                  marginRight: "10px",
                }}
              >
                Accessibility
              </a>
              <a
                href="/"
                style={{
                  color: "#aaa",
                  textDecoration: "underline",
                  marginRight: "10px",
                }}
              >
                Advancement Data Privacy Policy
              </a>
              <a href="/" style={{ color: "#aaa", textDecoration: "underline" }}>
                Diversity and Non-Discrimination
              </a>
            </p>
          </div>

          {/* Social Icons */}
          <div style={{ display: "flex", gap: "10px" }}>
  <a href="/" style={{ color: "white" }}>
    <FaFacebookF size={24} />
  </a>
  <a href="/" style={{ color: "white" }}>
    <FaTwitter size={24} />
  </a>
  <a href="/" style={{ color: "white" }}>
    <FaLinkedinIn size={24} />
  </a>
  <a href="/" style={{ color: "white" }}>
    <FaInstagram size={24} />
  </a>
</div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CollegeView;
