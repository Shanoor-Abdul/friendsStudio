import { connectDB } from "@/lib/mongodb";
import Image from "@/models/Image";

export async function GET() {
  await connectDB();

  const images = await Image.find({
    type: "image",
  });

  const categories = [
    "Cinematic",
    "Weddings",
    "Portraits",
    "Events",
  ];

  const result = categories.map((category) => {
    const items = images.filter(
      (img) => img.category === category
    );

    return {
      title: category,
      count: items.length,
      image:
        items[0]?.url ||
        "/images/image.png",
    };
  });

  return Response.json(result);
}