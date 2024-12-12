import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
  const styles = {
    textGold: { color: "#d4af37" },
    textDarkBlue: { color: "#002855" },
    textLightBlue: { color: "#7daed3" },
    bgLightGray: { backgroundColor: "#f7f7f7" },
    btnGold: {
      backgroundColor: "#d4af37",
      color: "#fff",
      border: "none",
    },
    btnGoldHover: {
      backgroundColor: "#c4992e",
    },
    btnDarkBlue: {
      backgroundColor: "#002855",
      color: "#fff",
      border: "none",
    },
    btnDarkBlueHover: {
      backgroundColor: "#001d3a",
    },
    hoverHighlight: {
      textDecoration: "underline",
      color: "#d4af37",
    },
    heroSection: {
      backgroundImage: "url('luxury-home2.webp')",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      padding: "100px 0",
      position: "relative",
    },
    heroOverlay: {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
    },
    heroContent: {
      position: "relative",
      zIndex: 1,
    },
    fadeIn: {
      animation: "fadeIn 1s ease-in-out",
    },
    galleryImage: {
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "15px",
    },
    fadeInKeyframes: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `,
    chatWidget: {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
        maxHeight: "400px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#fff",
        zIndex: 1000,
      },
      chatHeader: {
        backgroundColor: "#002855",
        color: "#fff",
        padding: "10px",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
      },
      chatBody: {
        padding: "10px",
        height: "300px",
        overflowY: "auto",
      },
      chatInput: {
        padding: "10px",
        borderTop: "1px solid #ccc",
      },
      chatButton: {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#d4af37",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        fontSize: "24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
  };

  // Adding dynamic styles to the page
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(styles.fadeInKeyframes, styleSheet.cssRules.length);
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <a className="navbar-brand" style={styles.textGold} href="/">
            Luxury Mortgages
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#services"
                  style={{ color: "#fff" }}
                >
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#gallery"
                  style={{ color: "#fff" }}
                >
                  Gallery
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#contact"
                  style={{ color: "#fff" }}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
     
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroOverlay}></div>
        <div className="container text-center text-white" style={styles.heroContent}>
          <h1 style={styles.textGold}>Find Your Dream Mortgage</h1>
          <p style={styles.textLightBlue}>
            Trusted partners for luxury homes and professional solutions.
          </p>
          <a href="#contact" className="btn btn-lg mt-3" style={styles.btnGold}>
            Get a Quote
          </a>
        </div>
      </div>
      <button
        style={styles.chatButton}
        onClick={toggleChat}
        aria-label="Open Live Chat"
      >
        💬
      </button>

      {/* Chat Widget */}
      {isChatOpen && (
        <div style={styles.chatWidget}>
          <div style={styles.chatHeader}>
            <strong>Live Chat Support</strong>
            <button
              style={{ float: "right", color: "#fff", background: "none", border: "none" }}
              onClick={toggleChat}
            >
              ×
            </button>
          </div>
          <div style={styles.chatBody}>
            <p>Hi! How can we help you today?</p>
            <p><strong>You:</strong> Please share your query...</p>
          </div>
          <div style={styles.chatInput}>
            <input
              type="text"
              className="form-control"
              placeholder="Type your message..."
            />
          </div>
        </div>
      )}
      {/* Services Section */}
      <div id="services" style={styles.bgLightGray} className="py-5">
        <div className="container">
          <h2 className="text-center" style={styles.textDarkBlue}>
            Our Services
          </h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-body">
                  <h5 style={styles.textDarkBlue}>Mortgage Pre-Approval</h5>
                  <p>
                    Get pre-approved for your dream home with ease and
                    confidence.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-body">
                  <h5 style={styles.textDarkBlue}>Loan Comparison</h5>
                  <p>
                    Compare rates and terms from top luxury lenders.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow">
                <div className="card-body">
                  <h5 style={styles.textDarkBlue}>Refinancing Options</h5>
                  <p>
                    Lower your payments and maximize your investments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div id="gallery" className="py-5">
        <div className="container">
          <h2 className="text-center" style={styles.textDarkBlue}>
            Gallery
          </h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <img
                src="luxury-home1.webp"
                alt="Luxury Home 1"
                style={{ ...styles.galleryImage, ...styles.fadeIn }}
                className="img-fluid"
              />
            </div>
            <div className="col-md-4">
              <img
                src="luxury-home2.webp"
                alt="Luxury Home 2"
                style={{ ...styles.galleryImage, ...styles.fadeIn }}
                className="img-fluid"
              />
            </div>
            <div className="col-md-4">
              <img
                src="luxury-home3.webp"
                alt="Luxury Home 3"
                style={{ ...styles.galleryImage, ...styles.fadeIn }}
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
      <div id="contact" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center text-primary mb-4">Contact Us</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" placeholder="Your Name" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="Your Email" />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <section className="about-section py-5 bg-light text-center">
      <div className="container">
        <h2 className="mb-4">About Us</h2>
        <p className="lead">
          Welcome to Mortgage Solutions! We are committed to providing the best
          mortgage advice and solutions tailored to your financial goals. Our
          team of experienced professionals ensures that you find the perfect
          plan to achieve your dream home ownership or refinance your current
          property with ease.
        </p>
        <p className="text-muted">
          With years of experience in the mortgage industry, we take pride in
          offering exceptional customer service, competitive rates, and a smooth
          application process. Let us help you take the next step in your home
          ownership journey!
        </p>
      </div>
    </section>
      <footer className="bg-dark py-3 text-white text-center">
      <div className="container text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} Mortgage Solutions. All rights
          reserved.
        </p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="/privacy-policy" className="text-white">
              Privacy Policy
            </a>
          </li>
          <li className="list-inline-item">
            <a href="/terms-of-service" className="text-white">
              Terms of Service
            </a>
          </li>
          <li className="list-inline-item">
            <a href="/contact-us" className="text-white">
              Contact Us
            </a>
          </li>
        </ul>
        <div className="social-icons mt-3">
          <a href="https://facebook.com" className="text-white mx-2">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://twitter.com" className="text-white mx-2">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="https://linkedin.com" className="text-white mx-2">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </div>
        <p>&copy; 2024 Luxury Mortgages. All rights reserved.</p>
        <div>
          <a href="#" className="text-white mx-2">
            Facebook
          </a>
          <a href="#" className="text-white mx-2">
            Twitter
          </a>
          <a href="#" className="text-white mx-2">
            Instagram
          </a>
        </div>

      </footer>
    </div>
  );
};

export default HomePage;
