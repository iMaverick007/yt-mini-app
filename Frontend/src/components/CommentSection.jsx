import React, { useState } from "react";
import { addComment, deleteComment } from "../api";
import { toast } from "react-toastify";

const CommentSection = ({ videoId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Add a new comment
  const handleAddComment = async () => {
    try {
      if (!videoId || !comment.trim()) {
        toast.error("Video ID and Comment are required!"); // Ensure clear validation
        return;
      }
      const { data } = await addComment(videoId, comment);
      const newComment = {
        id: data.id,
        text: comment,
      };
      setComments((prev) => [...prev, newComment]);
      toast.success("Comment added successfully!");
      setComment(""); // Clear input field
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    }
  };

  // Delete an existing comment
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 shadow-md rounded-lg mt-6">
      <h3 className="text-lg font-medium text-blue-600 mb-4">Comment Section</h3>

      {/* Input for Adding Comment */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment"
          className="w-full sm:w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddComment}
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 w-full sm:w-1/4"
        >
          Add Comment
        </button>
      </div>

      {/* Display Comments */}
      <ul className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li
              key={comment.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow"
            >
              <span>{comment.text}</span>
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-500"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No comments available.</p>
        )}
      </ul>
    </div>
  );
};

export default CommentSection;