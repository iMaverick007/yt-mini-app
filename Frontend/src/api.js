import axios from "axios";

// Backend Base URL
const API = axios.create({
  baseURL: "https://yt-mini-app-backend.onrender.com/api",
});

// Fetch video details
export const fetchVideoDetails = (videoId) =>
  API.get(`/video`, { params: { videoId } });

// Add a comment
export const addComment = (videoId, textOriginal) =>
  API.post(`/comment`, { videoId, textOriginal });

// Delete a comment by its ID
export const deleteComment = (commentId) =>
  API.delete(`/comment/${commentId}`);

// Update video title
export const updateVideoTitle = (videoId, newTitle) =>
  API.put(`/video/title`, { videoId, newTitle });
