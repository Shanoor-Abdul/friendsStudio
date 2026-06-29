import CategoryGallery from "@/components/CategoryGallery";
import Navbar from "@/components/Navbar";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return (
    <main className="min-h-screen bg-black text-white">

      {/* <Navbar /> */}

      <CategoryGallery category={category} />

    </main>
  );
}