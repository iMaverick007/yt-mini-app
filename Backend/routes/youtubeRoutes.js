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

// Route to fetch video details
router.get('/video', async (req, res) => {
    try {
        let { videoId } = req.query;

        if (!videoId) {
            return res.status(400).json({ error: 'Missing videoId parameter' });
        }

        // Trim whitespace or newline characters
        videoId = videoId.trim();

        const response = await youtube.videos.list({
            auth: oauth2Client,
            part: 'snippet',
            id: videoId,
        });

        if (response.data.items.length === 0) {
            await EventLog.create({
                eventType: "VIDEO_DETAILS_FETCH_FAILED",
                details: { videoId, error: "Video not found or inaccessible" },
            });
            return res.status(404).json({ error: 'Video not found or inaccessible' });
        }

        // Log successful fetch
        await EventLog.create({
            eventType: "VIDEO_DETAILS_FETCHED",
            details: { videoId },
        });

        res.json(response.data.items[0]); // Return the video details
    } catch (error) {
        console.error('Error fetching video details:', error.response?.data || error.message);

        // Log error
        await EventLog.create({
            eventType: "ERROR",
            details: { endpoint: "GET /video", error: error.message },
        });

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

        // Log error
        await EventLog.create({
            eventType: "ERROR",
            details: { endpoint: "POST /comment", error: error.message },
        });

        res.status(500).json({ error: "Failed to add comment" });
    }
});

// Route to update video title
router.put('/video/title', async (req, res) => {
    try {
        const { videoId, newTitle } = req.body;

        if (!videoId || !newTitle) {
            return res.status(400).json({ error: 'Missing videoId or newTitle parameter' });
        }

        const categoryId = '22'; // Example categoryId: "22" for "People & Blogs"

        const response = await youtube.videos.update({
            auth: oauth2Client,
            part: 'snippet',
            requestBody: {
                id: videoId,
                snippet: {
                    title: newTitle,
                    categoryId: categoryId,
                },
            },
        });

        // Log the event
        await EventLog.create({
            eventType: "VIDEO_TITLE_UPDATED",
            details: { videoId, newTitle },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error updating video title:', error.response?.data || error.message);

        // Log error
        await EventLog.create({
            eventType: "ERROR",
            details: { endpoint: "PUT /video/title", error: error.message },
        });

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

        // Log error
        await EventLog.create({
            eventType: "ERROR",
            details: { endpoint: "DELETE /comment/:commentId", error: error.message },
        });

        res.status(500).json({ error: "Failed to delete comment" });
    }
});

module.exports = router;