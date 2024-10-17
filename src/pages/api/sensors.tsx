import { NextResponse } from 'next/server';

let latestNumber: number | null = null; // Declare with an explicit type

export async function POST(request: Request) {
    const data = await request.json();
    latestNumber = data.number; // Get the number from ESP32
    console.log("Received number:", latestNumber);
    return NextResponse.json({ success: true });
}

export function GET(request: Request) {
    return NextResponse.json({ latestNumber }); // Send the latest number back to the client
}
