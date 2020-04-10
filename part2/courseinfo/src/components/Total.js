import React from "react";

const Total = (props) => {
  const { parts } = props.course;
  const total = parts
    .map((part) => part.exercises)
    .reduce((sum, val) => sum + val);

  return (
    <p>
      <b>total of {total} exercises</b>
    </p>
  );
};

export default Total;
