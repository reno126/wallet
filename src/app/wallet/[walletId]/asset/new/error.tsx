"use client";
export default function ErrorPage({ error }: { error: Error }) {
  console.log("Error:", error);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-bold">Error</h1>
      <p>Something went wrong. Please try again later.</p>
    </div>
  );
}
