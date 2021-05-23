import React from 'react'
import CountryInfo from './CountryInfo'

function Countries (props) {

    const countries = props.countries === undefined ? "loading countries.." : props.countries.length === 0 ? "no country found" : props.countries.length <= 10 ? props.countries.map((country) => {
        return <p key={country.name}>{country.name}</p>
    }) : "Too many matches, specify another filter"

    return (
        <div>
            {props.countries && props.countries.length === 1 ? <CountryInfo country={props.countries[0]}/> : countries}
        </div>
    )
}

export default Countries;