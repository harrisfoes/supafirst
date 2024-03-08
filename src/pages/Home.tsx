import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
import SmoothieCard from "../components/SmoothieCard";
import { Smoothie } from "../types/api";

const Home = () => {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [smoothies, setSmoothies] = useState<Smoothie[] | null>(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase.from("smoothies").select();

      if (error) {
        setFetchError("Could not fetch the data");
        setSmoothies(null);
        console.log(error);
      }

      if (data) {
        setSmoothies(data);
        setFetchError(null);
      }
    };

    fetchSmoothies();
  }, []);

  return (
    <section className="container font-montserrat  mx-auto">
      {fetchError && <div>{fetchError}</div>}
      {smoothies && (
        <div className="container xl:grid-cols-3 grid grid-cols-1 sm:grid-cols-2 gap-14 w-11/12 mx-auto py-8">
          {smoothies.map((smoothie) => (
            <SmoothieCard
              key={smoothie.title}
              title={smoothie.title}
              method={smoothie.method}
              rating={smoothie.rating}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
