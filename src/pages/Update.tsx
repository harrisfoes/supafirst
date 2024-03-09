import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.log("There is an error");
        navigate("/", { replace: true });
      }

      if (data) {
        console.log("there is data");
        console.log(data);
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
      }
    };

    fetchSmoothies();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .update({ title, method, rating })
      .eq("id", id)
      .select();

    if (error) {
      console.log(error);
      setFormError("Please fill in all fields");
    }

    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/", { replace: true });
    }
  };

  return (
    <main className="w-full mx-auto font-montserrat min-h-screen bg-gray-200 py-8">
      <section className="bg-white rounded-lg shadow-lg max-w-[480px] mx-auto py-12 w-11/12">
        <h1 className="text-2xl font-bold my-4 text-center">Update Smoothie</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-4/5 mx-auto"
        >
          <label htmlFor="title">Title: </label>
          <input
            className="p-2 text-fuchsia-800 bg-indigo-50"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="method">Method: </label>
          <textarea
            className="p-2 h-32 resize-none text-fuchsia-800 bg-indigo-50"
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          />

          <label htmlFor="raging">Rating: </label>
          <input
            className="p-2 text-fuchsia-800 bg-indigo-50"
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <button className="px-4 py-2 mx-2 bg-fuchsia-800 text-fuchsia-100 font-bold rounded-lg my-6 hover:opacity-75">
            Update Smoothie Recipe
          </button>
          {formError && <p className="error text-red-500">{formError}</p>}
        </form>
      </section>
    </main>
  );
};

export default Update;
