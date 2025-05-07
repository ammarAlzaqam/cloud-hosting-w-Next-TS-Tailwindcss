"use client";
import * as React from "react";
import { Slide, toast } from "react-toastify";
export default function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
        });
      return;
    }

    if (!password) {
      toast.error("password is required");
      return;
    }

    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="p-2 rounded-md border focus:bg-gray-100"
        type="text"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <input
        className="p-2 rounded-md border focus:bg-gray-100"
        type="password"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <button
        className="text-white hover:text-black bg-blue-800 hover:bg-blue-300 transition border rounded-md py-1 uppercase tracking-wide cursor-pointer "
        type="submit"
      >
        login
      </button>
    </form>
  );
}
