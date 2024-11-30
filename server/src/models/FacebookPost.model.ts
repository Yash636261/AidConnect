import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Facebook post document
interface IFacebookPost extends Document {
  postId: number; // Unique ID for the Facebook post
  userId: number; // ID of the user who created the post
  username: string; // Username of the poster
  timestamp: Date; // Timestamp of the post
  location: string; // Location mentioned in the post
  mediaType: string; // Type of media (e.g., "image", "video")
  mediaUrl: string; // URL of the media
  text: string; // Content of the post
  hashtags: string[]; // Array of hashtags
  sentiment: string; // Sentiment expressed in the post (e.g., "Desperate")
  urgency: boolean; // Indicates if the post reflects urgency
  placeName: string; // Place name associated with the post
  coordinates: number[]; // Geographical coordinates [latitude, longitude]
  likes: number; // Number of likes
  comments: number; // Number of comments
  shares: number; // Number of shares
}

// Define the Facebook post schema
const FacebookPostSchema: Schema = new Schema({
  postId: {
    type: Number,
    required: true,
    unique: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  mediaType: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: true,
  },
  hashtags: [
    {
      type: String,
      required: false,
    },
  ],
  sentiment: {
    type: String,
    required: false,
  },
  urgency: {
    type: Boolean,
    required: false,
    default: false,
  },
  placeName: {
    type: String,
    required: false,
  },
  coordinates: [
    {
      type: Number,
      required: false,
    },
  ],
  likes: {
    type: Number,
    required: false,
    default: 0,
  },
  comments: {
    type: Number,
    required: false,
    default: 0,
  },
  shares: {
    type: Number,
    required: false,
    default: 0,
  },
});

// Create and export the model
const FacebookPost = mongoose.model<IFacebookPost>(
  "FacebookPost",
  FacebookPostSchema
);
export default FacebookPost;
