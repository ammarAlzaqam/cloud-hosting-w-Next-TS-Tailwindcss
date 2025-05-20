import { CommentDocument } from "@/models/comment";
import dayjs from "dayjs";
import Link from "next/link";

import { cookies } from "next/headers";
import { getAllComments } from "@/data/callCommentApi";
import DeleteCommentBtn from "./DeleteCommentBtn";

export default async function AdminCommentsPage() {
  const token = (await cookies()).get("token")?.value;
  const comments = await getAllComments(token as string);

  //* Get comment title with only 6 words and delete extra spaces
  const commentText = (title: string): string => {
    const words = title.trim().split(/\s+/);
    return words.length > 6 ? words.slice(0, 6).join(" ") + ".." : title;
  };

  return (
    <div className="p-5">
      <h1 className="font-bold text-3xl text-gray-700 mb-10">Comments</h1>
      <table className="table w-full text-left">
        <thead className="border-t-2 border-b-2 border-gray-500 lg:text-xl">
          <tr>
            <th className="p-2">Comment</th>
            <th className="p-2 hidden lg:inline-block">Created At</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {comments.map((comment: CommentDocument) => (
            <tr
              key={comment._id as string}
              className="border-t border-gray-300"
            >
              <td className="px-4 py-5">{commentText(comment.text)}</td>
              <td className="px-4 py-5 hidden lg:inline-block">
                {dayjs(comment.createdAt).format("DD/MM/YYYY")}
              </td>
              <td className="px-4 py-5">
                  <DeleteCommentBtn commentId={comment._id as string} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
