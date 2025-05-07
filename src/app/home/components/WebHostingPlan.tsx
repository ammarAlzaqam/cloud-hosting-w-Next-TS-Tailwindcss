import { TiTick } from "react-icons/ti";

export default function WebHostingPlan() {
  return (
    <div className="flex flex-col justify-center items-center p-5 bg-gray-200 min-w-[300px] rounded-2xl ">
      <h3 className="text-fuchsia-900 text-2xl font-bold mb-4">Premium</h3>
      <h3 className="text-black text-3xl font-bold mb-4">$4.99/mo</h3>

      {/* offer */}
      <div className="rounded-full bg-orange-200 px-2 py-1 mb-4">
        <p>10% OFF</p>
      </div>

      {/* features */}
      <div className="w-full p-5">
        <h3 className="text-fuchsia-900 text-2xl font-bold mb-1">
          Top Features
        </h3>
        <ul>
          <li className="flex gap-2 text-emerald-600">
            <TiTick />
            100 Website
          </li>
          <li className="flex gap-2 text-emerald-600">
            <TiTick />
            100 GB SSd Storage
          </li>
          <li className="flex gap-2 text-emerald-600">
            <TiTick />
            Weekly Backups
          </li>
          <li className="flex gap-2 text-emerald-600">
            <TiTick />
            Unlimited Bandwidth
          </li>
          <li className="flex gap-2 text-emerald-600">
            <TiTick />
            Free SSL
          </li>
          <li className="flex gap-2 text-emerald-600">
            <TiTick />
            Free Email
          </li>
        </ul>
      </div>

      <button className="w-full border-1 rounded-full cursor-pointer py-1 hover:bg-black hover:text-gray-200 transition text-xl font-bold uppercase ">
        buy now
      </button>
    </div>
  );
}
