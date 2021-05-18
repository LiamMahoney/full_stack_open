import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
      { name: 'Arto Hellas', number: '040-123456' },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);
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
      setPersons([{name: newName, number: newNumber}, ...persons]);
    }
    setNewName('');
    setNewNumber('');
  }

  let filteredList = filter.length > 0 ? persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <input value={filter} onChange={handleFilterChange}/>
      </form>
      <h2>add a new</h2>
      <form onSubmit={handleNameSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredList.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App