import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <>
      {/* <Part part={parts[0]} />
            <Part part={parts[1]} />
            <Part part={parts[2]} /> */}
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

export default Content;
