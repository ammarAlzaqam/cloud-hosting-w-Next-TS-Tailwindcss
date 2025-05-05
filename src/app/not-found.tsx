export default function NotFound() {
  return (
    <section className="h-[70vh] flex flex-col justify-center items-center text-gray-800">
      <div className="bg-gray-100 rounded-4xl w-fit text-center p-10 shadow-lg">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-4 text-lg">Page Not Found</p>
        <a href="/" className="mt-6 text-blue-500 hover:underline">
          Go back to Home
        </a>
      </div>
    </section>
  );
}
