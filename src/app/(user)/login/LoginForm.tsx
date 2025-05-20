"use client";
import * as React from "react";
import { Slide, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_DOMAIN } from "@/utils/constants";
import { CgSpinner } from "react-icons/cg";

export default function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    try {
      setLoading(true);
      await axios.post(`${API_DOMAIN}/users/login`, { email, password });
      setLoading(false);
      setEmail("");
      setPassword("");
      router.replace("/home");
      router.refresh();
      toast.success("Your login successfully");
    } catch (e: any) {
      toast.error(e?.response?.data.message);
      console.error(e);
      setLoading(false);
    }
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
        className="flex disabled:cursor-not-allowed disabled:bg-gray-300 justify-center items-center text-white hover:text-black bg-blue-800 hover:bg-blue-300 transition border rounded-md py-1 uppercase tracking-wide cursor-pointer "
        type="submit"
        disabled={loading}
      >
        {loading ? <CgSpinner className="animate-spin text-2xl" /> : "login"}
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
