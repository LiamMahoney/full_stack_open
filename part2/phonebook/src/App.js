import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleNameSubmit = (event) => {
    event.preventDefault();
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} already added to the phonebook`);
    } else {
      personsService.create({name: newName, number: newNumber}).then((response) => {
        setPersons([{name: newName, number: newNumber}, ...persons]);
      }).catch((error) => {
        alert(`Failed to add ${newName} to the phonebook`);
      })

    }
    setNewName('');
    setNewNumber('');
  }

  useEffect(() => {
    personsService.getAll()
      .then((response) => {
        setPersons(response);
      })
  }, [])

  let filteredList = filter.length > 0 ? persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filterValue={filter}
        handleFilterChange={handleFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm
        handleNameSubmit={handleNameSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons contacts={filteredList} />
    </div>
  )
}

export default App;