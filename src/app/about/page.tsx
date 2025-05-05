import Image from "next/image";
import CloudImage from "../../../public/cloud-hosting.png";

const AboutPage = () => {
  return (
    <section>
      <h1 className="text-4xl font-bold text-gray-800 mt-7">About Page</h1>
      <p className="my-4 text-gray-600">
        This is the about page of our application. Here you can find information
        about our services and team.
      </p>
      <div>
        <Image
          src={CloudImage}
          alt="Cloud"
          width={500}
          height={500}
          className="rounded-3xl shadow-lg mt-10"
          priority
        />
      </div>
    </section>
  );
};

export default AboutPage;
