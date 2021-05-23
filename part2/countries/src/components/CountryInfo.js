import React from 'react'
import CountryWeather from './CountryWeather'

function CountryInfo({country}) {
    
    return (
        <>
            <h3>{country.name}</h3>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <h5>languages</h5>
            <ul>
                {country.languages.map((lang) => <li key={lang.name}>{lang.name}</li> )}
            </ul>
            <img style={{width:250,height:'auto'}}alt="country flag" src={country.flag} />
            <CountryWeather country={country} />
        </>
    )
}

export default CountryInfo;