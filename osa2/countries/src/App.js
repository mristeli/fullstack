import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Results from './components/Results'
import Country from './components/Country'

const apiParams = {
  access_key: '', // insert weatherstack api access key here,
  units: 'm' 
}
    
function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  // this allows us to show 'Sudan' using the show button 
  const [selected, setSelected] = useState({})
  const [weatherData, setWeatherData] = useState({});

  const changeFilter = (event) => {
    setSelected({})
    setFilter(event.target.value)
  } 

  useEffect(() => {
    if(selected.name && !weatherData[selected.alpha3Code]) {
      console.log('Calling weatherstack for', selected.name);
      axios
        .get('http://api.weatherstack.com/current', { params: 
          { ...apiParams, 
            query: selected.capital 
          }})
        .then((response) => {
            setWeatherData({
              ...weatherData,
              [selected.alpha3Code] : response.data
            })
          })
    }
  }, [selected, weatherData])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((resp) => setCountries(resp.data))
  }, [])

  return (
    <div>
      <Filter value={filter} onChange={changeFilter} />
      {selected.name && weatherData[selected.alpha3Code] 
        && <Country data={selected} weatherData={weatherData[selected.alpha3Code]} />}
      {!selected.name && <Results countries={countries} filter={filter} showCountry={setSelected} /> }
    </div>
  )
}

export default App;
