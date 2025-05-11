const ArticlesSkeleton: number[] = [1, 2, 3, 4, 5, 6];

export default function Loading() {
  return (
    <div className="grow-1 animate-pulse">
      <div className="my-5 m-auto w-full lg:w-2/3 ">
        <div className="bg-gray-300 h-14 w-full p-3 rounded-3xl shadow-md"></div>
      </div>

      <div className="flex flex-wrap gap-7 justify-center items-stretch my-5 mt-10">
        {ArticlesSkeleton.map((item) => (
          <div
            key={item}
            className="flex flex-col justify-between flex-[1-1] p-5 rounded-lg my-1 shadow-lg bg-gray-200 h-40 w-full md:w-2/5 lg:w-1/4"
          >
            <h3 className="h-6 bg-gray-300"></h3>
            <p className="h-10 bg-gray-300"></p>
            <button className="w-full block rounded-lg h-8 p-1 bg-gray-400"></button>
          </div>
        ))}
      </div>

      <div className="m-auto h-14 bg-gray-300 w-72 md:w-80 mt-2 mb-5"></div>
    </div>
  );
} 
