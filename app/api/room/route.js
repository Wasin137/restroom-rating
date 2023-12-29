import connectMongoDB from "@/libs/mongodb";
import Room from "@/models/rooms";
import Rating from "@/models/rating";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { name } = await request.json()
    await connectMongoDB()
    await Room.create({name})
    return NextResponse.json({message: "New Room Created"}, {status: 201})
}

export async function GET() {
    await connectMongoDB()

    const rooms = await Room.find({})

    // For each room, calculate the average rating
    const roomsWithRatings = await Promise.all(rooms.map(async (room) => {
        const aggregateQuery = [
            { $match: { roomId: room._id } },
            { 
                $group: { 
                _id: "$roomId",
                averageRating: { $avg: "$rating" },
                lastRatedAt: { $max: "$ratedAt"} 
                } 
            }
        ];

        const ratings = await Rating.aggregate(aggregateQuery)

        let roomData = room.toObject()
        if (ratings.length > 0) {
            roomData.averageRating = ratings[0].averageRating
            roomData.lastRatedAt = ratings[0].lastRatedAt
        } else {
            roomData.averageRating = 'No ratings yet'
            roomData.lastRatedAt = null
        }

        return roomData
    }))

    return NextResponse.json({ rooms: roomsWithRatings})
}