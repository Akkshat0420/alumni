import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { db } from "./firebase"; 
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const PostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState(""); 
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false); 
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const currentUser = auth.currentUser;

  const handleImageUpload = async () => {
    if (!image) return null;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "qcyqeq7z");
    formData.append("cloud_name", "dphtfwnx4");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dphtfwnx4/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const imageUrl = await handleImageUpload();

      const newPost = {
        userId: userId,
        title: title,
         name: currentUser.name,                
         profileImage: currentUser.profileImage,
        content: content,
        image: imageUrl || "",
        timestamp: serverTimestamp(),
        likes: 0,
        comments: [],
      };

      const docRef = await addDoc(collection(db, "posts"), newPost);
      console.log("Post added with ID: ", docRef.id);

      setTitle("");
      setContent("");
      setImage(null);
      setPrompt(""); 
    } catch (error) {
      console.error("Error adding post: ", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerateWithAI = async () => {
    if (!prompt || isGenerating) return;
    setIsGenerating(true);
  
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`, 
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a creative assistant that generates blog post titles and contents.' },
            { role: 'user', content: `Generate a post based on: ${prompt}` },
          ],
          max_tokens: 200,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        alert(`OpenAI Error: ${errorData.error?.message || 'Something went wrong'}`);
        return;
      }
  
      const data = await response.json();
  
      if (data.choices && data.choices.length > 0) {
        const aiText = data.choices[0].message.content;
  
        const [generatedTitle, ...generatedContent] = aiText.split("\n").filter(Boolean);
        setTitle(generatedTitle.replace('Title:', '').trim());
        setContent(generatedContent.join("\n").replace('Content:', '').trim());
      } else {
        console.error('No choices returned:', data);
        alert('AI did not return any choices. Try again.');
      }
    } catch (error) {
      console.error('AI generation failed:', error);
      alert('AI generation failed. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };
  

  return (
    <div
      style={{
        backgroundImage: `url('crepost.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
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

              
              <Form onSubmit={handlePostSubmit}>
               
                <Form.Group controlId="aiPrompt">
                  <Form.Label>Give Prompt for AI (optional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter prompt for AI to generate title and content..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <div className="text-center mt-2">
                    <Button
                      variant="success"
                      onClick={handleGenerateWithAI}
                      disabled={isGenerating}
                    >
                      {isGenerating ? "Generating..." : "Generate with AI"}
                    </Button>
                  </div>
                </Form.Group>

               
                <Form.Group controlId="postTitle" className="mt-4">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Post Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>

               
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

               
                <Form.Group controlId="postImage" className="mt-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Form.Group>

              
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
