"use client";
import { API_DOMAIN } from "@/utils/constants";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";
export default function LoginForm() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    try {
      setLoading(true);
      await axios.post(`${API_DOMAIN}/users/register`, {
        username,
        email,
        password,
      });
      setLoading(false);
      setEmail("");
      setPassword("");
      router.replace("/home");
      router.refresh();
      toast.success("Your account created successfully");
      setUsername("");
    } catch (e: any) {
      setLoading(false);
      console.error(`Error Create account ${e.message}`);
      toast.error(e?.response?.data.message);
    }
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
        className="flex justify-center items-center disabled:bg-gray-300 disabled:cursor-not-allowed text-white hover:text-black bg-blue-800 hover:bg-blue-300 transition border rounded-md py-1 uppercase tracking-wide cursor-pointer "
        type="submit"
        disabled={loading}
      >
        {loading ? <CgSpinner className="animate-spin text-2xl" /> : "register"}
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
