import { useState, useEffect } from 'react'
import axios from 'axios'

import { Flight } from './types'
import { parseDate, parseVisibility, parseWeather, parseComment } from './utils'
import flightService from './services/flights'
import * as React from 'react'

function App() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [newDate, setNewDate] = useState('')
  const [newVisibility, setNewVisibility] = useState('')
  const [newWeather, setNewWeather] = useState('')
  const [newComment, setNewComment] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchFlightList = async () => {
      const flights = await flightService.getAll()
      setFlights(flights)
    }
    void fetchFlightList()
  }, [])

  const dairyCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      const dairyToAdd = {
        id: String(flights.length + 1),
        date: parseDate(newDate),
        visibility: parseVisibility(newVisibility),
        weather: parseWeather(newWeather),
        comment: parseComment(newComment),
      }
      setFlights(flights.concat(dairyToAdd))
      setNewDate('')
      setNewVisibility('')
      setNewWeather('')
      setNewComment('')
    } catch (e) {
      setErrorMessage(e.message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  return (
      <div>
        {errorMessage && <h2 style={{ color: 'red' }}>{errorMessage}</h2>}
        <h1>Add new entry</h1>
        <form onSubmit={dairyCreation}>
          Date: <input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31" value={newDate} onChange={e => setNewDate(e.target.value)} /><br />
          Visibitily: 
          great<input type="radio" name="Visibitily" onChange={e => setNewVisibility(e.target.value)} />
          good<input type="radio" name="Visibitily" onChange={e => setNewVisibility(e.target.value)} />
          ok<input type="radio" name="Visibitily" onChange={e => setNewVisibility(e.target.value)} />
          poor<input type="radio" name="Visibitily" onChange={e => setNewVisibility(e.target.value)} />
          <br />
          Weather: 
          sunny<input type="radio" name="Weather" onChange={e => setNewWeather(e.target.value)} />
          rainy<input type="radio" name="Weather" onChange={e => setNewWeather(e.target.value)} />
          cloudy<input type="radio" name="Weather" onChange={e => setNewWeather(e.target.value)} />
          windy<input type="radio" name="Weather" onChange={e => setNewWeather(e.target.value)} />
          <br />
          Comment: <input value={newComment} onChange={e => setNewComment(e.target.value)} /><br />
          <button type="submit">save</button>
        </form>
        <h1>Diary entries</h1>
        {flights.map(flight => (
          <div key={flight.id}>
              <h2>{flight.date} </h2>
              <p>
              visibility: {flight.visibility} <br />
              weather: {flight.weather}
              </p>
          </div>
        ))}
      </div>
  )
}

export default App
