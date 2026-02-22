"use client";
import { signOut, useSession } from "@/lib/auth-client";
import SignUpOrSignIn from "./SignUpOrSignIn";

export function UserStatus() {
  const { data: session, isPending } = useSession();
  if (isPending) {
    return <p className="text-center mt-8 text-white">Loading...</p>;
  }

  if (!session?.user) {
    return <SignUpOrSignIn />;
  }
  return (
    <button
      onClick={() => signOut()}
      className="bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
    >
      Sign Out
    </button>
  );
}
