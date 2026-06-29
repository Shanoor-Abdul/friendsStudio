import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function GET() {
  await connectDB();
  const data = await Booking.find().sort({ createdAt: -1 });

  return Response.json(data);
}

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const newBooking = await Booking.create(body);

  return Response.json(newBooking);
}