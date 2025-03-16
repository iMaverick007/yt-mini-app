import React, { useState } from "react";
import { updateVideoTitle } from "../api";
import { toast } from "react-toastify";

const UpdateTitle = ({ videoId }) => {
  const [newTitle, setNewTitle] = useState("");

  const handleUpdateTitle = async () => {
    try {
      if (!videoId || !newTitle.trim()) {
        toast.error("Video ID and New Title are required!"); // Validate inputs
        return;
      }
      const { data } = await updateVideoTitle(videoId, newTitle);
      toast.success(`Title updated to: ${data.snippet.title}`);
      setNewTitle(""); // Clear input field
    } catch (error) {
      console.error("Error updating title:", error);
      toast.error("Failed to update title.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 shadow-md rounded-lg mt-6">
      <h3 className="text-lg font-medium text-blue-600 mb-4">Update Title</h3>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter New Title"
          className="w-full sm:w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleUpdateTitle}
          className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-500 w-full sm:w-1/4"
        >
          Update Title
        </button>
      </div>
    </div>
  );
};

export default UpdateTitle;