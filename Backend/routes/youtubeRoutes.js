const express = require("express");
const { google } = require("googleapis");
const EventLog = require("../models/EventLog");
const router = express.Router();

// YouTube API Initialization
const youtube = google.youtube("v3");
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Helper function to set OAuth tokens
oauth2Client.setCredentials({
  access_token: process.env.ACCESS_TOKEN,
  refresh_token: process.env.REFRESH_TOKEN,
});

router.get('/video', async (req, res) => {
    try {
      let { videoId } = req.query;
  
      if (!videoId) {
        return res.status(400).json({ error: 'Missing videoId parameter' });
      }
  
      // Trim whitespace or newline characters
      videoId = videoId.trim();
  
      const response = await youtube.videos.list({
        auth: oauth2Client, // Use OAuth2 client for authentication
        part: 'snippet',    // Specify the parts you want (e.g., snippet for details)
        id: videoId,        // Include the cleaned video ID here
      });
  
      if (response.data.items.length === 0) {
        return res.status(404).json({ error: 'Video not found or inaccessible' });
      }
  
      res.json(response.data.items[0]); // Return the video details
    } catch (error) {
      console.error('Error fetching video details:', error.response?.data || error.message);
      res.status(500).json({ error: 'Unable to fetch video details' });
    }
  });
  
// Route to add a comment
router.post("/comment", async (req, res) => {
  try {
    const { videoId, textOriginal } = req.body;

    const response = await youtube.commentThreads.insert({
      auth: oauth2Client,
      part: "snippet",
      requestBody: {
        snippet: {
          videoId,
          topLevelComment: {
            snippet: {
              textOriginal,
            },
          },
        },
      },
    });

    // Log the event
    await EventLog.create({
      eventType: "COMMENT_ADDED",
      details: { videoId, textOriginal },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

router.put('/video/title', async (req, res) => {
    try {
      const { videoId, newTitle } = req.body;
  
      if (!videoId || !newTitle) {
        return res.status(400).json({ error: 'Missing videoId or newTitle parameter' });
      }
  
      // Provide a valid categoryId (example: 22 for "People & Blogs")
      const categoryId = '22'; // Replace with the appropriate category for your video
  
      const response = await youtube.videos.update({
        auth: oauth2Client,
        part: 'snippet',
        requestBody: {
          id: videoId,
          snippet: {
            title: newTitle,
            categoryId: categoryId, // Include categoryId in the payload
          },
        },
      });
  
      res.json(response.data);
    } catch (error) {
      console.error('Error updating video title:', error.response?.data || error.message);
      res.status(500).json({ error: 'Unable to update video title' });
    }
  });
  
// Route to delete a comment
router.delete("/comment/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;

    const response = await youtube.comments.delete({
      auth: oauth2Client,
      id: commentId,
    });

    // Log the event
    await EventLog.create({
      eventType: "COMMENT_DELETED",
      details: { commentId },
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

module.exports = router;
