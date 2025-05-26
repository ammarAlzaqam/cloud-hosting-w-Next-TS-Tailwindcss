import { getUserData } from "@/data/callUserApi";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import UpdateProfileForm from "./UpdateProfileForm";
// import { useState } from "react";

export default async function ProfilePage() {
  const cookie = (await cookies()).toString();
  const user = await getUserData(cookie);
  if (!user) redirect("/login");

  return (
    <div className="flex flex-col grow-1">
      <UpdateProfileForm user={user} />
    </div>
  );
}
