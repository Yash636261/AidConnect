import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the tweet document
interface ITweet extends Document {
  tweetId: string; // Unique tweet ID from Twitter API
  text: string; // The text content of the tweet
  location: string; // Location mentioned in the tweet (if available)
  urgencyLevel: string; // Urgency level (Critical, High, Medium, Low)
  needs: string[]; // Array of needs mentioned (e.g., ["Food", "Medical Aid"])
  sentiment: string; // Sentiment of the tweet (e.g., "Desperate", "Urgent")
  hashtags: string[]; // Hashtags in the tweet
  dateTime: Date; // Timestamp of the tweet
  geolocation: string; // Geolocation from the tweet, if available
  authorNameHandle: string; // Author's Twitter handle
  source: string; // Source of data (e.g., "Twitter")
}

// Define the tweet schema
const TweetSchema: Schema = new Schema({
  tweetId: {
    type: String,
    required: true,
    unique: true,
  },
  text: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false, // Not always available in Twitter data
  },
  urgencyLevel: {
    type: String,
    required: false, // Can be inferred from text or set manually
  },
  needs: [{
    type: String,
    required: false, // Can be extracted via NLP
  }],
  sentiment: {
    type: String,
    required: false, // Can be inferred from sentiment analysis
  },
  hashtags: [{
    type: String,
    required: false,
  }],
  dateTime: {
    type: Date,
    required: true,
  },
  geolocation: {
    type: String,
    required: false, // Can be available if tweet is geotagged
  },
  authorNameHandle: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
    default: 'Twitter',
  },
});

// Create and export the model
const Tweet = mongoose.model<ITweet>('Tweet', TweetSchema);
export default Tweet;
