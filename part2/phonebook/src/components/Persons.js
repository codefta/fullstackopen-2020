import React from "react";

const Persons = ({ id, name, number, handleDelete }) => {
  return (
    <div>
      {name} {number} <button onClick={() => handleDelete(id)}>delete</button>
    </div>
  );
};

export default Persons;
