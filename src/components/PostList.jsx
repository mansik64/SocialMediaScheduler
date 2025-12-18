import React from "react";
import PostCard from "./PostCard";

export default function PostList({ posts, deletePost }) {
  return (
    <div className="posts-container">
      <h2>Scheduled Posts</h2>

      <div className="posts-list-container">
        {posts.length === 0 ? (
          <div className="empty-posts-message">
            No posts scheduled. Create your first post!
          </div>
        ) : (
          <div className="posts-list">
            {posts
              .sort(
                (a, b) =>
                  new Date(a.scheduledFor) - new Date(b.scheduledFor)
              )
              .map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  deletePost={deletePost}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
