"use client";

const CourseAccessDenied = () => {
  return (
    <div className="max-w-2xl mx-auto bg-dark-secondary p-8 rounded-xl shadow-lg border text-center">
      <div className="mb-6">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <h2 className="text-xl font-bold text-red-400 mb-2">Bronze Plan Limitation</h2>
        <p className="text-white/70">
          Your current membership plan does not include access to our full courses library.
          Please upgrade your membership to access all courses.
        </p>
      </div>
      
      <div className="mt-8">
        <a 
          href="/pricing" 
          className="inline-block bg-brand text-black px-6 py-3 rounded-xl font-semibold hover:bg-brand-hover transition duration-300"
        >
          View Pricing Plans
        </a>
      </div>
    </div>
  );
};

export default CourseAccessDenied;