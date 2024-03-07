import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
import SmoothieCard from "../components/SmoothieCard";

type Smoothie = {
  title: string;
  method: string;
  rating: number;
};

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
    <div className="container">
      {fetchError && <div>{fetchError}</div>}
      {smoothies && (
        <div>
          {smoothies.map((smoothie) => (
            <SmoothieCard
              title={smoothie.title}
              method={smoothie.method}
              rating={smoothie.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
