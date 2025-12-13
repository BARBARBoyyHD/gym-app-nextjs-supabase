"use client";

import { useState } from "react";

interface CourseAccessFormProps {
  onCheckAccess: (email: string) => void;
  loading: boolean;
  error?: string;
}

const CourseAccessForm: React.FC<CourseAccessFormProps> = ({ 
  onCheckAccess, 
  loading, 
  error 
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAccess(email);
  };

  return (
    <div className="max-w-md mx-auto bg-dark-secondary p-8 rounded-xl shadow-lg border">
      <div className="mb-6">
        <label className="block text-white/70 mb-2 font-semibold">
          Email Address
        </label>
        <input
          type="email"
          required
          placeholder="yourmail@example.com"
          className="w-full bg-black/30 border border-white/20 focus:border-brand focus:ring-1 focus:ring-brand/30 outline-none px-4 py-3 rounded-lg text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-700/30 border border-red-600 rounded-xl text-red-400 text-center">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-brand text-black cursor-pointer font-bold py-3 rounded-xl hover:bg-brand-hover transition duration-300 disabled:opacity-50"
      >
        {loading ? "Checking..." : "Check Access"}
      </button>
    </div>
  );
};

export default CourseAccessForm;