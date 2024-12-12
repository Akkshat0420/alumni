import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LeanCanvas = () => {
  const boxStyle = {
    padding: "15px",
    borderRadius: "5px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    fontSize: "0.9rem",
    color: "#333",
    fontFamily: "'Roboto', sans-serif",
    textAlign: "left",  // Ensures text is aligned to the left
  };

  const wrapperBoxStyle = {
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fff",
    marginTop: "20px",
  };

  const titleStyle = {
    fontWeight: "600",
    fontSize: "1rem",
    marginBottom: "10px",
    textTransform: "uppercase",
  };

  const paragraphStyle = {
    fontSize: "0.85rem",
    lineHeight: "1.4",
  };

  const hoverEffect = {
    transition: "transform 0.2s ease",
  };

  const containerStyle = {
    maxWidth: "80%",
  };

  return (
    <div className="container-fluid" style={containerStyle}>
      <div style={wrapperBoxStyle}>
        <div className="row">
          {/* Problem Statement */}
          <div
            className="col-md-4"
            style={{
              ...boxStyle,
              backgroundColor: "#FFDFD3",
              ...hoverEffect,
            }}
          >
            <h5 style={titleStyle}>1. Problem Statement</h5>
            <ul style={paragraphStyle}>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Consumers struggle to find reliable and timely gadget repair services.
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                High cost of device repairs discourages repairs, leading to early device replacements.
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Limited access to affordable and trustworthy refurbished services.
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                E-waste is increasing due to lack of repair options and early disposal of gadgets.
              </li>
            </ul>
          </div>

          {/* Solution */}
          <div
            className="col-md-4"
            style={{
              ...boxStyle,
              backgroundColor: "#C1E1C1",
              ...hoverEffect,
            }}
          >
            <h5 style={titleStyle}>2. Solution</h5>
            <ul style={paragraphStyle}>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Easy-to-use platform connecting customers to local certified repair stores.
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Access to refurbished devices at lower costs, extending device lifecycle.
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Pickup and delivery options to minimize customer effort and device downtime.
              </li>
            </ul>
          </div>

          {/* Unique Value Proposition */}
          <div
            className="col-md-4"
            style={{
              ...boxStyle,
              backgroundColor: "#FFDAC1",
              ...hoverEffect,
            }}
          >
            <h5 style={titleStyle}>3. Unique Value Proposition</h5>
            <ul style={paragraphStyle}>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                <strong>One-stop solution</strong> for fast, reliable, and affordable gadget repairs.
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                <strong>Convenient booking</strong> via mobile and web platforms with repair status tracking.
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                <strong>Contributing to e-waste reduction</strong> by encouraging repair and refurbishing over disposal.
              </li>
            </ul>
          </div>
        </div>

        {/* Key Metrics and Unfair Advantage */}
        <div className="row">
          <div
            className="col-md-6"
            style={{
              ...boxStyle,
              backgroundColor: "#B3E5FC",
              ...hoverEffect,
            }}
          >
            <h5 style={titleStyle}>4. Key Metrics</h5>
            <ul style={paragraphStyle}>
             
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Customer satisfaction rate (CSAT)
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Revenue from repair services and refurbished device sales
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Refurbished devices sold
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Average repair turnaround time
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                E-waste reduction (saved from landfill)
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Customer retention and referral rate
              </li>
            </ul>
          </div>

          <div
            className="col-md-6"
            style={{
              ...boxStyle,
              backgroundColor: "#FFABAB",
              ...hoverEffect,
            }}
          >
            <h5 style={titleStyle}>5. Unfair Advantage</h5>
            <ul style={paragraphStyle}>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Proprietary technology for efficient repair tracking, service delivery, and inventory management of refurbished phones.
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                <strong>Strong reputation</strong> for transparency, reliability, and environmental responsibility by promoting e-waste reduction through repairs and refurbished sales.
              </li>
            </ul>
          </div>
        </div>

        {/* Channels, Revenue Stream, Cost Structure in a single row */}
        <div className="row">
          {/* Channels */}
          <div
            className="col-md-4"
            style={{
              ...boxStyle,
              backgroundColor: "#FFF176",
              ...hoverEffect,
            }}
          >
            <h5 style={titleStyle}>6. Channels</h5>
            <ul style={paragraphStyle}>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Digital marketing (Google Ads, social media)
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Partnerships with local repair shops and corporate clients
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Referral program for customers to promote services to others
              </li>
            </ul>
          </div>

         
          <div
            className="col-md-4"
            style={{
              ...boxStyle,
              backgroundColor: "#D1C4E9",
              ...hoverEffect,
            }}
          >
            <h5 style={titleStyle}>7. Revenue Stream</h5>
            <ul style={paragraphStyle}>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Charges for repair services
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Sale of refurbished phones and gadgets
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Commission from repair shops for referring customers
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Subscription services for regular maintenance
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Partnerships with local businesses for repair referrals
              </li>
            </ul>
          </div>

          {/* Cost Structure */}
          <div
            className="col-md-4"
            style={{
              ...boxStyle,
              backgroundColor: "#F5E0E6",
              ...hoverEffect,
            }}
          >
            <h5 style={titleStyle}>8. Cost Structure</h5>
            <ul style={paragraphStyle}>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                E-waste Management
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Marketing and advertising costs
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Repair Tools and Equipment
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Logistics and delivery costs
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Inventory for Refurbished Devices
              </li>
              <li style={{ listStyleType: 'none' }}>
                <span style={{ fontSize: "1.2rem", marginRight: "10px" }}>•</span>
                Operational Costs
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeanCanvas;
