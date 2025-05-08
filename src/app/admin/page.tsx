import React from "react";
import AddArticleForm from "./AddArticleForm";

const AdminPage = () => {
  return (
    <div className="h-[100%] border px-5 lg:px-20 flex justify-center items-center">
      <div className="p-4 rounded shadow w-full max-w-3xl bg-purple-200">
        <h2 className="text-xl lg:text-2xl font-semibold mb-4">
          Add New Article
        </h2>
        <AddArticleForm />
      </div>
    </div>
  );
};

export default AdminPage;
