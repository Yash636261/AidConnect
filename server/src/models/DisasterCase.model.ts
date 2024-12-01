import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the DisasterCase document
interface IDisasterCase extends Document {
  source: 'twitter' | 'facebook' | 'instagram';
  postId: string;
  userId: number;
  username: string;
  text: string;
  location: string;
  coordinates: [number, number];
  timestamp: Date;
  urgencyLevel: 'Low' | 'Moderate' | 'High';
  needs: string[];
  sentiment: string;
  hashtags: string[];
  verified: boolean;
  type: 'need' | 'availability';
  llm_insight: string;
}

// Define the schema
const disasterCaseSchema = new Schema<IDisasterCase>({
  source: {
    type: String,
    enum: ['twitter', 'facebook', 'instagram'],
    required: true
  },
  postId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number],
    required: true,
    validate: {
      validator: function(value: number[]) {
        return value.length === 2;
      },
      message: 'Coordinates must contain exactly two numbers (latitude and longitude).'
    }
  },
  timestamp: {
    type: Date,
    required: true
  },
  urgencyLevel: {
    type: String,
    enum: ['Low', 'Moderate', 'High'],
    required: true
  },
  needs: {
    type: [String],
    default: []
  },
  sentiment: {
    type: String,
    required: true
  },
  hashtags: {
    type: [String],
    default: []
  },
  verified: {
    type: Boolean,
    required: true
  },
  type: {
    type: String,
    enum: ['need', 'availability'],
    required: true
  },
  llm_insight: {
    type: String,
    required: true
  }
});

// Create and export the model
const DisasterCase = mongoose.model<IDisasterCase>('DisasterCase', disasterCaseSchema);

export default DisasterCase;

