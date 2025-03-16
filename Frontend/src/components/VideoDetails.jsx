import React, { useState } from "react";
import { fetchVideoDetails } from "../api";
import { toast } from "react-toastify";

const VideoDetails = () => {
  const [videoId, setVideoId] = useState("");
  const [videoData, setVideoData] = useState(null);

  const handleFetchDetails = async () => {
    try {
      if (!videoId.trim()) {
        toast.error("Please enter a valid Video ID!");
        return;
      }
      const { data } = await fetchVideoDetails(videoId.trim());
      setVideoData(data);
      toast.success("Video details fetched successfully!");
    } catch (error) {
      console.error("Error fetching video details:", error);
      toast.error("Failed to fetch video details.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg sm:w-full md:w-3/4 lg:w-1/2 mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Video Details
      </h2>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          placeholder="Enter Video ID"
          className="w-full sm:w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleFetchDetails}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 w-full sm:w-1/4"
        >
          Fetch
        </button>
      </div>
      {videoData && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">{videoData.snippet.title}</h3>
          <p className="text-gray-600 mt-2">{videoData.snippet.description}</p>
          <img
            src={videoData.snippet.thumbnails.high.url}
            alt="Thumbnail"
            className="w-full mt-4 rounded-lg shadow"
          />
        </div>
      )}
    </div>
  );
};

export default VideoDetails;