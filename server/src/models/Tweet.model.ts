import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the tweet document
interface ITweet extends Document {
  tweetId: number; // Numeric ID for the tweet
  text: string; // The text content of the tweet
  location: string; // Location mentioned in the tweet (if available)
  urgencyLevel: string; // Urgency level (Critical, High, Medium, Low)
  needs: string[]; // Array of needs mentioned (e.g., ["Rescue", "Evacuation"])
  sentiment: string; // Sentiment of the tweet (e.g., "Urgent", "Desperate")
  hashtags: string[]; // Hashtags in the tweet
  dateTime: Date; // Timestamp of the tweet
  geolocation: string; // Geolocation details (city and specific location)
  authorNameHandle: string; // Author's Twitter handle
  source: string; // Source of the data (e.g., "Twitter")
}

// Define the tweet schema
const TweetSchema: Schema = new Schema({
  tweetId: {
    type: Number, // Adjusted to match numeric format
    required: true,
    unique: true,
  },
  text: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false, // Not always available in tweets
  },
  urgencyLevel: {
    type: String,
    required: false, // Can be inferred or set manually
  },
  needs: [
    {
      type: String,
      required: false, // Represented as an array of strings
    },
  ],
  sentiment: {
    type: String,
    required: false, // Can be derived from sentiment analysis
  },
  hashtags: [
    {
      type: String,
      required: false,
    },
  ],
  dateTime: {
    type: Date,
    required: true,
  },
  geolocation: {
    type: String,
    required: false, // Includes city and specific location details
  },
  authorNameHandle: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
    default: "Twitter",
  },
});

// Create and export the model
const Tweet = mongoose.model<ITweet>("Tweet", TweetSchema);
export default Tweet;
