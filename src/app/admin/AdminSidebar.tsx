import Link from "next/link";
import { CgMenuGridR } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { MdOutlineArticle } from "react-icons/md";

export default function AdminSidebar() {
  return (
    <>
      <Link
        href="/admin"
        className="flex items-center justify-center lg:justify-start text-lg lg:text-2xl font-semibold"
      >
        <CgMenuGridR className="text-3xl me-1" />
        <span className="hidden lg:block">Dashboard</span>
      </Link>
      <ul className="flex flex-col items-center lg:items-start mt-10 gap-5 text-xl text-gray-200">
        <li>
          <Link
            href="/admin/articles-table"
            className="flex gap-1 items-center lg:border-b border-gray-300 hover:border-yellow-200 transition"
          >
            <MdOutlineArticle />
            <span className="hidden lg:block">Articles</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/comments-table"
            className="flex gap-1 items-center lg:border-b border-gray-300 hover:border-yellow-200 transition"
          >
            <FaRegComments />
            <span className="hidden lg:block">Comments</span>
          </Link>
        </li>
      </ul>
    </>
  );
}
