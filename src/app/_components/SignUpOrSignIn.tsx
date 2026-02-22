"use client";

import { useRouter } from "next/navigation";

export default function SignUpOrSignIn() {
  const router = useRouter();

  return (
    <div className="flex gap-4">
      <button
        onClick={() => router.push("/sign-up")}
        className="bg-white text-black font-medium px-6 py-2 rounded-md hover:bg-gray-200"
      >
        Sign Up
      </button>
      <button
        onClick={() => router.push("/sign-in")}
        className="bg-white text-black font-medium px-6 py-2 rounded-md hover:bg-gray-200"
      >
        Sign In
      </button>
    </div>
  );
}
