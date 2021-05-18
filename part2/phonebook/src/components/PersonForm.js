import React from 'react'

const PersonForm = ({handleNameSubmit, newName, handleNameChange, newNumber, handleNumberChange}) => {

    return (
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
    )
}

export default PersonForm;