import React from 'react'

const Filter = ({filterValue, handleFilterChange}) => {
    return (
    <input value={filterValue} onChange={handleFilterChange} />
    )
}

export default Filter;