import { cookies } from "next/headers";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  return (
    <section className="flex items-center justify-center grow-1">
      <div className="w-full border-2 border-gray-300 mx-5 max-w-lg p-6 bg-white rounded-xl shadow-xl">
        <h1 className="font-bold text-3xl text-gray-800 mb-5">Login Page</h1>
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
