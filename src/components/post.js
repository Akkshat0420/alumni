import React, { useState, useRef, useEffect } from "react";
import { Modal, Toast, Alert, Card } from "react-bootstrap";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "./firebase";

const CreatePost = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [selectedReaction, setSelectedReaction] = useState("👍");
  const [media, setMedia] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);

  const fileInputRef = useRef();
  const reactions = ["👍", "❤️", "😂", "😮", "😢", "👏"];
  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    const fetchUserStatus = async () => {
      if (!currentUser) return;
      try {
        let docRef = doc(db, "users", currentUser);
        let userSnap = await getDoc(docRef);

        if (!userSnap.exists()) {
          docRef = doc(db, "college", currentUser);
          userSnap = await getDoc(docRef);
        }

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserRole(userData.type);
          setIsApproved(userData.approved || true);
          setUserDetails({
            name: userData.name,
            profilePicture: userData.profileImage,
            college: userData.college,
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserStatus();
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), where("userId", "==", currentUser));
        const querySnapshot = await getDocs(q);
        const userPosts = [];
        querySnapshot.forEach((doc) => {
          userPosts.push({ id: doc.id, ...doc.data() });
        });
        userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [currentUser, showModal]);

  const handleClose = () => {
    setShowModal(false);
    clearPost();
    setEditingPostId(null);
  };

  const handleShow = () => {
    clearPost();
    setEditingPostId(null);
    setShowModal(true);
  };

  const clearPost = () => {
    setPostText("");
    setPostTitle("");
    setSelectedReaction("👍");
    setMedia(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const uploadToCloudinary = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "qcyqeq7z");
    formData.append("cloud_name", "dphtfwnx4");

    const url = file.type.startsWith("video")
      ? `https://api.cloudinary.com/v1_1/dphtfwnx4/video/upload`
      : `https://api.cloudinary.com/v1_1/dphtfwnx4/image/upload`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return null;
    }
  };

  const createPost = async () => {
    if (!postTitle.trim()) return alert("Please add a title.");
    if (!postText.trim() && !media) return alert("Please add some content or media.");
    if (!userDetails) return alert("User details not loaded yet.");

    let mediaUrl = null;
    if (media) {
      mediaUrl = await uploadToCloudinary(media);
      if (!mediaUrl) return alert("Media upload failed.");
    }

    try {
      if (editingPostId) {
        await updateDoc(doc(db, "posts", editingPostId), {
          title: postTitle,
          content: postText,
          media: mediaUrl,
          reaction: selectedReaction,
          updatedAt: new Date().toISOString(),
        });
        setToastMessage("Post updated successfully!");
      } else {
        await addDoc(collection(db, "posts"), {
          title: postTitle,
          content: postText,
          media: mediaUrl,
          reaction: selectedReaction,
          createdAt: new Date().toISOString(),
          userId: currentUser,
          name: userDetails.name,
          profilePicture: userDetails.profilePicture,
          college: userDetails.college,
          likes: 0,
          likedBy: [],
          comments: [],
        });
        setToastMessage("Post created successfully!");
      }

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setShowModal(false);
      clearPost();
      setEditingPostId(null);
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deleteDoc(doc(db, "posts", postId));
      setPosts(posts.filter((post) => post.id !== postId));
      setToastMessage("Post deleted successfully!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (post) => {
    setEditingPostId(post.id);
    setPostTitle(post.title || "");
    setPostText(post.content || "");
    setSelectedReaction(post.reaction || "👍");
    setMedia(null);
    setShowModal(true);
  };

  if (loading) return <p>Loading...</p>;

  const canPost = userRole === "college" || (userRole === "student" && isApproved);

  return (
    <>
      {canPost ? (
        <Card
          className="mb-3 shadow-sm p-3 rounded"
          onClick={handleShow}
          style={{
            cursor: "pointer",
            border: "1px solid #e0e0e0",
            background: "#f9f9f9",
          }}
        >
          <div className="d-flex align-items-center">
            {userDetails?.profilePicture && (
              <img
                src={userDetails.profilePicture}
                alt="Profile"
                style={{ width: 40, height: 40, borderRadius: "50%", marginRight: 12 }}
              />
            )}
            <input
              className="form-control rounded-pill"
              placeholder="What's on your mind?"
              readOnly
            />
          </div>
        </Card>
      ) : userRole === "student" ? (
        <Alert variant="warning">
          Your account is not yet approved by the college. You cannot create a post.
        </Alert>
      ) : null}

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingPostId ? "Edit Post" : "Create a Post"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userDetails && (
            <div className="d-flex align-items-center mb-3">
              <img
                src={userDetails.profilePicture}
                alt={userDetails.name}
                style={{ width: 50, height: 50, borderRadius: "50%", marginRight: 10 }}
              />
              <div>
                <strong>{userDetails.name}</strong>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>{userDetails.college}</div>
              </div>
            </div>
          )}
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className="form-control mb-2"
            onChange={(e) => setMedia(e.target.files[0])}
          />
          <div className="d-flex justify-content-around">
            {reactions.map((reaction) => (
              <span
                key={reaction}
                style={{
                  cursor: "pointer",
                  fontSize: selectedReaction === reaction ? "1.5rem" : "1.2rem",
                }}
                onClick={() => setSelectedReaction(reaction)}
              >
                {reaction}
              </span>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={createPost}>
            {editingPostId ? "Update" : "Post"}
          </button>
        </Modal.Footer>
      </Modal>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          minWidth: "200px",
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      <div className="mt-4">
        <h4>Your Posts</h4>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="mb-3 shadow-sm">
              <Card.Body>
                <h5>{post.title}</h5>
                <p>{post.content}</p>
                {post.media && (
                  post.media.endsWith(".mp4") ? (
                    <video controls style={{ width: "100%" }} src={post.media}></video>
                  ) : (
                    <img src={post.media} alt="media" style={{ width: "100%" }} />
                  )
                )}
                <div className="mt-2">
                  <small>{post.reaction}</small>
                  <button
                    className="btn btn-sm btn-outline-secondary float-end"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger float-end me-2"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </>
  );
};

export default CreatePost;
