import React from 'react'

const Persons = (props) => {

    return (
        <>
            {props.contacts.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => props.handleDelete(person)}>delete</button></p>)}
        </>
    )
}

export default Persons;