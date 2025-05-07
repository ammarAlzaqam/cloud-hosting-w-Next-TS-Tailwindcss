import Link from "next/link";

export default function NotFound() {
  return (
    <section className="h-[70vh] flex flex-col justify-center items-center text-gray-800">
      <div className="bg-gray-100 rounded-4xl w-fit text-center p-10 md:p-20 shadow-lg">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="mt-3 text-2xl">Page Not Found</p>
        <div className="mt-4">
          <Link href="/home" className="mt-0 text-blue-500 hover:underline">
            Go back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
