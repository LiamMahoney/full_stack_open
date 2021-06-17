import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [ successMessage, setSuccessMessage ] = useState(null);
  const [ errorMessage, setErrorMessage ] = useState(null);
  
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
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      const result = window.confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`);
      
      if (result) {
        const updatedPerson = {...existingPerson, number: newNumber}

        personsService.update(updatedPerson).then((response) => {
          setPersons(persons.map((i) => i.id === updatedPerson.id ? response : i));          
          setSuccessMessage(`Updated ${response.name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        }).catch((error) => {
          setErrorMessage(`Experienced an error trying to update ${existingPerson.name}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
      }

    } else {
      personsService.create({name: newName, number: newNumber}).then((response) => {
        setPersons([response, ...persons]);
        setSuccessMessage(`Created ${newName}`)
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      }).catch((error) => {
        setErrorMessage(error.response.data);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })

    }
    setNewName('');
    setNewNumber('');
  }

  const handleDelete = (person) => {
    const result = window.confirm(`Delete ${person.name}?`);

    if (result) {
      personsService.remove(person.id).then((response) => {
        setPersons(persons.filter(p => p.id !== person.id));
        setSuccessMessage(`Deleted ${newName}`)
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      }).catch((error) => {
        setErrorMessage(`Exerpeinced an error trying to delete the user`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      })

    }
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
      <Notification message={successMessage} type='success' /> 
      <Notification message={errorMessage} type='error' />
      <PersonForm
        handleNameSubmit={handleNameSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons contacts={filteredList} handleDelete={handleDelete}/>
    </div>
  )
}

export default App;