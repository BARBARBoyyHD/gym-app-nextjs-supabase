"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CheckMembershipComponents() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "valid" | "invalid" | "loading"
  >("idle");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/check/memberships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Using the data structure we defined in the API
        setExpiryDate(data.data.end_date || "Not found");

        // Determine validity based on membership status and dates
        let isActive = false;
        if (data.data.status === 'active' && data.data.end_date) {
          try {
            const endDate = new Date(data.data.end_date);
            const today = new Date();
            isActive = endDate >= today;
          } catch (e) {
            console.error('Error parsing membership end date:', e);
            isActive = false;
          }
        }

        if (isActive) {
          setStatus("valid");
        } else {
          setStatus("invalid");
        }
      } else {
        setStatus("invalid");
      }
    } catch (err) {
      console.error(err);
      setStatus("invalid");
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <section className="py-16">
          <div className="max-w-lg mx-auto bg-dark-secondary p-10 rounded-2xl shadow-lg border">
            <h2 className="text-3xl font-bold text-center mb-4">
              Check <span className="text-brand">Membership</span>
            </h2>
            <p className="text-white/70 text-center mb-8">
              Enter your email to check if you have access to full courses.
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/70 mb-2 font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="yourmail@example.com"
                  className="w-full bg-black/30 border border-white/20 focus:border-brand focus:ring-1 focus:ring-brand/30 outline-none px-4 py-3 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand text-dark cursor-pointer font-bold py-4 rounded-xl bg-brand-hover transition"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Checking..." : "Check"}
              </button>
            </form>

            {/* STATUS MESSAGE */}
            <div className="mt-8">
              {status === "valid" && (
                <div className="p-4 bg-green-700/30 border border-green-600 rounded-xl text-green-400 text-center">
                  <p className="font-semibold">
                    Your membership is active until:
                  </p>
                  <p className="text-xl font-bold mt-1">{expiryDate}</p>

                  <Link
                    href="/courses/all"
                    className="inline-block mt-6 bg-brand text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand/90 transition"
                  >
                    Access Courses
                  </Link>
                </div>
              )}

              {status === "invalid" && (
                <div className="p-4 bg-red-700/30 border border-red-600 rounded-xl text-red-400 text-center">
                  <p className="font-semibold">This email is not registered.</p>
                  <p className="text-white/60 mt-1">
                    Please register as a member to unlock all courses.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
