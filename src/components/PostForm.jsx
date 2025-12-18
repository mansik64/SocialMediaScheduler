import React, { useState, useEffect } from "react";

export default function PostForm({ addPost, showToast }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  // Set default date & time
  useEffect(() => {
    const today = new Date();
    const dateStr = today.toISOString().split("T")[0];

    const next = new Date();
    next.setHours(today.getHours() + 1);
    next.setMinutes(Math.ceil(today.getMinutes() / 15) * 15);

    const timeStr = next.toTimeString().slice(0, 5);

    setScheduleDate(dateStr);
    setScheduleTime(timeStr);
  }, []);

  // Platform toggle
  const togglePlatform = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  // Image upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageData(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return showToast("Please enter a title", "error");
    if (!content.trim()) return showToast("Please enter content", "error");
    if (selectedPlatforms.length === 0)
      return showToast("Please select at least one platform", "error");
    if (!scheduleDate || !scheduleTime)
      return showToast("Select date & time", "error");

    // Combine date + time
    const [year, month, day] = scheduleDate.split("-");
    const [hours, mins] = scheduleTime.split(":");
    const scheduledFor = new Date(year, month - 1, day, hours, mins);

    if (scheduledFor.getTime() < Date.now())
      return showToast("Cannot schedule posts in past", "error");

    const newPost = {
      id: Math.random().toString(36).slice(2),
      title,
      content,
      image: imageData,
      platforms: selectedPlatforms,
      scheduledFor,
      created: new Date(),
    };

    addPost(newPost);

    // Reset
    setTitle("");
    setContent("");
    setSelectedPlatforms([]);
    setImageData(null);
  };

  return (
    <div className="form-container">
      <h2>Create Post</h2>

      <div className="post-form">
        <h3>Create New Post</h3>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label>Title</label>
            <input
              className="input-field"
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content */}
          <div className="form-group">
            <label>Content</label>
            <textarea
              className="input-field"
              placeholder="What's on your mind?"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label>Image (optional)</label>

            <div className="image-upload-container">
              <div
                className={`image-preview ${imageData ? "has-image" : ""}`}
                style={{
                  backgroundImage: imageData ? `url(${imageData})` : "none",
                }}
              ></div>

              <div className="upload-button-container">
                <label className="upload-button">
                  <i className="fas fa-cloud-upload-alt"></i> Upload Image
                  <input hidden type="file" accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>
            </div>
          </div>

          {/* Platform Selector */}
          <div className="form-group">
            <label>Platforms</label>

            <div className="platform-selector">
              {["twitter", "facebook", "instagram", "linkedin"].map((p) => (
                <button
                  type="button"
                  key={p}
                  className={`platform-button ${
                    selectedPlatforms.includes(p) ? "selected" : ""
                  }`}
                  onClick={() => togglePlatform(p)}
                >
                  <i className={`fab fa-${p}`}></i> {p}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="form-group">
            <label>Schedule Date & Time</label>

            <div className="date-time-container">
              <div className="date-input-container">
                <label>Date</label>
                <input
                  className="input-field"
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                />
              </div>

              <div className="time-input-container">
                <label>Time</label>
                <input
                  className="input-field"
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Button */}
          <button type="submit" className="schedule-button">
            Schedule Post
          </button>
        </form>
      </div>
    </div>
  );
}
