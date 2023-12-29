import connectMongoDB from "@/libs/mongodb";
import Rating from "@/models/rating";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request) {
    const { roomId, rating } = await request.json();

    // Ensure room is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
        return new Response(JSON.stringify({ message: "Invalid room ID" }), { status: 400 });
    }

    await connectMongoDB();

    try {
        // Create and save the new rating
        await Rating.create({
            roomId: roomId, // Ensure this matches the field name in your Rating model
            rating: rating
        });

        return new Response(JSON.stringify({ message: "Rated" }), { status: 201 });
    } catch (error) {
        // Handle any errors
        console.error("Failed to save rating:", error);
        return new Response(JSON.stringify({ message: "Failed to save rating" }), { status: 500 });
    }
}

export async function GET() {
    await connectMongoDB()

    const ratings = await Rating.find({})
    return NextResponse.json({ratings})
}