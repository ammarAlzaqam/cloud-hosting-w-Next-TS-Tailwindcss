"use client";
import * as React from "react";
import { Slide, toast } from "react-toastify";

export default function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Email is required", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
    }

    if (!password) {
      return toast.error("password is required");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="p-2 rounded-md border focus:bg-gray-100"
        type="email"
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

      <div>
        <p className="text-center text-gray-500 text-sm">
          Don&#39;t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </form>
  );
}
