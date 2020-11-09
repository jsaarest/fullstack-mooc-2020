import React from "react";
import CountryListItem from "./CountryListItem"

const CountryList = ({countries, setSearch}) => {
  if(countries.length === 1)
    return countries.map((country) => <CountryListItem country={country} key={country.name} />)
  if(countries.length < 10 && countries.length > 1)
    return countries.map((country) => <div key={country.name}>{country.name}<button onClick={() => setSearch(country.name)}>Show</button></div>)
  return <p>Too many matches, specify another filter</p>
}

export default CountryList