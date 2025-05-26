"use client";
import { CommentWithUser } from "@/utils/types";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { getUserDataClient } from "@/data/callUserApi";
import { UserDocument } from "@/models/user";
import axios from "axios";
import { API_DOMAIN } from "@/utils/constants";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DeleteComment } from "./dele&editComments";
import EditCommentModal from "./EditCommentModal";

dayjs.extend(relativeTime);

export default function CommentItem({ comment }: { comment: CommentWithUser }) {
  const { userId: user } = comment;
  const [currentUser, setCurrentUser] = useState<UserDocument | null>(null);
  const router = useRouter();
  const [openEdit, setOpenEdit] = useState(false);
  useEffect(() => {
    getUserDataClient(setCurrentUser);
  }, []);

  return (
    <div className="w-full rounded-2xl border border-gray-300 bg-white shadow-md p-5 hover:shadow-lg transition-all duration-300 mb-6">
      {/* Top section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          {user?.avatar ? (
            <div className="rounded-full shadow-xl border-1 border-gray-300">
              <Image
                src={user.avatar}
                alt="user avatar"
                width={45}
                height={45}
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="w-11 h-11 flex items-center justify-center bg-gray-300 text-gray-600 rounded-full text-sm font-bold">
              ?
            </div>
          )}
          <div>
            <p className="text-lg font-semibold text-gray-800 capitalize">
              {user?.username
                ? user?.username === currentUser?.username
                  ? "You"
                  : user.username
                : "Unknown User"}
            </p>
            <p className="text-sm text-gray-500">
              {dayjs(comment.createdAt).fromNow()}
            </p>
          </div>
        </div>
        <div>
          <p className="text-gray-50 px-2 py-1 bg-cyan-500 rounded-full">
            {dayjs(comment.createdAt).format("DD/MM/YY")}
          </p>
        </div>
      </div>

      {/* Comment Text */}
      <p className="text-gray-700 text-base mb-4 leading-relaxed">
        {comment?.text}
      </p>

      {/* Action Buttons */}
      {currentUser?._id === user._id && (
        <div className="flex gap-4 justify-end">
          <button
            title="Edit"
            className="text-green-600 cursor-pointer hover:text-green-800 hover:scale-110 transition duration-200"
            onClick={() => setOpenEdit(true)}
          >
            <FaEdit className="text-xl" />
          </button>

          <button
            title="Delete"
            onClick={() => DeleteComment(comment, router)}
            className="text-red-600 cursor-pointer hover:text-red-800 hover:scale-110 transition duration-200"
          >
            <FaTrash className="text-xl" />
          </button>
          {openEdit && (
            <EditCommentModal setOpenEdit={setOpenEdit} comment={comment} />
          )}
        </div>
      )}
    </div>
  );
}
