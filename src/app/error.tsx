"use client";

import Link from "next/link";

interface ErrorTypeProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorTypeProps) {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh] text-center ">
      <h2 className="font-bold text-3xl text-red-600 ">
        Something went wrong!
      </h2>
      <p className="mt-5 text-gray-700 text-2xl">
        Error Message: {error.message}
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 rounded-4xl px-5 py-3 text-white mt-4 cursor-pointer"
        onClick={reset}
      >
        Try again
      </button>
      <Link href="/home" className="text-blue-600 mt-5 underline">
        Go to home page
      </Link>
    </div>
  );
}
