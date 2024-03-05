import React from "react";
import Part from "./Part";
import Total from "./Total";

const Content = ({ parts }) => {
  const total = parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);
  return (
    <>
      {/* <Part part={parts[0]} />
            <Part part={parts[1]} />
            <Part part={parts[2]} /> */}
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total sum={total} />
  
    </>
  );
};

export default Content;
