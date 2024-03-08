import { Smoothie } from "../types/api";

const SmoothieCard = ({ title, method, rating }: Smoothie) => {
  return (
    <div className="relative border p-6 rounded-lg shadow-md min-w-[280px] text-gray-700">
      <p className="text-xl font-bold">{title}</p>
      <p className="py-6">{method}</p>
      <div className="absolute top-0 right-0 py-2 px-4 rounded-lg bg-fuchsia-500 shadow-lg text-fuchsia-100 font-bold m-2">
        {rating}
      </div>
    </div>
  );
};

export default SmoothieCard;
