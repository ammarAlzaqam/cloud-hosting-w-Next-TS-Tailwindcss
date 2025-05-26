"use client";
import { UserDocument } from "@/models/user";
import { API_DOMAIN } from "@/utils/constants";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";

export function ShowAccountData({ user }: { user: UserDocument }) {
  const router = useRouter();
  const logoutHandler = async () => {
    await axios.get(`${API_DOMAIN}/users/logout`);
    router.refresh();
  };

  const [avatar, setAvatar] = useState(null);

  const username =
    user?.username.split(" ")[0].length < 10 ? (
      user?.username.split(" ")[0]
    ) : (
      <span className="flex items-center">
        {user?.username.split(" ")[0].slice(0, 9)} <span>..</span>{" "}
      </span>
    );

  const handleUploadUserAvatar = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const fileInput = e.currentTarget.elements.namedItem(
      "avatar"
    ) as HTMLInputElement;

    //! check if user choose an avatar
    if (!fileInput?.files?.[0]) return toast.error("Image is required");
    const formData = new FormData();
    formData.append("avatar", fileInput.files[0]);
    try {
      await axios.patch(`${API_DOMAIN}/users/upload`, formData);
      router.refresh();
      toast.success("Imaged Upload successfully");
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
    }
  };

  return (
    <>
      <Link href="/profile" className="font-semibold text-gray-800 ">
        {username}
      </Link>
      <form onSubmit={handleUploadUserAvatar}>
        <label htmlFor="uploadUserAvatar" className="cursor-pointer">
          <Image
            src={user.avatar ? user.avatar : "/images/default-avatar.png"}
            width={50}
            height={50}
            alt="user-avatar"
            className="rounded-full w-[50px] h-[50px]"
          />
        </label>
        <input
          type="file"
          name="avatar"
          id="uploadUserAvatar"
          className="hidden"
          onChange={(e) => e.currentTarget.form?.requestSubmit()}
        />
      </form>
      <button
        title="logout"
        className="text-gray-800 hover:scale-110 transition cursor-pointer"
        onClick={logoutHandler}
      >
        <FiLogOut />
      </button>
    </>
  );
}
