import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall'

const get = (lat, lon) => {
    // const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
    // console.log("url", url)
    // const request = axios.get(url)
    // return request.then(response => response.data)
    return Promise.resolve({
     "lat":33,
     "lon":35,
     "tz":"+02:00",
     "date":"2020-03-04",
     "units":"standard",
     "cloud_cover":{
        "afternoon":0
     },
     "humidity":{
        "afternoon":33
     },
     "precipitation":{
        "total":0
     },
     "temperature":{
        "min":286.48,
        "max":299.24,
        "afternoon":296.15,
        "night":289.56,
        "evening":295.93,
        "morning":287.59
     },
     "pressure":{
        "afternoon":1015
     },
     "wind":{
        "max":{
           "speed":8.7,
           "direction":120
        }
     }
  }
    )                  
}

export default {
    get,
}