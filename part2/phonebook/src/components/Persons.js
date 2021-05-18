import React from 'react'

const Persons = (props) => {

    return (
        <>
            {props.contacts.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
        </>
    )
}

export default Persons;