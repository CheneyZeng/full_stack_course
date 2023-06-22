import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'
import Input from './components/Input'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState("")
  const [item, setItem] = useState({languages:[]})

  useEffect(() => {
    countryService.getAll()
      .then(initialCountries => {
        setCountries(initialCountries.map(country => country.name.common))
      }
      )
  }, [countries])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterCountry(event.target.value)
  }

  const getCountry = (country) => {
    countryService.get(country).then(response => { 
      console.log("response", response)
      setItem(
        {
          name: country,
          capital: response.capital[0],
          area: response.area,
          languages: Object.values(response.languages),
          flag: response.flags.png,
          lat: response.latlng[0],
          lon: response.latlng[1]
        }
      )
      console.log("lat", response.latlng[0])
    })
  }

  const getWeather = (lat, lon) => {
    weatherService.get(lat, lon).then(response => {
      console.log("weather", response)
      setItem({
        temperature: (response.temperature.max + response.temperature.min)/2-273.15,
        wind: response.wind.max.speed,
        ...item,
      })
    })
  }

  const handleClick = (country) => {
    setFilterCountry(country)
  }

  const countriesToShow = filterCountry === '' ? [] : countries.filter(country => country.toLowerCase().startsWith(filterCountry.toLowerCase()))

  return (
    <div>
      <form>
        <Input text='find countries' value={filterCountry} onChange={handleFilterChange} />
      </form>
      <Filter countriesToShow={countriesToShow} getCountry={getCountry} item={item} onClick={handleClick} getWeather={getWeather} />
    </div>
  )
}

export default App