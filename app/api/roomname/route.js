import connectMongoDB from "@/libs/mongodb";
import Room from "@/models/rooms";
import { NextResponse } from "next/server";

export async function GET(request) {
    const id = request.nextUrl.searchParams.get('id')
    await connectMongoDB()

    const room = await Room.findById(id).exec()
    return NextResponse.json(room)
}