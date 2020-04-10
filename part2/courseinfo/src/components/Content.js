import React from "react";
import Part from "./Part";

const Content = (props) => {
  const parts = props.course.parts;

  return (
    <div>
      {parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

export default Content;
