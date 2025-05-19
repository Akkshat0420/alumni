import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BsCameraVideoFill,
  BsImage,
  BsEmojiSmile,
  BsArrowLeft,
} from "react-icons/bs";
import {
  Camera,
  Image as ImageIcon,
  ThumbsUp,
  Edit,
  Trash,
  Send,
  MoreHorizontal,
  MessageCircle,
} from "lucide-react";

/*const PostPage = () => {
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
          'Authorization': ``, 
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
  };*/

export default function CreatePost() {
  const [postText, setPostText] = useState("");
  const [media, setMedia] = useState(null);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [editing, setEditing] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);
  const [showFeelings, setShowFeelings] = useState(false);
  //const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [posts, setPosts] = useState([]);
  const videoRef = useRef(null);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(URL.createObjectURL(file));
    }
  };

  const handleReaction = (reaction) => {
    setSelectedReaction(reaction);
    setShowReactions(false);
  };

  const toggleReactions = () => {
    setShowReactions(!showReactions);
  };

  const openCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setCameraStream(stream);
        videoRef.current.srcObject = stream;
      })
      .catch(() => alert("Camera access denied or not supported."));
  };

  const clearPost = () => {
    setPostText("");
    setMedia(null);
    setSelectedReaction(null);
    setLiked(false);
    setCommentText("");
    setShowComment(false);
    if (cameraStream) cameraStream.getTracks().forEach((track) => track.stop());
  };

  const createPost = () => {
    if (postText || media || cameraStream) {
      const newPost = { text: postText, media, reaction: selectedReaction };
      setPosts([newPost, ...posts]);
      clearPost();
    }
  };

  const deletePost = (index) => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    if (postText.trim() || media) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      clearPost();
    }
  };

  const toggleEdit = () => alert("Edit Post");
  const setShowDeleteModal = () => alert("Delete Post");

  return (
    <div
      className="card p-4 shadow-sm mb-4"
      style={{ maxWidth: "500px", margin: "auto" }}
    >
      <div className="d-flex align-items-center mb-3">
        <img
          src="avatar_image.webp"
          alt="User Avatar"
          style={{
            borderRadius: "50%",
            marginRight: "10px",
            width: "40px",
            height: "40px",
            objectFit: "cover",
          }}
        />
        <input
          type="text"
          placeholder="What's on your mind, Aditya?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="form-control"
          style={{ borderRadius: "20px" }}
        />
      </div>

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-danger" onClick={openCamera}>
          <BsCameraVideoFill /> Live Video
        </button>
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("mediaInput").click()}
        >
          <BsImage /> Photo/Video
        </button>
        <input
          type="file"
          id="mediaInput"
          accept="image/*,video/*"
          style={{ display: "none" }}
          onChange={handleMediaChange}
        />
        <button
          className="btn btn-warning"
          onClick={() => setShowFeelings(true)}
        >
          <BsEmojiSmile /> Feeling/Activity
        </button>
      </div>

      {showFeelings && (
        <div className="position-fixed w-100 h-100 top-0 start-0 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
          <div
            className="bg-white p-4 rounded shadow"
            style={{ width: "300px" }}
          >
            <BsArrowLeft
              size={24}
              style={{ cursor: "pointer" }}
              onClick={() => setShowFeelings(false)}
            />
            <h5>Select Feeling/Activity</h5>
            <div>😀 Happy 😢 Sad 😍 In Love 😡 Angry 😴 Sleepy</div>
          </div>
        </div>
      )}

      {media ? (
        media.includes("video") ? (
          <video src={media} controls className="w-100 rounded mb-3" />
        ) : (
          <img src={media} alt="Post Media" className="w-100 rounded mb-3" />
        )
      ) : (
        cameraStream && (
          <video ref={videoRef} autoPlay className="w-100 rounded mb-3" />
        )
      )}

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={clearPost}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={createPost}>
          Post
        </button>
      </div>

      {posts.map((post, index) => (
        <div className="rounded-xl shadow-lg card p-3 mb-3" key={index}>
          <div className="flex justify-between">
            <p className="text-lg font-semibold">{post.text}</p>
            <div className="relative inline-block text-right">
  <MoreHorizontal onClick={() => setShowOptions(!showOptions)} className="cursor-pointer" />
  {showOptions && (
    <div 
      className="absolute right- mt-2 bg-white p-2 shadow-md rounded-lg w-32 text-left" 
      style={{ minWidth: '150px' }}
    >
      <p 
        className="cursor-pointer hover:text-blue-500 px-2 py-1" 
        onClick={toggleEdit}
      >
        Edit Post
      </p>
      <p 
        className="cursor-pointer px-2 py-1" 
        style={{ color: 'red', fontWeight: '500' }} 
        onClick={setShowDeleteModal}
      >
        Delete Post
      </p>
    </div>
  )}
</div>

          </div>

          {post.media && (
            <img
              src={post.media}
              alt="Post Media"
              className="w-full rounded-lg mt-3"
            />
          )}

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="position-relative">
              <button
                className="btn btn-light"
                onClick={() => setLiked(!liked)}
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
              >
                {liked ? "👍 Liked" : "👍 Like"}
              </button>
              {showReactions && (
                <div
                  className="position-absolute"
                  style={{
                    top: "-40px",
                    left: "0",
                    display: "flex",
                    gap: "5px",
                  }}
                >
                  <span onClick={() => handleReaction("😀 Happy")}>😀</span>
                  <span onClick={() => handleReaction("❤️ Love")}>❤️</span>
                  <span onClick={() => handleReaction("😢 Sad")}>😢</span>
                  <span onClick={() => handleReaction("😡 Angry")}>😡</span>
                  <span onClick={() => handleReaction("😮 Wow")}>😮</span>
                </div>
              )}
            </div>

            <button
              className="btn btn-light"
              onClick={() => setShowComment(!showComment)}
            >
              💬 Comment
            </button>
            <button className="btn btn-light">🔄 Share</button>
          </div>

          {showComment && (
            <div className="mt-3">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          )}
        </div>
      ))}

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded shadow-md">
          Post created successfully!
        </div>
      )}
    </div>
  );
}
