import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [typeMessage, setTypeMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((returnedObject) => setPersons(returnedObject))
  }, [])

  const showPersons = filter
    ? persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    const value = event.target.value
    setNewName(value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const personObj = {
      name: newName,
      number: newNumber,
    }

    const namePersonExist = persons.find((p) => p.name === newName)

    if (namePersonExist) {
      if (
        window.confirm(
          `${namePersonExist.name} already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(namePersonExist.id, personObj)
          .then((returnedObj) => {
            setPersons(
              persons.map((p) => (p.name !== newName ? p : returnedObj))
            )
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`updated ${returnedObj.name}`)
            setTypeMessage('success')
          })
      } else {
        setNewName('')
        setNewNumber('')
      }
    } else {
      personService
        .create(personObj)
        .then((returnedObject) => {
          setPersons(persons.concat(returnedObject))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(`added ${returnedObject.name}`)
          setTypeMessage('success')
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error)
          setTypeMessage('error')
        })
    }
  }

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then((returnedObject) => {
          setPersons(persons.filter((p) => p.id !== id))
          setSuccessMessage(`deleted ${returnedObject.name}`)
          setTypeMessage('success')
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setTypeMessage('error')
        })
    }
  }

  const notifMessage = successMessage !== null ? successMessage : errorMessage

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} messageType={typeMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      {showPersons.map((p) => (
        <Persons
          key={p.id}
          id={p.id}
          name={p.name}
          number={p.number}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export default App
