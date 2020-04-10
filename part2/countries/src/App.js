import React, { useState, useEffect } from "react";
import axios from "axios";
import CountriesForm from "./components/CountriesForm";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const filterCountries = filter
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(filter.toLowerCase())
      )
    : filter;

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <CountriesForm filter={filter} handleFilterChange={handleFilterChange} />
      <Countries filterCountries={filterCountries} />
    </div>
  );
};

export default App;
