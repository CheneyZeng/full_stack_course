const Language = ({languages}) => {
    return languages.map(language => 
      <li>{language}</li>
      )
  }

const Item = ({item}) => {
    return (
      <div> 
          <h2>{item.name}</h2>
            capital {item.capital}<br />
            area {item.area}
          <h3>languages</h3>
          <ul>
              <Language languages={item.languages} />
          </ul>
          <img src={item.flag} />
          <h2>Weather in {item.capital}</h2>
          temperature {item.temperature}<br />
          wind {item.wind} m/s
      </div>
    )
  }

const Filter = ({countriesToShow, getCountry, item, onClick, getWeather}) => {
    if (countriesToShow.length === 1) {
      getCountry(countriesToShow[0])
      console.log("item", item)
      getWeather(item.lat, item.lon)
      return <Item item={item} />
    }
    else if (countriesToShow.length >10) {
      return <div>Too many matches, specify another filter</div>
    }
    else {
        return countriesToShow.map(country =>
          <div>
            {country}
            <button onClick={()=>{onClick(country)}}>show</ button>
          </div>
        )
      }
  }

export default Filter