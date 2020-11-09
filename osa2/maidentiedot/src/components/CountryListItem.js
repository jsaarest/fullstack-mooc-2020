import React, {useEffect, useState} from "react";
import axios from "axios";

const CountryListItem = ({country}) => {

  const [weather, setWeather] = useState({})
  console.log("Weather: ", weather)

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  return(
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(({name}) => <li key={name}>{name}</li>)}
      </ul>
      <img src={country.flag} alt={`${country.name} flag`} width={250}/>
      <h3>Weather in {country.capital}</h3>
      <p>Temperature in {weather.current.temperature} Celcius</p>
      <img src={weather.current.weather_icons} alt='weather-icons'/>
      <p>{weather.current.wind_speed} kph direction {weather.current.wind_dir}</p>

    </>
  )
}

export default CountryListItem