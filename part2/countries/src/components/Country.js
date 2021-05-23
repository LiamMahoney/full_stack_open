import React, { useState } from 'react'
import CountryInfo from './CountryInfo';

function Country({country}) {
    const [details, setDetails] = useState(false)
    
    const handleClick = (event) => {
        event.preventDefault();
        setDetails(!details);
    }
    
    if (details) {
        return (
            <>
                <p>{country.name} 
                    <button onClick={handleClick}>hide</button>
                </p>
                <CountryInfo country={country} />
            </>
        )
    } else {
        return (
            <p>{country.name} 
                <button onClick={handleClick}>show</button>
            </p>
        )
    }
}

export default Country;