import { FaEdit, FaTrash } from "react-icons/fa";

export default function CommentItem() {
  return (
    <div className="bg-gray-200 rounded-lg border-2 border-gray-300 p-4 w-full mb-5">
      <div className="flex justify-between items-center mb-2">
        <strong className="uppercase font-bold text-lg">ammar</strong>
        <span className="text-white bg-cyan-700 rounded-xl px-2 py-[2px]">
          8/5/2025
        </span>
      </div>
      <p className="mb-2 text-gray-800">Thanks for this article</p>
      <div className="flex gap-2 justify-end items-center ">
        <button>
            <FaEdit className="text-green-600 hover:text-green-800 text-xl cursor-pointer transition" />
        </button>

        <button>
            <FaTrash className="text-red-600 hover:text-red-800 text-xl cursor-pointer transition" />
        </button>

      </div>
    </div>
  );
}
