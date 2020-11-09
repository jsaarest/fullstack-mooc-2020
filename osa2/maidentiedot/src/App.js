import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from "./components/CountryList";




function App() {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  // Fetch data
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // Filter list of countries
  const filteredList = countries.filter(country => country.name.toUpperCase().includes(search.toUpperCase()))
  console.log(filteredList)


  return (
    <div>
      find countries <input value={search} onChange={e => setSearch(e.target.value)}/>
      <CountryList countries={filteredList} setSearch={setSearch}/>
    </div>
  );
}

export default App;
