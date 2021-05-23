import React, { useState, useEffect } from 'react'
import axios from 'axios'

function CountryWeather({country}) {

    const [weather, setWeather] = useState(undefined);

    useEffect(() => {

        axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.name}`)
            .then((resp) => {
                setWeather(resp.data);
            })
    }, []);

    if (weather) {
        return (
            <>
                <h5>Weather in {country.capital}</h5>
                <p>temperature: {weather.current.temperature} celsius</p>
                <img alt="" src={weather.current.weather_icons[0]} />
                <p>wind: {weather.current.wind_speed} mph {weather.current.wind_dir}</p>
            </>
        )
    } else {
        return (
            <>
                <h5>Weather in {country.capital}</h5>
                <p>loading...</p>
            </>
        )
    }

}

export default CountryWeather;