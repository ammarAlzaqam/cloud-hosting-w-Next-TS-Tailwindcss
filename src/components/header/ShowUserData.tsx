"use client";
import { UserDocument } from "@/models/user";
import { API_DOMAIN } from "@/utils/constants";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export function ShowAccountData({ user }: { user: UserDocument }) {
  const router = useRouter();
  const logoutHandler = async () => {
    await axios.get(`${API_DOMAIN}/users/logout`);
    router.refresh();
  };

  const username =
    user?.username.split(" ")[0].length < 10 ? (
      user?.username.split(" ")[0]
    ) : (
      <span className="flex items-c">
        {user?.username.split(" ")[0].slice(0, 9)} <span>..</span>{" "}
      </span>
    );

  return (
    <>
      <h4 className="font-semibold text-gray-800 ">{username}</h4>
      <Link href="#">
        <Image src={user.avatar} width={50} height={50} alt="user-avatar" />
      </Link>
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
