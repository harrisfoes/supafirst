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
    <main className="container w-11/12 mx-auto font-montserrat">
      <h1 className="text-2xl font-bold my-8">
        You Can Create New Smoothies Here
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex gap-12">
          <label htmlFor="title">Title: </label>
          <input
            className="border text-amber-800"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <label htmlFor="method">Method: </label>
        <input
          type="text"
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="raging">Rating: </label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>
        {formError && <p className="error text-red-500">{formError}</p>}
      </form>
    </main>
  );
};

export default Create;
