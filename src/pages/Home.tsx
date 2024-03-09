import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
import SmoothieCard from "../components/SmoothieCard";
import { Smoothie } from "../types/api";

const Home = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [smoothies, setSmoothies] = useState<Smoothie[]>([]);
  const [orderBy, setOrderBy] = useState("created_at");

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy);

      if (error) {
        setFetchError("Could not fetch the data");
        setSmoothies([]);
        console.log(error);
      }

      if (data) {
        console.log(data);
        setSmoothies(data);
        setFetchError(null);
      }
    };

    fetchSmoothies();
  }, [orderBy]);

  const handleDelete = (id: number) => {
    setSmoothies((prevSmoothies) =>
      prevSmoothies?.filter((item) => item.id !== id)
    );
  };

  return (
    <section className="container font-montserrat  mx-auto">
      <div className="flex items-center justify-center gap-4 py-4">
        <p className="font-semibold text-gray-600 text-sm">Order By:</p>
        <button
          className="bg-fuchsia-300 py-2 px-4 rounded-lg text-sm font-medium text-gray-600 hover:opacity-75"
          onClick={() => setOrderBy("created_at")}
        >
          Time Created
        </button>
        <button
          className="bg-fuchsia-300 p-2 rounded-lg text-sm font-medium text-gray-600 hover:opacity-75"
          onClick={() => setOrderBy("title")}
        >
          Title
        </button>
        <button
          className="bg-fuchsia-300 p-2 rounded-lg font-medium text-sm text-gray-600 hover:opacity-75"
          onClick={() => setOrderBy("rating")}
        >
          Rating
        </button>
      </div>
      {fetchError && <div>{fetchError}</div>}
      {smoothies && (
        <div className="container xl:grid-cols-3 grid grid-cols-1 sm:grid-cols-2 gap-14 w-11/12 mx-auto py-8">
          {smoothies.map((smoothie) => (
            <SmoothieCard
              key={smoothie.title}
              title={smoothie.title}
              method={smoothie.method}
              rating={smoothie.rating}
              id={smoothie.id}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
