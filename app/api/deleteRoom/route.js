import connectMongoDB from "@/libs/mongodb";
import Room from "@/models/rooms";
import Rating from "@/models/rating";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(request) {
    const  id  = request.nextUrl.searchParams.get('id'); // Extract the room ID from the URL
    // Ensure room ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid room ID" }, { status: 400 });
    }

    await connectMongoDB();

    try {
        // Delete all ratings associated with this room
        await Rating.deleteMany({ roomId: id });

        // Delete the room
        await Room.findByIdAndDelete(id);

        return NextResponse.json({ message: "Room and associated ratings deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}