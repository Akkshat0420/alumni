import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { auth } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import ChatBox from "./message";

const Postoverelay = ({ setoverrelay, userId }) => {
  const [userData, setUserData] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const currentUserId= auth.currentUser.uid;
  const handleClose = () => {
    setoverrelay(false);
  };

  useEffect(() => {
    async function fetchUserData() {
      if (!userId) return;
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.log("No such user");
      }
    }
  
    fetchUserData();
  }, [userId]);

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={handleClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">User Profile</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body text-center">
            {userData ? (
              <>
                <img
                  src={userData.profileImage}
                  alt="user"
                  className="rounded-circle mb-3"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <h5>{userData.name}</h5>
                <p className="text-muted mb-1">{userData.stream}</p>
                <p className="text-muted">{userData.batch}</p>

                <div className="modal-footer">
          <button
        onClick={() => setIsChatOpen(true)}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Message
      </button>

      {isChatOpen && (
        <ChatBox
          currentUserId={currentUserId}
          receiverId={userId}
          onClose={() => setIsChatOpen(false)}
        />
      )}
            {/* Optional: Add a Message button here */}
          </div>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Postoverelay;
