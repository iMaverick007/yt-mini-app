import React, { useState } from "react";
import VideoDetails from "./components/VideoDetails";
import CommentSection from "./components/CommentSection";
import UpdateTitle from "./components/UpdateTitle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [videoId, setVideoId] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
        YouTube Mini App
      </h1>
      <VideoDetails />
      <div className="mt-10 sm:w-full md:w-3/4 lg:w-1/2 mx-auto">
        <input
          type="text"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          placeholder="Enter Video ID for Actions"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />
        <CommentSection videoId={videoId} />
        <UpdateTitle videoId={videoId} />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;