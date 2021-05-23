import React from 'react'
import CountryInfo from './CountryInfo'
import Country from './Country'

function Countries ({countries}) {

    if (countries === undefined) {
        return <p>loading countries...</p>
    } else if (countries.length === 0) {
        return <p>no matches, specify another filter</p>
    } else if (countries.length > 10) {
        return <p>too many matches, specify another filter</p>
    } else if (countries.length === 1) {
        return <CountryInfo country={countries[0]} />
    } else {
        return (
            <>
                {countries.map((country) => <Country key={country.numericCode} country={country} />)}
            </>
        )
    }
    
}

export default Countries;