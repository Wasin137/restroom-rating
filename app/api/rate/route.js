import connectMongoDB from "@/libs/mongodb";
import Rating from "@/models/rating";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {room, rating} = await request.json()
    await connectMongoDB()
    await Rating.create({room, rating})
    return NextResponse.json({message: "Rated"}, {status: 201})
}