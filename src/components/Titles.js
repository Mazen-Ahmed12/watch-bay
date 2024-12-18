import React from "react";

function Titles({ title, Icon }) {
  return (
    <div className="w-full flex sm:gap-8 gap-4 items-center">
      <Icon className="sm-w-8 sm :h-8 w-6 h-6 text-subMain" />
      <h2 className="sm:text-sl font-bold text-lg">{title}</h2>
    </div>
  );
}

export default Titles;
