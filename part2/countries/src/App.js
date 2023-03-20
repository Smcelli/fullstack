import { useState, useEffect } from 'react'
import axios from 'axios'

const Button = ({ onClick, text }) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const FilterForm = ({ filterCountries, handler }) => {
    return (
        <form>
            Filter countries with: <input
                value = {filterCountries}
                onChange={handler}
            />
        </form>
    )
}

const ShowCountryList = ({ countries }) => {
    
    return (
        <ul>
            {countries.map((country, index) => 
                <li key={parseInt(country.idd.suffixes)}>
                    {country.name.common}
                </li>
            )}
        </ul>
    )
}

const ShowLanguageList = ({ languages }) => {
    return (
        <ul>
            {languages.map((language, i) =>
                <li key={i}>
                    {language}
                </li>
            )}
        </ul>
    )
}

const ShowCountryData = ({ countries, index = 0 }) => {
    return (
        <div>
            <h2>{countries[index].name.common}</h2>
            <div>Capital: {countries[index].capital}</div>
            <div>Area: {countries[index].area}</div>
            <h3>Languages: </h3>
            <ShowLanguageList
                languages={Object.values(countries[index].languages)} />
            <img src={countries[index].flags.png} />
        </div>
    )
}

const CountryList = ({ countries, setCountries }) => {
    
    if (countries.length == 0) {
        return (
            <div> No matches </div>
        )
    } else if (countries.length > 10) {
        return (
            <div> Too many matches, specify another filter </div>
        )
    } else if (countries.length > 1) {
        return (
            <ul>
                {countries.map((country, index) =>
                    <li key={parseInt(country.idd.suffixes)}>
                        {country.name.common}
                        <button onClick={() => setCountries([country])}>
                            show
                       </button>
                    </li>
                )}
            </ul>
        )
    } else if (countries.length == 1) {
        return (
            <ShowCountryData countries={countries} />
        )
    } else
        return (
            <div> error </div>
        )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [countriesFiltered, setCountriesFiltered] = useState([])
    const [filterCountries, setFilterCountries] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                console.log('promise fulfilled')
                setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => {
        setFilterCountries(event.target.value)
        setCountriesFiltered(
            (event.target.value === '')
                ? countries
                : countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
        )
        //console.log(countriesFiltered)
    }

    return (
        <div>
            <h3> Find countries </h3>
            <FilterForm
                filterCountries={filterCountries}
                handler={handleFilterChange}
            />
            <CountryList
                countries={countriesFiltered}
                setCountries={setCountriesFiltered}
            />
        </div>
    );
}

export default App;
