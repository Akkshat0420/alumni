import React, { useEffect, useState, useRef } from "react";
import { db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  addDoc,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { FiSend, FiPaperclip, FiSmile } from "react-icons/fi";

const getChatId = (uid1, uid2) => {
  return uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
};

export default function ChatBox({ currentUserId, receiverId, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverProfile, setReceiverProfile] = useState(null);
  const chatId = getChatId(currentUserId, receiverId);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchReceiver = async () => {
      const docRef = doc(db, "users", receiverId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setReceiverProfile(docSnap.data());
    };
    fetchReceiver();
  }, [receiverId]);

  useEffect(() => {
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId: currentUserId,
      receiverId,
      text: newMessage,
      timestamp: serverTimestamp(),
    });
    setNewMessage("");
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center z-3">
      <div className="bg-white rounded-4 shadow w-100" style={{ maxWidth: 500 }}>
        {/* Header */}
        <div className="bg-primary text-white d-flex align-items-center p-3">
          {receiverProfile?.photoURL ? (
            <img
              src={receiverProfile.photoURL}
              alt="Receiver"
              className="rounded-circle me-3"
              style={{ width: 40, height: 40 }}
            />
          ) : (
            <div className="bg-white text-primary fw-bold rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 40, height: 40 }}>
              {receiverProfile?.name?.charAt(0) || "?"}
            </div>
          )}
          <div className="flex-grow-1">
            <div className="fw-semibold">{receiverProfile?.name || "Loading..."}</div>
            <div className="small text-light">Online</div>
          </div>
          <button className="btn btn-sm btn-close btn-close-white" onClick={onClose}></button>
        </div>

        {/* Messages */}
        <div className="bg-light overflow-auto px-3 py-2" style={{ height: "60vh" }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-4 mb-2 shadow-sm ${
                msg.senderId === currentUserId
                  ? "bg-primary text-white ms-auto rounded-end-0"
                  : "bg-white text-dark me-auto rounded-start-0"
              }`}
              style={{ maxWidth: "80%" }}
            >
              <div>{msg.text}</div>
              <div className="text-end small opacity-75 mt-1">
                {msg.timestamp?.toDate
                  ? new Date(msg.timestamp.toDate()).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-top p-2 bg-white d-flex align-items-center gap-2">
          <button className="btn btn-link text-muted p-1">
            <FiPaperclip size={20} />
          </button>
          <button className="btn btn-link text-muted p-1">
            <FiSmile size={20} />
          </button>
          <input
            type="text"
            className="form-control rounded-pill"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn btn-primary rounded-circle p-2" onClick={sendMessage}>
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
