import connectMongoDB from "@/libs/mongodb";
import Rating from "@/models/rating";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { roomId } = await request.json();
    await connectMongoDB();

    // Reset ratings for the specified room
    await Rating.deleteMany({ roomId: roomId });

    return NextResponse.json({ message: "Ratings reset successfully" }, { status: 200 });
}