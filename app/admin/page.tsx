"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function AdminPage() {
  const [resetKey, setResetKey] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("Weddings");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [images, setImages] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [photoFilter, setPhotoFilter] = useState("All");

  const [tab, setTab] = useState("photos");
  const [messageFilter, setMessageFilter] = useState("all");

  // 🔄 Fetch
  const fetchImages = async () => {
    const res = await fetch("/api/images");
    const data = await res.json();
    setImages(data);
  };

  const fetchBookings = async () => {
    const res = await fetch("/api/bookings");
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchImages();
    fetchBookings();
  }, []);

  // 🚀 Upload with progress
  const uploadToCloudinary = (file: File) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append("file", file);

      xhr.open("POST", "/api/upload");

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject("Upload failed");
        }
      };

      xhr.onerror = reject;
      xhr.send(formData);
    });
  };

  // 📤 Submit
  const handleSubmit = async () => {
    if (!file) return alert("Select file");

    setLoading(true);
    setProgress(0);

    try {
      const uploadData: any = await uploadToCloudinary(file);

      await fetch("/api/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: uploadData.secure_url,
          category,
          type: file.type.startsWith("video") ? "video" : "image",
        }),
      });

      await fetchImages();

      // reset
      setFile(null);
      setCategory("Weddings");
      setResetKey((p) => p + 1);
      setProgress(0);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }

    setLoading(false);
  };

  // 🗑️ Delete media
  const handleDelete = async (id: string) => {
    await fetch("/api/images", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setImages((prev) => prev.filter((i) => i._id !== id));
  };

  // ⭐ Toggle featured
  const toggleFeatured = async (img: any) => {
    await fetch("/api/images", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: img._id,
        featured: !img.featured,
      }),
    });

    fetchImages();
  };

  // 📩 Message actions
  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    fetchBookings();
  };

  const deleteMessage = async (id: string) => {
    await fetch("/api/bookings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchBookings();
  };

  // Filters
  const videos = images.filter((i) => i.type === "video");
  const allPhotos = images.filter((i) => i.type === "image");

  const photos =
    photoFilter === "All"
      ? allPhotos
      : photoFilter === "Featured"
        ? allPhotos.filter((i) => i.featured)
        : allPhotos.filter((i) => i.category === photoFilter);

  const filteredBookings =
    messageFilter === "all"
      ? bookings
      : bookings.filter((b) => b.status === messageFilter);

  return (
    <div className="min-h-screen bg-black text-white p-6 relative">
      {/* Logout */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="absolute top-6 right-6 bg-gray-800 px-4 py-2 rounded"
      >
        Logout
      </button>

      <h1 className="text-3xl mb-6">Admin Dashboard</h1>

      {/* Upload */}
      <div className="max-w-md space-y-4 mb-6">
        <input
          key={resetKey}
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded"
        >
          <option>Weddings</option>
          <option>Portraits</option>
          <option>Events</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-white text-black py-3 rounded font-medium"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {/* Progress bar */}
        {loading && (
          <div className="w-full bg-gray-800 rounded h-2">
            <div
              className="bg-green-500 h-2 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["photos", "videos", "messages"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded ${
              tab === t ? "bg-white text-black" : "bg-gray-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* PHOTOS */}
      {tab === "photos" && (
        <>
          {photos.length === 0 && (
            <p className="text-center text-gray-500 py-10">
              No photos yet — your story starts here 📸
            </p>
          )}

          {tab === "photos" && (
            <>
              {/* 🔥 FILTER BUTTONS */}
              <div className="flex gap-3 mb-6 flex-wrap">
                {["All", "Weddings", "Portraits", "Events", "Featured"].map(
                  (f) => (
                    <button
                      key={f}
                      onClick={() => setPhotoFilter(f)}
                      className={`px-3 py-1 rounded-full text-sm border transition ${
                        photoFilter === f
                          ? "bg-white text-black"
                          : "border-gray-600 text-gray-300 hover:bg-white hover:text-black"
                      }`}
                    >
                      {f}
                    </button>
                  ),
                )}
              </div>

              {/* 🔥 EMPTY STATE */}
              {photos.length === 0 && (
                <p className="text-center text-gray-500 py-10">
                  {photoFilter === "Featured"
                    ? "No featured photos yet ⭐"
                    : `No ${photoFilter.toLowerCase()} photos yet 📸`}
                </p>
              )}

              {/* 🔥 GRID */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((img) => (
                  <div key={img._id} className="relative group">
                    <Image
                      src={img.url}
                      alt=""
                      width={400}
                      height={300}
                      className="rounded object-cover w-full h-[180px]"
                    />

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(img._id)}
                      className="absolute top-2 right-2 bg-red-500 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100"
                    >
                      Delete
                    </button>

                    {/* FEATURED */}
                    <button
                      onClick={() => toggleFeatured(img)}
                      className={`absolute bottom-2 right-2 px-3 py-1 text-xs rounded font-medium transition ${
                        img.featured
                          ? "bg-yellow-500 text-black"
                          : "bg-black/70 text-white border border-gray-600"
                      }`}
                    >
                      {img.featured ? "⭐ Featured" : "Mark Featured"}
                    </button>

                    {/* CATEGORY */}
                    <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 text-xs rounded">
                      {img.category}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* VIDEOS */}
      {tab === "videos" && (
        <>
          {videos.length === 0 && (
            <p className="text-center text-gray-500 py-10">
              No videos uploaded — capture motion 🎬
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((vid) => (
              <div key={vid._id} className="relative">
                <video src={vid.url} controls className="rounded w-full" />

                <button
                  onClick={() => handleDelete(vid._id)}
                  className="absolute top-2 right-2 bg-red-500 px-2 py-1 text-xs rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* MESSAGES */}
      {tab === "messages" && (
        <>
          <div className="flex gap-2 mb-4">
            {["all", "pending", "done"].map((f) => (
              <button
                key={f}
                onClick={() => setMessageFilter(f)}
                className="px-3 py-1 bg-gray-800 rounded"
              >
                {f}
              </button>
            ))}
          </div>

          {filteredBookings.length === 0 && (
            <p className="text-center text-gray-500 py-10">
              No inquiries yet — clients will find you soon 🚀
            </p>
          )}

          {filteredBookings.map((b) => (
            <div
              key={b._id}
              className="border border-gray-700 p-4 mb-2 rounded"
            >
              <p>
                <strong>{b.name}</strong> ({b.email})
              </p>
              <p className="text-gray-400 mb-2">{b.message}</p>

              <button
                onClick={() => updateStatus(b._id, "done")}
                className="bg-green-500 px-3 py-1 mr-2 rounded text-sm"
              >
                Done
              </button>

              <button
                onClick={() => deleteMessage(b._id)}
                className="bg-red-500 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
