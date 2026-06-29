import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";

export async function GET() {
  await connectDB();
  const images = await Image.find().sort({ createdAt: -1 });

  return Response.json(images);
}

export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const newImage = await Image.create(body);

  return Response.json(newImage);
}

export async function DELETE(req: Request) {
  await connectDB();

  const { id } = await req.json();

  await Image.findByIdAndDelete(id);

  return Response.json({ success: true });
} 


export async function PATCH(req: Request) {
  await connectDB();

  const { id, featured } = await req.json();

  await Image.findByIdAndUpdate(id, { featured });

  return Response.json({ success: true });
}
