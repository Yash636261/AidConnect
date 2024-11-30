import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Instagram story document
interface IInstagramStory extends Document {
  storyId: string; // Unique ID for the story
  userId: string; // User's unique ID on Instagram
  username: string; // Instagram username
  timestamp: Date; // Timestamp of when the story was posted
  location?: string; // Location name mentioned in the story (optional)
  mediaType: string; // Type of media (e.g., "image", "video")
  mediaUrl: string; // URL of the media
  text?: string; // Text content in the story (optional)
  hashtags?: string[]; // Hashtags included in the story
  sentiment?: string; // Sentiment analysis result
  urgency: boolean; // Indicates whether the post is urgent
  placeName?: string; // Name of the place mentioned
  coordinates?: {
    latitude: number;
    longitude: number;
  }; // Geolocation coordinates
}

// Define the schema for InstagramStory
const InstagramStorySchema: Schema = new Schema({
  storyId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
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
    required: true,
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
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
  },
});

// Create and export the model
const InstagramStory = mongoose.model<IInstagramStory>('InstagramStory', InstagramStorySchema);
export default InstagramStory;
