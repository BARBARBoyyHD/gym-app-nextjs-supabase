"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateMemberPage() {
  const router = useRouter();

  // Redirect to the members page
  useEffect(() => {
    router.push('/admin/members');
  }, [router]);

  return (
    <div className="p-6 bg-dark-secondary rounded-xl border border-brand/30">
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-white">Creating New Member</h2>
        <p className="text-white/60 mt-2">Redirecting to members page...</p>
      </div>
    </div>
  );
}