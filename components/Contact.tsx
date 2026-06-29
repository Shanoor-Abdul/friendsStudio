"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      return alert("Fill all fields");
    }

    setLoading(true);

    await fetch("/api/bookings", {
      method: "POST",
      body: JSON.stringify(form),
    });

    setForm({ name: "", email: "", message: "" });
    setLoading(false);

    alert("Message sent!");
  };

  return (
    <section id="contact" className="max-w-4xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">
        Book a Shoot
      </h2>

      <div className="space-y-4">
        
        <input
          placeholder="Your Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded"
        />

        <textarea
          placeholder="Tell me about your project..."
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          className="w-full p-3 bg-gray-900 border border-gray-700 rounded h-32"
        />

        <button
          onClick={handleSubmit}
          className="bg-white text-black px-6 py-3 rounded"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
    </section>
  );
}