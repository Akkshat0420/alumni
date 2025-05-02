import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc, increment, arrayUnion } from "firebase/firestore";
import { FaBookmark, FaShareAlt, FaMoon, FaSun, FaRegThumbsUp, FaRegCommentDots } from "react-icons/fa";
import { db } from "./firebase";

const PostsPage1 = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [search, setSearch] = useState("");
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsRef = collection(db, "posts");
      try {
        const snapshot = await getDocs(postsRef);
        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("bg-dark", darkMode);
    document.body.classList.toggle("text-light", darkMode);
  }, [darkMode]);

  const handleLike = async (postId) => {
    if (likedPosts.has(postId)) return;
    const postRef = doc(db, "posts", postId);
    try {
      await updateDoc(postRef, { likes: increment(1) });
      setLikedPosts((prevLikedPosts) => new Set(prevLikedPosts).add(postId));
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post
        )
      );
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleComment = async (postId, comment) => {
    if (!comment.trim()) return;
    const postRef = doc(db, "posts", postId);
    try {
      await updateDoc(postRef, { comments: arrayUnion(comment) });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...(post.comments || []), comment] }
            : post
        )
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const toggleBookmark = (id) => {
    setBookmarkedPosts((prev) =>
      prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]
    );
  };

  return (
    <div
      className={`container-fluid py-4 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      style={{ minHeight: "100vh", transition: "0.4s" }}
    >
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center px-4 mb-4">
        <h3 className="text-primary fw-bold">🎓 Alumni Network</h3>
        <div className="d-flex align-items-center gap-3">
          <input
            type="text"
            className="form-control bg-white"
            style={{ width: "250px" }}
            placeholder="Search alumni posts..."
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
          <button className="btn btn-outline-secondary" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

      {/* Posts */}
      <div className="row justify-content-center">
        {posts
          .filter(
            (post) =>
              (post.username && post.username.toLowerCase().includes(search)) ||
              (post.content && post.content.toLowerCase().includes(search))
          )
          .map((post) => (
            <div className="col-12 col-md-10 col-lg-8 mb-4" key={post.id}>
              <div className={`card shadow-sm ${darkMode ? "bg-secondary text-white" : "bg-white"}`} style={{ borderRadius: "15px" }}>
                {/* Post Header */}
                <div className="card-body d-flex align-items-center">
                  <img
                    src={post.userImage || "https://via.placeholder.com/50"}
                    alt="Avatar"
                    className="rounded-circle me-3"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                  <div>
                    <h6 className="mb-0">{post.username || "User"}</h6>
                    <small className="text-muted">{new Date(post.timestamp).toLocaleString()}</small>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-4">
                  <p>{post.content}</p>

                  {/* Post Image(s) */}
                  {post.images && post.images.length > 1 ? (
                    <div id={`carousel${post.id}`} className="carousel slide mb-3" data-bs-ride="carousel">
                      <div className="carousel-inner rounded">
                        {post.images.map((img, index) => (
                          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <img src={img} className="d-block w-100" alt={`Slide ${index + 1}`} style={{ borderRadius: "10px" }} />
                          </div>
                        ))}
                      </div>
                      <button className="carousel-control-prev" type="button" data-bs-target={`#carousel${post.id}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                      </button>
                      <button className="carousel-control-next" type="button" data-bs-target={`#carousel${post.id}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                      </button>
                    </div>
                  ) : (
                    post.image && <img src={post.image} className="img-fluid rounded mb-3" alt="Post" />
                  )}
                </div>

                {/* Post Actions */}
                <div className="d-flex justify-content-around border-top py-2">
                  <button className="btn btn-light" onClick={() => handleLike(post.id)}>
                    <FaRegThumbsUp /> Like ({post.likes || 0})
                  </button>
                  <button className="btn btn-light" data-bs-toggle="collapse" data-bs-target={`#commentSection${post.id}`}>
                    <FaRegCommentDots /> Comment ({post.comments?.length || 0})
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={() => navigator.share({ title: post.username, text: post.content })}
                  >
                    <FaShareAlt /> Share
                  </button>
                  <button
                    className={`btn ${bookmarkedPosts.includes(post.id) ? "btn-warning" : "btn-outline-warning"}`}
                    onClick={() => toggleBookmark(post.id)}
                  >
                    <FaBookmark /> {bookmarkedPosts.includes(post.id) ? "Saved" : "Save"}
                  </button>
                </div>

                {/* Comments Section */}
                <div className="collapse p-3" id={`commentSection${post.id}`}>
                  {post.comments?.length > 0 && (
                    <ul className="list-unstyled mb-3">
                      {post.comments.map((cmt, idx) => (
                        <li key={idx} className="mb-2 d-flex align-items-start">
                          <img
                            src="https://via.placeholder.com/40"
                            className="rounded-circle me-2"
                            alt="Comment Avatar"
                            style={{ width: "30px", height: "30px" }}
                          />
                          <span>{cmt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Write a comment..." id={`commentInput${post.id}`} />
                    <button
                      className="btn btn-primary"
                      onClick={() => handleComment(post.id, document.getElementById(`commentInput${post.id}`).value)}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostsPage1;
