import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'


function App() {

  const [countries, setCountries] = useState([])
  const [displayedCountries, setDisplayedCountries] = useState()
  const [countryFilter, setCountryFilter] = useState("")

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then((resp) => {
        setCountries(resp.data);
        setDisplayedCountries(resp.data.filter(country => country.name.toLowerCase().indexOf(countryFilter.toLowerCase()) > -1));
      })
  }, [])

  const handleChange = (event) => {
    setCountryFilter(event.target.value);
    setDisplayedCountries(countries.filter(country => country.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1))
  }

  return (
    <div className="App">
      find countries <input onChange={handleChange} />
      <Countries countries={displayedCountries}/>
    </div>
  );
}

export default App;
