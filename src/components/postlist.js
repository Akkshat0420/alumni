import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc, increment, arrayUnion } from "firebase/firestore";
import { db } from "./firebase"; // Firebase configuration
//import { Link } from "react-router-dom";

const PostsPage1 = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set()); // To track liked posts

  // Fetch posts from Firestore
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

  // Handle likes (one like per user per post)
  const handleLike = async (postId) => {
    if (likedPosts.has(postId)) return; // Prevent multiple likes

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

  // Handle comments
  const handleComment = async (postId, comment) => {
    if (!comment.trim()) return; // Prevent empty comments

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

  return (
    <div>
      {/* Navbar */}
     
      {/* Posts */}
      <div className="container mt-5" >
        <h2 className="text-center text-primary mb-4">Shared Experience</h2>
        <div className="col justify-content-center">
          {posts.map((post) => (
            <div className="col-8 col-md-4 mb-4" key={post.id}>
              <div className="card shadow-sm">
                <div className="card-header d-flex align-items-center">
                  <img
                    src={post.userImage || "https://via.placeholder.com/50"}
                    alt="Avatar"
                    className="rounded-circle"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                  <div className="ms-3">
                    <h6 className="mb-0">{post.username || "User"}</h6>
                    <small className="text-muted">{new Date(post.timestamp).toLocaleString()}</small>
                  </div>
                </div>
                <div className="card-body">
                  <p style={{ fontSize: "14px" }}>{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="img-fluid rounded"
                      style={{ maxHeight: "300px", objectFit: "cover" }}
                    />
                  )}
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => handleLike(post.id)}
                  >
                    👍 Like ({post.likes || 0})
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    data-bs-toggle="collapse"
                    data-bs-target={`#commentSection${post.id}`}
                  >
                    💬 Comment ({post.comments?.length || 0})
                  </button>
                  <div className="collapse mt-3" id={`commentSection${post.id}`}>
                    <ul className="list-group mb-2">
                      {post.comments?.map((comment, index) => (
                        <li key={index} className="list-group-item" style={{ fontSize: "12px" }}>
                          {comment}
                        </li>
                      ))}
                    </ul>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add a comment..."
                        id={`commentInput${post.id}`}
                      />
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          const comment = document.getElementById(`commentInput${post.id}`).value;
                          handleComment(post.id, comment);
                          document.getElementById(`commentInput${post.id}`).value = "";
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsPage1;
