import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Metadata } from "next";

interface AdminDashboardLayoutProps {
  readonly children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "This is admin dashboard",

}

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  return (
    <div className="absolute left-0 w-full overflow-height flex items-start justify-start overflow-hidden">
      <div className="overflow-height w-15 lg:w-1/5 bg-purple-600 text-white p-1 lg:p-5">
        <AdminSidebar />
      </div>
      <div className="overflow-height w-full">{children}</div>
    </div>
  );
}
