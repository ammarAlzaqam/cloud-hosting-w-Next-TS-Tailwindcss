import { Metadata } from "next";
import Hero from "./components/hero/Hero";
import WebHostingPlan from "./components/WebHostingPlan";

export default async function HomePage() {
  return (
    <section>
      <Hero />
      <div className="flex flex-col justify-center items-center my-15">
        <h1 className="text-2xl sm:text-3xl text-center sm:text-start font-bold p-5">
          Choose your web hosting plan
        </h1>
        <div className="flex gap-10 flex-col lg:flex-row justify-center items-center p-5">
          <WebHostingPlan />
          <WebHostingPlan />
          <WebHostingPlan />
        </div>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: "Home Page",
  description: "in this page you can see all plans for cloud hosting",
  icons: { icon: "/images/cloud-icon.png" },
};
