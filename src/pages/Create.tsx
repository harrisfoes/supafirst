import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Create = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .insert({ title, method, rating })
      .select();

    if (error) {
      console.log(error);
      setFormError("Please fill in all fields");
    }

    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/");
    }
  };

  return (
    <main className="w-full mx-auto font-montserrat min-h-screen bg-gray-200 py-8">
      <section className="bg-white rounded-lg shadow-lg max-w-[480px] mx-auto py-12 w-11/12">
        <h1 className="text-2xl font-bold my-4 text-center">Create Smoothie</h1>
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
          <input
            className="p-2 text-fuchsia-800 bg-indigo-50"
            type="text"
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
            Create Smoothie Recipe
          </button>
          {formError && <p className="error text-red-500">{formError}</p>}
        </form>
      </section>
    </main>
  );
};

export default Create;
