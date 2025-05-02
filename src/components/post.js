import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { db } from "./firebase"; // Import Firebase Firestore instance
import { addDoc, collection, serverTimestamp } from "firebase/firestore"; // Firestore methods
import { getAuth } from "firebase/auth";
const PostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // To show a loading state
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const handleImageUpload = async () => {
    if (!image) return null;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "qcyqeq7z");
    formData.append("cloud_name", "dphtfwnx4");// Replace with your Cloudinary cloud name

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dphtfwnx4/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return data.secure_url; // URL of the uploaded image
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Upload image to Cloudinary and get the URL
      const imageUrl = await handleImageUpload();

      // Create a new post object
      const newPost = {
        userId: userId, // User ID from props or context
        title: title,
        content: content,
        image: imageUrl || "", // Add the Cloudinary image URL if available
        timestamp: serverTimestamp(),
        likes: 0, // Initialize as an empty array
        comments: [], // Firebase server timestamp
      };

      // Save the new post to Firestore
      const docRef = await addDoc(collection(db, "posts"), newPost);
      console.log("Post added with ID: ", docRef.id);

      // Optionally, reset form fields after successful submission
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("Error adding post: ", error);
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div     style={{
        backgroundImage: `url('crepost.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}>
    <Container className="p-6">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div
            className="bg-light p-4 rounded shadow-sm"
            style={{
              background: "linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(0, 0, 0, 0.1))",
            }}
          >
            <h2 className="text-center mb-4">Create a New Post</h2>

            {/* Post Form */}
            <Form onSubmit={handlePostSubmit}>
              {/* Title Input */}
              <Form.Group controlId="postTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Post Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Content Input */}
              <Form.Group controlId="postContent" className="mt-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write your post here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Image Upload */}
              <Form.Group controlId="postImage" className="mt-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>

              {/* Submit Button */}
              <div className="text-center mt-4">
                <Button variant="primary" type="submit" disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Publish Post"}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
</div>
  );
};

export default PostPage;
