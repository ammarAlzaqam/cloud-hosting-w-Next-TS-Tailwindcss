"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { EditComment } from "./dele&editComments";
import { CommentDocument } from "@/models/comment";
import { useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";

interface EditCommentModalProps {
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
  comment: CommentDocument;
}

export default function EditCommentModal({
  setOpenEdit,
  comment,
}: EditCommentModalProps) {
  const [text, setText] = useState(comment.text);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  return (
    <div
      onDoubleClick={() => setOpenEdit(false)}
      className="fixed top-0 right-0 bottom-0 left-0 z-100 flex items-center justify-center bg-black/50"
    >
      <div
        onDoubleClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
        className="p-5 pt-20 rounded-3xl relative w-[95%] md:w-2/5 bg-gray-100"
      >
        <div
          className="absolute top-5 right-5"
          onClick={() => setOpenEdit(false)}
        >
          <IoMdCloseCircleOutline className="text-red-600 text-3xl cursor-pointer hover:text-red-800 transition" />
        </div>
        <form
          onSubmit={async (e: any) => {
            e.preventDefault();
            await EditComment(comment, text, router, setOpenEdit, setLoading);
          }}
        >
          <input
            type="text"
            className="p-3 rounded-xl shadow-xl w-full"
            placeholder="Enter you comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="flex disabled:cursor-not-allowed disabled:bg-gray-300 justify-center items-center w-full p-2 mt-5 bg-cyan-500 hover:bg-cyan-600 transition cursor-pointer rounded-2xl"
            disabled={loading}
          >
            {loading ? <CgSpinner className="animate-spin text-2xl" /> : "Edit"}
          </button>
        </form>
      </div>
    </div>
  );
}
