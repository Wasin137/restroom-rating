import mongoose, { Schema } from "mongoose";
import Room from "./rooms";

const ratingSchema = new Schema({
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 4 
  },
  ratedAt: {
    type: Date,
    default: Date.now
  }
});

const Rating = mongoose.models.Rating || mongoose.model('Rating', ratingSchema);

export default Rating;