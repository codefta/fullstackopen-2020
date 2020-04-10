import React, { useState } from "react";
import Country from "./Country";

const Countries = ({ filterCountries }) => {
  const [showDetail, setShowDetail] = useState([]);

  const handleShowDetail = (index) => {
    console.log(index);
    if (showDetail.includes(index.toString())) {
      const newArr = showDetail.filter((sd) => sd !== index);
      setShowDetail(newArr);
    } else {
      setShowDetail([...showDetail, index]);
    }
  };

  if (filterCountries.length < 1) {
    return <div></div>;
  } else if (filterCountries.length === 1) {
    return (
      <div>
        {filterCountries.map((fc, i) => {
          return <Country key={fc.numericCode} fc={fc} />;
        })}
      </div>
    );
  } else if (filterCountries.length >= 10) {
    return <div>Too many matches, spesify another filter</div>;
  } else {
    return (
      <div>
        {filterCountries.map((fc) => (
          <div key={fc.numericCode}>
            {fc.name}
            <button onClick={() => handleShowDetail(fc.numericCode)}>
              {showDetail.includes(fc.numericCode) ? "hide" : "show"}
            </button>
            {showDetail.includes(fc.numericCode) && (
              <>
                <Country fc={fc} />
              </>
            )}
          </div>
        ))}
      </div>
    );
  }
};

export default Countries;
