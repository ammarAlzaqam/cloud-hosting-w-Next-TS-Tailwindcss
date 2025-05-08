"use client";
import Link from "next/link";
import * as React from "react";
import { toast } from "react-toastify";
export default function LoginForm() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username) {
      return toast.error("username is required");
    }

    if (!email) {
      return toast.error("Email is required");
    }

    if (!password) {
      return toast.error("password is required");
    }

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        className="p-2 rounded-md border focus:bg-gray-100"
        type="text"
        placeholder="Enter Your Username"
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />
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
        register
      </button>

      <div>
        <p className="text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
