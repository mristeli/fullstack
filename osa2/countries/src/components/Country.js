import React from 'react'

const Languages = ({languages}) => (
  <div>
    <h2>languages</h2>
    <ul>
      {languages.map((l) => <li key={l.iso639_1}>{l.name}</li>)}
    </ul>
  </div>
)

const Weather = ({data}) => {
  const {temperature, 
      wind_speed,
      wind_dir,
      weather_icons,
      weather_descriptions,
   } = data.current;
   const city = data.location.name

  return <div>
    <h2>Weather in {city}</h2>
    <p>temperature: {temperature} Celsius</p>
    <p><img alt={weather_descriptions[0]} src={weather_icons[0]}></img></p>
    <p>wind: {wind_speed} kph direction {wind_dir}</p>
  </div>
}

const Country = ({data, weatherData}) => {
  const {
    name, capital, population,
    languages, flag
  } = data

  return <div>
    <h1>{name}</h1>
    <p>capital {capital}</p>      
    <p>population {population}</p>
    <Languages languages={languages} />
    <img className="flag" alt={`Flag of ${name}`} src={flag}/>
    {weatherData.current && <Weather data={weatherData} />}
  </div>
}

export default Country