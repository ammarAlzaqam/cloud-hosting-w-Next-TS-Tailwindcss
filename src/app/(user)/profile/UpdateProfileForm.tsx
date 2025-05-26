"use client";

import { UserDocument } from "@/models/user";
import { API_DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";

interface UpdateProfileFormProps {
  user: UserDocument;
}

export default function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const loadingButtonStyle = "bg-gray-300 text-2xl cursor-not-allowed";

  const router = useRouter();

  const updateUserHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!username || !password || !email) return toast.error("All fields required")
    try {
      setLoading(true);
      await axios.patch(`${API_DOMAIN}/users/profile`, {username, email, password})
      setPassword("");
      setLoading(false);
      router.refresh();
      toast.success("User Updated successfully");
    } catch (e: any) {
      setLoading(false);
      toast.error(e?.response?.data.message);
    }
  }

  return (
    <div className="flex grow-1 items-center justify-center">
      <form onSubmit={updateUserHandler} className="flex flex-col gap-4 md:w-2/5 mx-auto p-5 bg-white rounded-md">
        <h1 className="">Profile</h1>
        <input
          className="p-2 rounded-md border focus:bg-gray-100 outline-none"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-2 rounded-md border focus:bg-gray-100 outline-none"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 rounded-md border focus:bg-gray-100 outline-none"
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className={`py-1 ${
            loading
              ? loadingButtonStyle
              : "bg-amber-600 hover:bg-amber-700 transition text-white cursor-pointer text-lg"
          } rounded-md font-semibold`}
        >
          {loading ? (
            <CgSpinner className="animate-spin mx-auto text-white" />
          ) : (
            "Update User"
          )}
        </button>
      </form>
    </div>
  );
}
