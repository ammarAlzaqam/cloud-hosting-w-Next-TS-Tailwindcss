const pages = [1, 2, 3, 4, 5];

export default function Pagination() {
  return (
    <div className="flex justify-center items-center mt-2 mb-5">
      <div className="border-1 border-gray-500 hover:bg-gray-200 py-2 px-4 font-bold text-2xl text-gray-800 cursor-pointer ">
        Prev
      </div>
      {pages.map((page) => (
        <div
          key={page}
          className="border-1 border-gray-500 hover:bg-gray-200 py-2 px-4 font-bold text-2xl text-gray-800 cursor-pointer "
        >
          {page}
        </div>
      ))}
      <div className="border-1 border-gray-500 hover:bg-gray-200 py-2 px-4 font-bold text-2xl text-gray-800 cursor-pointer ">
        Next
      </div>
    </div>
  );
}
