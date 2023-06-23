import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall'

const get = (lat, lon) => {
    const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
    console.log("url", url)
    const request = axios.get(url)
    return request.then(response => response.data)
}

export default {
    get,
}