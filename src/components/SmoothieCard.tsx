import React from "react";

type Smoothie = {
  title: string;
  method: string;
  rating: number;
};

const SmootnieCard = ({ title, method, rating }: Smoothie) => {
  return (
    <div className="border p-4">
      <p>{title}</p>
      <p>{method}</p>
      <p>{rating}</p>
    </div>
  );
};

export default SmootnieCard;
