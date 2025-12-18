import React from "react";

export default function PostCard({ post, deletePost }) {
  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Platform icons mapping
  const icons = {
    twitter: "fab fa-twitter",
    facebook: "fab fa-facebook-f",
    instagram: "fab fa-instagram",
    linkedin: "fab fa-linkedin-in",
  };

  // Platform names mapping
  const names = {
    twitter: "Twitter/X",
    facebook: "Facebook",
    instagram: "Instagram",
    linkedin: "LinkedIn",
  };

  return (
    <div className="post-card" data-post-id={post.id}>
      {/* Header */}
      <div className="post-header">
        <div className="post-title">{post.title}</div>
        <div className="post-date">{formatDate(post.scheduledFor)}</div>
      </div>

      {/* Content */}
      <div className="post-content">{post.content}</div>

      {/* Image */}
      {post.image && (
        <div
          className="post-image"
          style={{ backgroundImage: `url(${post.image})` }}
        ></div>
      )}

      {/* Platforms */}
      <div className="post-platforms">
        {post.platforms.map((p) => (
          <span key={p} className="platform-tag">
            <i className={icons[p]}></i> {names[p]}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="post-actions">
        <button
          className="delete-post-button"
          onClick={() => deletePost(post.id)}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
}
