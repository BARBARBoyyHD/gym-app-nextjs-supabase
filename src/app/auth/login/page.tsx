export default function LoginPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background text-white px-4">
      <div className="w-full max-w-md bg-dark-secondary p-8 rounded-2xl shadow-xl border border-brand/30">
        <h1 className="text-3xl font-bold text-center mb-10">
          <a href="/">
            Lift<span className="text-brand">Up</span>
          </a>
        </h1>

        <form className="space-y-5">
          <div className="flex flex-col">
            <label className="text-sm text-white/70 mb-1">Email</label>
            <input
              type="email"
              className="bg-black/30 border border-white/20 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none px-4 py-3 rounded-lg"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-white/70 mb-1">Password</label>
            <input
              type="password"
              className="bg-black/30 border border-white/20 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none px-4 py-3 rounded-lg"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand bg-brand-hover cursor-pointer text-black font-semibold py-3 rounded-lg transition"
          >
            Login
          </button>

          <p className="text-center text-white/60 text-sm mt-4">
            Don’t have an account?{" "}
            <a href="#" className="text-brand hover:text-brand-hover underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}
