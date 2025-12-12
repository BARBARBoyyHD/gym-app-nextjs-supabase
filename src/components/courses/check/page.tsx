import Link from "next/link";

export default function CourseEmailCheckPage() {
  return (
    <section className="py-20">
      <div className="max-w-lg mx-auto bg-dark-secondary p-10 rounded-2xl shadow-lg border border-brand">
        <h2 className="text-3xl font-bold text-center mb-4">
          Verify <span className="text-brand">Membership</span>
        </h2>
        <p className="text-white/70 text-center mb-8">
          Enter your email to check if you have access to full courses.
        </p>

        {/* FORM */}
        <form className="space-y-6">
          <div>
            <label className="block text-white/70 mb-2 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="yourmail@example.com"
              className="w-full p-4 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-brand"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand text-white font-bold py-4 rounded-xl hover:bg-brand/90 transition"
          ></button>
        </form>

        <div className="mt-8">
          {status === "valid" && (
            <div className="p-4 bg-green-700/30 border border-green-600 rounded-xl text-green-400 text-center">
              <p className="font-semibold">Your membership is active until:</p>
              <p className="text-xl font-bold mt-1"> (Expire date)</p>

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
  );
}
