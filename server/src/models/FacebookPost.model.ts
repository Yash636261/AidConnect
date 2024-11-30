import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the FacebookPost document
interface IFacebookPost extends Document {
  postId: number; // Unique identifier for the post
  userId: number; // User's unique identifier
  username: string; // Username of the user who posted
  timestamp: Date; // Date and time of the post
  location?: string; // Location mentioned in the post (optional)
  mediaType: string; // Type of media (e.g., "image", "video")
  mediaUrl?: string; // URL of the media (optional)
  text?: string; // Text content of the post (optional)
  hashtags?: string[]; // Array of hashtags in the post
  sentiment?: string; // Sentiment analysis result
  urgency: boolean; // Indicates whether the post is urgent
  placeName?: string; // Name of the place referenced in the post (optional)
  coordinates?: [number, number]; // Geolocation coordinates (latitude, longitude)
  likes?: number; // Number of likes on the post
  comments?: number; // Number of comments on the post
  shares?: number; // Number of shares of the post
}

// Define the schema for FacebookPost
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
    required: false,
  },
  hashtags: [{
    type: String,
    required: false,
  }],
  sentiment: {
    type: String,
    required: false,
  },
  urgency: {
    type: Boolean,
    required: true,
    default: false,
  },
  placeName: {
    type: String,
    required: false,
  },
  coordinates: {
    type: [Number],
    required: false,
  },
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
const FacebookPost = mongoose.model<IFacebookPost>('FacebookPost', FacebookPostSchema);
export default FacebookPost;
