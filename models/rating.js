import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema (
    {
        room: String,
        rating: Number,
    }
)

const Rating = mongoose.models.Rating || mongoose.model("Rating", ratingSchema)

export default Rating
