"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchArticleInput() {
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const fromSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/articles/search?searchText=${searchText}`);
  };
  return (
    <form onSubmit={fromSubmitHandler} className="my-5 m-auto w-full lg:w-2/3">
      <input
        className="bg-white w-full text-xl p-3 rounded-3xl shadow-md"
        type="search"
        placeholder="Search articles..."
        value={searchText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
      />
    </form>
  );
}
