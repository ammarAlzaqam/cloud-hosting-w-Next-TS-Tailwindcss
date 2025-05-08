"use client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddCommentForm() {
  const [text, setText] = useState("");

  const fromSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return toast.error("Please write a comment!");
    console.log({ text });
  };
  return (
    <form onSubmit={fromSubmitHandler} className="my-7">
      <input
        className="bg-white w-full text-xl p-2 rounded-lg focus:shadow-md"
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
      />
      <button type="submit" className="mt-3 py-2 px-4 bg-green-700 rounded-lg text-white cursor-pointer hover:bg-green-900 transition">Comment</button>
    </form>
  );
}
