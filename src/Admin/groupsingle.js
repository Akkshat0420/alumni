import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const GroupPage = ({ data }) => {
  const groupImage =
    data?.group?.image ||
    "https://alumni.princeton.edu/sites/default/files/styles/16_9__1366x768/public/2025-05/pprr2025symposium_042625_0224.gif?h=ed27e282&itok=N1xGbh33";

  return (
    <div className="d-flex flex-column" style={{ backgroundColor: "#fff", position: "relative" }}>
      {/* Image Section */}
      <div style={{ position: "relative" }}>
        <img
          src={groupImage}
          alt="Group"
          className="img-fluid"
          style={{ width: "100%", marginLeft:"20px", paddingLeft:"70px", maxHeight: "600px", objectFit: "cover" }}
        />

       
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "20px",
            backgroundColor: "#fff",
            padding: "30px",
            maxWidth: "700px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <small className="text-muted">Awards</small>
          <h2 className="fw-bold mt-2">
            Race Relations awardees recognized at campus symposium
          </h2>
          <p className="mt-3 mb-3">
            University celebrated Prize in Race Relations award recipients
            at the annual Prize Symposium on Race.
          </p>
          <button className="btn btn-warning fw-semibold">Experience Shared By Alumnis</button>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
