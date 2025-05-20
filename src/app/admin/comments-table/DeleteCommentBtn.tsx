"use client";

import { API_DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteCommentBtnProps {
  commentId: string;
}

export default function DeleteCommentBtn({ commentId }: DeleteCommentBtnProps) {
  const router = useRouter();

  const deleteCommentHandler = async () => {
    try {
      if (confirm("You want to delete this comment, Are you sure.")) {
        await axios.delete(`${API_DOMAIN}/comments/${commentId}`);
        router.refresh();
        toast.success("Comment deleted successfully");
      }
    } catch (e: any) {
      const errorMsg = e?.response?.data.message;
      toast.error(errorMsg);
      console.error(errorMsg);
    }
  };

  return (
    <button
      className="capitalize px-2 py-1 cursor-pointer inline-block text-center bg-red-600 rounded-lg hover:bg-red-800 transition text-white"
      onClick={deleteCommentHandler}
    >
      delete
    </button>
  );
}
