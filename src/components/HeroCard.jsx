import React from "react";

function HeroCard({ name, description, image }) {
  return (
    <React.Fragment>
      <div className="flex-initial flex-col justify-center w-64 shadow-lg rounded ">
        <img className="object-contain p-6 h-48 w-96" src={image} alt={name} />
        <div className="flex justify-center">
          <p className="text-xl">{name}</p>
        </div>
        <div className="flex justify-center pb-6">
          <p>{description}</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default HeroCard;
