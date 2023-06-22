import Button from './components/Button'
import MapList from './components/Maplist'
import Filter from './components/Filter'
import Input from './components/Input'
import Notification from './components/Notification'
import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setfilterName] = useState('')
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('green')

  useEffect(() => {
    console.log('effect')
    personService.getAll()
      .then(initialPersons =>
        setPersons(initialPersons)
      )
  }, [persons])

  const namesToShow = filterName === '' ? '' : persons.filter(person => person.name.toLowerCase().startsWith(filterName.toLowerCase()))

  const addName = (event) => {
    event.preventDefault()

    const found = persons.find(person => person.name === newName);
    if (found) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)) {
        const changedPerson = { ...found, number: newNumber }
        personService.update(found.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== found.id ? person : returnedPerson))
          }).catch(
            err => {
              console.log(err)
              setColor('red')
              setMessage(
                `Information of ${newName} has already been removed from server`
              )
              setTimeout(() => {
                setMessage(null)
                setColor('green')
              }, 5000)
            }
          )
        return
      } else {
        return
      }
    }

    const nameObject = {
      name: newName,
      number: newNumber
    }

    personService.create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    setMessage(
      `Added ${newName}`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setfilterName(event.target.value)
  }

  const onDelete = (person) => {
    console.log("person", person)
    const id = person.id
    personService.deletePerson(person)
      .then(person => {
        console.log("id", id)
        setPersons(persons.filter(p => p.id !== id))
        console.log("persons", persons)
      })
      .catch(error => {
        console.log(error)
      })
  }

  if (!persons) { 
    return null 
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} color={color} />
      <form>
        <Input text='filter shown with' value={filterName} onChange={handleFilterChange} />
      </form>
      < Filter namesToShow={namesToShow} />
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <Input text='name' value={newName} onChange={handleNameChange} />
        <Input text='number' value={newNumber} onChange={handleNumberChange} />
        <Button text='add' />
      </form>
      <h2>Numbers</h2>
      < MapList namesToShow={persons} onDelete={onDelete} />
    </div>
  )
}

export default App