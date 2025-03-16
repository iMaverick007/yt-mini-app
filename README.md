# YouTube Mini App

This project is a YouTube Mini App built with React and Vite on the frontend, and Express with MongoDB on the backend.

## Technologies Used

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Toastify

### Backend
- Express
- MongoDB
- Mongoose
- Google APIs
- dotenv
- cors
- body-parser

## API Endpoints

### Fetch Video Details
- **Endpoint:** `GET /api/video`
- **Description:** Fetches details of a YouTube video.
- **Parameters:**
  - `videoId` (query parameter): The ID of the YouTube video.
- **Response:** JSON object containing video details.

### Add a Comment
- **Endpoint:** `POST /api/comment`
- **Description:** Adds a comment to a YouTube video.
- **Body:**
  - `videoId` (string): The ID of the YouTube video.
  - `textOriginal` (string): The content of the comment.
- **Response:** JSON object containing the added comment details.

### Update Video Title
- **Endpoint:** `PUT /api/video/title`
- **Description:** Updates the title of a YouTube video.
- **Body:**
  - `videoId` (string): The ID of the YouTube video.
  - `newTitle` (string): The new title for the video.
- **Response:** JSON object containing the updated video details.

### Delete a Comment
- **Endpoint:** `DELETE /api/comment/:commentId`
- **Description:** Deletes a comment from a YouTube video.
- **Parameters:**
  - `commentId` (path parameter): The ID of the comment to be deleted.
- **Response:** JSON object indicating success or failure.

## Database Schema

### EventLog Schema
- **Collection Name:** `EventLogs`
- **Fields:**
  - `eventType` (string, required): The type of event (e.g., "COMMENT_ADDED", "ERROR").
  - `details` (object, required): JSON object containing additional event details.
  - `createdAt` (date, default: Date.now): Timestamp of the event.
  - `updatedAt` (date, default: Date.now): Timestamp of the last update.

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/yt-mini-app.git
   cd yt-mini-app
   ```

2. Install dependencies for the frontend:
   ```sh
   cd Frontend
   npm install
   ```

3. Install dependencies for the backend:
   ```sh
   cd ../Backend
   npm install
   ```

4. Create a `.env` file in the `Backend` directory and add your environment variables:
   ```env
   CLIENT_ID=your-client-id
   CLIENT_SECRET=your-client-secret
   REDIRECT_URI=your-redirect-uri
   ACCESS_TOKEN=your-access-token
   REFRESH_TOKEN=your-refresh-token
   MONGO_URI=your-mongo-uri
   ```

### Running the Application

1. Start the backend server:
   ```sh
   cd Backend
   npm start
   ```

2. Start the frontend development server:
   ```sh
   cd ../Frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

