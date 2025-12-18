import React, { useState, useEffect } from "react";
import "./assets/css/styles.css";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

function App() {
  const [posts, setPosts] = useState([]);
  const [toast, setToast] = useState(null);

  // Load posts on page load
  useEffect(() => {
    const saved = localStorage.getItem("scheduledPosts");
    if (saved) {
      const parsed = JSON.parse(saved).map((post) => ({
        ...post,
        scheduledFor: new Date(post.scheduledFor),
      }));
      setPosts(parsed);
    }
  }, []);

  // Save posts to localStorage
  useEffect(() => {
    localStorage.setItem("scheduledPosts", JSON.stringify(posts));
  }, [posts]);

  // Add new post
  const addPost = (post) => {
    setPosts((prev) => [...prev, post]);
    showToast("Post scheduled successfully!");
  };

  // Delete post
  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    showToast("Post deleted successfully!");
  };

  // Toast
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div id="appContainer" className="min-h-screen">
      {/* Header */}
      <div className="header">
        <h1>Social Media Scheduler</h1>
        <p>Plan and schedule your social media content in one place</p>
      </div>

      <div className="content-container">
        {/* Form */}
        <PostForm addPost={addPost} showToast={showToast} />

        {/* List */}
        <PostList posts={posts} deletePost={deletePost} />
      </div>

      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type} show`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

export default App;
