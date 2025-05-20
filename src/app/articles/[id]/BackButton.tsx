"use client";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

export default function BackButton() {
  const router = useRouter();
  return (
    <BiArrowBack
      onClick={() => router.back()}
      className="cursor-pointer hover:bg-gray-500 hover:text-white transition-all delay-50 mr-1 rounded-full w-8 text-2xl  "
    />
  );
}
