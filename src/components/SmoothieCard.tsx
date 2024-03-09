import { Smoothie } from "../types/api";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

const SmoothieCard = ({ id, title, method, rating, onDelete }: Smoothie) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
      console.log("nadelete na");
      onDelete(id);
    }
  };
  return (
    <div className="relative border p-6 rounded-lg shadow-md min-w-[280px] text-gray-700">
      <p className="text-xl font-bold">{title}</p>
      <p className="py-6">{method}</p>
      <div className="flex justify-end gap-2">
        <Link to={"/" + id}>
          <i className="material-symbols-outlined hover:opacity-75 bg-rose-100 p-1 rounded-lg">
            edit
          </i>
        </Link>
        <button onClick={handleDelete}>
          <i className="material-symbols-outlined hover:opacity-75 bg-rose-100 p-1 rounded-lg">
            delete
          </i>
        </button>
      </div>
      <div className="absolute top-0 right-0 py-2 px-4 rounded-lg bg-fuchsia-500 shadow-lg text-fuchsia-100 font-bold m-2">
        {rating}
      </div>
    </div>
  );
};

export default SmoothieCard;
