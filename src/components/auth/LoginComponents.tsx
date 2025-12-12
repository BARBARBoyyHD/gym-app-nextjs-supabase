"use client";
import { useLogin } from "@/hooks/use-Auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function LoginComponents() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const loginMutation = useLogin(() => {
    toast("Login successful!", {
      style: { background: "#22c55e", color: "white" },
    });
    router.push("/admin/dashboard");
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync(loginForm);
    } catch (error) {
      console.error("Login attempt failed:", error);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-background text-white px-4">
      <div className="w-full max-w-md bg-dark-secondary p-8 rounded-2xl shadow-xl border">
        <h1 className="text-3xl font-bold text-center mb-10">
          <Link href="/">
            Lift<span className="text-brand">Up</span>
          </Link>
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-sm text-white/70 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="bg-black/30 border border-white/20 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none px-4 py-3 rounded-lg"
              placeholder="Enter your email"
              value={loginForm.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col relative">
            <label className="text-sm text-white/70 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="bg-black/30 border border-white/20 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none px-4 py-3 rounded-lg pr-12"
              placeholder="Enter your password"
              value={loginForm.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 px-4 flex items-center text-sm leading-5"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <div className="flex items-center">
                {showPassword ? (
                  <FaEye className="h-5 w-5 text-gray-400 text text-center" />
                ) : (
                  <FaEyeSlash className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-brand bg-brand-hover cursor-pointer text-black font-semibold py-3 rounded-lg transition"
          >
            Login
          </button>

          <p className="text-center text-white/60 text-sm mt-4">
            Can&apos;t access your account? Contact the administrator.
          </p>
        </form>
      </div>
    </section>
  );
}
