"use client";

import { useRouter } from "next/navigation";

interface PaginationProps {
  noOfPages: number;
  pageNumber: number;
  route: string;
}

export default function Pagination({
  noOfPages,
  pageNumber,
  route,
}: PaginationProps) {
  const pages = Array.from({ length: noOfPages }, (_, i) => i + 1);
  const router = useRouter();
  return (
    <div className="flex justify-center items-center mt-2 mb-5">
      <button
        disabled={pageNumber <= 1}
        onClick={() => router.push(`${route}?pageNumber=${pageNumber - 1}`)}
        className={`${pageNumber <= 1 ? "hover:bg-inherit text-gray-400 cursor-not-allowed border-gray-400" : "hover:bg-gray-200 text-gray-800 cursor-pointer border-gray-500"} border-1 py-1 md:py-2 px-1 md:px-4 font-bold text-lg md:text-xl`}
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => router.push(`${route}?pageNumber=${page}`)}
          className={`${
            pageNumber === page
              ? "bg-emerald-200 hover:bg-emerald-300"
              : "hover:bg-gray-200"
          } border-1 border-gray-500  py-1 md:py-2 px-3 md:px-4 font-bold text-lg md:text-xl text-gray-800 cursor-pointer`}
        >
          {page}
        </button>
      ))}
        <button
        disabled={pageNumber >= noOfPages}
          onClick={() => router.push(`${route}?pageNumber=${pageNumber + 1}`)}
          className={`${pageNumber >= noOfPages ? "hover:bg-inherit text-gray-400 cursor-no-drop border-gray-400" : "hover:bg-gray-200 text-gray-800 cursor-pointer border-gray-500"} border-1 py-1 md:py-2 px-1 md:px-4 font-bold text-lg md:text-xl`}
        >
          Next
        </button>
    </div>
  );
}
